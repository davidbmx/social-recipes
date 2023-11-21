import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { IAuth, IAuthSession, IUser } from '../interfaces';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface IContext {
	isAuthenticated: boolean;
	isLoading: boolean;
	user: IUser | undefined;
	storeAuth: (authData: IAuthSession) => void;
	signOut: () => void;
}

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

	return <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>;
};

export const useAuthContext = (): IContext => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuthContext must be used within a AuthProvider');
	}

	return context;
};
