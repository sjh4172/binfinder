import axios from 'axios';
import { apiUrl } from './AuthAPI';

const getHeaders = () => {
	const Authorization = localStorage.getItem('accessToken');
	const headers = {
		'Content-Type': 'application/json',
		Authorization,
	};
	return headers;
};

const getPostList = (page = '?page=0', api = 'boards') => {
	const headers = getHeaders();
	if (headers.Authorization) {
		return axios(`${apiUrl}/api/${api}${page}&count=20`, {
			headers,
		});
	}
	return axios(`${apiUrl}/api/${api}${page}&count=20`);
};

const getPost = (postId, api = 'boards') => {
	const headers = getHeaders();
	return axios(`${apiUrl}/api/${api}/${postId}`, {
		headers,
	});
};

const postCommunity = (url, data, method = 'post') => {
	const headers = getHeaders();
	return axios[method](`${apiUrl}/api${url}`, data, {
		headers,
	});
};

const deleteCommunity = (url) => {
	const headers = getHeaders();
	return axios.delete(`${apiUrl}/api${url}`, {
		headers,
	});
};

export { getPostList, getPost, postCommunity, deleteCommunity };
