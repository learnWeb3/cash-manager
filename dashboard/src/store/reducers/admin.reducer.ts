import { createReducer } from '@reduxjs/toolkit';
import IUser from '../../types/IUser';
import { fetchUserList, fetchUserListSuccess, fetchUserListError, clearAdminError, fetchOneUser, fetchOneUserSuccess, fetchOneUserError } from '../actions/AdminAction';

interface AdminState {
	users: IUser[] | null,
	user: IUser | null,
	error: boolean,
	message: string
}

const initialState: AdminState = {
	users: null,
	user: null,
	error: false,
	message: ""
};

const AdminReducer = createReducer(initialState, (builder) =>
  	builder
    	.addCase(fetchUserList, (state) => {
			state.error = false;
			state.message = "";
		})
		.addCase(fetchUserListSuccess, (state, action) => {
            state.users = action.payload.users;
		})
		.addCase(fetchUserListError, (state, action) => {
			state.error = true;
			state.message = action.payload.message;
		})
		.addCase(clearAdminError, (state, action) => {
			state.error = false;
			state.message = "";
		})
		.addCase(fetchOneUser, (state) => {
			state.error = false;
			state.message = "";
		})
		.addCase(fetchOneUserSuccess, (state, action) => {
            state.user = action.payload.user;
		})
		.addCase(fetchOneUserError, (state, action) => {
			state.error = true;
			state.message = action.payload.message;
		})
);

export default AdminReducer;