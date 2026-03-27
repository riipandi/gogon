package middleware

import (
	"net/http"

	chimw "github.com/go-chi/chi/v5/middleware"
)

func Logger() func(http.Handler) http.Handler {
	return chimw.RequestLogger(&chimw.DefaultLogFormatter{})
}
