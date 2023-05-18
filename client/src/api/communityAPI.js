import axios from 'axios';
import { apiUrl } from './authAPI';

const getPostList = (page = '?page=0') => {
	return axios(`${apiUrl}/boards${page}&count=20`);
};

const getPost = (postId) => {
	return axios(`${apiUrl}/boards/${postId}`);
};

const Authorization = localStorage.getItem('accessToken');

const postCommunity = (url, data, method = 'post') => {
	axios[method](`${apiUrl}${url}`, data, {
		headers: {
			'Content-Type': 'application/json',
			withCredentials: true,
			Authorization,
		},
	});
};

const deleteCommunity = (url) => {
	axios({
		method: 'delete',
		url: `${apiUrl}${url}`,
		headers: {
			'Content-Type': 'application/json',
			withCredentials: true,
			Authorization,
		},
	});
};

export { getPostList, getPost, postCommunity, deleteCommunity };
