import { ActivityIndicator, StyleSheet } from 'react-native';
import { useTheme } from '@shopify/restyle';

import { Theme } from '../lib/theme/theme';

const Loading = ({ loading }: { loading: boolean }) => {
	const theme = useTheme<Theme>();
	if (loading) {
		return (
			<ActivityIndicator
				color={theme.colors.black}
				animating={loading}
				style={StyleSheet.absoluteFill}
				size={'large'}
			/>
		);
	}

	return null;
};

export default Loading;
