import "../styles/components/DepositCard.scss";
import { formatMoney } from "../utils/moneyUtils";

interface Plans {
    name: string;
    ROI: number;
    duration: string;
    referralCommission: string;
    minDeposit: number;
    maxDeposit: number | string;
}

interface DepositCardProps {
    plan: Plans
}

function DepositCard({plan}: DepositCardProps) {
    const {name, ROI, duration, referralCommission, minDeposit, maxDeposit} = plan;
    return (
        <div className="deposit_card">
            <div className="deposit_card_plan">
                {name}
            </div>
            {maxDeposit==="Unlimited" &&
            <div className="deposit_card_deposit">
                Deposit: {formatMoney(minDeposit)} - {maxDeposit} 
            </div>}
            {maxDeposit!=="Unlimited" &&
            <div className="deposit_card_deposit">
                Deposit: {formatMoney(minDeposit)} - {formatMoney(maxDeposit as number)} 
            </div>}
            <div className="deposit_card_deposit">
                Total Profit: {ROI} (%) After {duration}
            </div>
            <div className="deposit_card_deposit">
                Referral Commission: {referralCommission}
            </div>
        </div>
    )
}

export default DepositCard;