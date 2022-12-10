package command

import (
	"github.com/gin-gonic/gin"
	"github.com/spf13/cobra"
)

var serveCmd = &cobra.Command{
	Use:   "serve",
	Short: "Run the web client",
	Run: func(cmd *cobra.Command, args []string) {
		// Get config value from flags
		fhost, _ := cmd.Flags().GetString("host")

		r := gin.Default()

		r.GET("/", func(c *gin.Context) {
			c.JSON(200, gin.H{
				"message": "Hello Gogon",
			})
		})

		r.Run(fhost)
	},
}

func init() {
	rootCmd.AddCommand(serveCmd)

	// Local flags which will only run when this command is called directly.
	serveCmd.Flags().StringP("host", "H", "127.0.0.1:8000", "Bind web client host and port")
}
