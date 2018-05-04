
import { StackNavigator } from 'react-navigation';
import TabContainer from './TabContainer';

import LoginScreen from '../pages/LoginScreen/index'
import OnlyTest from '../pages/test/OnlyTest'
import AD from '../pages/test/Ad'
import Register from '../pages/Register'
import RegisterTwo from '../pages/Register/Two'
import TwoTest from '../pages/test/twotest'
import Forget from '../pages/Forget'
import ForgetTwo from '../pages/Forget/Two'

import Advertisement from '../pages/Advertisement'

import SearchResult from '../pages/Search/Result'
import Search from '../pages/Search'



const AppNavigator = StackNavigator(
    {
        Login: { screen: LoginScreen },
        HomePage: {
            screen: TabContainer,
            navigationOptions: {
                headerLeft: null,
                //gesturesEnabled: false 手势退出
            }
        },
        Advertisement:{screen:Advertisement},
        OnlyTest: { screen: OnlyTest },
        AD: { screen: AD },
        TwoTest:{screen:TwoTest},
        Register:{
            screen: Register
        },
        RegisterTwo:{
            screen: RegisterTwo
        },
        Forget:{
            screen: Forget
        },
        ForgetTwo:{
            screen: ForgetTwo
        },
        SearchResult:{
            screen: SearchResult
        },
        Search:{
            screen: Search
        },
    },
    {
        headerMode: 'none',
        navigationOptions: {
            gesturesEnabled: true
        }
    }
);

export default AppNavigator;