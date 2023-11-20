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

export type AuthFormSchema = yup.InferType<typeof authFormSchema>;
