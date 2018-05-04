
/*
* 此界面纯属测试
* */

import * as LoginActionType from "../../actionType/Login"
import  {handleActions}  from 'redux-actions';

const initialState = {
    name: "test",
    password: 11111,
   
};


const Login = handleActions({
    [LoginActionType.Login_1](state, action) {
        console.log('%c 监听Login1','color:red')
        return {...state,login1:'1111',login2:''};
    },
    [LoginActionType.Login_2](state, action) {
        console.log('%c 监听Login2','color:red')
        return {...state,login2:'22222'};
    },
    [LoginActionType.Login_3](state, action) {
        console.log('%c 监听Login3','color:red')
        const {payload}=action
        return {...state,login3:'33333',payload};
    },
    [LoginActionType.Login_4](state, action) {
        console.log('%c 监听Login4','color:red')
        return {...state,login4:'11111114444',payload222:action.payload};
    },

}, initialState)
// const Login=(state = initialState, action)=>{
//     switch (action.type) {
//         case LoginActionType.Login_1:
//             return {...state,login1:'1111',login2:''};
//             break;
//         case LoginActionType.Login_2:
//             return {...state,login2:'22222'};
//             break;
//         case LoginActionType.Login_3:
//             const {payload}=action
//             return {...state,login3:'33333',payload};
//             break;
//         case LoginActionType.Login_4:
//             return {...state,login4:'11111114444',payload222:action.payload};
//             break;
//         default:
//             return state;
//             break;
//     }
// }

export default Login