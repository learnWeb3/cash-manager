
import { put, call, takeLatest } from "redux-saga/effects";
import {
  	fetchUserList, fetchUserListError, fetchUserListSuccess, TFetchUserListSuccessPayload
} from "../actions/AdminAction";
import Admin from "../../services/api/admin.service";

function* fetchUserListSaga(action: ReturnType<typeof fetchUserList>): Generator {
	try {
		console.log("HAAAAA")
		const response = (yield call(Admin.getUserListService)) as TFetchUserListSuccessPayload;
		yield put(fetchUserListSuccess(response))
	} catch (error) {
		const requestError = error as TypeError;
		yield put(fetchUserListError({message: requestError?.message}));
	}
}

export default function* authSaga() {
  yield takeLatest(fetchUserList, fetchUserListSaga);
}
