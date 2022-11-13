import React from 'react';
import * as reactRedux from 'react-redux'
import {render, screen} from '@testing-library/react';
import Balance from '../Balance';


const renderUI = () => {
    return render(<Balance/>);
};

jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useSelector: jest.fn()
}));

describe('Balance component test', () => {
    const useSelectorMock = jest.spyOn(reactRedux, 'useSelector')
    const useDispatchMock = jest.spyOn(reactRedux, 'useDispatch')
    beforeEach(() => {
        useSelectorMock.mockClear()
        useDispatchMock.mockClear()
    });
    it('Positive balance', () => {
        useSelectorMock.mockReturnValue([
            {
                id: 0,
                description: "new transaction 1",
                address: "new transaction address 1",
                account: "new transaction account 1",
                beneficiary: "new transaction beneficiary 1",
                date: "2022-11-12T16:20:37.285Z",
                amount: 100
            },
            {
                id: 1,
                description: "new transaction 2",
                address: "new transaction address 2",
                account: "new transaction account 2",
                beneficiary: "new transaction beneficiary 2",
                date: "2022-11-12T16:20:37.285Z",
                amount: 200
            }
        ]);

        renderUI();

        expect(screen.getByTestId("balance").innerHTML).toEqual("300.00");
        expect(screen.getByTestId("balance").style.color).toEqual("green");
    });

    it('Negative balance', () => {
        useSelectorMock.mockReturnValue([
            {
                id: 0,
                description: "new transaction 1",
                address: "new transaction address 1",
                account: "new transaction account 1",
                beneficiary: "new transaction beneficiary 1",
                date: "2022-11-12T16:20:37.285Z",
                amount: 100
            },
            {
                id: 1,
                description: "new transaction 2",
                address: "new transaction address 2",
                account: "new transaction account 2",
                beneficiary: "new transaction beneficiary 2",
                date: "2022-11-12T16:20:37.285Z",
                amount: -200
            }
        ]);

        renderUI();

        expect(screen.getByTestId("balance").innerHTML).toEqual("-100.00");
        expect(screen.getByTestId("balance").style.color).toEqual("red");
    });
});