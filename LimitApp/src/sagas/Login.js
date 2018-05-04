
/*
* 此界面纯属测试
* */

import {put, take, call, fork} from 'redux-saga/effects';
import * as LoginActionType from '../actionType/Login'
import * as LoginAction from '../actions/Login'

import moment from 'moment'

export function* startRefreshLogin1() {
    try {
        console.log('开始测试')
    } catch (error) {
        console.log('%c login1','color:red')
        alert('网络故障'+error);
    }
}

export function* startRefreshLogin2(page) {
    try {
        console.log('开始测试2222',page)

    } catch (error) {
        console.log('%c login2','color:red')

        alert('网络故障'+error);
    }
}

export function* startRefreshLogin3(payload) {
    try {
        console.log('开始测试333',)
        yield put(LoginAction.Login4(payload))
    } catch (error) {
        console.log('%c login2','color:red')

        alert('网络故障'+error);
    }
}

export function* watchRequestTypeList() {
    while (true) {
        yield take(LoginActionType.Login_1);
        yield fork(startRefreshLogin1);
    }
}

export function* watchRequestTypeList2() {
    while (true) {
        yield take(LoginActionType.Login_2);
        yield fork(startRefreshLogin2);
    }
}

export function* watchRequestTypeList3() {
    while (true) {
        const {payload}=yield take(LoginActionType.Login_3);
        yield fork(startRefreshLogin3, payload);
    }
}