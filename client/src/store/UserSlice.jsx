/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-param-reassign */
import { createSlice, configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const initialState = {
	isAuthenticated: false,
	email: '',
	memberId: '',
	username: '',
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		loginSuccess: (state, action) => {
			state.isAuthenticated = true;
			state.email = action.payload.email;
			state.memberId = action.payload.memberId;
			state.username = action.payload.username;
		},
		loginFailure: (state) => {
			state.isAuthenticated = false;
			state.email = null;
			state.memberId = null;
		},
	},
});

const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['isAuthenticated', 'email', 'memberId', 'username'],
};

const rootReducer = combineReducers({
	auth: persistReducer(persistConfig, userSlice.reducer),
});

const store = configureStore({
	reducer: rootReducer,
});

const persistor = persistStore(store);

export { store, persistor };
export const { loginSuccess, loginFailure } = userSlice.actions;
