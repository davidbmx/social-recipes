import { ReactNode } from 'react';
import Box from '../lib/theme/Box';
import { BoxProps } from '@shopify/restyle';
import { Theme } from '../lib/theme/theme';

type Props = BoxProps<Theme> & { children: ReactNode };

const Container = ({ children, ...rest }: Props) => {
	return (
		<Box padding={'m'} flex={1} backgroundColor={'white'} {...rest}>
			{children}
		</Box>
	);
};

export default Container;
