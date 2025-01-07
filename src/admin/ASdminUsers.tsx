
import "../styles/admin/AdminForm.scss";

function AdminUsers() {

    return (
        <div className="confirm_deposit">
            <div className="confirm_deposit_title">
                Users
            </div>
            <div className="confirm_deposit_address">
                See all users
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
                    <tr>
                        <td>King</td>
                        <td>67% Daily for uration</td>
                        <td>Yes</td>
                        <td>Available with 0.00% fee lorgkregkjerjhnh;rwgreththhktnk</td>
                        <td>$560</td>
                        <td className="actions">
                            <button className="actions_delete_button">Decline</button>
                            <button className="actions_approve_button">Approve</button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AdminUsers;
