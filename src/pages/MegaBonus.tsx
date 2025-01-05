import "../styles/pages/Deposit.scss";
import DepositCard from "../components/DepositCard";
import Loader from "../components/Loader";
import { megaPlans } from "../data/investmentPlans";
import { useShowBalance } from "../hooks/useShowBalance";
import { formatMoney } from "../utils/moneyUtils";
import MegaDepositForm from "../components/MegaDepositForm";

function MegaBonus() {
    const {data: balance, isPending: isLoadingBalance} = useShowBalance();
  const userBalance = balance?.data.userBalance;

  if(isLoadingBalance) return <Loader />
    return (
        <div className="deposit">
      <div className="deposit_intro">
        <div className="deposit_intro_left">
          <div className="deposit_intro_left_name">Mega plans</div>
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
        {megaPlans.map((plan)=>(<DepositCard plan={plan} key={plan.name} megaPlan={true}/>))}
      </div>

      <div className="deposit_depositForm">
        <MegaDepositForm/>
      </div>
    </div>
    )
}

export default MegaBonus;