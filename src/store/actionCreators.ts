import * as actionTypes from "./actionTypes"
import {
    sendAddTransactionReq,
    sendFetchTransactionsDataReq,
    sendRemoveTransactionReq
} from "../api/transactions";
import {TransactionFetchStatusEnum, TransactionActionStatusEnum} from "../types/enums";

export function addTransactionAction(transaction: ITransaction) {
    return function (dispatch: DispatchType) {
        return sendAddTransactionReq(transaction)
            .then( (res) => {
                dispatch({
                    type: actionTypes.ADD_TRANSACTION,
                    payload: {
                        ...transaction,
                        id: res.id
                    },
                    status: TransactionActionStatusEnum.ACTION_SUCCESS,
                    msg: ""
                });
            })
            .catch(err => {
                dispatch({
                    type: actionTypes.ADD_TRANSACTION,
                    payload: [],
                    status: TransactionActionStatusEnum.ACTION_ERROR,
                    msg: err.message
                });
            });
    }
}

export function removeTransactionAction(transaction: ITransaction) {
    return function (dispatch: DispatchType) {
        return sendRemoveTransactionReq(transaction.id ?? -1)
            .then(resp => {
                dispatch({
                    type: actionTypes.REMOVE_TRANSACTION,
                    payload: transaction,
                    status: TransactionActionStatusEnum.ACTION_SUCCESS,
                    msg: ""
                });
            })
            .catch(err => {
                dispatch({
                    type: actionTypes.REMOVE_TRANSACTION,
                    payload: {
                        id: -1,
                        account: "",
                        address: "",
                        amount: 0,
                        date: "",
                        beneficiary: "",
                        description: ""
                    },
                    status: TransactionActionStatusEnum.ACTION_ERROR,
                    msg: err.message
                });
            });
    }
}

export function pushTransactionsAction() {
    return function (dispatch: DispatchType) {
        return sendFetchTransactionsDataReq()
            .then(transactions => {
                dispatch({
                    type: actionTypes.PUSH_TRANSACTIONS,
                    payload: transactions,
                    status: TransactionFetchStatusEnum.FETCH_SUCCESS,
                    msg: ""
                });
            })
            .catch((err: Error) => {
                dispatch({
                    type: actionTypes.PUSH_TRANSACTIONS,
                    payload: [],
                    status: TransactionFetchStatusEnum.FETCH_ERROR,
                    msg: err.message
                });
            });
    }
}
