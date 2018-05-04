//导航

import {NavigationActions} from 'react-navigation';

import AppNavigator from '../containers/AppNavigator';


const tempNavState = AppNavigator.router.getActionForPathAndParams('Advertisement');
const initialNavState = AppNavigator.router.getStateForAction(
    tempNavState
);


const nav = (state = initialNavState, action) => {//初始化登录页面
    switch (action.type) {
        case 'navigate':
            const {payload: {page, data}, type} = action
            return AppNavigator.router.getStateForAction(
                NavigationActions.navigate({routeName: page, params: data}),
                state
            );
            break;
        case 'goBack':
            return AppNavigator.router.getStateForAction(
                NavigationActions.back(),
                state
            );
            break;
        case "reset": //登陆或广告结束后重置导航
            const resetAction=NavigationActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({ routeName: action.payload.page})
                ]
            })
            return AppNavigator.router.getStateForAction(resetAction,state)
        break;
        default:
            return AppNavigator.router.getStateForAction(action, state);
            break;

    }
}


export default nav;