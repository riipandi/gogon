package handler

import (
	"net/http"

	"myapp/internal/responder"
)

func ApiRootHandler(w http.ResponseWriter, r *http.Request) {
	responder.WriteJSON(w, http.StatusOK, map[string]string{
		"name":    "myapp",
		"version": "1.0.0",
		"status":  "ok",
	})
}
