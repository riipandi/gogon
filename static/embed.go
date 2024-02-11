// Package web handles the frontend embedding.
package static

import (
	"embed"
)

//go:embed all:*
var StaticDir embed.FS
