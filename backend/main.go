package main

import (
	"github.com/kataras/iris"
	"SimStore/backend/api"
)

/*
@Author: by LH 
@date:  2017/11/24
@function:
*/

func main() {
	app := iris.Default()
	defer api.DB.Close()


	//api_list

	SMSAPI := new(api.SimoeMSM)
	app.Post("/send_sms",SMSAPI.SendSMS)//注册发
	app.Post("/check_code",SMSAPI.CheckSMSCode)//注册检查
	app.Post("/send_sms_back",SMSAPI.SendSMSBack)//找回发
	app.Post("/check_code_back",SMSAPI.CheckSMSCodeBack)//忘记密码检查

	UserAPI := new(api.UserAPI)
	app.Post("/register",UserAPI.Register)
	app.Post("/login",UserAPI.Login)
	app.Post("/modify_password",UserAPI.ModifyPassword)

	//apis := app.Party("/api", api.MyJwtMiddleware.Serve, api.CheckToken)
	app.Run(iris.Addr(":6789"))
}