package handlers

import (
	"mime"
	"net/http"
	"os"
	"path/filepath"

	"embed"
	"errors"
	"io"
	"path"

	"github.com/riipandi/gogon/web"
)

var ErrDir = errors.New("path is dir")

func tryRead(fs embed.FS, prefix, requestedPath string, w http.ResponseWriter) error {
	// Join internally call path.Clean to prevent directory traversal
	f, err := fs.Open(path.Join(prefix, requestedPath))
	if err != nil {
		return err
	}
	defer f.Close()

	// Go's fs.Open does not cause an error even if it tries to read a directory,
	// but it is a nuisance here, so it is treated as an error.
	stat, err := f.Stat()
	if os.IsNotExist(err) || stat.IsDir() {
		// set cache control header to prevent caching
		// this is to prevent the browser from caching the index.html
		// and serving old build of SPA App
		w.Header().Set("Cache-Control", "no-cache, no-store, must-revalidate")
		// w.WriteHeader(http.StatusNotFound) // Set appropriate status code

		return ErrDir
	}

	contentType := mime.TypeByExtension(filepath.Ext(requestedPath))
	w.Header().Set("Content-Type", contentType)

	// set cache control header to serve file for a year
	// static files in this case need to be cache busted
	// (usualy by appending a hash to the filename)
	w.Header().Set("Cache-Control", "public, max-age=31536000, immutable")

	_, err = io.Copy(w, f)
	return err
}

// SPAHandler serves a single page application.
func SPAHandler(staticPath string) http.HandlerFunc {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// First, search the file as requested.
		err := tryRead(web.DistDir, staticPath, r.URL.Path, w)
		if err == nil {
			return
		}
		// If not found, return `index.html`
		err = tryRead(web.DistDir, staticPath, "index.html", w)
		if err != nil {
			panic(err)
		}
	})
}
