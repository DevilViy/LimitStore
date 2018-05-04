
/*
* 此界面纯属测试
* */

import * as LoginActionType from "../actionType/Login"
export function Login1(payload) {
    return {
        type: LoginActionType.Login_1,
        payload:payload
    }
}

export function Login2() {
    return {
        type:  LoginActionType.Login_2,
    }
}

export function Login3(payload) {
    console.log('%c Login3','color:green')
    return {
        type:  LoginActionType.Login_3,
        payload
    }
}

export function Login4(payload) {
    console.log('%c 重置数据','color:green')
    return {
        type:  LoginActionType.Login_4,
        payload
    }
}