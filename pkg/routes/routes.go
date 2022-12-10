package routes

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/riipandi/gogon/internal/middleware"
	"github.com/riipandi/gogon/pkg/config"
	"github.com/riipandi/gogon/pkg/handler"
)

func CallApiRoutes(bind string) {
	r := gin.Default()

	// Configure Gin framework
	r.SetTrustedProxies(config.TrustedProxies)

	// Register global middlewares.
	r.Use(gin.Logger())                     // Logger middleware will write the logs to gin.DefaultWriter even if you set with GIN_MODE=release.
	r.Use(gin.Recovery())                   // Recovery middleware recovers from any panics and writes a 500 if there was one.
	r.Use(middleware.ErrorHandleMiddleware) // Error-Handler Middleware

	r.NoRoute(func(c *gin.Context) {
		code := http.StatusNotFound
		c.JSON(code, gin.H{"code": code, "message": http.StatusText(code)})
	})

	r.NoMethod(func(c *gin.Context) {
		code := http.StatusMethodNotAllowed
		c.JSON(code, gin.H{"code": code, "message": http.StatusText(code)})
	})

	// Serve static favicon file from a relative path.
	r.StaticFile("/robots.txt", "./assets/robots.txt")
	r.StaticFile("/favicon.ico", "./assets/favicon.ico")

	// Health Check route
	r.GET("/health", func(c *gin.Context) { c.String(http.StatusOK, "OK") })

	// Prefixed routes (group)
	apiRoute := r.Group("/api")
	{
		apiRoute.GET("", handler.ApiRootHandler)
		infoRoutes(apiRoute.Group("info"))
	}

	r.Run(bind)
}
