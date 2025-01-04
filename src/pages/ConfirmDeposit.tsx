import PaymentForm from "../components/PaymentForm";
import { investmentPlans } from "../data/investmentPlans";
import "../styles/pages/ConfirmDeposit.scss";
import { formatMoney } from "../utils/moneyUtils";

interface SelectedPlanProps {
    name: string;
    ROI: number;
    duration: string;
    referralCommission: string;
    minDeposit: number;
    maxDeposit: number | string;
}

function ConfirmDeposit() {

    const paymentInformation = localStorage?.getItem?.("paymentInfo");

    const paymentInfo = JSON.parse(paymentInformation as string);

    console.log(paymentInfo)

    function getPlanByName(planName: string) {
        return investmentPlans.find(plan => plan.name === planName);
    }

    const selectedPlan: SelectedPlanProps | undefined= getPlanByName(paymentInfo.investmentPlan);

    const {name, ROI, duration } = selectedPlan as SelectedPlanProps;

    return (
        <div className="confirm_deposit">
            <div className="confirm_deposit_title">
                Please confirm your deposit
            </div>
            <div className="confirm_deposit_copy">
            COPY THE COMPANY {paymentInfo.crypto?.toUpperCase()} WALLET ADDRESS FOR PAYMENT :
            </div>
            <div className="confirm_deposit_address">
                0x5926564247BEFF0A78fdCe027446E8d2e5bBE754
            </div>


            <div className="table-container">
                <table>
                    <thead>
                    <tr>
                        <th>Plan</th>
                        <th>Profit</th>
                        <th>Principal Return</th>
                        <th>Principal Withdraw</th>
                        {/* <th>Credit Amount</th> */}
                        <th>Deposit</th>
                        {/* <th>Debit Amount</th> */}
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>{name}</td>
                        <td>{ROI}% Daily for {duration}</td>
                        <td>Yes</td>
                        <td>Available with 0.00% fee</td>
                        {/* <td>$5000.00</td> */}
                        <td>{formatMoney(paymentInfo.amount as number)}</td>
                        {/* <td>___</td> */}
                    </tr>
                    </tbody>
                </table>

                <PaymentForm />
            </div>
        </div>
    )
}

export default ConfirmDeposit;