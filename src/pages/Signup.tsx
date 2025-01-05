
// import { Facebook, Linkedin } from 'lucide-react'
import '../styles/pages/Auth.scss'
import { useNavigate, useSearchParams } from "react-router-dom"
import people7 from "../assets/people7.jpg";
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { SyncLoader } from 'react-spinners';
import { SignUpData } from '../types/SignupData';
import { useSignup } from '../hooks/useSignup';

const override = {
  display: 'block',
  margin: '0 auto',
};

export default function Signup() {

  const navigate = useNavigate()
  const { isSigningUp, signup, signupResponse } = useSignup();
  const [searchParams] = useSearchParams();
  const ref = searchParams?.get('ref');

  const formSchema = z.object({
    lastName: z.string().min(1, 'This field is required'),
    email: z.string().min(1, 'This field is required').email({ message: 'Invalid email address' }),
    password: z
      .string()
      .min(8, 'This field is required (must be up to 8 characters)'),
    confirmPassword: z
      .string()
      .min(8, 'This field is required (must be up to 8 characters)'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'], // path of error
  });

  const { register, handleSubmit, formState } = useForm<SignUpData>({
    resolver: zodResolver(formSchema, {}, { raw: true }),
    mode: 'onBlur',
    defaultValues: {
      refferalCode: ref || ''
    }
  });

  const { errors } = formState;

  const onSubmit: SubmitHandler<SignUpData> = async (data: SignUpData) => {
    const formData = {
      ...data,
    };

    console.log(formData)
    signup(formData);
  };


  console.log(signupResponse, isSigningUp);
  
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
            AccunarTech
          </div>
        </div>
      </div>

      {/* Right Section - Form */}
      <div className="flex flex_col justify_center bg_slate_800 px_8 py_12 text_white md_px_12 form_cont">
        <div className="mx_auto w_full max_w_md space_y_8">
          <div className="space_y_2">
            <h1 className="text_3xl font_bold tracking_tight title_color">
              AccunarTech
            </h1>
            <p className="text_slate_400">
              Create an account with us
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
          <div className='password'>
              <label htmlFor="email">First Name</label>
              <input 
              type="text"
              id="firstName"
              {...register('firstName', { required: true })}/>
              {errors?.email?.message &&
              typeof errors.email.message === 'string' && (
              <span className="error">
                {errors.email.message}
              </span>
              )}
            </div>
            <div className='password'>
              <label htmlFor="lastName">Last Name</label>
              <input 
              type="text"
              id="lastName"
              {...register('lastName', { required: true })}/>
              {errors?.lastName?.message &&
              typeof errors.lastName.message === 'string' && (
              <span className="error">
                {errors.lastName.message}
              </span>
              )}
            </div>
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
            <div className='password'>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input 
              type="password"
              id="confirmPassword"
              {...register('confirmPassword', { required: true })}/>
              {errors?.confirmPassword?.message &&
              typeof errors.confirmPassword.message === 'string' && (
              <span className="error">
                {errors.confirmPassword.message}
              </span>
              )}
            </div>
            <div className='password'>
              <label htmlFor="refferal">Refferal Code (optional)</label>
              <input 
              type="text"
              id="refferalCode"
              {...register('refferalCode', { required: true })}/>
            </div>

            <button type="submit" disabled={isSigningUp}>
              {isSigningUp ? (
                <SyncLoader
                  role="loader"
                  color="#ffffff"
                  cssOverride={override}
                  size="0.7rem"
                  aria-label="Loading Spinner"
                />
              ) : (
                'Create account'
              )}
        </button>

            <div className='in_up'>
              Already have an account? <span className='link' onClick={()=>navigate("/login")}>Sign in</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}