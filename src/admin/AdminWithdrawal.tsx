import { useAdminWithdraw } from "../hooks/useAdminWithdrwal";
import "../styles/admin/AdminForm.scss";
import WithdrawalTableData from "./WithdrawalTableData";
import Loader from "../components/Loader";

function Adminwithdrawal() {
    const {data: withdrawData, isPending } = useAdminWithdraw();

    if (isPending) return <Loader />

    return (
        <div className="confirm_deposit">
            <div className="confirm_deposit_title">
                Withdrawals
            </div>
            <div className="confirm_deposit_address">
                Approve or decline withdrawal requests.
            </div>

            <div className="table-container">
                <table>
                    <thead>
                    <tr>
                        <th>User</th>
                        <th>Date</th>
                        <th>Recipient Address</th>
                        <th>Token</th>
                        <th>Amount</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                        {withdrawData?.map((data)=> (<WithdrawalTableData key={data._id} data={data}/>))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Adminwithdrawal;
