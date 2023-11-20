import { Link, router } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Container from '../components/Container';
import Box from '../lib/theme/Box';
import Button from '../lib/theme/Button';
import Text from '../lib/theme/Text';
import Touchable from '../lib/theme/Touchable';
import { useState } from 'react';
import { AuthFormSchema, authFormSchema } from '../lib/schemas';
import { Input } from '../components/Input';
import { SafeAreaView } from 'react-native';
import { signIn } from '../lib/api';
import Loading from '../components/Loading';
import { API_URL } from '@env';
import { IError } from '../lib/interfaces/errors';
import { useAuthContext } from '../lib/providers';

export default function AuthPage() {
	const [showAuth, setShowAuth] = useState(true);
	return (
		<Container>
			{showAuth ? <AuthInformation onPress={() => setShowAuth(false)} /> : <AuthForm />}
		</Container>
	);
}

const AuthInformation = ({ onPress }: { onPress: () => void }) => {
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Container>
				<Box flex={2}></Box>
				<Box flex={1} alignItems={'center'}>
					<Text variant={'header'}>Bienvenido a Social Recepies</Text>
					<Text variant={'subheader'}>
						Aquí vas a poder compartir tus recetas favorias o encontrarlas
					</Text>
					<Button
						variant={'primary'}
						padding={'s'}
						width={'100%'}
						marginVertical={'m'}
						onPress={() => onPress()}
					>
						<Text variant={'buttonPrimary'}>Ingresar</Text>
					</Button>
					<Link href="/sign-up" asChild>
						<Touchable>
							<Text variant={'titleMedium'}>Crear nueva cuenta</Text>
						</Touchable>
					</Link>
				</Box>
			</Container>
		</SafeAreaView>
	);
};

const AuthForm = () => {
	const [loading, setLoading] = useState(false);
	const [errorLogin, setErrorLogin] = useState<string | undefined>(undefined);
	const { storeAuth } = useAuthContext();
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<AuthFormSchema>({
		mode: 'onSubmit',
		reValidateMode: 'onChange',
		resolver: yupResolver(authFormSchema),
		criteriaMode: 'firstError',
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const onSubmit = (values: AuthFormSchema) => {
		setLoading(true);
		setErrorLogin(undefined);
		signIn({ ...values })
			.then(authData => {
				storeAuth(authData);
				router.replace('/(tabs)');
			})
			.catch((error: IError) => {
				if (error.detail) {
					setErrorLogin(error.detail);
				}
			})
			.finally(() => setLoading(false));
	};

	return (
		<Box flex={1} justifyContent={'center'}>
			<Loading loading={loading} />
			<Box marginTop={'s'}>
				<Controller
					control={control}
					name={'email'}
					render={({ field: { value, onChange } }) => (
						<Input
							label={'Correo:'}
							error={errors.email?.message}
							keyboardType={'email-address'}
							textContentType={'emailAddress'}
							autoCapitalize={'none'}
							maxLength={150}
							value={value}
							onChangeText={onChange}
						/>
					)}
				/>
			</Box>
			<Box marginTop={'s'}>
				<Controller
					control={control}
					name={'password'}
					render={({ field: { value, onChange } }) => (
						<Input
							label={'Contraseña:'}
							error={errors.password?.message}
							keyboardType={'default'}
							textContentType={'password'}
							secureTextEntry={true}
							value={value}
							onChangeText={onChange}
						/>
					)}
				/>
			</Box>
			<Box marginTop={'m'}>
				{errorLogin ? (
					<Text variant={'body'} color={'error'} marginBottom={'m'}>
						{errorLogin}
					</Text>
				) : null}
				<Button variant={'primary'} onPress={handleSubmit(onSubmit)} padding={'s'}>
					<Text variant={'buttonPrimary'}>Ingresar</Text>
				</Button>
				<Link href="/sign-up" asChild>
					<Touchable marginTop={'m'}>
						<Text variant={'body'} textAlign={'center'}>
							¿No tienes una cuenta? Crear nueva cuenta
						</Text>
					</Touchable>
				</Link>
			</Box>
		</Box>
	);
};
