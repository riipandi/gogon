package internal

import (
	"net/http"
	"time"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
	"github.com/go-chi/httprate"
	"github.com/go-chi/jwtauth/v5"
	"github.com/go-chi/render"

	jwx "github.com/lestrrat-go/jwx/v2/jwt"

	h "github.com/riipandi/gogon/internal/handlers"
	mw "github.com/riipandi/gogon/internal/middleware"
	"github.com/riipandi/gogon/pkg/jwt"
	"github.com/riipandi/gogon/static"
)

// We can use subdomain mapping to split between API and web app:
// @ref: https://go-chi.io/#/pages/middleware?id=routeheaders
func httpHandler() http.Handler {

	r := chi.NewRouter()

	// Global middlewares
	r.Use(middleware.RequestID)
	r.Use(middleware.RealIP)
	r.Use(middleware.CleanPath)
	r.Use(middleware.URLFormat)
	r.Use(middleware.Logger) // <--<< Logger should come before Recoverer
	r.Use(middleware.Recoverer)

	// Serve SPA frontend app
	r.Group(func(r chi.Router) {
		// Compress is a middleware that compresses response body of a given
		// content types to a data format based on Accept-Encoding request
		// header. It uses a given compression level.
		r.Use(middleware.Compress(5, "text/html", "text/css", "application/javascript"))
		r.Use(mw.CSPMiddleware)

		// Serve static assets from embedded static
		fs := http.FileServer(http.FS(static.StaticDir))
		r.Handle("/assets/*", http.StripPrefix("/assets/", fs))

		r.Get("/", h.NewHomeHandler().ServeHTTP)
		r.Get("/spa/*", h.SPAHandler("sample"))
	})

	// Group Routes for API
	r.Group(func(r chi.Router) {

		// Limit number of currently processed requests at a time across all users.
		r.Use(middleware.Throttle(30)) // 30 seconds

		// AllowContentType enforces a whitelist of request Content-Types
		// otherwise responds with a 415 Unsupported Media Type status.
		r.Use(middleware.AllowContentType("application/json", "text/xml"))

		// Enable httprate request limiter of 100 requests per minute.
		// Rate-limiting is bound to the request IP address via the LimitByIP
		// middleware handler.
		r.Use(httprate.LimitByIP(100, 1*time.Minute))

		r.Use(cors.Handler(cors.Options{
			AllowedOrigins: []string{"https://*", "http://*"},
			AllowedMethods: []string{"GET", "PUT", "POST", "DELETE", "HEAD", "OPTION"},
			AllowedHeaders: []string{
				"User-Agent", "Content-Type", "Accept", "Accept-Encoding", "Accept-Language", "Authorization",
				"Cache-Control", "Connection", "DNT", "Host", "Origin", "Pragma", "Referer", "X-CSRF-Token"},
			ExposedHeaders:   []string{"Link"},
			AllowCredentials: true,
			MaxAge:           300, // Maximum value not ignored by any of major browsers
		}))

		r.Route("/api", apiRoutes)
	})

	// r.NotFound(h.NewNotFoundHandler().ServeHTTP)
	r.NotFound(h.NotFoundHandler)
	r.MethodNotAllowed(h.MethodNotAllowedHandler)
	return r
}

func apiRoutes(r chi.Router) {

	// Public API routes
	r.Group(func(r chi.Router) {
		r.Get("/", func(w http.ResponseWriter, r *http.Request) {
			w.Write([]byte("Gogon API v1"))
		})
		r.Get("/sysinfo", sysInfoHandler(true))
		r.Get("/health", healthCheckHandler())
	})

	// Protected API routes
	r.Group(func(r chi.Router) {
		// Seek, verify and validate JWT tokens
		r.Use(jwtauth.Verifier(jwt.TokenAuth))

		// Handle valid / invalid tokens. In this example, we use the provided authenticator
		// middleware, but you can write your own very easily, look at the Authenticator
		// method in jwtauth.go and tweak it, its not scary.

		// r.Use(jwtauth.Authenticator)
		r.Use(func(next http.Handler) http.Handler {
			return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
				token, _, err := jwtauth.FromContext(r.Context())

				if err != nil {
					// http.Error(w, err.Error(), http.StatusUnauthorized)
					w.Header().Set("Content-type", "application/json")
					w.WriteHeader(http.StatusUnauthorized)
					render.Render(w, r, h.ErrUnauthorized)
					return
				}

				if token == nil || jwx.Validate(token) != nil {
					// http.Error(w, http.StatusText(http.StatusUnauthorized), http.StatusUnauthorized)
					w.Header().Set("Content-type", "application/json")
					w.WriteHeader(http.StatusUnauthorized)
					render.Render(w, r, h.ErrUnauthorized)
					return
				}

				// Token is authenticated, pass it through
				next.ServeHTTP(w, r)
			})
		})

		// Register protected routes here
		// r.Get("/users", h.GetAllUsers)
		// r.Post("/users", h.CreateUser)
		// r.Get("/users/{userId}", h.GetUserById)
	})

}
