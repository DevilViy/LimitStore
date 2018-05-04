import { all, fork } from 'redux-saga/effects';

import { watchRequestTypeList,watchRequestTypeList2,watchRequestTypeList3} from './Login';
import {LoginWatchRequest,StorageWatchRequest} from './LoginScreen'
import {GetInformationWatchRequest,UpdateInformationWatchRequest,DeleteInformationWatchRequest} from './InformationModule'

export default function* rootSaga() {
    yield all([
        fork(watchRequestTypeList),
        fork(watchRequestTypeList2),
        fork(watchRequestTypeList3), //以上测试

        fork(LoginWatchRequest),
        fork(StorageWatchRequest),

        fork(GetInformationWatchRequest),
        fork(UpdateInformationWatchRequest),
        fork(DeleteInformationWatchRequest),
    ]);
}