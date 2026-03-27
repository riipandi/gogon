package internal

import (
	"net/http"

	"github.com/go-chi/chi/v5"

	"myapp/internal/handler"
	"myapp/internal/middleware"
	"myapp/internal/responder"
	"myapp/web"
)

type Server struct {
	Router chi.Router
}

func NewServer() *Server {
	r := chi.NewRouter()

	r.Use(middleware.Logger())
	r.Use(middleware.JSONRecoverer)
	r.Use(middleware.CORS())

	r.Route("/api", func(r chi.Router) {
		r.NotFound(responder.NotFoundJSON)
		r.MethodNotAllowed(responder.MethodNotAllowedJSON)
		r.Get("/", handler.ApiRootHandler)
		r.Get("/users", handler.ListUsersHandler)
		r.Get("/users/{id}", handler.UserHandler)
		r.Get("/users/current", handler.CurrentUserHandler)
		r.Get("/users/*", handler.UserPathHandler)
	})

	web.SetupStatic(r)

	return &Server{Router: r}
}

func (s *Server) ListenAndServe(addr string) error {
	return http.ListenAndServe(addr, s.Router)
}
