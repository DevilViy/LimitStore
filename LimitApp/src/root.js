import React, {Component} from 'react';
import {BackHandler, StatusBar, View} from 'react-native'
import {addNavigationHelpers, NavigationActions} from 'react-navigation';
import {Provider, connect} from 'react-redux';
import codePush from 'react-native-code-push'
import AppNavigator from './containers/AppNavigator'
import configureStore from './store/configureStore'
import rootSaga from "./sagas/index";
import 'moment/locale/zh-cn';


const store = configureStore();

// run root saga
store.runSaga(rootSaga);

global.dispatch = store.dispatch


class App extends Component {
    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
        codePush.notifyAppReady()
    }

    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
    }

    onBackPress = () => {
        const {dispatch, nav} = this.props;
        if (nav.index === 0) {
            return false;
        }
        dispatch(NavigationActions.back());
        return true;
    };

    render() {
        const {dispatch, nav: state} = this.props
        const {routes} = state
        const color = routes ? routes[routes.length - 1].routeName === "Login" ? "light-content" : "dark-content" : 'dark-content'
        return (
            <View style={{flex: 1}}>
                <StatusBar barStyle={color}/>
                <AppNavigator navigation={addNavigationHelpers({dispatch, state})}
                />
            </View>
        );
    }
}

const select = ({nav}) => ({nav});

const AppWithNavigationState = connect(select)(App);

class Root extends Component {
    render() {
        return (

            <Provider store={store}>
                <AppWithNavigationState/>
            </Provider>

        );
    }
}

export default Root

