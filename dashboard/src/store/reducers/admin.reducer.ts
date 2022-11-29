import { createReducer } from '@reduxjs/toolkit';
import IUser from '../../types/IUser';
import { fetchUserList, fetchUserListSuccess, fetchUserListError, clearAdminError } from '../actions/AdminAction';

interface AdminState {
	users: IUser[] | null,
	error: boolean,
	message: string
}

const initialState: AdminState = {
	users: null,
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
);

export default AdminReducer;