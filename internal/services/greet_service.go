package services

import (
	"context"
	"fmt"

	v1 "gogon/specs/api/v1"
	"gogon/specs/api/v1/gogonv1connect"
)

type GreetService struct {
	gogonv1connect.UnimplementedGreetServiceHandler
}

func (s *GreetService) Greet(ctx context.Context, req *v1.GreetRequest) (*v1.GreetResponse, error) {
	return &v1.GreetResponse{
		Greeting: fmt.Sprintf("Hello, %s!", req.GetName()),
	}, nil
}
