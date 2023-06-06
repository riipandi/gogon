package cli

import (
	"github.com/riipandi/gogon/pkg/api"
	"github.com/spf13/cobra"
)

var serveCmd = &cobra.Command{
	Use:   "serve",
	Short: "Run the web client",
	Run: func(cmd *cobra.Command, args []string) {
		fhost, _ := cmd.Flags().GetString("host")
		api.CallApiRoutes(fhost)
	},
}

func init() {
	rootCmd.AddCommand(serveCmd)

	// Local flags which will only run when this command is called directly.
	serveCmd.Flags().StringP("host", "H", "127.0.0.1:9090", "Bind web client host and port")
}
