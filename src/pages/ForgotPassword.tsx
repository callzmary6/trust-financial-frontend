
// import { Facebook, Linkedin } from 'lucide-react'
// import '../styles/pages/Auth.scss'
// import { Link, useNavigate } from "react-router-dom"
// import people7 from "../assets/people7.jpg";

// export default function ForgotPCodeassword() {

//   const navigate = useNavigate()
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
//             AccunarHub
//           </div>
//         </div>
//       </div>

//       {/* Right Section - Form */}
//       <div className="flex flex_col justify_center bg_slate_800 px_8 py_12 text_white md_px_12 form_cont">
//         <div className="mx_auto w_full max_w_md space_y_8">
//           <div className="space_y_2">
//             <h1 className="text_3xl font_bold tracking_tight title_color">
//               AccunarHub
//             </h1>
//             <p className="text_slate_400">
//               OTPCode has been sent to your otpCode
//             </p>
//           </div>

//           <form>
//             <div className='password'>
//               <label htmlFor="refferal">Enter OTPCode</label>
//               <input />
//             </div>
//               <div className='in_up'>
//                 <div className='in_out'>
//                 <span className='link' onClick={()=>navigate("/login")}>Resend code</span>
//                 </div>
//               </div>
//             <button>Reset password</button>
//           </form>
//         </div>
//       </div>
//     </div>
//   )
// }



import '../styles/pages/Auth.scss'
import people7 from "../assets/people7.jpg";
import { useNavigate } from 'react-router';
import { SyncLoader } from 'react-spinners';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { OtpData } from '../types/SignupData';
import { useForgotPassword } from '../hooks/useForgotPasswordOtp';

const override = {
  display: 'block',
  margin: '0 auto',
};

export default function RequestOtpCode() {
  const navigate = useNavigate();
  const { isVerifyingOtp, forgotPasswordOtp } = useForgotPassword();

  const formSchema = z.object({
    otpCode: z.string().min(1, 'This field is required'),
  })

  const { register, handleSubmit, formState } = useForm<OtpData>({
    resolver: zodResolver(formSchema, {}, { raw: true }),
    mode: 'onBlur',
  });

  const { errors } = formState;

  const onSubmit: SubmitHandler<OtpData> = async (data: OtpData) => {
    const formData = {
      ...data,
    };

    console.log(formData);
    forgotPasswordOtp(formData);
  };

  return (
    <div className="grid min_h_screen md_grid_cols_2">
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
              AccunarHub
          </div>
        </div>
      </div>

      {/* Right Section - Form */}
      <div className="flex flex_col justify_center bg_slate_800 px_8 py_12 text_white md_px_12 form_cont">
        <div className="mx_auto w_full max_w_md space_y_8">
          <div className="space_y_2">
            <h1 className="text_3xl font_bold tracking_tight title_color">
              AccunarHub
            </h1>
            <p className="text_slate_400">
              OTP has been sent to your email
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
          <div className='email'>
              <label htmlFor="otpCode">Enter OTPCode</label>
              <input 
              type="text"
              id="otpCode"
              {...register('otpCode', { required: true })}/>
              {errors?.otpCode?.message &&
              typeof errors.otpCode.message === 'string' && (
              <span className="error">
                {errors.otpCode.message}
              </span>
              )}
            </div>
            <div className='in_up'>
               <div className='in_out'>
                <span className='link' onClick={()=>navigate("/request-otp")}>Resend code</span>
              </div>
           </div>
            <button type="submit" disabled={isVerifyingOtp}>
              {isVerifyingOtp ? (
                <SyncLoader
                  role="loader"
                  color="#ffffff"
                  cssOverride={override}
                  size="0.7rem"
                  aria-label="Loading Spinner"
                />
              ) : (
                'Reset password'
              )}
        </button>
          </form>
        </div>
      </div>
    </div>
  )
}

