import axios from 'axios';

const request = axios.create({
	baseURL: process.env.REACT_APP_API_URL,
});

// 요청 타임아웃 설정
request.defaults.timeout = 2500;

// 요청 인터셉터 추가
request.interceptors.request.use(
	(config) => config,
	(error) => {
		console.log(error); // debug
		return Promise.reject(error);
	},
);

// 응답 인터셉터 추가
request.interceptors.response.use(
	(response) => {
		const res = response.data;
		return res;
	},
	(error) => {
		console.log(error); // debug
		return Promise.reject(error);
	},
);

export default request;
