package handler

import (
	"net/http"

	"tango/internal/config"
	"tango/internal/transport/responder"
)

func HealthzHandler(w http.ResponseWriter, r *http.Request) {
	responder.WriteJSON(w, http.StatusOK, map[string]string{
		"status": "healthy",
	})
}

func APIRootHandler(w http.ResponseWriter, r *http.Request) {
	responder.WriteJSON(w, http.StatusOK, map[string]string{
		"name":     config.AppName,
		"version":  config.AppVersion,
		"platform": config.Platform,
		"build":    config.BuildDate,
		"hash":     config.BuildHash,
	})
}
