package services

import (
	"context"
	"fmt"

	v1 "myapp/specs/api/myapp/v1"
	myappv1connect "myapp/specs/api/myapp/v1/myappv1connect"
)

type GreetService struct {
	myappv1connect.UnimplementedGreetServiceHandler
}

func (s *GreetService) Greet(ctx context.Context, req *v1.GreetRequest) (*v1.GreetResponse, error) {
	return &v1.GreetResponse{
		Greeting: fmt.Sprintf("Hello, %s!", req.GetName()),
	}, nil
}
