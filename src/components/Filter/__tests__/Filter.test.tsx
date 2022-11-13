import React from 'react';
import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import Filter from '../Filter';

type ComponentProps = React.ComponentProps<typeof Filter>;
const setFilterValue = jest.fn();
const defaultProps: ComponentProps = {
    filterValue: "",
    setFilterValue
};

const renderUI = (props?: Partial<ComponentProps>) => {
    return render(
        <Filter {...defaultProps} {...props} />
    );
};

describe('Filter component', () => {
    it('Change input value', async () => {
        renderUI({
            filterValue: "Initial value",
            setFilterValue
        });
        const inputNode: HTMLInputElement = screen.getByTestId("filter");
        expect(inputNode.value).toBe("Initial value")
        fireEvent.change(inputNode, { target: { value: 'search phrase' } });
        await waitFor(() => {
            expect(setFilterValue).toBeCalledWith("search phrase")
        });
    });

});
