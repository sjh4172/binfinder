import axios from 'axios';
import { apiUrl } from './AuthAPI';

const Authorization = localStorage.getItem('accessToken');
const headers = {
	'Content-Type': 'application/json',
	withCredentials: true,
	Authorization,
};

const getPostList = (page = '?page=0') => {
	if (Authorization) {
		return axios(`${apiUrl}/api/boards${page}&count=20`, {
			headers,
		});
	}
	return axios(`${apiUrl}/api/boards${page}&count=20`);
};

const getPost = (postId) => {
	if (Authorization) {
		return axios(`${apiUrl}/api/boards/${postId}`, {
			headers,
		});
	}
	return axios(`${apiUrl}/api/boards/${postId}`);
};

const postCommunity = (url, data, method = 'post') => {
	return axios[method](`${apiUrl}/api${url}`, data, {
		headers,
	});
};

const deleteCommunity = (url) => {
	return axios.delete(`${apiUrl}/api${url}`, {
		headers,
	});
};

export { getPostList, getPost, postCommunity, deleteCommunity };
