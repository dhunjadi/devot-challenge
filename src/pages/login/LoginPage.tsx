import Header from '../../components/Header';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import RegisterIcon from '../../assets/RegisterIcon.svg';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../../firebase';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {LoginForm} from '../../types';
import {loginValidationSchema} from '../validations';

const LoginPage = () => {
  const [error, setError] = useState<boolean>(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm<LoginForm>({resolver: zodResolver(loginValidationSchema)});
  const watchFields = watch();

  const isDisabled = !watchFields.email || !watchFields.password;

  const onSubmit = ({email, password}: LoginForm) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate('/trackers');
      })
      .catch(() => {
        setError(true);
      });
  };

  return (
    <>
      <Header />
      <div className="p-login flex flex-column  align-items-center h-screen">
        <div className="p-login__form flex flex-column justify-content-center align-items-center">
          <div className="p-login__form_title font-bold mb-8">Login</div>
          <form className="w-full flex flex-column" onSubmit={handleSubmit(onSubmit)}>
            <input className="w-full h-full" type="text" placeholder="email" id="email" {...register('email')} autoFocus />
            {errors.email && <div className="p-login__form_error mt-2">{errors.email.message}</div>}

            <input type="password" placeholder="Password" id="password" {...register('password')} />
            {errors.password && <div className="p-login__form_error mt-2">{errors.password?.message}</div>}

            <button className="mt-8 font-bold" type="submit" disabled={isDisabled}>
              Login
            </button>
            {error && <div className="p-login__form_error mt-2">Wrong credentials</div>}
          </form>
        </div>
        <div className="p-login__register flex mt-6 pl-6">
          <div className="p-login__register_icon">
            <img src={RegisterIcon} alt="dada" />
          </div>
          <div className="p-login__register_text flex flex-column justify-content-center">
            <span>Need an account?</span>
            <a href="/register">Register here</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
