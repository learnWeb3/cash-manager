import { createReducer } from '@reduxjs/toolkit';
import IUser from '../../types/IUser';
import { fetchSelfData, fetchSelfDataError, fetchSelfDataSuccess, clearUserError} from '../actions/UserAction';

interface UserState {
	data: IUser | null,
	error: boolean,
	message: string
}

const initialState: UserState = {
	data: null,
	error: false,
	message: ""
};

const UserReducer = createReducer(initialState, (builder) =>
  	builder
    	.addCase(fetchSelfData, (state) => {
			state.error = false;
			state.message = "";
		})
		.addCase(fetchSelfDataSuccess, (state, action) => {
			state.data = action.payload.user;
		})
		.addCase(fetchSelfDataError, (state, action) => {
			state.error = true;
			state.message = action.payload.message;
		})
		.addCase(clearUserError, (state, action) => {
			state.error = false;
			state.message = "";
		})
);

export default UserReducer;