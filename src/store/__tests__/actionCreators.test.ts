import {addTransactionAction, pushTransactionsAction, removeTransactionAction} from "../actionCreators";
import * as APIReq from "../../api/transactions";
import {TransactionActionStatusEnum, TransactionFetchStatusEnum} from "../../types/enums";
import {ADD_TRANSACTION, PUSH_TRANSACTIONS, REMOVE_TRANSACTION} from "../actionTypes";
import {sendFetchTransactionsDataReq} from "../mocks/sendFetchTransactionsDataReq";

describe("Action creators tests", () => {
    const dispatch = jest.fn();

    beforeEach(() => {
        jest.spyOn(Date.prototype, 'toISOString').mockReturnValue('2021-12-15T01:05:42');

        jest.spyOn(APIReq, "sendAddTransactionReq")
            .mockResolvedValueOnce({id: 1})
            .mockRejectedValueOnce(new Error('Mocked error'));

        jest.spyOn(APIReq, "sendRemoveTransactionReq")
            .mockResolvedValueOnce({})
            .mockRejectedValueOnce(new Error('Mocked error'));

        jest.spyOn(APIReq, "sendFetchTransactionsDataReq")
            .mockResolvedValueOnce(sendFetchTransactionsDataReq)
            .mockRejectedValueOnce(new Error('Mocked error'));
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("Add transaction", async () => {
        await addTransactionAction({
            description: "new transaction",
            address: "new transaction address",
            account: "new transaction account",
            beneficiary: "new transaction beneficiary",
            date: new Date().toISOString(),
            amount: 1
        })(dispatch);

        await addTransactionAction({
            description: "new transaction",
            address: "new transaction address",
            account: "new transaction account",
            beneficiary: "new transaction beneficiary",
            date: "",
            amount: 1
        })(dispatch);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
            msg: "",
            payload: {
                description: "new transaction",
                address: "new transaction address",
                account: "new transaction account",
                beneficiary: "new transaction beneficiary",
                date: "2021-12-15T01:05:42",
                amount: 1,
                id: 1
            },
            status: TransactionActionStatusEnum.ACTION_SUCCESS,
            type: ADD_TRANSACTION
        });

        expect(dispatch).toHaveBeenNthCalledWith(2, {
            msg: "Mocked error",
            payload: [],
            status: TransactionActionStatusEnum.ACTION_ERROR,
            type: ADD_TRANSACTION
        });
    });

    it("Remove transaction", async () => {
        await removeTransactionAction({
            id: 1,
            description: "new transaction",
            address: "new transaction address",
            account: "new transaction account",
            beneficiary: "new transaction beneficiary",
            date: "",
            amount: 1
        })(dispatch);

        await removeTransactionAction({
            id: 1,
            description: "new transaction",
            address: "new transaction address",
            account: "new transaction account",
            beneficiary: "new transaction beneficiary",
            date: "",
            amount: 1
        })(dispatch);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
            msg: "",
            payload: {
                id: 1,
                description: "new transaction",
                address: "new transaction address",
                account: "new transaction account",
                beneficiary: "new transaction beneficiary",
                date: "",
                amount: 1
            },
            status: TransactionActionStatusEnum.ACTION_SUCCESS,
            type: REMOVE_TRANSACTION
        });

        expect(dispatch).toHaveBeenNthCalledWith(2, {
            msg: "Mocked error",
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
            type: REMOVE_TRANSACTION
        });
    });

    it("Push transaction", async () => {
        await pushTransactionsAction()(dispatch);
        await pushTransactionsAction()(dispatch);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
            msg: "",
            payload: sendFetchTransactionsDataReq,
            status: TransactionFetchStatusEnum.FETCH_SUCCESS,
            type: PUSH_TRANSACTIONS
        });

        expect(dispatch).toHaveBeenNthCalledWith(2, {
            msg: "Mocked error",
            payload: [],
            status: TransactionFetchStatusEnum.FETCH_ERROR,
            type: PUSH_TRANSACTIONS
        });
    });
})