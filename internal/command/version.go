package command

import (
	"fmt"

	"github.com/riipandi/gogon/pkg"
	"github.com/spf13/cobra"
)

var versionCmd = &cobra.Command{
	Use:   "version",
	Short: "Print Gogon version information",
	Run: func(cmd *cobra.Command, _ []string) {
		fshort, _ := cmd.Flags().GetBool("short")
		if fshort {
			fmt.Print(pkg.Version)
		} else {
			fmt.Printf("Gogon version: %s %s BuildDate: %s\n",
				pkg.Version,
				pkg.Platform,
				pkg.BuildDate,
			)
		}
	},
}

func init() {
	versionCmd.Flags().BoolP("short", "s", false, "Print just the version number")
	rootCmd.AddCommand(versionCmd)
}
