
import { put, call, takeLatest } from "redux-saga/effects";
import { AxiosResponse } from "axios";
import {
  fetchLoginDetails,
  fetchLoginDetailsError,
  fetchLoginDetailsSuccess,
//   logoutAction
} from "../actions/AuthAction";
import Auth from "../../services/api/AuthService";


function* fetchLoginDetailsSaga(action: ReturnType<typeof fetchLoginDetails>): Generator {
    try {
        const response = (yield call(Auth.userLoginService, { ...action.payload })) as AxiosResponse;
        console.log("AxiosResponse", response);

        yield put(fetchLoginDetailsSuccess({
            sessionId: response.data.sessionId,
            accessToken: response.data.accessToken,
            refreshToken: response.data.refreshToken
        }));
    
        // if (response.api_token) {
            // cookieService.set(
            //     cookieService.TOKEN(),
            //     response.api_token,
            //     cookieService.DEFAULT_CUSTOM_OPTIONS
            // );
    
            // yield put(fetchUserDetails());
        // }
    
        // action.payload.onSuccess?.();
      } catch (error) {
        if (error instanceof TypeError)
            yield put(fetchLoginDetailsError({error: true, message: error?.message}));
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
  yield takeLatest(fetchLoginDetails, fetchLoginDetailsSaga);
//   yield takeLatest(fetchUserDetails, fetchUserDetailsSaga);
//   yield takeLatest(logoutAction, logout);
}
