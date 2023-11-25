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
import { Image, Keyboard, SafeAreaView } from 'react-native';
import { signIn } from '../lib/api';
import Loading from '../components/Loading';
import { IError } from '../lib/interfaces/errors';
import { useAuthContext } from '../lib/providers';
import ContainerForm from '../components/ContainerForm';
import i18next from '../locales/i18next';
const AUTH_IMAGE = require('../assets/images/cooking.png');
const SIGN_IN = require('../assets/images/sign-in.png');

export default function AuthScreen() {
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
				<Box flex={1} justifyContent={'center'}>
					<Image
						source={AUTH_IMAGE}
						style={{ width: '100%', height: 300 }}
						resizeMode={'contain'}
					/>
				</Box>
				<Box flex={1} alignItems={'center'}>
					<Text variant={'header'} textAlign={'center'}>
						{i18next.t('signin.welcome')}
					</Text>
					<Text variant={'titleMedium'} textAlign={'center'} marginBottom={'m'}>
						{i18next.t('signin.welcome-detail')}
					</Text>
					<Button
						variant={'primary'}
						padding={'s'}
						width={'100%'}
						marginVertical={'m'}
						onPress={() => onPress()}
					>
						<Text variant={'buttonPrimary'}>{i18next.t('signin.button-in')}</Text>
					</Button>
					<Link href="/sign-up" asChild>
						<Touchable>
							<Text variant={'titleMedium'}>{i18next.t('signin.create-account')}</Text>
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
		setValue,
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
		Keyboard.dismiss();
		setLoading(true);
		setErrorLogin(undefined);
		signIn(values)
			.then(authData => {
				storeAuth(authData);
				router.replace('/(tabs)');
			})
			.catch((error: IError) => {
				if (error.detail) {
					setErrorLogin(i18next.t('signin.unauthorized'));
				}
				setValue('password', '');
			})
			.finally(() => setLoading(false));
	};

	return (
		<Box flex={1} justifyContent={'center'}>
			<ContainerForm>
				<Box flex={1} justifyContent={'center'}>
					<Loading loading={loading} />
					<Box>
						<Image source={SIGN_IN} style={{ width: '100%', height: 300 }} resizeMode={'contain'} />
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
							<Text variant={'buttonPrimary'}>{i18next.t('signin.button-in')}</Text>
						</Button>
						<Link href="/sign-up" asChild>
							<Touchable marginTop={'m'}>
								<Text variant={'body'} textAlign={'center'}>
									{i18next.t('signin.no-account')}
								</Text>
							</Touchable>
						</Link>
					</Box>
				</Box>
			</ContainerForm>
		</Box>
	);
};
