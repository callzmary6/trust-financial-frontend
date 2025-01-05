export interface DepositBody {
    amount: number;
    investmentPlan: string;
    paymentMethod: string;
    payerAddress: string;
    transactionId: string;
}


 export interface WithdrawData {
    walletAddress: string;
    amount: number;
    withdrawalMethod: string;
}