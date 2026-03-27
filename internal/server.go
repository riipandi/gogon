package internal

import (
	"net/http"

	"github.com/go-chi/chi/v5"

	"myapp/internal/middleware"
	"myapp/internal/routes"
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

	r.Route("/api", routes.RegisterAPI)

	web.SetupStatic(r)

	return &Server{Router: r}
}

func (s *Server) ListenAndServe(addr string) error {
	return http.ListenAndServe(addr, s.Router)
}
