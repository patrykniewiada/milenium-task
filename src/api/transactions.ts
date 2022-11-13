export const sendFetchTransactionsDataReq = (): Promise<ITransaction[]> => {
    return fetch("http://localhost:3001/transactions")
        .then(res => {
            if(![200, 201].includes(res.status)) {
                throw Error(res.statusText);
            }
            return res.json();
        });
}

export const sendRemoveTransactionReq = (id: number): Promise<{}> => {
    return fetch(`http://localhost:3001/transactions/${id}`, {
        method: "DELETE"
    }).then(res => {
        if(![200, 201].includes(res.status)) {
            throw Error(res.statusText);
        }
        return res.json();
    });
}

export const sendAddTransactionReq = (transaction: ITransaction): Promise<{ id: number }> => {
    return fetch(`http://localhost:3001/transactions`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(transaction)
    }).then(res => {
        if(![200, 201].includes(res.status)) {
            throw Error(res.statusText);
        }
        return res.json();
    });
}