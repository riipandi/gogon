package middleware

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

func ErrorHandleMiddleware(c *gin.Context) {
	// log.Printf("Total Errors -> %d", len(c.Errors))

	if len(c.Errors) <= 0 {
		c.Next()
		return
	}

	for _, err := range c.Errors {
		log.Printf("Error -> %+v\n", err)
	}

	c.JSON(http.StatusInternalServerError, gin.H{
		"code":    http.StatusInternalServerError,
		"message": http.StatusText(http.StatusInternalServerError),
	})
}
