package model

import "time"

/*
@Author: by LH 
@date:  2017/11/8
@function:
*/
type Users struct {
	ID uint `gorm:"primary_key"`
	//PlatformID string `json:"platform_id"gorm:"type:varchar(12);not null;unique"`
	Username  string `json:"username"gorm:"type:varchar(10);not null"`
	Password  string `json:"password"gorm:"type:varchar(40);not null"`
	CompanyID uint   `json:"company_id"gorm:"not null"`

	RealName  string `json:"real_name"gorm:"type:varchar(10);not null"`
	AvatarURL string `json:"avatar_url"gorm:"type:varchar(50);"`
	Phone     string `json:"phone"gorm:"type:varchar(11);not null"`
	Sex       string `json:"sex"gorm:"type:varchar(2);not null"`
	Salt      string `json:"salt"gorm:"type:varchar(40)"`

	CreatedAt time.Time
	UpdatedAt time.Time
	DeletedAt *time.Time `sql:"index"`
}

func (u Users) TableName() string {
	return "users"
}
