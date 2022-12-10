package command

import (
	"fmt"
	"os"

	"github.com/spf13/cobra"
	"github.com/spf13/viper"
	"github.com/zs5460/art"
)

var cfgFile string
var version = "0.0.0"

var rootCmd = &cobra.Command{
	Use:     "gogon",
	Version: version,
	Short:   "Golang starter project template with Gin and Vite React.",
	Long:    art.String("Gogon v1.0"),
	Run:     func(cmd *cobra.Command, args []string) { cmd.Help() },
}

func Execute() {
	if err := rootCmd.Execute(); err != nil {
		fmt.Fprintf(os.Stderr, "Something wrong: '%s'", err)
		os.Exit(1)
	}
}

func init() {
	cobra.OnInitialize(initConfig)

	// Here you will define your flags and configuration settings.
	// Cobra supports persistent flags, which, if defined here,
	// will be global for your application.
	rootCmd.PersistentFlags().StringVarP(&cfgFile, "config", "c", "", "config file (default is $HOME/.gogon.yaml)")
}

// initConfig reads in config file and ENV variables if set.
func initConfig() {
	if cfgFile != "" {
		// Use config file from the flag.
		viper.SetConfigFile(cfgFile)
	} else {
		viper.SetConfigType("yaml")         // REQUIRED if the config file does not have the extension in the name
		viper.SetConfigName("config")       // Set the config filename
		viper.AddConfigPath("/etc/gogon/")  // path to look for the config file in
		viper.AddConfigPath("$HOME/.gogon") // call multiple times to add many search paths
		viper.AddConfigPath(".")            // optionally look for config in the working directory
	}

	// read in environment variables that match
	viper.AutomaticEnv()

	// If a config file is found, read it in.
	if err := viper.ReadInConfig(); err == nil {
		fmt.Println("Using config file:", viper.ConfigFileUsed())
	}
}
