import * as Yup from 'yup';

export const loginSchema = Yup.object({
  email: Yup.string().trim().required('Email is required').email('Enter a valid email address'),
  password: Yup.string().required('Password is required'),
});

export type LoginValues = Yup.InferType<typeof loginSchema>;
