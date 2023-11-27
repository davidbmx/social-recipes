import { Image, StyleSheet } from 'react-native';
import Box from '../lib/theme/Box';
import { useTheme } from '@shopify/restyle';
import { Theme } from '../lib/theme/theme';
import Text from '../lib/theme/Text';

const Avatar = ({ image, name, size }: { image: string; name: string; size: number }) => {
	const theme = useTheme<Theme>();
	if (image) {
		return (
			<Image
				source={{ uri: image }}
				style={{
					borderRadius: 50,
					backgroundColor: theme.colors['alto.700'],
					width: size,
					height: size,
				}}
				resizeMode={'contain'}
			/>
		);
	}

	const letter = name[0].toUpperCase();

	return (
		<Box
			backgroundColor={'alto.700'}
			width={size}
			height={size}
			borderRadius={'xl'}
			justifyContent={'center'}
			alignItems={'center'}
		>
			<Text color={'alto.50'} fontSize={size - 10} fontWeight={'bold'}>
				{letter}
			</Text>
		</Box>
	);
};

export default Avatar;
