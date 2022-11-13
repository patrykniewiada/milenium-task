import React from 'react';
import * as reactRedux from 'react-redux'
import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import AddTransaction from '../AddTransaction';
import * as actionCreators from "../../../store/actionCreators";

const renderUI = () => {
    return render(<AddTransaction/>);
};

jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useSelector: jest.fn()
}));

const spyMock = () => {
    jest.spyOn(Date.prototype, 'toISOString').mockReturnValue('2021-12-15T01:05:42');
    const dispatch = jest.fn();
    const useDispatchMock = jest.spyOn(reactRedux, 'useDispatch')
    useDispatchMock.mockReturnValue(dispatch);

    return jest.spyOn(actionCreators, 'addTransactionAction');
}


describe('Balance component test', () => {
    it('Success send', async () => {
        const addTransactionMock = spyMock();
        renderUI();
        const description: HTMLInputElement = screen.getByTestId("description");
        const address: HTMLInputElement = screen.getByTestId("address");
        const account: HTMLInputElement = screen.getByTestId("account");
        const beneficiary: HTMLInputElement = screen.getByTestId("beneficiary");
        const amount: HTMLInputElement = screen.getByTestId("amount");
        const submit: HTMLButtonElement = screen.getByTestId("submit-form");

        fireEvent.change(description, { target: { value: 'typed description' } });
        await waitFor(() => {
            expect(description.value).toBe('typed description');
        });

        fireEvent.change(address, { target: { value: 'typed address' } });
        await waitFor(() => {
            expect(address.value).toBe('typed address');
        });

        fireEvent.change(account, { target: { value: '123123123' } });
        await waitFor(() => {
            expect(account.value).toBe('123123123');
        });

        fireEvent.change(beneficiary, { target: { value: 'typed beneficiary' } });
        await waitFor(() => {
            expect(beneficiary.value).toBe('typed beneficiary');
        });

        fireEvent.change(amount, { target: { value: '10000' } });
        await waitFor(() => {
            expect(amount.value).toBe('10000');
        });

        fireEvent.click(submit);

        await waitFor(() => {
            expect(addTransactionMock).toBeCalledWith({
                account: "123123123",
                address: "typed address",
                amount: 10000,
                beneficiary: "typed beneficiary",
                date: "2021-12-15T01:05:42",
                description: "typed description",
            });
        });
    });

    it('Fail send', async () => {
        const addTransactionMock = spyMock();
        renderUI();
        const submit: HTMLButtonElement = screen.getByTestId("submit-form");

        fireEvent.click(submit);

        await waitFor(() => {
            expect(addTransactionMock).toBeCalledTimes(0);
        });
    });
});