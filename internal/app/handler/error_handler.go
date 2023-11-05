package handler

import (
	"log"
	"net/http"

	"github.com/go-chi/render"
)

type ErrorResponse struct {
	Err        error  `json:"-"`
	StatusCode int    `json:"-"`
	StatusText string `json:"status_text"`
	Message    string `json:"message"`
}

var (
	ErrMethodNotAllowed = &ErrorResponse{StatusCode: 405, Message: "Method not allowed"}
	ErrNotFound         = &ErrorResponse{StatusCode: 404, Message: "Resource not found"}
	ErrUnauthorized     = &ErrorResponse{StatusCode: 401, Message: "Unauthorized"}
	ErrBadRequest       = &ErrorResponse{StatusCode: 400, Message: "Bad request"}
)

func (e *ErrorResponse) Render(w http.ResponseWriter, r *http.Request) error {
	render.Status(r, e.StatusCode)
	return nil
}
func ErrorRenderer(err error) *ErrorResponse {
	return &ErrorResponse{
		Err:        err,
		StatusCode: 400,
		StatusText: "Bad request",
		Message:    err.Error(),
	}
}
func ServerErrorRenderer(err error) *ErrorResponse {
	log.Printf("ERROR: %s", err.Error())
	return &ErrorResponse{
		Err:        err,
		StatusCode: 500,
		StatusText: "Internal server error",
		Message:    err.Error(),
	}
}

func NotFoundHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-type", "application/json")
	w.WriteHeader(http.StatusNotFound)
	render.Render(w, r, ErrNotFound)
}

func MethodNotAllowedHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-type", "application/json")
	w.WriteHeader(http.StatusMethodNotAllowed)
	render.Render(w, r, ErrMethodNotAllowed)
}

func UnauthorizedHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-type", "application/json")
	w.WriteHeader(http.StatusUnauthorized)
	render.Render(w, r, ErrUnauthorized)
}
