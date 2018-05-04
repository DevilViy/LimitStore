package api

import (
	"io/ioutil"
	"encoding/json"
	"crypto/sha1"
	"io"
	"fmt"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/jinzhu/gorm"
	"github.com/kataras/iris"
	jwtmiddleware "github.com/iris-contrib/middleware/jwt"
	_ "github.com/jinzhu/gorm/dialects/postgres"
	"github.com/kataras/iris/sessions"

	"SimStore/backend/model"
)

/*
@Author: by LH 
@date:  2017/11/24
@function:数据库等配置
*/

var (
	MyJwtMiddleware *jwtmiddleware.Middleware
	db              *gorm.DB
	DB              *gorm.DB
	Config          struct {
						JWT      string `json:"jwt"`
						Postgres string `json:"postgres"`
						Public   string `json:"public"`
					}

	Session = sessions.New(sessions.Config{Cookie: "smssession", Expires: 5 * time.Minute})
)

type Response struct {
	Data    interface{} `json:"data"`
	Status  int         `json:"status"`
	Message string      `json:"message"`
}

func init() {
	var err error

	f, _ := ioutil.ReadFile("./config.json")
	json.Unmarshal(f, &Config)

	MyJwtMiddleware = jwtmiddleware.New(jwtmiddleware.Config{
		ValidationKeyGetter: func(token *jwt.Token) (interface{}, error) {
			return []byte(Config.JWT), nil
		},
		SigningMethod: jwt.SigningMethodHS256,
	})

	db, err = gorm.Open("postgres", Config.Postgres)
	if err != nil {
		panic(err)
	}

	db.AutoMigrate(
		&model.Users{},
	)


	DB = db
	//Session.UseDatabase()
}

func HashedPassword(password, privateSalt string) string {
	globalSalt := Config.Public
	h := sha1.New()
	io.WriteString(h, password+globalSalt)
	h1 := sha1.New()
	io.WriteString(h1, fmt.Sprintf("%x", h.Sum(nil))+privateSalt)
	return fmt.Sprintf("%x", h1.Sum(nil))
}

func CheckToken(ctx iris.Context) {
	token := MyJwtMiddleware.Get(ctx)
	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		userID := claims["user_id"]
		var user model.Users
		db.Model(&user).Where("id=?", int(userID.(float64))).First(&user)
		ctx.Values().Set("user", user)
		ctx.Next()
	} else {
		ctx.JSON(Response{
			Message: "token 失效",
			Status:  0,
		})
	}
}
