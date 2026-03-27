package cmd

import (
	"context"
	"log"
	"net/http"
	"os"
	"os/signal"
	"strings"
	"syscall"
	"time"

	"github.com/spf13/cobra"

	"myapp/internal/transport"
)

var serveHost string
var servePort string

var serveCmd = &cobra.Command{
	Use:   "serve",
	Short: "Start the application server",
	Run: func(cmd *cobra.Command, args []string) {
		srv := transport.NewServer()
		addr := strings.TrimPrefix(serveHost, ":") + ":" + strings.TrimPrefix(servePort, ":")

		go func() {
			log.Printf("listening on http://%s\n", addr)
			if err := srv.ListenAndServe(addr); err != nil && err != http.ErrServerClosed {
				log.Fatalf("server error: %v", err)
			}
		}()

		quit := make(chan os.Signal, 1)
		signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
		<-quit

		log.Println("shutting down server...")

		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()

		if err := srv.Shutdown(ctx); err != nil {
			log.Fatalf("shutdown error: %v", err)
		}

		log.Println("server stopped")
	},
}

func init() {
	serveCmd.Flags().StringVar(&serveHost, "host", "", "Host to bind to")
	serveCmd.Flags().StringVar(&servePort, "port", ":3080", "Port to bind to")
}
