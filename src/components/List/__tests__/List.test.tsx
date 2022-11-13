import React from 'react';
import * as reactRedux from 'react-redux'
import {render, screen} from '@testing-library/react';
import List from '../List';
import {TransactionFetchStatusEnum} from "../../../types/enums";

type ComponentProps = React.ComponentProps<typeof List>;
const defaultProps: ComponentProps = {
    filterValue: ""
};

const renderUI = (props?: Partial<ComponentProps>) => {
    return render(<List {...defaultProps} {...props}/>);
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
    it('Pending for data', () => {
        useSelectorMock
            .mockReturnValueOnce([])
            .mockReturnValueOnce(TransactionFetchStatusEnum.FETCH_PENDING);

        renderUI();
        expect(screen.getByTestId("message").innerHTML).toBe("Wait unit data will load");
    });

    it('Error while fetching data', () => {
        useSelectorMock
            .mockReturnValueOnce([])
            .mockReturnValueOnce(TransactionFetchStatusEnum.FETCH_ERROR);

        renderUI();
        expect(screen.getByTestId("message").innerHTML).toBe("Error while fetching data, please try again later");
    });

    it('Success fetch data', () => {
        useSelectorMock
            .mockReturnValueOnce([
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
        ])
            .mockReturnValueOnce(TransactionFetchStatusEnum.FETCH_SUCCESS);

        renderUI();
        expect(screen.getByTestId("table-body").childNodes.length).toBe(2);
    });

    it('Check filter', () => {
        useSelectorMock
            .mockReturnValueOnce([
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
            ])
            .mockReturnValueOnce(TransactionFetchStatusEnum.FETCH_SUCCESS);

        renderUI({
            filterValue: "beneficiary 2"
        });

        const tableBody: HTMLElement = screen.getByTestId("table-body");

        expect(tableBody.childNodes.length).toBe(1);
        expect(screen.getByText('new transaction beneficiary 2')).toBeInTheDocument();
        expect(screen.queryByText('new transaction beneficiary 1')).not.toBeInTheDocument();
    });
});