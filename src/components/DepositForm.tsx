import "../styles/components/DepositForm.scss"
import { SyncLoader } from 'react-spinners';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { DepoData } from '../types/SignupData';
import { useNavigate } from "react-router";
import { cryptoOptions, investmentPlans } from "../data/investmentPlans";

const override = {
  display: 'block',
  margin: '0 auto',
};

const formSchema = z.object({
  investmentPlan: z.string().min(1, 'This field is required'),
  amount: z.string()
    .min(1, 'This field is required').max(15, "Impossible sum of money. Review deposit amount"),
    // .refine((val) => {
    //   const amount = Number(val);
    //   return amount >= 30;
    // }, 'Minimum amount is $30'),
  crypto: z.string().min(1, 'This field is required'),
})
.refine((data) => {
  const selectedPlan = investmentPlans.find(
    (plan) => plan.name === data.investmentPlan
  );
  if (!selectedPlan) return false;
  return Number(data.amount) >= selectedPlan.minDeposit;
}, {
  message: "Amount is below minimum deposit for the selected plan",
  path: ['amount'], // path of error
})
.refine((data) => {
  const selectedPlan = investmentPlans.find(
    (plan) => plan.name === data.investmentPlan
  );
  if (!selectedPlan) return false;
  return Number(data.amount) <= selectedPlan?.maxDeposit;
}, {
  message: "Amount is above maximum deposit for the selected plan",
  path: ['amount'], // path of error
});;

export default function DepositForm() {
  const navigate = useNavigate();

  const { register, handleSubmit, formState } = useForm<DepoData>({
    resolver: zodResolver(formSchema, {}, { raw: true }),
    mode: 'onBlur',
  });

  const { errors } = formState;

  const onSubmit: SubmitHandler<DepoData> = async (data: DepoData) => {
    const formData = {
      ...data, amount: Number(data.amount)
    };
    console.log(formData);
    localStorage.setItem("paymentInfo", JSON.stringify(formData));
    navigate("/app/deposit/confirm");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <div className='investmentPlan'>
            <label htmlFor="investmentPlan">Investment Plan</label>
            <select 
              id="investmentPlan"
              {...register('investmentPlan', { required: true })}
            >
              {investmentPlans.map((plan, index) => (
                <option key={index} value={plan.name}>
                  {plan.name}
                </option>
              ))}
            </select>
            {errors?.investmentPlan?.message &&
            typeof errors.investmentPlan.message === 'string' && (
            <span className="error">
            {errors.investmentPlan.message}
            </span>
            )}
        </div>
        <div className='amount'>
            <label htmlFor="amount">Amount</label>
            <input 
            type="number"
            id="amount"
            placeholder="$30.00"
            {...register('amount', { required: true })}/>
            {errors?.amount?.message &&
            typeof errors.amount.message === 'string' && (
            <span className="error">
            {errors.amount.message}
            </span>
            )}
        </div>
        <div className='crypto'>
            <label htmlFor="crypto">Cryptocurrency</label>
            <select 
              id="crypto"
              {...register('crypto', { required: true })}
            >
              {cryptoOptions.map((crypto, index) => (
                <option key={index} value={crypto}>
                  {crypto}
                </option>
              ))}
            </select>
            {errors?.crypto?.message &&
            typeof errors.crypto.message === 'string' && (
            <span className="error">
            {errors.crypto.message}
            </span>
            )}
        </div>
        <button type="submit">
            {false ? (
            <SyncLoader
                role="loader"
                color="#ffffff"
                cssOverride={override}
                size="0.7rem"
                aria-label="Loading Spinner"
            />
            ) : (
            'Proceed'
            )}
        </button>
    </form>
  )
}