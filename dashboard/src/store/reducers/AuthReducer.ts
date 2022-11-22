import { createReducer } from '@reduxjs/toolkit';
import Cookies from '../../services/Cookie';
import ISession from '../../types/ISession';
import { fetchLoginDetails, fetchLoginDetailsError, fetchLoginDetailsSuccess } from '../actions/AuthAction';

interface AuthState {
	session: ISession,
	isLogged: boolean,
	error: boolean,
	message?: string
}

const initialState: AuthState = {
	session: Cookies.SESSION() as ISession,
	isLogged: false,
	error: false,
	message: ""
};

const AuthReducer = createReducer(initialState, (builder) =>
  	builder
    	.addCase(fetchLoginDetails, (state) => {
			state.error = false;
			state.message = "";
		})
		.addCase(fetchLoginDetailsSuccess, (state, action) => {
			state.session = action.payload as ISession;
		})
		.addCase(fetchLoginDetailsError, (state, action) => {
			state.error = action.payload.error;
			state.message = action.payload.message;
		})
);

export default AuthReducer;