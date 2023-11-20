import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import { API_URL } from '@env';

const API: AxiosInstance = axios.create({
	baseURL: API_URL,
	headers: {
		'Content-Type': 'application/json',
	},
});

// API.interceptors.request.use(
// 	(config: AxiosRequestConfig) => {
// 		if (!Auth.currentUser) {
// 			return Promise.resolve(config);
// 		}
// 		return Auth.currentUser?.getIdToken().then(token => {
// 			if (token && config.headers) {
// 				config.headers.Authorization = `Bearer ${token}`;
// 			}
// 			return Promise.resolve(config);
// 		}) as any;
// 	},
// 	() => {
// 		//
// 	},
// );

// API.interceptors.response.use(
// 	response => {
// 		return response;
// 	},
// 	async (error: AxiosError) => {
// 		// UnauthorizedError
// 		if (error.response?.status === 401) {
// 			// navigate('Auth');
// 		}
// 		return Promise.reject(error.response);
// 	},
// );

export default API;
