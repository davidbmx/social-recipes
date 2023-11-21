import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import { API_URL } from '@env';
import { IError } from '../interfaces/errors';
console.log(API_URL);
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

API.interceptors.response.use(
	response => {
		return response;
	},
	async (error: AxiosError<IError>) => {
		// UnauthorizedError
		// if (error.response?.status === 401) {
		// 	// navigate('Auth');
		// }

		console.log(error.response);
		const errorFormatted: IError = {
			detail: error.response?.data?.detail ? error.response?.data.detail : undefined,
			fields: !error.response?.data?.detail
				? (error.response?.data as IError['fields'])
				: undefined,
			status: error.status,
		};
		return Promise.reject(errorFormatted);
	},
);

export default API;
