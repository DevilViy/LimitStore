package api

import (
	"fmt"
	"time"
	"math/rand"
	"bytes"

	"github.com/kataras/iris"
	"github.com/KenmyZhang/aliyun-communicate/app"
	"SimStore/backend/model"
)

/*
@Author: by LH 
@date:  2017/11/27
@function:短信验证
*/

type SimoeMSM int

const (
	gatewayUrl      = "http://dysmsapi.aliyuncs.com/"
	accessKeyId     = "j1f07c87k12cigmr2yykwjqk"
	accessKeySecret = "2XtKbSOFyyuE5H96PfLZm6dxY2A="
	signName        = "奇弦智能"
	templateCode    = "SMS_113460812"
)

//注册发
func (s SimoeMSM) SendSMS(ctx iris.Context) {
	var data struct {
		PhoneNumbers string `json:"phone"`
	}
	ctx.ReadJSON(&data)

	if !db.Table("users").Where("phone=?", data.PhoneNumbers).First(&model.Users{}).RecordNotFound() {
		ctx.JSON(Response{
			Status:  0,
			Message: "该手机号已被注册，请选择登录或输入其他手机号",
		})
		return
	}

	status,message := s.sendSMS(data.PhoneNumbers,ctx)
	ctx.JSON(Response{
		Status:status,
		Message:message,
	})

}

//注册检查
func (s SimoeMSM) CheckSMSCode(ctx iris.Context) {
	var data struct {
		Phone string `json:"phone"`
		Code  string `json:"code"`
	}
	ctx.ReadJSON(&data)
	status, message := s.checkCode(data.Phone, data.Code, ctx)
	ctx.JSON(Response{
		Status:  status,
		Message: message,
	})
}

//找回发

func (s SimoeMSM) SendSMSBack(ctx iris.Context) {
	var data struct {
		PhoneNumbers string `json:"phone"`
	}
	ctx.ReadJSON(&data)

	if db.Table("users").Where("phone=?", data.PhoneNumbers).First(&model.Users{}).RecordNotFound() {
		ctx.JSON(Response{
			Status:  0,
			Message: "该手机号未被注册，请检查",
		})
		return
	}

	status,message := s.sendSMS(data.PhoneNumbers,ctx)
	ctx.JSON(Response{
		Status:status,
		Message:message,
	})
}

//找回检查
func (s SimoeMSM) CheckSMSCodeBack(ctx iris.Context) {
	var data struct {
		Phone string `json:"phone"`
		Code  string `json:"code"`
		Name  string `json:"name"`
	}
	ctx.ReadJSON(&data)

	if db.Table("users").Where("phone=? and real_name=?", data.Phone, data.Name).First(model.Users{}).RecordNotFound() {
		ctx.JSON(Response{
			Status:  0,
			Message: "用户信息匹配不正确",
		})
		return
	}

	status, message := s.checkCode(data.Phone, data.Code, ctx)
	ctx.JSON(Response{
		Status:  status,
		Message: message,
	})
}

func (s SimoeMSM) checkCode(phone, vcode string, ctx iris.Context) (int, string) {
	sess := Session.Start(ctx)
	code := sess.GetString(phone)
	if code == "" {
		return 0, "验证码失效或不存在"

	} else if code != vcode {
		return 2, "验证码输入错误，请重新输入"
	} else {
		return 1, "验证成功"
		sess.Delete(phone)
	}
	return 0, "验证出错"
}

func (s SimoeMSM) sendSMS(phone string, ctx iris.Context) (int, string) {
	rnd := rand.New(rand.NewSource(time.Now().UnixNano()))
	vcode := fmt.Sprintf("%06v", rnd.Int31n(1000000))
	buf := bytes.Buffer{}
	buf.WriteString(`{"code":"`)
	buf.WriteString(vcode)
	buf.WriteString(`"}`)
	templateParam := buf.String()
	smsClient := app.NewSmsClient(gatewayUrl)
	if result, err := smsClient.Execute(accessKeyId, accessKeySecret, phone, signName, templateCode, templateParam); err != nil {
		fmt.Println("error:", err.Error())
		return 2, "短信发送失败，请重新发送"
	} else {
		for key, value := range result {
			fmt.Println("key:", key, " value:", value)
		}
		if result["Code"].(string) == "OK" {
			sess := Session.Start(ctx)
			sess.Set(phone, vcode)
			return 1, "短信发送成功，请注意查收"
		}
	}

	return 2, "短信发送失败，请重新发送"
}
