package services

import (
	"context"
	"fmt"

	v1 "tango/specs/api/v1"
	"tango/specs/api/v1/tangov1connect"
)

type GreetService struct {
	tangov1connect.UnimplementedGreetServiceHandler
}

func (s *GreetService) Greet(ctx context.Context, req *v1.GreetRequest) (*v1.GreetResponse, error) {
	return &v1.GreetResponse{
		Greeting: fmt.Sprintf("Hello, %s!", req.GetName()),
	}, nil
}
