package transport

import (
	"context"
	"net/http"

	"github.com/go-chi/chi/v5"

	"myapp/internal/transport/middleware"
	"myapp/internal/transport/routes"
	"myapp/web"
)

type Server struct {
	Router chi.Router
	server *http.Server
}

func NewServer() *Server {
	r := chi.NewRouter()

	r.Use(middleware.Logger())
	r.Use(middleware.JSONRecoverer)
	r.Use(middleware.CORS())

	r.Route("/api", routes.RegisterAPI)

	web.SetupStatic(r)

	return &Server{Router: r}
}

func (s *Server) ListenAndServe(addr string) error {
	s.server = &http.Server{Addr: addr, Handler: s.Router}
	return s.server.ListenAndServe()
}

func (s *Server) Shutdown(ctx context.Context) error {
	return s.server.Shutdown(ctx)
}
