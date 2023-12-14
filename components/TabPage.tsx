import { useEffect, useState } from 'react';
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
	const [hidden, setHidde] = useState(false);
	const animatedStyle = useAnimatedStyle(() => ({
		transform: [{ translateX: offset.value }],
	}));

	useEffect(() => {
		if (show) {
			offset.value = withTiming(0, { duration: 600 });
			setHidde(false);
		} else {
			offset.value = withTiming(index === 0 ? -offsetWidth : offsetWidth, { duration: 600 });
			setHidde(true);
		}
	}, [show]);

	return (
		<Animated.View style={[{ display: hidden ? 'none' : 'flex' }, animatedStyle]}>
			{children}
		</Animated.View>
	);
};

export default TabPage;
