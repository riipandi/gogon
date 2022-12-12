package api

import (
	"github.com/riipandi/gogon/pkg/handler"
	"github.com/uptrace/bunrouter"
)

func registerRoutes(r *bunrouter.Router) {

	r.GET("/", handler.ApiRootHandler)

	r.WithGroup("/api", func(g *bunrouter.Group) {
		g.GET("", handler.ApiInfoHandler)
		g.GET("/users/:id", handler.DebugHandler)
		g.GET("/users/current", handler.DebugHandler)
		g.GET("/users/*path", handler.DebugHandler)
	})

}
