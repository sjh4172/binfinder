import request from './core';

// get요청
const getPostList = (page, count) => {
	return request({ url: `/boards${page}&count=${count}` });
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
