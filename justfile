#!/usr/bin/env -S just --justfile
# ^ A shebang isn't required, but allows a justfile to be executed
#   like a script, with `./justfile test`, for example.

[doc('Install dependencies')]
deps:
  @pnpm install

[doc('Update dependencies')]
update-deps:
  @pnpm exec npm-check-updates --configFileName .ncurc.json

[doc('Generate a random secret key')]
generate-key:
  @openssl rand -base64 500 | tr -dc 'a-zA-Z0-9' | fold -w 40 | head -n 1

[doc('Format the code')]
format:
  @pnpm exec biome format . --write

[doc('Check the code')]
check:
  # @pnpm exec biome check . --write
  @gosec -quiet -no-fail ./...

[doc('Lint the code')]
lint:
  @pnpm exec biome lint . --write

[doc('Clean up artifacts')]
[confirm("Are you sure you want to cleanup the artifacts?")]
cleanup:
  @pnpm dlx rimraf build dist tmp vendor
