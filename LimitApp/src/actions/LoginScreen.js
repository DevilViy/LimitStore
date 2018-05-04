
/*
* LoginScreen
* */

import * as LoginScreenActionType from "../actionType/LoginScreen"
export function Login_login(payload) {
    return {
        type: LoginScreenActionType.Login_login,
        payload:payload
    }
}
export function LoginSave(payload) {
    return {
        type: LoginScreenActionType.Login_Save,
        payload:payload
    }
}

export const EditStorage=(payload)=>{
    return {
        type: LoginScreenActionType.edit_storage,
        payload:payload
    }
}

export const EditStorageSave=(payload)=>{
    return {
        type: LoginScreenActionType.edit_storage_save,
        payload:payload
    }
}
