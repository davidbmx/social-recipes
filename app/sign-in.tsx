import { Link } from 'expo-router';
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
		<Box flex={1}>
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
		</Box>
	);
};

const AuthForm = () => {
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
		// do something
	}

	return (
		<Box flex={1}>
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
				<Button variant={'primary'} onPress={handleSubmit(onSubmit)}>
					<Text variant={'buttonPrimary'}>Ingresar</Text>
				</Button>
			</Box>
		</Box>
	);
};
