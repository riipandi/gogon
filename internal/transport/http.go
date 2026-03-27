package transport

import (
	"context"
	"net/http"

	"github.com/go-chi/chi/v5"

	"myapp/internal/transport/middleware"
	"myapp/internal/transport/routes"
	"myapp/web"
)

type HttpServer struct {
	Router chi.Router
	Server *http.Server
}

func NewHttpServer() *HttpServer {
	r := chi.NewRouter()

	r.Use(middleware.Logger())
	r.Use(middleware.JSONRecoverer)
	r.Use(middleware.CORS())

	r.Route("/api", routes.RegisterAPI)
	r.Mount("/rpc", http.StripPrefix("/rpc", newRPCHandler()))

	web.SetupStatic(r)

	return &HttpServer{Router: r}
}

func (s *HttpServer) ListenAndServe(addr string) error {
	protocols := new(http.Protocols)
	protocols.SetHTTP1(true)
	protocols.SetUnencryptedHTTP2(true)

	s.Server = &http.Server{
		Addr:      addr,
		Handler:   s.Router,
		Protocols: protocols,
	}

	return s.Server.ListenAndServe()
}

func (s *HttpServer) Shutdown(ctx context.Context) error {
	return s.Server.Shutdown(ctx)
}
