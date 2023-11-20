import { ReactNode, createContext, useContext, useState } from 'react';

interface IContext {
	isAuthenticated: boolean;
	isLoading: boolean;
}

const AuthContext = createContext<IContext | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	return (
		<AuthContext.Provider value={{ isAuthenticated, isLoading }}>{children}</AuthContext.Provider>
	);
};

export const useAuthContext = (): IContext => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuthContext must be used within a AuthProvider');
	}

	return context;
};
