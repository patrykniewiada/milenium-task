type TransactionFetchStatusType = TransactionStatusEnum.FETCH_PENDING | TransactionStatusEnum.FETCH_SUCCESS | TransactionStatusEnum.FETCH_ERROR ;
type TransactionActionStatusType = TransactionStatusEnum.ACTION_PENDING | TransactionStatusEnum.ACTION_SUCCESS | TransactionStatusEnum.ACTION_ERROR ;

interface ITransaction {
    id?: number
    amount: number
    beneficiary: string
    account: string
    address: string
    date?: string
    description: string
}

type TransactionState = {
    transactions: ITransaction[]
    fetch_status?: TransactionFetchStatusType
    fetch_msg?: string
    action_status?: TransactionActionStatusType
    action_msg?: string
}

type TransactionAction = {
    type: string
    payload: ITransaction | ITransaction[]
    fetch_status?: TransactionFetchStatusType
    status?: TransactionActionStatusType
    msg?: string
}

type DispatchType = (args: TransactionAction) => TransactionAction