import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Redirect, Tabs } from 'expo-router';

import { useAuthContext } from '../../lib/providers';
import Text from '../../lib/theme/Text';
import IconFontAwesome from '../../components/FontAwsome';
import theme, { Theme } from '../../lib/theme/theme';
import Touchable from '../../lib/theme/Touchable';

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon({
	color,
	...rest
}: {
	name: React.ComponentProps<typeof FontAwesome>['name'];
	color: string;
}) {
	return <IconFontAwesome size={28} style={{ marginBottom: -5, color }} {...rest} />;
}

export default function TabLayout() {
	const { isAuthenticated, isLoading } = useAuthContext();

	if (isLoading) {
		return <Text>Loading...</Text>;
	}

	if (!isAuthenticated) {
		return <Redirect href="/sign-in" />;
	}

	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: theme.colors['jordyblue.700'],
				tabBarInactiveTintColor: theme.colors['jordyblue.300'],
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: '',
					tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
				}}
			/>
			<Tabs.Screen
				name="search"
				options={{
					title: '',
					tabBarIcon: ({ color }) => <TabBarIcon name="search" color={color} />,
				}}
			/>
			<Tabs.Screen
				name="notifications"
				options={{
					title: '',
					tabBarIcon: ({ color }) => <TabBarIcon name="bell" color={color} />,
				}}
			/>
			<Tabs.Screen
				name="profile"
				options={{
					title: '',
					tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
				}}
			/>
		</Tabs>
	);
}
