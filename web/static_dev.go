//go:build !release

package web

import (
	"net/http"
	"strings"

	"github.com/go-chi/chi/v5"

	"myapp/internal/responder"
)

func SetupStatic(r chi.Router) {
	r.NotFound(func(w http.ResponseWriter, r *http.Request) {
		if strings.HasPrefix(r.URL.Path, "/api") {
			responder.NotFoundJSON(w, r)
			return
		}
		http.Error(w, "not found", http.StatusNotFound)
	})
}
