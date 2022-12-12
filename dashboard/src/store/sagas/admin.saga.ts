
import { put, call, takeLatest } from "redux-saga/effects";
import {
	fetchOneUser,
  	fetchOneUserError,
  	fetchOneUserSuccess,
  	fetchUserList, fetchUserListError, fetchUserListSuccess, TFetchOneUserSuccessPayload, TFetchUserListSuccessPayload
} from "../actions/AdminAction";
import Admin from "../../services/api/admin.service";

function* fetchUserListSaga(action: ReturnType<typeof fetchUserList>): Generator {
	try {
		const response = (yield call(Admin.getUserListService)) as TFetchUserListSuccessPayload;
		yield put(fetchUserListSuccess(response));
	} catch (error) {
		const requestError = error as TypeError;
		yield put(fetchUserListError({message: requestError?.message}));
	}
}

function* fetchOneUserSaga(action: ReturnType<typeof fetchOneUser>): Generator {
	try {
		const response = (yield call(Admin.getUserByIdService, action.payload)) as TFetchOneUserSuccessPayload;
		console.log("RES", response)
		yield put(fetchOneUserSuccess(response));
	} catch (error) {
		const requestError = error as TypeError;
		yield put(fetchOneUserError({message: requestError?.message}));
	}
}

export default function* authSaga() {
  yield takeLatest(fetchUserList, fetchUserListSaga)
  yield takeLatest(fetchOneUser, fetchOneUserSaga);
}
