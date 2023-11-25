import { Link, router } from 'expo-router';
import Container from '../components/Container';
import Box from '../lib/theme/Box';
import Button from '../lib/theme/Button';
import Text from '../lib/theme/Text';
import Touchable from '../lib/theme/Touchable';
import { useState } from 'react';
import { useAuthContext } from '../lib/providers';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Loading from '../components/Loading';
import { Image, Keyboard } from 'react-native';
import { Input } from '../components/Input';
import { SignupFormSchema, signupFormSchema } from '../lib/schemas';
import { signUp } from '../lib/api';
import { IError } from '../lib/interfaces/errors';
import ContainerForm from '../components/ContainerForm';
import i18next from 'i18next';
const SIGN_UP = require('../assets/images/sign_up.png');

export default function SignUpScreen() {
	const [loading, setLoading] = useState(false);
	const [errorLogin, setErrorLogin] = useState<string | undefined>(undefined);
	const { storeAuth } = useAuthContext();
	const {
		control,
		handleSubmit,
		formState: { errors },
		setError,
		setValue,
	} = useForm<SignupFormSchema>({
		mode: 'onSubmit',
		reValidateMode: 'onChange',
		resolver: yupResolver(signupFormSchema),
		criteriaMode: 'firstError',
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const onSubmit = (values: SignupFormSchema) => {
		Keyboard.dismiss();
		setLoading(true);
		setErrorLogin(undefined);
		signUp({ ...values })
			.then(authData => {
				storeAuth(authData);
				router.replace('/(tabs)');
			})
			.catch((error: IError) => {
				if (error.detail) {
					setErrorLogin(error.detail);
				}
				if (error.fields) {
					if (error.fields.email) {
						setError('email', {
							type: 'validate',
							message: 'Correo ingresado ya se encuentra registrado.',
						});
					}
					if (error.fields.username) {
						setError('username', {
							type: 'validate',
							message: 'Username ingresado ya se encuentra registrado.',
						});
					}
					if (error.fields.password) {
						setError('password', {
							type: 'validate',
							message: error.fields.password[0],
						});
					}
					setValue('password', '');
				}
			})
			.finally(() => setLoading(false));
	};

	return (
		<Container>
			<ContainerForm>
				<Box flex={1} justifyContent={'center'}>
					<Loading loading={loading} />
					<Box>
						<Image source={SIGN_UP} style={{ width: '100%', height: 300 }} resizeMode={'contain'} />
					</Box>
					<Box marginTop={'s'}>
						<Controller
							control={control}
							name={'username'}
							render={({ field: { value, onChange } }) => (
								<Input
									label={i18next.t('labels.username')}
									error={errors.username?.message}
									keyboardType={'default'}
									textContentType={'username'}
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
							name={'email'}
							render={({ field: { value, onChange } }) => (
								<Input
									label={i18next.t('labels.email')}
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
					<Box marginTop={'m'}>
						<Controller
							control={control}
							name={'password'}
							render={({ field: { value, onChange } }) => (
								<Input
									label={i18next.t('labels.password')}
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
							<Text variant={'buttonPrimary'}>{i18next.t('signin.sign-up')}</Text>
						</Button>
						<Link href="/sign-in" asChild>
							<Touchable marginTop={'m'}>
								<Text variant={'body'} textAlign={'center'}>
									{i18next.t('signin.has-account')}
								</Text>
							</Touchable>
						</Link>
					</Box>
				</Box>
			</ContainerForm>
		</Container>
	);
}
