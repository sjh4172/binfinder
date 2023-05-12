import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

const login = (email, password) => {
	return axios.post(`${apiUrl}/login`, {
		email,
		password,
	});
};

export default login;
