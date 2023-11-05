// Package web handles the frontend embedding.
package web

import (
	"embed"
)

//go:embed all:*
var DistDir embed.FS
