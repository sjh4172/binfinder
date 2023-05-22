/* eslint-disable no-param-reassign */
import { createSlice, configureStore } from '@reduxjs/toolkit';

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
			state.username = null;
		},
	},
});
const store = configureStore({
	reducer: {
		auth: userSlice.reducer,
	},
});

export const { loginSuccess, loginFailure } = userSlice.actions;

export default store;
