
// import { Facebook, Linkedin } from 'lucide-react'
// import '../styles/pages/Auth.scss'
// import people7 from "../assets/people7.jpg";
// import { useNavigate } from 'react-router';

// export default function ChangePassword() {
//   const navigate = useNavigate();

//   return (
//     <div className="grid min_h_screen md_grid_cols_2">
//       {/* Left Section - Image */}
//       <div className="relative hidden md_block">
//         <img
//           src={people7}
//           alt="Workspace"
//           className="h_full w_full object_cover"
//           width={1080}
//         />
//         <div className="absolute left_8 top_8">
//           <div className="flex items_center text_xl font_semibold text_blue_500">
//             <span className="mr_2 rounded border_2 border_blue_500 p_1">□</span>
//               AcunarTech
//           </div>
//         </div>
//       </div>

//       {/* Right Section - Form */}
//       <div className="flex flex_col justify_center bg_slate_800 px_8 py_12 text_white md_px_12 form_cont">
//         <div className="mx_auto w_full max_w_md space_y_8">
//           <div className="space_y_2">
//             <h1 className="text_3xl font_bold tracking_tight title_color">
//               AcunarTech
//             </h1>
//             <p className="text_slate_400">
//               Set new password
//             </p>
//           </div>

//           <form>
//             <div className='password'>
//                 <label htmlFor="newPassword"> New Password</label>
//                 <input />
//               </div>
//               <div className='password'>
//                 <label htmlFor="confirmPassword">Confirm Password</label>
//                 <input />
//               </div>
//             <button>Change password</button>
//           </form>
//         </div>
//       </div>
//     </div>
//   )
// }

import '../styles/pages/Auth.scss'
import people7 from "../assets/people7.jpg";
import { SyncLoader } from 'react-spinners';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { ChangePassword } from '../types/SignupData';
import { useResetPassword } from '../hooks/useResetPassword';

const override = {
  display: 'block',
  margin: '0 auto',
};

export default function Login() {
  const email = localStorage.getItem("email");
  const { isResetingPassword, resetPassword } = useResetPassword();

  const formSchema = z.object({
    newPassword: z
      .string()
      .min(8, 'This field is required (must be up to 8 characters)'),
    confirmPassword: z
      .string()
      .min(8, 'This field is required (must be up to 8 characters)'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'], // path of error
  });

  const { register, handleSubmit, formState } = useForm<ChangePassword>({
    resolver: zodResolver(formSchema, {}, { raw: true }),
    mode: 'onBlur',
  });

  const { errors } = formState;

  const onSubmit: SubmitHandler<ChangePassword> = async (data: ChangePassword) => {
    const formData = {
      ...data,
      email,
    };

    const {confirmPassword, ...newFormData} = formData;
    console.log(newFormData);
    resetPassword(newFormData);
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
              Set new password
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
          <div className='email'>
              <label htmlFor="newPassword">New Password</label>
              <input 
              type="password"
              id="newPassword"
              {...register('newPassword', { required: true })}/>
              {errors?.newPassword?.message &&
              typeof errors.newPassword.message === 'string' && (
              <span className="error">
                {errors.newPassword.message}
              </span>
              )}
            </div>
            <div className='password'>
              <label htmlFor="password">Password</label>
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
              <button type="submit" disabled={isResetingPassword}>
                {isResetingPassword ? (
                  <SyncLoader
                    role="loader"
                    color="#ffffff"
                    cssOverride={override}
                    size="0.7rem"
                    aria-label="Loading Spinner"
                  />
                ) : (
                  'Change password'
                )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}