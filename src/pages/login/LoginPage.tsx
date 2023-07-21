import Header from '../../components/Header';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {LoginForm, loginPageValidationSchema} from './LoginPageValidations';
import RegisterIcon from '../../assets/RegisterIcon.svg';

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm<LoginForm>({resolver: zodResolver(loginPageValidationSchema)});
  const watchFields = watch();

  const isDisabled = !watchFields.username && !watchFields.password;

  const onSubmit = ({username, password}: LoginForm) => {
    console.log(username, password);
  };

  return (
    <>
      <Header />
      <div className="p-login">
        <div className="p-login__form">
          <span>Login</span>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input type="text" placeholder="Username" id="email" {...register('username')} autoFocus />
            {errors.username && <span>{errors.username.message}</span>}

            <input type="password" placeholder="Password" id="password" {...register('password')} />
            {errors.password && <span>{errors.password?.message}</span>}

            <button type="submit" disabled={isDisabled}>
              Login
            </button>
          </form>
        </div>
        <div className="p-login__register">
          <div className="p-login__register_icon">
            <img src={RegisterIcon} alt="dada" />
          </div>
          <div className="p-login__register_text">
            <span>Need an account?</span>
            <a href="/">Register here</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
