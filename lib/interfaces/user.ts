export interface IUser {
	uid: string;
	username: string;
	email: string;
	avatar: string;
	password?: string;
}

export interface IAuth {
	access: string;
	refresh: string;
}

export interface IAuthSession {
	user: IUser;
	session: IAuth;
}
