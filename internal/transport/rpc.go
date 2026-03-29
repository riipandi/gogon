package transport

import (
	"net/http"
	"net/http/httptest"

	"tango/internal/services"
	"tango/internal/transport/responder"
	"tango/specs/api/v1/tangov1connect"
)

func NewRPCMux() *http.ServeMux {
	mux := http.NewServeMux()

	mux.Handle(tangov1connect.NewGreetServiceHandler(&services.GreetService{}))

	return mux
}

func newRPCHandler() http.Handler {
	mux := NewRPCMux()
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		rec := httptest.NewRecorder()
		mux.ServeHTTP(rec, r)

		if rec.Code == http.StatusNotFound {
			responder.NotFoundJSON(w, r)
			return
		}

		for k, vv := range rec.Header() {
			for _, v := range vv {
				w.Header().Add(k, v)
			}
		}
		w.WriteHeader(rec.Code)
		_, _ = w.Write(rec.Body.Bytes())
	})
}
