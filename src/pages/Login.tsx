import '../styles/pages/Auth.scss'
import people7 from "../assets/people7.jpg";
import { useNavigate } from 'react-router';
import { SyncLoader } from 'react-spinners';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { LoginData } from '../types/SignupData';
import { useLogin } from '../hooks/useLogin';
import { useAuth } from '../context/AuthContext';

const override = {
  display: 'block',
  margin: '0 auto',
};

export default function Login() {
  const navigate = useNavigate();

  const { isLoggingIn, signin } = useLogin();
  const {isAuthenticated, user} = useAuth();

    console.log(isAuthenticated);
    console.log(user);

  const formSchema = z.object({
    email: z.string().min(1, 'This field is required').email({ message: 'Invalid email address' }),
    password: z
      .string()
      .min(8, 'This field is required (must be up to 8 characters)'),
  })

  const { register, handleSubmit, formState } = useForm<LoginData>({
    resolver: zodResolver(formSchema, {}, { raw: true }),
    mode: 'onBlur',
  });

  const { errors } = formState;

  const onSubmit: SubmitHandler<LoginData> = async (data: LoginData) => {
    const formData = {
      ...data,
    };
    signin(formData);
  };

  return (
    <div className="grid min_h_screen md_grid_cols_2 resolve">
      {/* Left Section - Image */}
      <div className="relative hidden md_block">
        <img
          src={people7}
          alt="Workspace"
          className="h_full w_full object_cover"
          width={1080}
        />
        <div className="absolute left_8 top_8">
          <div className="flex items_center text_xl font_semibold text_blue_500">
            <span className="mr_2 rounded border_2 border_blue_500 p_1">□</span>
              AcunarTech
          </div>
        </div>
      </div>

      {/* Right Section - Form */}
      <div className="flex flex_col justify_center bg_slate_800 px_8 py_12 text_white md_px_12 form_cont">
        <div className="mx_auto w_full max_w_md space_y_8">
          <div className="space_y_2">
            <h1 className="text_3xl font_bold tracking_tight title_color">
              AcunarTech
            </h1>
            <p className="text_slate_400">
              Login your account
            </p>
          </div>

          <form className="auth_form" onSubmit={handleSubmit(onSubmit)}>
          <div className='email'>
              <label htmlFor="email">Email</label>
              <input 
              type="text"
              id="email"
              {...register('email', { required: true })}/>
              {errors?.email?.message &&
              typeof errors.email.message === 'string' && (
              <span className="error">
                {errors.email.message}
              </span>
              )}
            </div>
            <div className='password'>
              <label htmlFor="password">Password</label>
              <input 
              type="password"
              id="password"
              {...register('password', { required: true })}/>
              {errors?.password?.message &&
              typeof errors.password.message === 'string' && (
              <span className="error">
                {errors.password.message}
              </span>
              )}
            </div>
            <div className='fpass' onClick={()=>navigate("/request-otp")}>
              Forgot password?
            </div>
            <button type="submit" disabled={isLoggingIn}>
              {isLoggingIn ? (
                <SyncLoader
                  role="loader"
                  color="#ffffff"
                  cssOverride={override}
                  size="0.7rem"
                  aria-label="Loading Spinner"
                />
              ) : (
                'Sign in'
              )}
        </button>
            <div className='in_up'>
              Don't have an account? <span className='link' onClick={()=>navigate("/signup")}>Sign up</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}