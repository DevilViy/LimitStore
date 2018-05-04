import {put, take, call, fork, select} from 'redux-saga/effects';
// 后端
// import {} from '../services/api'
import * as InformationActionType from '../actionType/InformationModule'
import * as InformationAction from '../actions/InformationModule'
import { UpdateInformationById } from '../actions/InformationModule';

const mySort=(a,b)=>{
    // if(a.priority===b.priority){
    //     if(a.time===b.time){
    //         if(a.dot===b.dot){
    //             return 0
    //         }
    //         else if(a.dot>b.dot){
    //             return -1
    //         }
    //         else{
    //             return 1
    //         }
    //     }else{
    //         if(a.time>b.time){
    //             return -1
    //         }
    //         else{
    //             return 1
    //         }
    //     }
    // }else{
    //    if(a.priority>b.priority){
    //        return -1;
    //    }else{
    //        return 1;
    //    }
    // }
    if(a.priority===b.priority){
        if(a.time===b.time){
            return b.dot-a.dot
        }else{
            return b.time.localeCompare(a.time)
        }
    }else{
       return b.priority-a.priority
    }
}

export function* startRefreshLogin(payload) {
    try {
        // 后端
        // const result= yield call()
        let {InformationModule:{showData}} = yield select()
        const result = [
            {title:'小程序通知',container:'通知内容',time:'2017-11-20 13:00:00',dot:0,priority:1},
            {title:'姓名C',container:'某个人说的话',time:'2017-11-29 13:01:00',dot:0,priority:0},
            {title:'姓名C',container:'删除用',time:'2017-11-29 13:01:00',dot:0,priority:0},
            {title:'姓名A',container:'某个人说的话',time:'2017-11-29 13:01:00',dot:1,priority:0},
            {title:'姓名B',container:'某个人说的话超出范围，哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈',time:'2017-11-29 13:00:00',dot:1,priority:0},
            {title:'系统通知',container:'通知内容',time:'2017-11-28 13:00:00',dot:1,priority:0},
        ]
        result.sort((a,b)=>mySort(a,b));
        if(showData.length === 0){
            yield put(InformationAction.SaveInformation(result))
        }
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


export function* GetInformationWatchRequest() {
    while (true) {
        const {payload}=yield take(InformationActionType.get_information);
        yield fork(startRefreshLogin, payload);
    }
}

export function* UpdateInformationWatchRequest(){
    while(true){
        const {payload} = yield take(InformationActionType.update_information)
        let {InformationModule:{showData}} = yield select()
        console.log('payload',payload,showData)
        // showData.splice(0,0,showData[payload])
        // showData.splice(payload+1,1)
        if(payload.type==='priority'){
            showData[payload.id].priority?showData[payload.id].priority=0:showData[payload.id].priority=1
        }
        else if(payload.type==='dot'){
            showData[payload.id].dot===1?showData[payload.id].dot=0:null
        }
        showData.sort((a,b)=>mySort(a,b))
        yield put(InformationAction.SaveInformation(showData))
    }
}

export function* DeleteInformationWatchRequest(){
    while(true){
        const {payload} = yield take(InformationActionType.delete_information)
        let {InformationModule:{showData}} = yield select()
        console.log('payload',payload,showData)
        // showData.splice(0,0,showData[payload])
        // showData.splice(payload+1,1)
        showData.splice(payload,1)
        showData.sort((a,b)=>mySort(a,b))
        yield put(InformationAction.SaveInformation(showData))
    }
}

export function* StorageWatchRequest() {
    while (true) {
        const {payload}=yield take(LoginScreenActionType.edit_storage);
        yield fork(StorageEdit, payload);
    }
}