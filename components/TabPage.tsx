import { useEffect } from 'react';
import { Dimensions } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

const TabPage = ({
	show,
	index,
	children,
}: {
	show: boolean;
	index: number;
	children: React.ReactNode;
}) => {
	const offsetWidth = Dimensions.get('screen').width;
	const offset = useSharedValue(index === 0 ? 0 : offsetWidth);
	const animatedStyle = useAnimatedStyle(() => ({
		transform: [{ translateX: offset.value }],
	}));

	useEffect(() => {
		if (show) {
			offset.value = withTiming(0, { duration: 600 });
		} else {
			offset.value = withTiming(index === 0 ? -offsetWidth : offsetWidth, { duration: 600 });
		}
	}, [show, index]);

	return (
		<Animated.View style={[{ position: 'absolute', right: 0, left: 0 }, animatedStyle]}>
			{children}
		</Animated.View>
	);
};

export default TabPage;
