import { spawn } from 'redux-saga/effects';
import AuthSaga from './auth.saga';
// import UserSaga from './user.saga';
import AdminSaga from './admin.saga';

function* rootSaga() {
    yield spawn(AuthSaga);
    // yield spawn(UserSaga);
    yield spawn(AdminSaga);
}

export default rootSaga;
