import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { IAuth, IAuthSession, IUser } from '../interfaces';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API from '../api/API';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { IError } from '../interfaces/errors';

interface IContext {
	isAuthenticated: boolean;
	isLoading: boolean;
	user: IUser | undefined;
	storeAuth: (authData: IAuthSession) => void;
	signOut: () => void;
}

let refeching = false;
const AuthContext = createContext<IContext | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [state, setState] = useState<{
		isAuthenticated: boolean;
		isLoading: boolean;
		auth: IAuth | undefined;
		user: IUser | undefined;
	}>({
		isAuthenticated: false,
		isLoading: false,
		auth: undefined,
		user: undefined,
	});

	const storeAuth = async (authData: IAuthSession) => {
		setState(curr => ({ ...curr, auth: authData.session, user: authData.user }));
		await AsyncStorage.setItem('session', JSON.stringify(authData));
	};

	const signOut = async () => {
		await AsyncStorage.removeItem('session');
		setState({ isAuthenticated: false, isLoading: false, user: undefined, auth: undefined });
	};

	const contextData: IContext = {
		storeAuth,
		signOut,
		isAuthenticated: state.isAuthenticated,
		isLoading: state.isLoading,
		user: state.user,
	};

	useEffect(() => {
		setState(curr => ({ ...curr, isLoading: true }));
		AsyncStorage.getItem('session').then(auth => {
			let authData: IAuthSession | undefined = undefined;
			if (auth) {
				authData = JSON.parse(auth) as IAuthSession;
			}
			setState(curr => ({
				...curr,
				isLoading: false,
				isAuthenticated: true,
				auth: authData?.session,
				user: authData?.user,
			}));
		});
	}, []);

	useEffect(() => {
		const requestInterceptor = API.interceptors.request.use(
			(config: AxiosRequestConfig) => {
				if (state.auth?.access && config.headers) {
					config.headers.Authorization = `Bearer ${state.auth.access}`;
				}
				return Promise.resolve(config) as any;
			},
			() => {
				//
			},
		);

		const responseInterceptor = API.interceptors.response.use(
			response => {
				return response;
			},
			async (error: AxiosError<IError>) => {
				// UnauthorizedError
				const prevRequest = error.config as any;
				if (
					error.response?.status === 401 &&
					!refeching &&
					state.auth?.refresh &&
					error.response.data.code !== 'token_not_valid'
				) {
					refeching = true;
					const response = await API.post('/api/auth/refresh/', { refresh: state.auth?.refresh });
					setState(curr => ({
						...curr,
						auth: { access: response.data.access, refresh: curr.auth?.refresh || '' },
					}));
					prevRequest.headers['Authorization'] = `Bearer ${response.data.access}`;
					return axios(prevRequest);
				} else if (
					error.response?.status === 401 &&
					error.response.data.code === 'token_not_valid'
				) {
					signOut();
				}

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

		return () => {
			API.interceptors.request.eject(requestInterceptor);
			API.interceptors.response.eject(responseInterceptor);
		};
	}, [state.auth?.access, state.auth?.refresh]);

	return <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>;
};

export const useAuthContext = (): IContext => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuthContext must be used within a AuthProvider');
	}

	return context;
};
