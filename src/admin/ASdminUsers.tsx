
import Loader from "../components/Loader";
import { useAdminUsers } from "../hooks/useAdminUsers";
import "../styles/admin/AdminForm.scss";
import UsersTableData from "./UsersTableData";

function AdminUsers() {

    const {data: users, isPending} = useAdminUsers();

    if(isPending) return <Loader />
    
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
                            <th>Email</th>
                            <th>Refferals</th>
                            <th>Balance</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users?.map((user)=> <UsersTableData key={user._id} user={user}/>)}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AdminUsers;
