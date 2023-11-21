import { IAuth, IAuthSession, IUser } from '../interfaces';
import API from './API';

type TBodyUser = Pick<IUser, 'email' | 'password'>;

export const signIn = async (body: TBodyUser): Promise<IAuthSession> => {
	return await API.post('/auth', body).then(response => response.data);
};

export const signUp = async (body: TBodyUser): Promise<IAuthSession> => {
	return await API.post('/users/', body).then(response => response.data);
};

export const refreshToken = async (
	access: Pick<IAuth, 'access'>,
): Promise<Pick<IAuth, 'access'>> => {
	return await API.post('/auth/refresh', { access }).then(response => response.data);
};

export const getMyProfile = async (): Promise<IUser> => {
	return await API.get('/users/my_profile').then(response => response.data);
};

export const getUser = async (uid: string): Promise<IUser> => {
	return await API.get(`/users/${uid}`).then(response => response.data);
};
