package handlers

import (
	"github.com/riipandi/gogon/internal/view"
	"net/http"
)

type ErrorNotFound struct{}

func NewNotFoundHandler() *ErrorNotFound {
	return &ErrorNotFound{}
}

func (h *ErrorNotFound) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	c := view.NotFound()
	err := view.Layout(c, "404 Not Found").Render(r.Context(), w)

	if err != nil {
		http.Error(w, "Error rendering template", http.StatusInternalServerError)
		return
	}
}
