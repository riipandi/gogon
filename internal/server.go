package internal

import (
	"encoding/json"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"

	"gogon/web"
)

type Server struct {
	Router chi.Router
}

func NewServer() *Server {
	r := chi.NewRouter()

	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)
	r.Use(cors.Handler(cors.Options{
		AllowedOrigins:   []string{"*"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Content-Type"},
		AllowCredentials: false,
		MaxAge:           300,
	}))

	r.Route("/api", func(r chi.Router) {
		r.Get("/users/{id}", userHandler)
		r.Get("/users/current", currentUserHandler)
		r.Get("/users/*", userPathHandler)
	})

	web.SetupStatic(r)

	return &Server{Router: r}
}

func (s *Server) ListenAndServe(addr string) error {
	return http.ListenAndServe(addr, s.Router)
}

func writeJSON(w http.ResponseWriter, status int, v any) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	json.NewEncoder(w).Encode(v)
}

func userHandler(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	writeJSON(w, http.StatusOK, map[string]string{
		"id": id,
	})
}

func currentUserHandler(w http.ResponseWriter, r *http.Request) {
	writeJSON(w, http.StatusOK, map[string]string{
		"route": "/api/users/current",
	})
}

func userPathHandler(w http.ResponseWriter, r *http.Request) {
	path := chi.URLParam(r, "*")
	writeJSON(w, http.StatusOK, map[string]string{
		"route": "/api/users/*",
		"path":  path,
	})
}
