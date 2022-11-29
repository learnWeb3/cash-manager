import { createReducer } from '@reduxjs/toolkit';
import Cookies from '../../services/cookie.service';
import ISession from '../../types/ISession';
import { 
	clearAuthError,
	fetchLogin, fetchLoginError, fetchLoginSuccess,
	fetchRegister, fetchRegisterError,
	fetchRefreshToken, fetchRefreshTokenError, fetchRefreshTokenSuccess
} from '../actions/AuthAction';

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
    	.addCase(fetchLogin, (state) => {
			state.error = false;
			state.message = "";
		})
		.addCase(fetchLoginSuccess, (state, action) => {
			state.session = action.payload;
			state.isLogged = true;
		})
		.addCase(fetchLoginError, (state, action) => {
			state.error = true;
			state.message = action.payload.message;
		})

		.addCase(fetchRegister, (state) => {
			state.error = false;
			state.message = "";
		})
		.addCase(fetchRegisterError, (state, action) => {
			state.error = true;
			state.message = action.payload.message;
		})

		.addCase(fetchRefreshToken, (state) => {
			state.error = false;
			state.message = "";
		})
		.addCase(fetchRefreshTokenSuccess, (state, action) => {
			console.log(action.payload)
			state.session = action.payload;
			state.isLogged = true;
		})
		.addCase(fetchRefreshTokenError, (state, action) => {
			state.error = true;
			state.message = action.payload.message;
		})


		.addCase(clearAuthError, (state, action) => {
			state.error = false;
			state.message = "";
		})
);

export default AuthReducer;