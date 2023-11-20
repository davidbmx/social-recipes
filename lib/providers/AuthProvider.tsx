import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { IAuth } from '../interfaces';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface IContext {
	isAuthenticated: boolean;
	isLoading: boolean;
	authData?: IAuth;
	storeAuth: (authData: IAuth) => void;
}

const AuthContext = createContext<IContext | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [state, setState] = useState<{
		isAuthenticated: boolean;
		isLoading: boolean;
		auth: IAuth | undefined;
	}>({
		isAuthenticated: false,
		isLoading: false,
		auth: undefined,
	});

	const storeAuth = async (authData: IAuth) => {
		setState(curr => ({ ...curr, auth: authData }));
		await AsyncStorage.setItem('session', JSON.stringify(authData));
	};

	const contextData: IContext = {
		storeAuth,
		isAuthenticated: state.isAuthenticated,
		isLoading: state.isLoading,
		authData: state.auth,
	};

	useEffect(() => {
		setState(curr => ({ ...curr, isLoading: true }));
		AsyncStorage.getItem('session').then(auth => {
			let authData: IAuth | undefined = undefined;
			if (auth) {
				authData = JSON.parse(auth) as IAuth;
			}
			setState(curr => ({ ...curr, isLoading: false, isAuthenticated: true, auth: authData }));
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
