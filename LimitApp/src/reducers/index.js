
import { combineReducers } from 'redux';
import nav from './navigation'
import CategoryContainer from './CategoryContainer'
import Login from './Login' //测试文件

import LoginScreen from './LoginScreen'
import InformationModule from './InformationModule'

const rootReducer = combineReducers({
    nav,
    Login,
    LoginScreen,
    InformationModule,
    CategoryContainer
});

export default rootReducer;