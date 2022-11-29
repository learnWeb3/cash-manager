import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { debounce } from 'lodash';

import LocalStorage from '../services/localStorage.service';
import AuthReducer from './reducers/auth.reducer';
import UserReducer from './reducers/user.reducer';
import AdminReducer from './reducers/admin.reducer';
import rootSaga from "./sagas";

import env from '../services/env.service';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    devTools: !(env.NODE_ENV === 'development'),
    reducer: {
        auth: AuthReducer,
        admin: AdminReducer,
        user: UserReducer
    },
    preloadedState: LocalStorage.load(),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(sagaMiddleware)
});

sagaMiddleware.run(rootSaga)

store.subscribe(
	debounce(() => {
		LocalStorage.save(store.getState());
	}, 800)
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;