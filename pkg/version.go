package pkg

import (
	"fmt"
	"runtime"
)

var (
	Version   = "development"
	BuildDate = "0000-00-00T00:00:00Z"
	Platform  = fmt.Sprintf("%s/%s", runtime.GOOS, runtime.GOARCH)
)
