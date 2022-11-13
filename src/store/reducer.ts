import * as actionTypes from "./actionTypes"
import {TransactionFetchStatusEnum, TransactionActionStatusEnum} from "../types/enums";

const initialState: TransactionState = {
    transactions: [],
    fetch_status: TransactionFetchStatusEnum.FETCH_PENDING,
    action_status: TransactionActionStatusEnum.ACTION_PENDING,
    action_msg: ""
}

const reducer = (
    state: TransactionState = initialState,
    action: TransactionAction
): TransactionState => {
    switch (action.type) {
        case actionTypes.ADD_TRANSACTION:
            const newTransaction = action.payload as ITransaction;
            return {
                ...state,
                transactions: [...state.transactions, newTransaction],
                action_status: action.status,
                action_msg: action.msg
            };
        case actionTypes.REMOVE_TRANSACTION:
            const transactionToDelete = action.payload as ITransaction;
            const updatedTransactions: ITransaction[] = state.transactions.filter(
                transaction => transaction.id !== transactionToDelete.id
            )
            return {
                ...state,
                transactions: updatedTransactions,
                action_status: action.status,
                action_msg: action.msg
            };
        case actionTypes.PUSH_TRANSACTIONS:
            const fetchedTransactions = action.payload as ITransaction[];
            return {
                ...state,
                transactions: fetchedTransactions,
                fetch_status: action.status,
                fetch_msg: action.msg
            };
    }
    return state;
}

export default reducer;