import request from './core';

// get요청
const getPostList = (page = '?page=0') => {
	return request({ url: `/boards${page}&count=20` });
};

const getPost = (postId) => {
	return request({ url: `/boards/${postId}` });
};

const Authorization = localStorage.getItem('accessToken');

// post, patch 요청
const postCommunity = (url, data, method = 'post') => {
	request({
		method,
		url,
		data,
		headers: {
			'Content-Type': 'application/json',
			withCredentials: true,
			Authorization,
		},
	});
};

const deleteCommunity = (url) => {
	request({
		method: 'delete',
		url,
		headers: {
			'Content-Type': 'application/json',
			withCredentials: true,
			Authorization,
		},
	});
};

export { getPostList, getPost, postCommunity, deleteCommunity };
