package middleware

import (
	"context"
	"crypto/rand"
	"encoding/hex"
	"fmt"
	"net/http"
)

func generateRandomString(length int) string {

	bytes := make([]byte, length)
	_, err := rand.Read(bytes)
	if err != nil {
		return ""
	}
	return hex.EncodeToString(bytes)
}

func CSPMiddleware(next http.Handler) http.Handler {
	CspNonceJs := generateRandomString(16)
	CspNonceCss := generateRandomString(16)

	// set then in context
	ctx := context.WithValue(context.Background(), "CspNonceJs", CspNonceJs)
	ctx = context.WithValue(ctx, "CspNonceCss", CspNonceCss)

	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Hash for the nonce of the CSS and JS files
		htmxCSSHash := "sha256-pgn1TCGZX6O77zDvy0oTODMOxemn0oj0LeCnQTRj7Kg="

		cspHeader := fmt.Sprintf("default-src 'self'; script-src 'nonce-%s'; style-src 'nonce-%s' '%s';", CspNonceJs, CspNonceCss, htmxCSSHash)
		w.Header().Set("Content-Security-Policy", cspHeader)

		next.ServeHTTP(w, r.WithContext(ctx))
	})
}

func TextHTMLMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "text/html charset=utf-8")
		next.ServeHTTP(w, r)
	})
}
