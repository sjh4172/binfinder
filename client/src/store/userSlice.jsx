/* eslint-disable no-param-reassign */
import { createSlice, configureStore } from '@reduxjs/toolkit';

const initialState = {
	isAuthenticated: false,
	email: '',
	memberId: '',
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		loginSuccess: (state, action) => {
			state.isAuthenticated = true;
			state.email = action.payload.email;
			state.memberId = action.payload.memberId;
		},
		loginFailure: (state) => {
			state.isAuthenticated = false;
			state.email = '';
			state.memberId = '';
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
