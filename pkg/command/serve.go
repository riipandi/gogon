package command

import (
	"github.com/gin-gonic/gin"
	"github.com/riipandi/gogon/pkg/handler"
	"github.com/spf13/cobra"
)

var serveCmd = &cobra.Command{
	Use:   "serve",
	Short: "Run the web client",
	Run: func(cmd *cobra.Command, args []string) {
		// Get config value from flags
		fhost, _ := cmd.Flags().GetString("host")

		r := gin.Default()
		r.SetTrustedProxies([]string{"127.0.0.1"})

		// Global middleware
		// Logger middleware will write the logs to gin.DefaultWriter even if you set with GIN_MODE=release.
		// By default gin.DefaultWriter = os.Stdout
		r.Use(gin.Logger())

		// Recovery middleware recovers from any panics and writes a 500 if there was one.
		r.Use(gin.Recovery())

		// Serve static favicon file from a location relative to main.go directory
		r.StaticFile("/favicon.ico", "./assets/favicon.ico")

		// Prefixed routes (group)
		apiRoute := r.Group("/api")
		{
			apiRoute.GET("/", handler.RootHandler)
			// routes.InfoRoutes(apiRoute.Group("/info"))
		}

		r.Run(fhost)
	},
}

func init() {
	rootCmd.AddCommand(serveCmd)

	// Local flags which will only run when this command is called directly.
	serveCmd.Flags().StringP("host", "H", "127.0.0.1:8000", "Bind web client host and port")
}
