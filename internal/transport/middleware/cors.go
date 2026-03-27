package middleware

import (
	"net/http"

	"github.com/go-chi/cors"
)

func CORS() func(http.Handler) http.Handler {
	return cors.Handler(cors.Options{
		AllowedOrigins: []string{"*"},
		AllowedMethods: []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders: []string{
			"Connect-Protocol-Version",
			"Connect-Request-Id",
			"Connect-Timeout",
			"Content-Encoding",
			"Content-Type",
			"X-Connect-Protocol-Version",
			"X-Grpc-Web",
			"X-User-Agent",
		},
		AllowCredentials: false,
		MaxAge:           300,
	})
}
