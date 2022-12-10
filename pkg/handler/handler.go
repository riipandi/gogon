package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"
	cons "github.com/riipandi/gogon/pkg/constants"
)

func ApiRootHandler(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"message": "Hello from Gogon"})
}

func ApiInfoHandler(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"version":    cons.Version,
		"platform":   cons.Platform,
		"build_date": cons.BuildDate,
		"client_ip":  c.ClientIP(),
	})
}
