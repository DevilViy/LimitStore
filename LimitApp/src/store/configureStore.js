
import { createStore, applyMiddleware,compose} from 'redux';
import {AsyncStorage} from 'react-native'

import {persistStore, autoRehydrate} from 'redux-persist';
import createSagaMiddleware, { END } from 'redux-saga';
import {logger} from 'redux-logger'

import reducers from '../reducers';

const middlewares = [];

// configuring saga middleware
const sagaMiddleware = createSagaMiddleware();

middlewares.push(sagaMiddleware);
/* global __DEV__  */
if (__DEV__) {
    //创建中间件logger
    middlewares.push(logger);
}

//applymiddleware配置中间件

const createStoreWithMiddleware = applyMiddleware(...middlewares)//(createStore);

export default function configureStore(initialState) {
    const store = createStore(reducers, undefined, compose(createStoreWithMiddleware,autoRehydrate()))
    persistStore(store, {storage: AsyncStorage, whitelist: ["LoginScreen",'InformationModule']}) //数据持久化

    // install saga run
    store.runSaga = sagaMiddleware.run;
    store.close = () => store.dispatch(END);

    return store;
}