package config

import (
	"database/sql"
	"fmt"
	_ "github.com/denisenkom/go-mssqldb"
)

//const server = "172.28.128.3"
//const port = 1433
//const user = "sa"
//const password = "Password123"

const server = "basedata1.mssql.somee.com"
const port = 1433
const user = "retrying4_SQLLogin_1"
const password = "qwtsgrqviq"

func GetDb() (db *sql.DB, err error) {
	connString := fmt.Sprintf("server=%s;user id=%s;password=%s;port=%d",
		server, user, password, port)
	db, err = sql.Open("sqlserver", connString)
	if err != nil {
		fmt.Println("Error creating connection pool: " + err.Error())
	}
	//db, err = sql.Open("sqlite3", "./db/gotodo.db")
	//statement, _ := db.Prepare("CREATE TABLE IF NOT EXISTS Todos (Id INTEGER PRIMARY KEY, Detail TEXT, Completed BIT);")
	//statement.Exec()
	return
}

const JwtTokenSecret = "GoToDo22"
