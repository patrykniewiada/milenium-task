import React, {Dispatch, useCallback, useState} from 'react';
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {TransactionFetchStatusEnum} from "../../types/enums";
import ListMessage from "../ListMessage/ListMessage";
import {removeTransactionAction} from "../../store/actionCreators";
import {Button, Col, Row, Table} from "react-bootstrap";
import ReactPaginate from "react-paginate";
type ListProps = {
    filterValue: string
}
const List = ({filterValue} : ListProps) => {

    const dispatch: Dispatch<any> = useDispatch();
    const transactions: readonly ITransaction[] = useSelector(
        (state: TransactionState) => state.transactions,
        shallowEqual
    );

    const [itemOffset, setItemOffset] = useState(0);
    const transactionsToDisplay = transactions.filter(transaction => transaction.beneficiary.includes(filterValue));
    const itemsPerPage = 20;
    const endOffset = itemOffset + itemsPerPage;
    const paginatedTransactions = transactionsToDisplay.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(transactionsToDisplay.length / itemsPerPage);

    const handlePageClick = (e?: { selected: number }) => {
        if (!e) {
            e = {selected: 1};
        }
        setItemOffset((e.selected * itemsPerPage) % transactionsToDisplay.length);
    };

    const fetchStatus: TransactionFetchStatusType = useSelector(
        (state: TransactionState) => state.fetch_status,
        shallowEqual
    );

    const removeTransaction = useCallback(
        (transaction: ITransaction) => dispatch(removeTransactionAction(transaction)
        ), [dispatch]);

    switch (fetchStatus) {
        case TransactionFetchStatusEnum.FETCH_PENDING:
            return <ListMessage msg="Wait unit data will load"/>;
        case TransactionFetchStatusEnum.FETCH_ERROR:
            return <ListMessage msg="Error while fetching data, please try again later"/>
    }

    return (
        <div className="paginationComponent">
            <Row>
                <Col sm={12} className="justify-content-center align-items-center">
                    <Table striped bordered hover size="sm">
                        <thead>
                        <tr>
                            <th>#</th>
                            {/*<th>Account</th>*/}
                            <th>Beneficiary</th>
                            <th>Address</th>
                            <th>Date</th>
                            <th>Description</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody data-testid="table-body">
                        {paginatedTransactions.map(transaction => <tr key={transaction.id}>
                            <td>{transaction.id}</td>
                            {/*<td>{transaction.account}</td>*/}
                            <td>{transaction.beneficiary}</td>
                            <td>{transaction.address}</td>
                            <td>{transaction.date}</td>
                            <td>{transaction.description}</td>
                            <td>
                                <Button variant="primary" onClick={e => {
                                    e.preventDefault();
                                    removeTransaction(transaction);
                                }}>
                                    Delete
                                </Button>
                            </td>
                        </tr>)}
                        </tbody>
                    </Table>
                    <ReactPaginate
                        nextLabel=">"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={3}
                        marginPagesDisplayed={2}
                        pageCount={pageCount}
                        previousLabel="<"
                        pageClassName="page-item"
                        pageLinkClassName="page-link"
                        previousClassName="page-item"
                        previousLinkClassName="page-link"
                        nextClassName="page-item"
                        nextLinkClassName="page-link"
                        breakLabel="..."
                        breakClassName="page-item"
                        breakLinkClassName="page-link"
                        containerClassName="pagination pagination-sm mb-0"
                        activeClassName="active"
                    />
                </Col>
            </Row>
        </div>
    );
};

export default List;