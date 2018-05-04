package api

import (
	"github.com/boombuler/barcode"
	"github.com/boombuler/barcode/qr"
	"github.com/pborman/uuid"

	"bytes"
	"encoding/base64"
	"image/png"
)

/*
@Author: by LH 
@date:  2017/11/27
@function:
*/

type QRCodeAPI int

func (q QRCodeAPI) New() (string, string) { //uuid,base64
	salt := uuid.New()
	// salt = "test"
	qrCode, _ := qr.Encode(salt, qr.M, qr.Auto)
	// Scale the barcode to 200x200 pixels
	qrCode, _ = barcode.Scale(qrCode, 400, 400)
	pngBuffer := bytes.NewBuffer(nil)
	png.Encode(pngBuffer, qrCode)
	dist := make([]byte, 50000)
	base64.StdEncoding.Encode(dist, pngBuffer.Bytes())
	for i := 0; i < 50000; i++ {
		if dist[i] == 0 {
			return salt, string(dist[:i])
		}
	}
	return "", ""
}