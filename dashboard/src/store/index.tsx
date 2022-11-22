import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { debounce } from 'lodash';

import LocalStorage from '../services/LocalStorage';
import SessionReducer from './reducers/AuthReducer';
import rootSaga from "./sagas";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    devTools: !process.env.NODE_ENV || process.env.NODE_ENV === 'development',
    reducer: {
        session: SessionReducer
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