import { Link, Stack } from 'expo-router';
import Text from '../lib/theme/Text';
import Container from '../components/Container';

export default function NotFoundScreen() {
	return (
		<Container>
			<Stack.Screen options={{ title: 'Oops!' }} />
			<Text>This screen doesn't exist.</Text>

			<Link href="/">
				<Text>Go to home screen!</Text>
			</Link>
		</Container>
	);
}
