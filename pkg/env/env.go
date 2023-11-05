package env

import (
	"fmt"
	"log"
	"os"
	"path/filepath"

	dotenv "github.com/dotenv-org/godotenvvault"
	"github.com/joeshaw/envdecode"
)

type config struct {
	JWTSecret   string `env:"JWT_SECRET,required"`
	DatabaseUrl string `env:"DATABASE_URL,required"`
	Email       struct {
		Provider     string `env:"EMAIL_PROVIDER"` // possible values: smtp, postmark, awsses
		MailFromName string `env:"EMAIL_FROM_NAME,default=Administrator,strict"`
		MailFromAddr string `env:"EMAIL_FROM_ADDRESS,default=admin@example.com,strict"`
		SMTP         struct {
			Host           string `env:"EMAIL_SMTP_HOST"`
			Port           string `env:"EMAIL_SMTP_PORT"`
			Username       string `env:"EMAIL_SMTP_USERNAME"`
			Password       string `env:"EMAIL_SMTP_PASSWORD"`
			EnableStartTLS bool   `env:"EMAIL_SMTP_ENABLE_TLS,default=true"`
		}
		Postmark struct {
			APIKey string `env:"EMAIL_POSTMARK_API_KEY"`
		}
		AWSSES struct {
			Region          string `env:"EMAIL_AWSSES_REGION"`
			AccessKeyID     string `env:"EMAIL_AWSSES_ACCESS_KEY_ID"`
			SecretAccessKey string `env:"EMAIL_AWSSES_SECRET_ACCESS_KEY"`
		}
	}
	Maintenance struct {
		Enabled bool   `env:"MAINTENANCE,default=false,strict"`
		Message string `env:"MAINTENANCE_MESSAGE"`
		Until   string `env:"MAINTENANCE_UNTIL"`
	}
}

// Config is a strongly typed reference to all configuration parsed from Environment Variables
var Config config

func init() {
	loadEnvVariables()
	Reload()
}

// Reload configuration from current Enviornment Variables
func Reload() {
	Config = config{}
	err := envdecode.Decode(&Config)
	if err != nil {
		log.Fatalf("failed to parse envars: %s", err)
		panic(err)
	}

	// Email Provider can be inferred if absense
	if Config.Email.Provider == "" {
		if Config.Email.Postmark.APIKey != "" {
			Config.Email.Provider = "postmark"
		} else if Config.Email.AWSSES.AccessKeyID != "" {
			Config.Email.Provider = "awsses"
		} else {
			Config.Email.Provider = "smtp"
		}
	}

	emailType := Config.Email.Provider
	if emailType == "postmark" {
		mustBeSet("EMAIL_POSTMARK_API_KEY")
	} else if emailType == "awsses" {
		mustBeSet("EMAIL_AWSSES_REGION")
		mustBeSet("EMAIL_AWSSES_ACCESS_KEY_ID")
		mustBeSet("EMAIL_AWSSES_SECRET_ACCESS_KEY")
	} else if emailType == "smtp" {
		mustBeSet("EMAIL_SMTP_HOST")
		mustBeSet("EMAIL_SMTP_PORT")
	}
}

func mustBeSet(key string) {
	_, ok := os.LookupEnv(key)
	if !ok {
		panic(fmt.Errorf("could not find environment variable named '%s'", key))
	}
}

func loadEnvVariables() {
	// Get the current working directory
	wd, err := os.Getwd()
	if err != nil {
		log.Println("error getting current working directory:", err)
		return
	}

	// Determine the paths to .env files in current and parent directories
	envFiles := []string{".env", filepath.Join("..", ".env")}

	// Attempt to load environment variables from .env files
	for _, envFile := range envFiles {
		err := dotenv.Load(filepath.Join(wd, envFile))
		if err == nil {
			// If successfully loaded, break the loop
			break
		}
	}

	if err != nil {
		log.Fatalf("error loading .env file %s", err.Error())
	}
}
