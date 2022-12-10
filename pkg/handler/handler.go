package handler

import "github.com/gin-gonic/gin"

func RootHandler(c *gin.Context) {
	c.JSON(200, gin.H{
		"message":   "Hello Gogon",
		"client_ip": c.ClientIP(),
	})
}
