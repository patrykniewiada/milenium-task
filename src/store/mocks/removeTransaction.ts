import {TransactionActionStatusEnum, TransactionFetchStatusEnum} from "../../types/enums";

export const removeTransaction: TransactionState = {
    transactions: [],
    fetch_status: TransactionFetchStatusEnum.FETCH_PENDING,
    action_status: TransactionActionStatusEnum.ACTION_SUCCESS,
    action_msg: ""
};