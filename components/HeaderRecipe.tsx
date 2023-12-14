import { forwardRef, useImperativeHandle, useState } from 'react';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { StyleSheet } from 'react-native';

import Text from '../lib/theme/Text';
import theme from '../lib/theme/theme';
import IconFontAwesome from './FontAwsome';
import Touchable from '../lib/theme/Touchable';
import { router } from 'expo-router';

type HeaderRecipe = {
	showHeader: () => void;
	hiddeHeader: () => void;
};

interface Props {
	title: string;
}

const HeaderRecipe = forwardRef<HeaderRecipe, Props>(({ title }, ref) => {
	const [show, setShow] = useState(false);

	const showHeader = () => {
		setShow(true);
	};

	const hiddeHeader = () => {
		setShow(false);
	};

	useImperativeHandle(ref, () => ({
		showHeader,
		hiddeHeader,
	}));

	if (!show) {
		return <></>;
	}

	return (
		<Animated.View
			entering={FadeIn.springify().damping(20).mass(4).restSpeedThreshold(1)}
			exiting={FadeOut.duration(1)}
			style={styles.container}
		>
			<Touchable position={'absolute'} left={15} marginTop={'s'} onPress={() => router.back()}>
				<IconFontAwesome name={'chevron-left'} size={20} color={'jordyblue.700'} />
			</Touchable>
			<Text variant={'subheader'}>{title}</Text>
		</Animated.View>
	);
});

const styles = StyleSheet.create({
	container: {
		borderBottomWidth: StyleSheet.hairlineWidth,
		borderBottomColor: theme.colors['alto.200'],
		alignItems: 'center',
		justifyContent: 'center',
		position: 'relative',
		height: 65,
	},
});

HeaderRecipe.displayName = 'HeaderRecipe';

export default HeaderRecipe;
