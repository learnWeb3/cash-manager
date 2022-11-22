import { spawn } from 'redux-saga/effects';
import AuthSaga from './AuthSaga';

function* rootSaga() {
    yield spawn(AuthSaga);
}

export default rootSaga;
