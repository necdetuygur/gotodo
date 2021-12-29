package main

import (
	"gotodo/config"
	"gotodo/services"

	_ "github.com/dgrijalva/jwt-go"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	_ "github.com/mattn/go-sqlite3"
)

func main() {
	// Echo instance
	e := echo.New()
	e.HideBanner = true

	// Middleware
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	// Endpoints
	e.GET("/", services.Hello)
	e.POST("/auth/login", services.Login)

	// Token required group
	r := e.Group("")
	r.Use(middleware.JWT([]byte(config.JwtTokenSecret)))
	r.GET("/auth/hello", services.HelloAuth)

	r.GET("/todos", services.AllTodos)
	r.POST("/todos", services.CreateTodo)

	r.GET("/todos/:id", services.GetTodo)
	r.PUT("/todos/:id/complete", services.UpdeteTodoIsComplete)
	r.PUT("/todos/:id/uncomplete", services.UpdeteTodoIsUncomplete)
	r.DELETE("/todos/:id", services.DeleteTodo)

	// Start server
	e.Logger.Fatal(e.Start(":3200"))
}
