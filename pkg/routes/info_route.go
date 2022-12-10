package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/riipandi/gogon/pkg/handler"
)

func InfoRoutes(g *gin.RouterGroup) {
	g.GET("/", handler.RootHandler)
}
