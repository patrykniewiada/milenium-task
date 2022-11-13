import {TransactionActionStatusEnum, TransactionFetchStatusEnum} from "../../types/enums";

export const fetchTransactions: TransactionState = {
    transactions: [
        {
            id: 0,
            description: "new transaction 1",
            address: "new transaction address 1",
            account: "new transaction account 1",
            beneficiary: "new transaction beneficiary 1",
            date: "2022-11-12T16:20:37.285Z",
            amount: 1
        },
        {
            id: 1,
            description: "new transaction 2",
            address: "new transaction address 2",
            account: "new transaction account 2",
            beneficiary: "new transaction beneficiary 2",
            date: "2022-11-12T16:20:37.285Z",
            amount: 2
        }
    ],
    fetch_status: TransactionFetchStatusEnum.FETCH_SUCCESS,
    action_status: TransactionActionStatusEnum.ACTION_PENDING,
    action_msg: "",
    fetch_msg: ""
};