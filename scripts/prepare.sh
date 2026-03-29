#!/usr/bin/env sh
set -eu # Exit on error, treat unset variables as an error.

#------------------------------------------------------------------------------
# Application secrets generator script (by Aris Ripandi <aris@duck.com>)
#------------------------------------------------------------------------------
# Description:
#   This script generates cryptographically secure random secrets for the
#   application using OpenSSL. It can either output the secrets to the console
#   or directly update the .env.local file.
#
# Generated Secrets:
#   - APP_SECRET_KEY      : Base64 encoded 48-byte random string (64 chars)
#   - JWT_PRIVATE_KEY     : Ed25519 or RSA private key (Base64 format without PEM headers)
#   - JWT_PUBLIC_KEY      : Ed25519 or RSA public key (Base64 format without PEM headers)
#   - JWT_SECRET_KEY      : Base64 encoded 48-byte random string (64 chars)
#
# Usage:
#   ./scripts/prepare.sh                - Generate Ed25519 keys and display secrets
#   ./scripts/prepare.sh --apply        - Generate Ed25519 keys and apply to .env.local
#   ./scripts/prepare.sh --rsa          - Generate RSA keys and display secrets
#   ./scripts/prepare.sh --rsa --apply  - Generate RSA keys and apply to .env.local
#
# Requirements:
#   - OpenSSL must be installed and available in PATH
#   - .env.local file must exist when using --apply flag
#
#------------------------------------------------------------------------------

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
BLUE='\033[0;34m'
BOLD='\033[1m'
DIM='\033[2m'
NC='\033[0m'

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
ENV_FILE="$ROOT_DIR/.env.local"

#------------------------------------------------------------------------------
# Prerequisites Check
#------------------------------------------------------------------------------

# Verify OpenSSL is installed and available
if ! command -v openssl > /dev/null 2>&1; then
    printf "${RED}Error: OpenSSL is not installed or not available in PATH${NC}\n"
    printf "${YELLOW}Please install OpenSSL to run this script${NC}\n"
    printf "${DIM}  macOS: brew install openssl${NC}\n"
    printf "${DIM}  Ubuntu/Debian: sudo apt-get install openssl${NC}\n"
    printf "${DIM}  Fedora/RHEL: sudo dnf install openssl${NC}\n"
    exit 1
fi

# Quick check if --apply flag is provided for early validation
for arg in "$@"; do
    if [ "$arg" = "--apply" ]; then
        if [ ! -f "$ENV_FILE" ]; then
            printf "\n${RED}ERROR: .env.local file not found, the --apply flag requires .env.local to exist${NC}\n"
            printf "${DIM}Create the file first, or run without --apply to generate secrets only${NC}\n"
            printf "\n"
            exit 0
        fi
        break
    fi
done

#------------------------------------------------------------------------------
# Argument Parsing
#------------------------------------------------------------------------------

# Parse command-line arguments
# --apply: When provided, updates .env.local file instead of just printing
# --rsa: When provided, generates JWT keys using RSA algorithm instead of Ed25519
APPLY_CHANGES=false
USE_RSA=false
for arg in "$@"; do
    case $arg in
        --apply)
            APPLY_CHANGES=true
            shift
            ;;
        --rsa)
            USE_RSA=true
            shift
            ;;
        --help|-h)
            printf "${BOLD}${CYAN}Application Secrets Generator${NC}\n\n"
            printf "Usage:\n"
            printf "  ./scripts/prepare.sh                - Generate keys and display secrets\n"
            printf "  ./scripts/prepare.sh --apply        - Generate keys and apply to .env.local\n"
            printf "  ./scripts/prepare.sh --rsa          - Generate RSA keys and display secrets\n"
            printf "  ./scripts/prepare.sh --rsa --apply  - Generate RSA keys and apply to .env.local\n"
            printf "\nOptions:\n"
            printf "  --apply     Update .env.local file with new secrets\n"
            printf "  --rsa       Generate JWT keys using RSA algorithm (2048-bit)\n"
            printf "  --help, -h  Show this help message\n"
            exit 0
            ;;
        *)
            printf "${YELLOW}Warning: Unknown argument '$arg' ignored${NC}\n"
            ;;
    esac
done

#------------------------------------------------------------------------------
# Secret Generation
#------------------------------------------------------------------------------

# Generate cryptographically secure random secrets using OpenSSL
APP_SECRET_KEY=$(openssl rand -base64 48)   # 48 bytes → 64 chars base64

# Generate JWT key pair (Ed25519 or RSA)
JWT_OUTPUT_DIR="$ROOT_DIR/storage"
JWT_PRIVATE_KEY_FILE="$JWT_OUTPUT_DIR/private_key.pem"
JWT_PUBLIC_KEY_FILE="$JWT_OUTPUT_DIR/public_key.pem"

