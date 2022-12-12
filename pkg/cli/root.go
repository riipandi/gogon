package cli

import (
	"fmt"
	"os"

	"github.com/spf13/cobra"
	"github.com/spf13/viper"
	"github.com/zs5460/art"
)

var (
	cfgFile string
	rootCmd = &cobra.Command{
		Use:   "gogon",
		Short: "Golang starter project template with Gin, Cobra, and Viper.",
		Long:  art.String("Gogon v1.0"),
		Run:   func(cmd *cobra.Command, _ []string) { cmd.Help() },
	}
)

func Execute() {
	if err := rootCmd.Execute(); err != nil {
		fmt.Fprintf(os.Stderr, "Something wrong: '%s'", err)
		os.Exit(1)
	}
}

func init() {
	cobra.OnInitialize(initConfig)

	// Hide help subcommands
	rootCmd.PersistentFlags().BoolP("help", "h", false, "Print commands usage help")
	rootCmd.SetHelpCommand(&cobra.Command{Hidden: true})
	rootCmd.CompletionOptions.DisableDefaultCmd = true

	// Define flags and configuration settings. Cobra supports persistent
	// flags, if defined here, will be global for your application.
	rootCmd.PersistentFlags().StringVarP(&cfgFile, "config", "c", "", "Config file (default is config.yaml)")
}

// initConfig reads in config file and ENV variables if set.
func initConfig() {
	if cfgFile != "" {
		viper.SetConfigFile(cfgFile) // Use config file from the flag.
	} else {
		viper.SetConfigType("yaml")         // REQUIRED if the config file does not have the extension in the name
		viper.SetConfigName("config")       // Set the config filename
		viper.AddConfigPath("/etc/gogon/")  // path to look for the config file in
		viper.AddConfigPath("$HOME/.gogon") // call multiple times to add many search paths
		viper.AddConfigPath(".")            // optionally look for config in the working directory
	}

	viper.AutomaticEnv() // read in environment variables that match

	// If a config file is found, read it in.
	if err := viper.ReadInConfig(); err == nil {
		fmt.Println("Configuration loaded from:", viper.ConfigFileUsed())
	}
}
