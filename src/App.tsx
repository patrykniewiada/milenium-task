import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {Dispatch, useCallback, useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {pushTransactionsAction} from "./store/actionCreators";
import List from "./components/List/List";
import AddTransaction from "./components/AddTransaction/AddTransaction";
import {Col, Container, Row, ThemeProvider} from "react-bootstrap";
import {ToastContainer} from "react-toastify";
import Balance from "./components/Balance/Balance";
import Filter from "./components/Filter/Filter";

const App = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const pushTransactions = useCallback(
        () => dispatch(pushTransactionsAction()),
        [dispatch]
    );
    const [filterValue, setFilterValue] = useState<string>("");

    useEffect(() => {
        pushTransactions();
    }, []);

    const handleFilterValue = (value: string) => {
        setFilterValue(value);
    }

    return (
        <>
            <ThemeProvider
                breakpoints={['xxl', 'xl', 'lg', 'md', 'sm']}
                minBreakpoint="sm"
            >
                <ToastContainer/>
                <Container>
                    <Row className="mb-5">
                        <Col sm={12}><h1>Example header</h1></Col>
                    </Row>
                    <Row className="mb-5">
                        <Col sm={12}>

                            <Row className="mb-5">
                                <Col sm={12} lg={6}
                                     className="d-flex flex-column justify-content-between order-sm-2 order-lg-1">
                                    <Balance/>
                                    <Filter filterValue={filterValue} setFilterValue={handleFilterValue}/>
                                </Col>
                                <Col sm={12} lg={6}
                                     className="order-sm-1 order-lg-2">
                                    <AddTransaction/>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={12}>
                                    <List filterValue={filterValue}/>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={12}><h3>Example footer</h3></Col>
                    </Row>
                </Container>
            </ThemeProvider>;
        </>
    );
};

export default App;