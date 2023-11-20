import { Link } from 'expo-router';
import Container from '../components/Container';
import Box from '../lib/theme/Box';
import Button from '../lib/theme/Button';
import Text from '../lib/theme/Text';
import Touchable from '../lib/theme/Touchable';

export default function AuthPage() {
	return (
		<Container>
			<Box flex={2}></Box>
			<Box flex={1} alignItems={'center'}>
				<Text variant={'header'}>Bienvenido a Social Recepies</Text>
				<Text variant={'subheader'}>
					Aquí vas a poder compartir tus recetas favorias o encontrarlas
				</Text>
				<Button variant={'primary'} padding={'s'} width={'100%'} marginVertical={'m'}>
					<Text variant={'buttonPrimary'}>Ingresar</Text>
				</Button>
				<Link href="/sign-in" asChild>
					<Touchable>
						<Text variant={'titleMedium'}>¿Ya tienes cuenta? inicia sesión</Text>
					</Touchable>
				</Link>
			</Box>
		</Container>
	);
}
