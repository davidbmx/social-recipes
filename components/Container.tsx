import { ReactNode } from 'react';
import Box from '../lib/theme/Box';

const Container = ({ children }: { children: ReactNode }) => {
	return (
		<Box padding={'s'} flex={1} backgroundColor={'white'}>
			{children}
		</Box>
	);
};

export default Container;
