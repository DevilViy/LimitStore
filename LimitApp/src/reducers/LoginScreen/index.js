
/*
* login 兼备本地缓存作用
* */

import {edit_storage_save,Login_Save} from "../../actionType/LoginScreen"
import  {handleActions}  from 'redux-actions';

const initialState = {
    userNameText: "",//登陆名
    passWordText: "",//登陆密码
    token:"",//token
    status:0,//登陆成功或失败状态
};


const LoginScreen = handleActions({
    [Login_Save](state, action) {
        console.log('%c Login_Save','color:red',action)
        return {...state,...action.payload};
    },
    [edit_storage_save](state,action){
        return {...state,...action.payload}
    }
}, initialState)

export default LoginScreen