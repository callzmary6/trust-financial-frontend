import { SyncLoader } from "react-spinners";
import { formatDateWithTime } from "../utils/timeUtils";
import { User } from "../services/apiAccount";
import { formatMoney } from "../utils/moneyUtils";
import { useFreezeAccount } from "../hooks/useFreezeAccount";
import { useDeleteUser } from "../hooks/useDeleteUser";

const override = {
    display: 'block',
    margin: '0 auto',
};

interface UsersTableDataProps {
    user: User;
}

export default function UsersTableData({ user }: UsersTableDataProps) {

    const {balance, createdAt, email, firstName, lastName, isSuspended, referralCount, _id:id} = user;
    const { isFreezingAccount, freeze } = useFreezeAccount();
    const { isDeletingUser, deleteUser } = useDeleteUser();
    

    function handleFreeze() {
        freeze(id)
    }

    function handleDeleteUser() {
        deleteUser(id)
    }

    return (
        <tr>
            <td>{firstName} {lastName}</td>
            <td>{formatDateWithTime(createdAt)}</td>
            <td>{email}</td>
            <td>{referralCount}</td>
            <td>{formatMoney(balance)}</td>
            <td className="actions">
                <button className="actions_delete_button" disabled={isDeletingUser} onClick={handleDeleteUser}>
                    {isDeletingUser ? (
                    <SyncLoader
                    role="loader"
                    color="#ffffff"
                    cssOverride={override}
                    size="0.7rem"
                    aria-label="Loading Spinner"
                    />
                    ) : (
                        'Delete'
                    )}
                </button>

                <button className={`${!isSuspended? "actions_approve_button": "actions_freeze"}`} disabled={isFreezingAccount} onClick={handleFreeze}>
                    {isFreezingAccount ? (
                    <SyncLoader
                    role="loader"
                    color="#ffffff"
                    cssOverride={override}
                    size="0.7rem"
                    aria-label="Loading Spinner"
                    />
                    ) : (
                        isSuspended ? 'Unfreeze' : 'Freeze'
                    )}
                </button>
            </td>
        </tr>
    );
}