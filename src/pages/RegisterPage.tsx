import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {useNavigate} from 'react-router-dom';
import {registerValidationSchema} from './validations';
import {RegisterForm} from '../types';
import Header from '../components/Header';
import {auth} from '../firebase';

const RegisterPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm<RegisterForm>({resolver: zodResolver(registerValidationSchema)});
  const watchFields = watch();

  const isDisabled = !watchFields.email || !watchFields.password || !watchFields.confirmPassword;

  const onSubmit = ({email, password}: RegisterForm) => {
    createUserWithEmailAndPassword(auth, email, password).then(() => {
      navigate('/');
    });
  };

  return (
    <>
      <Header />
      <div className="p-register flex flex-column  align-items-center h-screen">
        <div className="p-register__form flex flex-column justify-content-center align-items-center">
          <div className="p-register__form_title font-bold mb-8">Register</div>
          <form className="w-full flex flex-column" onSubmit={handleSubmit(onSubmit)}>
            <input className="w-full h-full" type="text" placeholder="email" id="email" {...register('email')} autoFocus />
            {errors.email && <div className="p-register__form_error mt-2">{errors.email.message}</div>}

            <input type="password" placeholder="Password" id="password" {...register('password')} />
            {errors.password && <div className="p-register__form_error mt-2">{errors.password?.message}</div>}

            <input type="password" placeholder="Confirm Password" id="repeatPasswordassword" {...register('confirmPassword')} />
            {errors.password && <div className="p-register__form_error mt-2">{errors.confirmPassword?.message}</div>}

            <button className="mt-8 font-bold" type="submit" disabled={isDisabled}>
              Register
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