# Create storage directory if it doesn't exist
mkdir -p "$JWT_OUTPUT_DIR"

if [ "$USE_RSA" = true ]; then
    # Generate RSA key pair (2048-bit)
    openssl genpkey -algorithm RSA -pkeyopt rsa_keygen_bits:2048 -out "$JWT_PRIVATE_KEY_FILE" 2>/dev/null
    JWT_PRIVATE_KEY=$(grep -v "^-----BEGIN PRIVATE KEY-----" "$JWT_PRIVATE_KEY_FILE" | grep -v "^-----END PRIVATE KEY-----" | tr -d '\n')

    # Extract public key from private key
    openssl pkey -in "$JWT_PRIVATE_KEY_FILE" -pubout -out "$JWT_PUBLIC_KEY_FILE" 2>/dev/null
    JWT_PUBLIC_KEY=$(grep -v "^-----BEGIN PUBLIC KEY-----" "$JWT_PUBLIC_KEY_FILE" | grep -v "^-----END PUBLIC KEY-----" | tr -d '\n')
else
    # Generate Ed25519 key pair (default)
    openssl genpkey -algorithm ed25519 -out "$JWT_PRIVATE_KEY_FILE" 2>/dev/null
    JWT_PRIVATE_KEY=$(grep -v "^-----BEGIN PRIVATE KEY-----" "$JWT_PRIVATE_KEY_FILE" | grep -v "^-----END PRIVATE KEY-----" | tr -d '\n')

    # Extract public key from private key
    openssl pkey -in "$JWT_PRIVATE_KEY_FILE" -pubout -out "$JWT_PUBLIC_KEY_FILE" 2>/dev/null
    JWT_PUBLIC_KEY=$(grep -v "^-----BEGIN PUBLIC KEY-----" "$JWT_PUBLIC_KEY_FILE" | grep -v "^-----END PUBLIC KEY-----" | tr -d '\n')
fi

# Generate JWT secret key
JWT_SECRET_KEY=$(openssl rand -base64 48)   # 48 bytes → 64 chars base64

#------------------------------------------------------------------------------
# Helper Functions
#------------------------------------------------------------------------------

# Update a specific key-value pair in .env.local file
# Args:
#   $1 - Environment variable key (e.g., "APP_SECRET_KEY")
#   $2 - New value to set
# Returns:
#   0 on success, non-zero on failure
update_env_file() {
    key="$1"
    value="$2"
    tmp="$(mktemp)"
    # If key exists, replace the whole line; otherwise append at end.
    if grep -qE "^${key}=" "$ENV_FILE"; then
        # Use awk to safely replace without interpreting value
        awk -v k="$key" -v v="$value" '
            BEGIN{FS=OFS="="}
            $1==k{$0=k"="v; seen=1}
            {print}
            END{if(!seen) print k"="v}
        ' "$ENV_FILE" > "$tmp"
    else
        # append
        cp "$ENV_FILE" "$tmp"
        printf "%s=%s\n" "$key" "$value" >> "$tmp"
    fi
    mv "$tmp" "$ENV_FILE"
}

# Apply changes or output environment variables
if [ "$APPLY_CHANGES" = true ]; then
    # File existence already validated in prerequisites check
    printf "${BOLD}${CYAN}Updating .env.local file...${NC}\n"
    update_env_file "APP_SECRET_KEY" "$APP_SECRET_KEY"
    update_env_file "JWT_PRIVATE_KEY" "$JWT_PRIVATE_KEY"
    update_env_file "JWT_PUBLIC_KEY" "$JWT_PUBLIC_KEY"
    update_env_file "JWT_SECRET_KEY" "$JWT_SECRET_KEY"
    printf "\n"
    printf "APP_SECRET_KEY=%s\n" "$APP_SECRET_KEY"
    printf "JWT_PRIVATE_KEY=%s\n" "$JWT_PRIVATE_KEY"
    printf "JWT_PUBLIC_KEY=%s\n" "$JWT_PUBLIC_KEY"
    printf "JWT_SECRET_KEY=%s\n" "$JWT_SECRET_KEY"
    printf "\n${GREEN}Environment secrets updated successfully${NC}\n"
else
    # Output environment variables
    printf "${BOLD}${CYAN}Application Secrets:${NC}\n"
    printf "APP_SECRET_KEY=%s\n" "$APP_SECRET_KEY"
    printf "JWT_PRIVATE_KEY=%s\n" "$JWT_PRIVATE_KEY"
    printf "JWT_PUBLIC_KEY=%s\n" "$JWT_PUBLIC_KEY"
    printf "JWT_SECRET_KEY=%s\n" "$JWT_SECRET_KEY"
fi
