package handler

import (
	"net/http"

	"github.com/go-chi/chi/v5"
	"myapp/internal/responder"
)

func ListUsersHandler(w http.ResponseWriter, r *http.Request) {
	responder.WriteJSON(w, http.StatusOK, []map[string]string{
		{"id": "1", "name": "User One"},
		{"id": "2", "name": "User Two"},
	})
}

func UserHandler(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	responder.WriteJSON(w, http.StatusOK, map[string]string{
		"id": id,
	})
}

func UserPathHandler(w http.ResponseWriter, r *http.Request) {
	path := chi.URLParam(r, "*")
	responder.WriteJSON(w, http.StatusOK, map[string]string{
		"route": "/api/users/*",
		"path":  path,
	})
}
