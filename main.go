package main

import (
	"gotodo/config"
	"gotodo/services"
	"os"

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
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"*"},
		AllowHeaders: []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAccept},
	}))

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
	host := "localhost"
	port := "3200"
	if os.Getenv("PORT") != "" {
		host = "0.0.0.0"
		port = os.Getenv("PORT")
	}
	e.Logger.Fatal(e.Start(host + ":" + port))
}
