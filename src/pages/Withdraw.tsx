import { SyncLoader } from "react-spinners";
import Loader from "../components/Loader";
import { useShowBalance } from "../hooks/useShowBalance";
import "../styles/pages/Withdraw.scss";
import styles from "../styles/pages/Profile.module.scss"
import { formatMoney } from "../utils/moneyUtils";
import { WithdrawData } from "../types/BalanceData";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cryptoOptions } from "../data/investmentPlans";
import { useUserWithdrawal } from "../hooks/useUserWithdrawal";

const override = {
  display: 'block',
  margin: '0 auto',
};


const Withdraw = () => {
  const {data: balance, isPending: isLoadingBalance} = useShowBalance();
  const { isWithdrawing, withdraw  } = useUserWithdrawal();
  
  const userBalance = balance?.data.userBalance;

    const formSchema = z.object({
      walletAddress: z.string().min(1, 'This field is required'),
      amount: z.string().min(1, 'This field is required'),
      withdrawalMethod: z.string().min(1, 'This field is required'),
    })
  
    const { register, handleSubmit, formState } = useForm<WithdrawData>({
      resolver: zodResolver(formSchema, {}, { raw: true }),
      mode: 'onBlur',
    });
  
    const { errors } = formState;
  
    const onSubmit: SubmitHandler<WithdrawData> = async (data: WithdrawData) => {
      const formData = {
        ...data, amount: Number(data.amount)
      };
      withdraw(formData);
    };

  if(isLoadingBalance) return <Loader />

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form">
      <div className="withdraw">
        <div className="withdraw_intro">
          <div className="withdraw_intro_left">
            <div className="withdraw_intro_left_name">Withdraw funds</div>
          </div>
          <div className="withdraw_intro_right">
            <div className="withdraw_intro_right_refferal">Available balance</div>
            <div className="withdraw_intro_right_code">{formatMoney(userBalance as number)}</div>
          </div>
        </div>

        <div className="withdraw_make">
          <div>Ask for withdrawal</div>
        </div>
      </div>


      <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.content}>
          <div className={styles.walletSection}>
            {/* <h2>Wallet Addresses</h2> */}
            <div className={styles.walletFields}>
              <div className={styles.field}>
                <label>Recipient Address</label>
                <input
                  type="text"
                  className={styles.input}
                  id="walletAddress"
                  placeholder="Enter your address"
                  {...register('walletAddress', { required: true })}
                />
                {errors?.walletAddress?.message &&
                typeof errors.walletAddress.message === 'string' && (
                <span className={styles.error}>
                {errors.walletAddress.message}
                </span>
                )}
              </div>

              <div className={styles.field}>
                <label>Withdrawal Amount (min: $30)</label>
                <input
                  type="number"
                  className={styles.input}
                  id="amount"
                  placeholder="Enter amount"
                  {...register('amount', { required: true })}
                />
                {errors?.amount?.message &&
                typeof errors.amount.message === 'string' && (
                <span className={styles.error}>
                {errors.amount.message}
                </span>
                )}
              </div>


              <div className={styles.field}>
                <label>Withdrawal Method</label>
                <select
                  className={styles.select}
                  id="withdrawalMethod"
                  {...register('withdrawalMethod', { required: true })}
                >
                  {cryptoOptions.map((crypto, index) => (
                    <option key={index} value={crypto}>
                      {crypto}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <button className={styles.submitButton}  disabled={isWithdrawing}>
          {isWithdrawing? (
                <SyncLoader
                  role="loader"
                  color="#ffffff"
                  cssOverride={override}
                  size="0.7rem"
                  aria-label="Loading Spinner"
                />
              ) : (
                'Submit'
              )}
          </button>
        </div>

      </div>
    </div>
    </form>
  );
};

export default Withdraw;