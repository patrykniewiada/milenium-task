import {TransactionActionStatusEnum, TransactionFetchStatusEnum} from "../../types/enums";

export const addTransactionState: TransactionState = {
    transactions: [
        {
            id: 0,
            amount: -2008.75,
            beneficiary: "Callie Nieves",
            account: "PL10104092290785174000000000",
            address: "185 Berkeley Place, Brady, West Virginia, 7409",
            date: "2021-12-15T01:05:42",
            description: "Amet amet qui proident sint esse adipisicing amet."
        },
        {
            id: 1,
            description: "new transaction",
            address: "new transaction address",
            account: "new transaction account",
            beneficiary: "new transaction beneficiary",
            date: "2022-11-12T16:20:37.285Z",
            amount: 1
        }
    ],
    fetch_status: TransactionFetchStatusEnum.FETCH_PENDING,
    action_status: TransactionActionStatusEnum.ACTION_SUCCESS,
    action_msg: ""
};