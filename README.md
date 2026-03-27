# Gogon

Fullstack Go + React application.

- **Backend** — Go, Chi router, embedded SPA
- **Frontend** — React, TanStack Router, Tailwind CSS
- **Build** — Vite plugin handles Go build pipeline

## Prerequisites
```sh
go install github.com/bufbuild/buf/cmd/buf@latest
go get -tool google.golang.org/protobuf/cmd/protoc-gen-go@latest
go get -tool connectrpc.com/connect/cmd/protoc-gen-connect-go@latest
```

## Project Structure

```
app/                  React frontend
cmd/                  CLI commands (Cobra)
  root.go             Root command
  serve.go            Start the server
  migrate.go          Database migrations
internal/             Server logic
  server.go           Router, middleware, handlers
web/                  Embedded static files
  static_release.go   SPA handler (production)
  static_dev.go       404 handler (development)
  dist/               Vite output (gitignored)
main.go               Main entrypoint
```

## Scripts

| Command      | Description                                     |
|--------------|-------------------------------------------------|
| `pnpm dev`   | Vite dev server (:3000) + Go API server (:3080) |
| `pnpm build` | Build frontend + Go binary (single file)        |
| `pnpm start` | Run the production binary                       |
| `pnpm cmd`   | Run Go server directly (`go run -tags debug .`) |
| `pnpm test`  | Run tests (frontend)                            |

## Development

```bash
pnpm install
pnpm dev
```

Vite serves the frontend on `:3000` and proxies `/api/*` to Go on `:3080`. Go files are watched and auto-rebuilt.

## Test ConnectRPC
```sh
curl -sSL http://localhost:3000/rpc/api.myapp.v1.GreetService/Greet \
  -H "Content-Type: application/json" -d '{"name": "John"}'
```

## Production

```bash
pnpm build
./build/release/myapp serve --port 3080
```

Produces a single binary with the frontend embedded. No web server needed.

## CLI

```bash
myapp                     # Show help
myapp serve               # Start server (:3080)
myapp serve --port 3080   # Custom port
myapp migrate up          # Run migrations
myapp migrate down        # Rollback migrations
```

## Tech Stack

- [Go](https://go.dev/) · [Chi](https://go-chi.io/) · [Cobra](https://github.com/spf13/cobra)
- [React](https://react.dev/) · [TanStack Router](https://tanstack.com/router) · [Tailwind CSS](https://tailwindcss.com/)
- [Vite](https://vite.dev/) · [Vitest](https://vitest.dev/)
