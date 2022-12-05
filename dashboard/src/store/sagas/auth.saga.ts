
import { put, call, takeLatest } from "redux-saga/effects";
import {
  	fetchLogin, fetchLoginError, fetchLoginSuccess, 
	fetchRefreshToken, fetchRefreshTokenSuccess, fetchRefreshTokenError,
	fetchRegister, fetchRegisterError
} from "../actions/AuthAction";
import Auth from "../../services/api/auth.service";
import ISession from "../../types/ISession";
import { ApiError } from "../../services/api/api.service";

function* fetchRegisterSaga(action: ReturnType<typeof fetchRegister>): Generator {
  try {
      	yield call(Auth.userRegisterService, { ...action.payload });
      	action.payload.onSuccess();
    } catch (error) {
		const requestError = error as TypeError;
		yield put(fetchRegisterError({message: requestError?.message}));
  }
}

function* fetchLoginSaga(action: ReturnType<typeof fetchLogin>): Generator {
    try {
        const response: any = (yield call(Auth.userLoginService, { ...action.payload }));
        yield put(fetchLoginSuccess(response["session"] as ISession));
        action.payload.onSuccess();
    } catch (error) {
		yield put(fetchLoginError({message: (error as ApiError).message}));
    }
}

function* fetchRefreshTokenSaga(action: ReturnType<typeof fetchRefreshToken>): Generator {
	try {
		const response: any = (yield call(Auth.userRefreshTokenService, { ...action.payload }));
		yield put(fetchRefreshTokenSuccess(response["session"] as ISession));
		// action.payload.onSuccess();
	} catch (error) {
		yield put(fetchRefreshTokenError({message: (error as ApiError).message}));
	}
}

// function* logout() {

//   try {
//     if (["dev", "staging", "production"].includes(environment.name!)) {
//       //   you can set your redirect here
//     }
//   } catch (error) {
//     yield put(Notify.error(error.message));
//   }
// }

export default function* authSaga() {
  yield takeLatest(fetchLogin, fetchLoginSaga);
  yield takeLatest(fetchRegister, fetchRegisterSaga);
  yield takeLatest(fetchRefreshToken, fetchRefreshTokenSaga);
//   yield takeLatest(logoutAction, logout);
}
