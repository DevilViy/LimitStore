package api

import (
	"SimStore/backend/model"
	"errors"
	"github.com/kataras/iris"
	"time"
	"github.com/dgrijalva/jwt-go"
	"github.com/pborman/uuid"
	"fmt"
)

/*
@Author: by LH 
@date:  2017/11/24
@function:
*/
type UserAPI int

type auth struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

func (u UserAPI) check(a auth) (model.Users, error) { //验证用户名和密码
	var user model.Users
	if db.Model(&user).Where("username=? or phone=?", a.Username, a.Username).First(&user).RecordNotFound() {
		return user, errors.New("不存在该用户")
	}
	if HashedPassword(a.Password, user.Salt) != user.Password {
		return user, errors.New("用户名或密码错误")
	}
	return user, nil
}

func (u UserAPI) Login(ctx iris.Context) {
	var data auth
	ctx.ReadJSON(&data)

	if user, err := u.check(data); err == nil {
		//生成jwt验证码
		token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
			"user_id": user.ID,
			"exp":     time.Now().Add(time.Second * 24 * 3600).Unix(), //24小时失效
		})
		tokenString, _ := token.SignedString([]byte(Config.JWT))
		ctx.JSON(Response{
			Message: "登录成功",
			Status:  1,
			Data: map[string]interface{}{
				"token": tokenString,
				"user":  user,
			},
		})
	}else {
		ctx.JSON(Response{
			Status:0,
			Message: err.Error(),
		})
	}

}

func (u UserAPI) Register(ctx iris.Context) {
	var user model.Users
	ctx.ReadJSON(&user)

	if !db.Table("users").Where("username=?", user.Username).First(&model.Users{}).RecordNotFound() {
		ctx.JSON(Response{
			Status:  0,
			Message: "用户名已存在",
		})
	} else {
		user.Salt = uuid.New()
		user.Password = HashedPassword(user.Password, user.Salt)
		fmt.Println(user)
		db.Save(&user)
		ctx.JSON(Response{
			Status:  1,
			Message: "注册成功",
		})
	}

}

func (u UserAPI) ModifyPassword(ctx iris.Context) {
	var data struct{
		Phone string `json:"phone"`
		Password string `json:"password"`
	}
	var user model.Users
	ctx.ReadJSON(&data)
	if !db.Table("users").Where("phone=?",data.Password).First(&user).RecordNotFound() {
		user.Password = HashedPassword(data.Password,user.Salt)
		db.Save(&user)
	}
	ctx.JSON(Response{
		Status:1,
		Message:"密码修改成功",
	})
}
