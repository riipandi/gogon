//go:build release

package web

import (
	"embed"
	"io/fs"
	"net/http"
	"path/filepath"
	"strings"

	"github.com/go-chi/chi/v5"
)

//go:embed all:dist
var distFS embed.FS

func SetupStatic(r chi.Router) {
	r.NotFound(spaHandler())
}

func spaHandler() http.HandlerFunc {
	distSub, _ := fs.Sub(distFS, "dist")
	fileServer := http.FileServer(http.FS(distSub))

	return func(w http.ResponseWriter, r *http.Request) {
		reqPath := strings.TrimPrefix(r.URL.Path, "/")

		if reqPath != "" {
			cleanPath := filepath.Clean(reqPath)
			if !strings.HasPrefix(cleanPath, ".") {
				if f, err := distSub.Open(cleanPath); err == nil {
					f.Close()
					fileServer.ServeHTTP(w, r)
					return
				}
			}
		}

		http.ServeFileFS(w, r, distSub, "index.html")
	}
}
