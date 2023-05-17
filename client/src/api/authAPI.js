import axios from 'axios';

export const apiUrl = process.env.REACT_APP_API_URL;

const login = (email, password) => {
	return axios.post(`${apiUrl}/login`, {
		email,
		password,
		headers: {
			'Content-Type': 'application/json',
			withCredentials: true,
		},
	});
};
export const signup = (username, email, password) => {
	return axios.post(`${apiUrl}/api/members`, {
		username,
		email,
		password,
		headers: {
			'Content-Type': 'application/json',
			withCredentials: true,
		},
	});
};

export default login;
