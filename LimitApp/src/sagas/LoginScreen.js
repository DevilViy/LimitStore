
/*
* LoginScreen
* */

import {put, take, call, fork} from 'redux-saga/effects';
import {login} from '../services/api'
import * as LoginScreenActionType from '../actionType/LoginScreen'
import * as LoginScreenAction from '../actions/LoginScreen'



export function* startRefreshLogin(payload) {
    try {
        const {userNameText:username,passWordText:password}=payload
        const result= yield call(login,{username,password})
        yield put(LoginScreenAction.LoginSave(result))
    } catch (error) {
        alert('网络故障'+error);
    }
}

export function* StorageEdit(payload) {
    try {
        yield put(LoginScreenAction.EditStorageSave(payload))
    } catch (error) {
        alert('网络故障'+error);
    }
}


export function* LoginWatchRequest() {
    while (true) {
        const {payload}=yield take(LoginScreenActionType.Login_login);
        yield fork(startRefreshLogin, payload);
    }
}

export function* StorageWatchRequest() {
    while (true) {
        const {payload}=yield take(LoginScreenActionType.edit_storage);
        yield fork(StorageEdit, payload);
    }
}
