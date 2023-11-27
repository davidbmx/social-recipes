import { useRef } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
	Easing,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';

import Box from '../lib/theme/Box';
import Text from '../lib/theme/Text';
import i18next from '../locales/i18next';
import Touchable from '../lib/theme/Touchable';

const TabButtons = ({ onChange }: { onChange: (index: number) => void }) => {
	const offset = useSharedValue(0);
	const width = useRef(0);

	const toLeft = () => {
		offset.value = withTiming(0, { duration: 500 });
		onChange(0);
	};

	const toRight = () => {
		offset.value = withTiming((width.current - 12) / 2, { duration: 500, easing: Easing.ease });
		onChange(1);
	};

	const animatedStyle = useAnimatedStyle(() => ({
		transform: [{ translateX: offset.value }],
	}));

	return (
		<Box
			position={'relative'}
			flexDirection={'row'}
			backgroundColor={'jordyblue.50'}
			columnGap={'s'}
			borderRadius={'l'}
			alignItems={'center'}
			padding={'xs'}
			onLayout={({ nativeEvent: { layout } }) => (width.current = layout.width)}
		>
			<Touchable zIndex={1} flex={1} padding={'m'} alignItems={'center'} onPress={toLeft}>
				<Text variant={'titleSmall'}>{i18next.t('recipe.ingredients')}</Text>
			</Touchable>
			<Touchable zIndex={1} flex={1} padding={'m'} alignItems={'center'} onPress={toRight}>
				<Text variant={'titleSmall'}>{i18next.t('recipe.preparation')}</Text>
			</Touchable>
			<Animated.View style={[style.indicator, animatedStyle]} />
		</Box>
	);
};

const style = StyleSheet.create({
	indicator: {
		backgroundColor: 'white',
		position: 'absolute',
		height: '100%',
		width: '50%',
		borderRadius: 15,
		marginHorizontal: 6,
		zIndex: 0,
	},
});

export default TabButtons;
