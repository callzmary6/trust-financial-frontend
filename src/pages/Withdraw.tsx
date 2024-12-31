import "../styles/pages/Withdraw.scss";
import { formatMoney } from "../utils/moneyUtils";


const Withdraw = () => {

  return (
    <div className="withdraw">
      <div className="withdraw_intro">
        <div className="withdraw_intro_left">
          <div className="withdraw_intro_left_name">Withdraw funds</div>
        </div>
        <div className="withdraw_intro_right">
          <div className="withdraw_intro_right_refferal">Available balance</div>
          <div className="withdraw_intro_right_code">{formatMoney(1200)}</div>
        </div>
      </div>

      <div className="withdraw_make">
        <div>Ask for withdrawal</div>
      </div>
    </div>
  );
};

export default Withdraw;