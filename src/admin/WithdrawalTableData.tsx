import { SyncLoader } from "react-spinners";
import { useApproveWithdrawal } from "../hooks/useApproveWithdrawal";
import { Withdrawal } from "../services/apiAdmin";
import { formatMoney } from "../utils/moneyUtils";
import { formatDateWithTime } from "../utils/timeUtils";

interface WithdrawalTableDataProps {
    data: Withdrawal;
}

const override = {
    display: 'block',
    margin: '0 auto',
};

export default function WithdrawalTableData({data}: WithdrawalTableDataProps) {
    const {user: {firstName, lastName}, amount, walletAddress, withdrawalMethod, isPending, createdAt, _id: id} = data;
    const {approveWithdrawal, isApprovingWithdrawal} = useApproveWithdrawal()

    function handleApprove() {
        approveWithdrawal(id)
    }

    return (
        <tr>
            <td>{firstName} {lastName}</td>
            <td>{formatDateWithTime(createdAt)}</td>
            <td>{walletAddress}</td>
            <td>{withdrawalMethod}</td>
            <td>{formatMoney(amount)}</td>
            <td className="actions">
                {/* <button className="actions_delete_button">Decline</button> */}
                <button className={`${isPending? "actions_approve_button": "actions_done"}`} onClick={handleApprove} disabled={isApprovingWithdrawal || !isPending}>
                    {isApprovingWithdrawal ? (
                    <SyncLoader
                    role="loader"
                    color="#ffffff"
                    cssOverride={override}
                    size="0.7rem"
                    aria-label="Loading Spinner"
                    />
                    ) : (
                        isPending? 'Approve' : 'Approved'
                    )}
                </button>
            </td>
        </tr>
    )
}