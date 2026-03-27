package middleware

import (
	"fmt"
	"log/slog"
	"net/http"

	chimw "github.com/go-chi/chi/v5/middleware"
)

func Logger() func(http.Handler) http.Handler {
	return chimw.RequestLogger(&chimw.DefaultLogFormatter{
		Logger: slogPrinter{},
	})
}

type slogPrinter struct{}

func (s slogPrinter) Printf(format string, args ...any) {
	slog.Default().Info(fmt.Sprintf(format, args...))
}

func (s slogPrinter) Print(args ...any) {
	slog.Default().Info(fmt.Sprint(args...))
}
