import React from 'react';
import {shallowEqual, useSelector} from "react-redux";

const Balance = () => {
    const transactions: readonly ITransaction[] = useSelector(
        (state: TransactionState) => state.transactions,
        shallowEqual
    );

    const balance = transactions.reduce(
        (total, transaction) => total += transaction.amount, 0
    );

    const isLessThanZero = balance < 0;

    return (
        <div>
            Balance: <h2 data-testid="balance" style={{color: isLessThanZero ? "red" : "green"}}>{balance.toFixed(2)}</h2>
        </div>
    );
};

export default Balance;