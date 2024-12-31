import "../styles/components/DepositForm.scss";
import { SyncLoader } from 'react-spinners';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { PaymentData } from '../types/SignupData';
import { useNavigate } from "react-router";

const override = {
  display: 'block',
  margin: '0 auto',
};

const formSchema = z.object({
  transactionId: z.string().min(1, 'This field is required'),
  payerAddress: z.string().min(1, 'This field is required'),
});

export default function PaymentForm() {
  const navigate = useNavigate();

  const { register, handleSubmit, formState } = useForm<PaymentData>({
    resolver: zodResolver(formSchema, {}, { raw: true }),
    mode: 'onBlur',
  });

  const { errors } = formState;

  const onSubmit: SubmitHandler<PaymentData> = async (data: PaymentData) => {
    const formData = {
      ...data
    };
    console.log(formData);
    navigate("/app/deposit/confirm");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <div className='amount'>
            <label htmlFor="transactionId">Transaction ID</label>
            <input 
              type="text"
              id="transactionId"
              placeholder="Enter transaction ID"
              {...register('transactionId', { required: true })}
            />
            {errors?.transactionId?.message &&
            typeof errors.transactionId.message === 'string' && (
            <span className="error">
            {errors.transactionId.message}
            </span>
            )}
        </div>
        <div className='amount'>
            <label htmlFor="payerAddress">Payer Address</label>
            <input 
              type="text"
              id="payerAddress"
              placeholder="Enter payer address"
              {...register('payerAddress', { required: true })}
            />
            {errors?.payerAddress?.message &&
            typeof errors.payerAddress.message === 'string' && (
            <span className="error">
            {errors.payerAddress.message}
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
            'Save'
            )}
        </button>
    </form>
  );
}