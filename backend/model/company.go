package model

import "time"

/*
@Author: by LH 
@date:  2017/11/22
@function:
*/
type Company struct {
	ID          uint   `gorm:"primary_key"`
	CompanyCode string `json:"company_code"gorm:"type:varchar(10)"`
	CompanyName string `json:"company_name"gorm:"type:varchar(30)" `
	CreatedAt   time.Time
	UpdatedAt   time.Time
	DeletedAt *time.Time
}

func (c Company)TableName() string {
	return "company"
}