#!/bin/sh

# Before starting the server though, we need to run any database
# migrations that haven't yet been run, which is why this file
# exists in the first place.

set -ex
/usr/bin/gogon serve --host 0.0.0.0:${PORT}
