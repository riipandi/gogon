package transport

import (
	"context"
	"net/http"
	"time"

	"github.com/go-chi/chi/v5"

	"myapp/internal/transport/middleware"
	"myapp/internal/transport/routes"
	"myapp/web"
)

type HTTPServer struct {
	Router chi.Router
	Server *http.Server
}

func NewHTTPServer() *HTTPServer {
	r := chi.NewRouter()

	r.Use(middleware.Logger())
	r.Use(middleware.JSONRecoverer)
	r.Use(middleware.CORS())

	r.Route("/api", routes.RegisterAPI)
	r.Mount("/rpc", http.StripPrefix("/rpc", newRPCHandler()))

	web.SetupStatic(r)

	return &HTTPServer{Router: r}
}

func (s *HTTPServer) ListenAndServe(addr string) error {
	protocols := new(http.Protocols)
	protocols.SetHTTP1(true)
	protocols.SetUnencryptedHTTP2(true)

	s.Server = &http.Server{
		Addr:              addr,
		Handler:           s.Router,
		Protocols:         protocols,
		ReadHeaderTimeout: 10 * time.Second,
	}

	return s.Server.ListenAndServe()
}

func (s *HTTPServer) Shutdown(ctx context.Context) error {
	return s.Server.Shutdown(ctx)
}
