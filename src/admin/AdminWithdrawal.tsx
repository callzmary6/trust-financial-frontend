import "../styles/admin/AdminForm.scss";
import WithdrawalTableData from "./WithdrawalTableData";

function Adminwithdrawal() {

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
                        <th>Plan</th>
                        <th>Recipient Address</th>
                        <th>Token</th>
                        <th>Amount</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                        <WithdrawalTableData />
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Adminwithdrawal;
