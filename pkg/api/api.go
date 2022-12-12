package api

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"runtime"

	"github.com/riipandi/gogon/pkg/handler"
	"github.com/uptrace/bunrouter"
	"github.com/uptrace/bunrouter/extra/reqlog"
)

type PanicHandler struct {
	Next http.Handler
}

func CallApiRoutes(bind string) {
	router := bunrouter.New(
		bunrouter.Use(reqlog.NewMiddleware()),
		bunrouter.Use(reqlog.NewMiddleware(reqlog.FromEnv("BUNDEBUG"))),
		bunrouter.WithNotFoundHandler(handler.NotFoundHandler),
		bunrouter.WithMethodNotAllowedHandler(handler.MethodNotAllowedHandler),
	)

	// Register routes
	registerRoutes(router)

	handler := http.Handler(router)
	handler = PanicHandler{Next: handler}

	log.Printf("listening on %v", bind)
	log.Println(http.ListenAndServe(bind, handler))
}

func (h PanicHandler) ServeHTTP(w http.ResponseWriter, req *http.Request) {
	defer func() {
		if err := recover(); err != nil {
			buf := make([]byte, 10<<10)
			n := runtime.Stack(buf, false)
			fmt.Fprintf(os.Stderr, "panic: %v\n\n%s", err, buf[:n])
			http.Error(w, fmt.Sprint(err), http.StatusInternalServerError)
		}
	}()

	h.Next.ServeHTTP(w, req)
}
