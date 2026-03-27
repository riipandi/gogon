//go:build !release

package web

import (
	"net/http"

	"github.com/go-chi/chi/v5"
)

func SetupStatic(r chi.Router) {
	r.NotFound(func(w http.ResponseWriter, r *http.Request) {
		http.Error(w, "not found", http.StatusNotFound)
	})
}
