
import Loader from "../components/Loader";
import { useAdminDeposit } from "../hooks/useAdminDeposit";
import "../styles/admin/AdminForm.scss";
import DepositTableData, { Deposit } from "./DepositTableData";


function AdminDashboard() {

    const { data, isPending } = useAdminDeposit();

    if (isPending) return <Loader />

    const allDeposits: Deposit[] | undefined = data?.data;
    
    return (
        <div className="confirm_deposit">
            <div className="confirm_deposit_title">
                Deposits
            </div>
            <div className="confirm_deposit_address">
            Approve or decline all deposit requests.
            </div>


            <div className="table-container">
                <table>
                    <thead>
                    <tr>
                        <th>User</th>
                        <th>Date</th>
                        <th>Plan</th>
                        <th>Payer Address</th>
                        <th>Amount</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                        {allDeposits?.map((deposit)=> <DepositTableData key={deposit._id} deposits={deposit}/>)}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AdminDashboard;
