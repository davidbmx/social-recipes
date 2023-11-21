import * as yup from 'yup';

export const authFormSchema = yup.object({
	email: yup
		.string()
		.label('Correo')
		.email('Correo es incorrecto')
		.min(3, 'Mínimo 3 caracteres')
		.max(150, 'Máximo 150 caracteres')
		.required('Campo requerido.')
		.trim(),
	password: yup.string().required('Password es requerido'),
});

export const signupFormSchema = yup.object({
	username: yup
		.string()
		.label('Username')
		.min(3, 'Mínimo 3 caracteres')
		.max(150, 'Máximo 150 caracteres')
		.required('Campo requerido.')
		.trim(),
	email: yup
		.string()
		.label('Correo')
		.email('Correo es incorrecto')
		.min(3, 'Mínimo 3 caracteres')
		.max(150, 'Máximo 150 caracteres')
		.required('Campo requerido.')
		.trim(),
	password: yup.string().required('Password es requerido'),
});

export type SignupFormSchema = yup.InferType<typeof signupFormSchema>;
export type AuthFormSchema = yup.InferType<typeof authFormSchema>;
