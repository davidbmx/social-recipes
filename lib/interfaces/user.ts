export interface IUser {
	uid: string;
	username: string;
	email: string;
	password?: string;
}

export interface IAuth {
	access: string;
	refresh: string;
}
