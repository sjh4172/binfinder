import axios from 'axios';
import { apiUrl } from './authAPI';

const Authorization = localStorage.getItem('accessToken');
const headers = {
	'Content-Type': 'application/json',
	withCredentials: true,
	Authorization,
};

const getPostList = (page = '?page=0') => {
	if (Authorization) {
		return axios(`${apiUrl}/boards${page}&count=20`, {
			headers,
		});
	}
	return axios(`${apiUrl}/boards${page}&count=20`);
};

const getPost = (postId) => {
	if (Authorization) {
		return axios(`${apiUrl}/boards/${postId}`, {
			headers,
		});
	}
	return axios(`${apiUrl}/boards/${postId}`);
};

const postCommunity = (url, data, method = 'post') => {
	return axios[method](`${apiUrl}${url}`, data, {
		headers,
	});
};

const deleteCommunity = (url) => {
	return axios.delete(`${apiUrl}${url}`, {
		headers,
	});
};

export { getPostList, getPost, postCommunity, deleteCommunity };
