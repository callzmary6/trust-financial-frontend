import { SyncLoader } from "react-spinners";
import Loader from "../components/Loader";
import { useShowBalance } from "../hooks/useShowBalance";
import "../styles/pages/Withdraw.scss";
import styles from "../styles/pages/Profile.module.scss"
import { formatMoney } from "../utils/moneyUtils";
import { useState } from "react";

const override = {
  display: 'block',
  margin: '0 auto',
};


const Withdraw = () => {
  const {data: balance, isPending: isLoadingBalance} = useShowBalance();
  const userBalance = balance?.data.userBalance;

  const [address, setAddress] = useState<string>('');
  const [withdrawalAmount, setWithdrawalAmount] = useState<number>();

  if(isLoadingBalance) return <Loader />

  return (
    <>
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
                  value={address}
                  placeholder="Enter your Wallet Address"
                  className={styles.input}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className={styles.field}>
                <label>Withdrawal Amount</label>
                <input
                  type="number"
                  value={withdrawalAmount}
                  placeholder="Enter Amount"
                  className={styles.input}
                  onChange={(e) => setWithdrawalAmount(Number(e.target.value))}
                />
              </div>
            </div>
          </div>
          <button className={styles.submitButton}  disabled={false}>
          {false? (
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
    </>
  );
};

export default Withdraw;