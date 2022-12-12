package handler

import (
	"fmt"
	"net/http"

	"github.com/uptrace/bunrouter"
)

func MethodNotAllowedHandler(w http.ResponseWriter, req bunrouter.Request) error {
	w.WriteHeader(http.StatusMethodNotAllowed)
	fmt.Fprintf(
		w,
		"<html>BunRouter does have a route that matches <strong>%s</strong>, "+
			"but it does not handle method <strong>%s</strong></html>",
		req.URL.Path, req.Method,
	)
	return nil
}
