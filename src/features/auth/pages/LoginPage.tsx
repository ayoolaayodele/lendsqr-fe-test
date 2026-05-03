import { useState } from 'react';
import { ErrorMessage, Field, Form, Formik, type FieldProps } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import Button from '../../../components/ui/Button/Button';
import Input from '../../../components/ui/Input/Input';
import logoLendsqr from '../../../assets/icons/logo-lendsqr.svg';
import loginIllustration from '../../../assets/images/img-login-illustration.svg';
import './LoginPage.scss';

const loginSchema = Yup.object({
  email: Yup.string().trim().required('Email is required').email('Enter a valid email address'),
  password: Yup.string().required('Password is required'),
});

type LoginValues = Yup.InferType<typeof loginSchema>;

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  return (
    <main className='login-page'>
      <section className='login-page__left' aria-hidden>
        <img className='login-page__logo' src={logoLendsqr} alt='' />
        <div className='login-page__illustration-wrap'>
          <img className='login-page__illustration' src={loginIllustration} alt='' />
        </div>
      </section>

      <section className='login-page__right'>
        <div className='login-form'>
          <h1 className='login-form__title'>Welcome!</h1>
          <p className='login-form__subtitle'>Enter details to login.</p>

          <Formik<LoginValues>
            initialValues={{ email: '', password: '' }}
            validationSchema={loginSchema}
            validateOnBlur
            validateOnChange
            onSubmit={() => {
              navigate('/dashboard');
            }}
          >
            {({ isValid, dirty }) => (
              <Form className='login-form__fields' noValidate>
                <div className='login-form__field'>
                  <label className='sr-only' htmlFor='email'>
                    Email
                  </label>
                  <Field name='email'>
                    {({ field, meta }: FieldProps<string, LoginValues>) => (
                      <Input
                        {...field}
                        id='email'
                        type='email'
                        autoComplete='email'
                        placeholder='Email'
                        hasError={Boolean(meta.touched && meta.error)}
                      />
                    )}
                  </Field>
                  <ErrorMessage name='email' component='p' className='login-form__error' />
                </div>

                <div className='login-form__field login-form__field--password'>
                  <label className='sr-only' htmlFor='password'>
                    Password
                  </label>
                  <Field name='password'>
                    {({ field, meta }: FieldProps<string, LoginValues>) => (
                      <Input
                        {...field}
                        id='password'
                        type={showPassword ? 'text' : 'password'}
                        autoComplete='current-password'
                        placeholder='Password'
                        hasError={Boolean(meta.touched && meta.error)}
                        rightSlot={
                          <button
                            className='login-form__toggle-password'
                            type='button'
                            onClick={() => setShowPassword((prev) => !prev)}
                          >
                            {showPassword ? 'HIDE' : 'SHOW'}
                          </button>
                        }
                      />
                    )}
                  </Field>
                  <ErrorMessage name='password' component='p' className='login-form__error' />
                </div>

                <Button className='login-form__forgot' type='button' variant='text'>
                  FORGOT PASSWORD?
                </Button>

                <Button className='login-form__submit' type='submit' fullWidth disabled={!(isValid && dirty)}>
                  LOG IN
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </section>
    </main>
  );
}
