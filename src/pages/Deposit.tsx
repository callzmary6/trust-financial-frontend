
import "../styles/pages/Deposit.scss";
import DepositCard from "../components/DepositCard";
import DepositForm from "../components/DepositForm";
import { investmentPlans } from "../data/investmentPlans";
import { formatMoney } from "../utils/moneyUtils";
import { useShowBalance } from "../hooks/useShowBalance";
import Loader from "../components/Loader";


const Deposit = () => {

  const {data: balance, isPending: isLoadingBalance} = useShowBalance();
  const userBalance = balance?.data.userBalance;

  if(isLoadingBalance) return <Loader />

  return (
    <div className="deposit">
      <div className="deposit_intro">
        <div className="deposit_intro_left">
          <div className="deposit_intro_left_name">Investment plans</div>
        </div>
        <div className="deposit_intro_right">
          <div className="deposit_intro_right_refferal">Available balance</div>
          <div className="deposit_intro_right_code">{formatMoney(userBalance as number)}</div>
        </div>
      </div>

      <div className="deposit_make">
        <div>Make a deposit</div>
      </div>

      <div className="deposit_depositCard">
        {investmentPlans.map((plan)=>(<DepositCard plan={plan} key={plan.name}/>))}
      </div>

      <div className="deposit_depositForm">
        <DepositForm />
      </div>
    </div>
  );
};

export default Deposit;