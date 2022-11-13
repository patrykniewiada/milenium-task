import reducer from '../reducer';
import {TransactionActionStatusEnum, TransactionFetchStatusEnum} from "../../types/enums";
import * as actionTypes from "../actionTypes";
import {addTransactionState} from "../mocks/addTransaction";
import {initialState} from "../mocks/initialState";
import {removeTransaction} from "../mocks/removeTransaction";
import {fetchTransactions} from "../mocks/fetchTransactions";

describe("Reducer tests", () => {
    it("Add transaction", () => {
        const action: TransactionAction = {
            type: actionTypes.ADD_TRANSACTION,
            payload: {
                id: 1,
                description: "new transaction",
                address: "new transaction address",
                account: "new transaction account",
                beneficiary: "new transaction beneficiary",
                date: "2022-11-12T16:20:37.285Z",
                amount: 1
            },
            status: TransactionActionStatusEnum.ACTION_SUCCESS,
            msg: ''
        };
        expect(reducer(initialState, action)).toEqual(addTransactionState);
    });
    it("Remove transaction", () => {
        const action: TransactionAction = {
            type: actionTypes.REMOVE_TRANSACTION,
            payload: {
                id: 0,
                description: "new transaction",
                address: "new transaction address",
                account: "new transaction account",
                beneficiary: "new transaction beneficiary",
                date: "2022-11-12T16:20:37.285Z",
                amount: 1
            },
            status: TransactionActionStatusEnum.ACTION_SUCCESS,
            msg: ''
        };
        expect(reducer(initialState, action)).toEqual(removeTransaction);
    });
    it("Push transactions", () => {
        const action: TransactionAction = {
            type: actionTypes.PUSH_TRANSACTIONS,
            payload: [
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
            status: TransactionFetchStatusEnum.FETCH_SUCCESS,
            msg: ''
        };

        expect(reducer(initialState, action)).toEqual(fetchTransactions);
    });
});