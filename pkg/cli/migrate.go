package cli

import (
	"fmt"

	"github.com/spf13/cobra"
)

var migrateCmd = &cobra.Command{
	Use:     "migrate",
	Short:   "Run the database migratons",
	Aliases: []string{"mig"},
	Run: func(cmd *cobra.Command, args []string) {
		fmt.Println("Not yet implemented!")
	},
}

func init() {
	rootCmd.AddCommand(migrateCmd)
}
