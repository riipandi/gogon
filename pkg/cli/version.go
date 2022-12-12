package cli

import (
	"fmt"

	"github.com/riipandi/gogon/pkg/config"
	"github.com/spf13/cobra"
)

var versionCmd = &cobra.Command{
	Use:   "version",
	Short: "Print Gogon version information",
	Run: func(cmd *cobra.Command, _ []string) {
		fshort, _ := cmd.Flags().GetBool("short")
		if fshort {
			fmt.Print(config.Version)
		} else {
			fmt.Printf("Gogon version: %s %s BuildDate: %s\n",
				config.Version,
				config.Platform,
				config.BuildDate,
			)
		}
	},
}

func init() {
	versionCmd.Flags().BoolP("short", "s", false, "Print just the version number")
	rootCmd.AddCommand(versionCmd)
}
