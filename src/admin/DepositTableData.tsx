import { SyncLoader } from "react-spinners";
import { formatDateWithTime } from "../utils/timeUtils";
import { useApproveDeposit } from "../hooks/useApproveDeposit";

interface User {
    _id: string;
    firstName: string;
    lastName: string;
}

export interface Deposit {
    _id: string;
    user: User;
    amount: number;
    investmentPlan: string;
    paymentMethod: string;
    payerAddress: string;
    transactionId: string;
    isPending: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

interface DepositTableProps {
    deposits: Deposit;
}

const override = {
    display: 'block',
    margin: '0 auto',
};


export default function DepositTableData({ deposits }: DepositTableProps) {
    const {approveDeposit, isApprovingDeposit} = useApproveDeposit()
    
    function handleApprove() {
        approveDeposit(deposits._id)
    }

    return (
        <tr>
            <td>{`${deposits.user.firstName} ${deposits.user.lastName}`}</td>
            <td>{formatDateWithTime(deposits.createdAt)}</td>
            <td>{deposits.investmentPlan}</td>
            <td>{deposits.payerAddress}</td>
            <td>${deposits.amount}</td>
            <td className="actions">
                {/* <button className="actions_delete_button">Decline</button> */}
                <button className={`${deposits.isPending? "actions_approve_button": "actions_done"}`} onClick={handleApprove} disabled={isApprovingDeposit || !deposits.isPending}>
                    {isApprovingDeposit ? (
                    <SyncLoader
                    role="loader"
                    color="#ffffff"
                    cssOverride={override}
                    size="0.7rem"
                    aria-label="Loading Spinner"
                    />
                    ) : (
                        deposits.isPending? 'Approve' : 'Approved'
                    )}
                </button>
            </td>
        </tr>
    );
}