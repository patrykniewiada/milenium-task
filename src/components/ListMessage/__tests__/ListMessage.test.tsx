import React from 'react';
import {render, screen} from '@testing-library/react';
import ListMessage from '../ListMessage';

type ComponentProps = React.ComponentProps<typeof ListMessage>;
const defaultProps: ComponentProps = {
    msg: "Example test message"
};

const renderUI = (props?: Partial<ComponentProps>) => {
    return render(<ListMessage {...defaultProps} {...props}/>);
};

describe('List message component test', () => {
    it('Render component', () => {
        renderUI();
        expect(screen.getByTestId("message").innerHTML).toEqual("Example test message");
    });
});