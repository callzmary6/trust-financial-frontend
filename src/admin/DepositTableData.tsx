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

const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

export default function DepositTableData({ deposits }: DepositTableProps) {
    console.log(deposits);
    return (
        <tr>
            <td>{`${deposits.user.firstName} ${deposits.user.lastName}`}</td>
            <td>{formatDate(deposits.createdAt)}</td>
            <td>{deposits.investmentPlan}</td>
            <td>{deposits.payerAddress}</td>
            <td>${deposits.amount}</td>
            <td className="actions">
                <button className="actions_delete_button">Decline</button>
                <button className="actions_approve_button">Approve</button>
            </td>
        </tr>
    );
}