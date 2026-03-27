package cmd

import (
	"log"
	"strings"

	"github.com/spf13/cobra"

	"gogon/internal"
)

var serveHost string
var servePort string

var serveCmd = &cobra.Command{
	Use:   "serve",
	Short: "Start the server",
	Run: func(cmd *cobra.Command, args []string) {
		srv := internal.NewServer()
		host := strings.TrimPrefix(serveHost, ":")
		port := strings.TrimPrefix(servePort, ":")
		addr := host + ":" + port
		log.Printf("listening on http://%s\n", addr)
		if err := srv.ListenAndServe(addr); err != nil {
			log.Fatal(err)
		}
	},
}

func init() {
	serveCmd.Flags().StringVar(&serveHost, "host", "", "Host to bind to")
	serveCmd.Flags().StringVar(&servePort, "port", ":3080", "Port to bind to")
}
