import React from 'react';
import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import FormTextElement from '../FormTextElement';

type ComponentProps = React.ComponentProps<typeof FormTextElement>;
const defaultProps: ComponentProps = {
    name: "test",
    type: "text",
    msg: "",
    min: 0,
    max: 0,
    step: 0,
    errors: {}
};

const renderUI = (props?: Partial<ComponentProps>) => {
    return render(
        <FormTextElement {...defaultProps} {...props} />
    );
};

describe('Form text component', () => {
    it('Render input', async () => {
        renderUI();

        const inputNode: HTMLInputElement = screen.getByTestId("input");
        const inputFeedbackNode: HTMLInputElement = screen.getByTestId("input-feedback");

        expect(inputNode.id).toBe("test");
        expect(inputNode.name).toBe("test");
        expect(inputNode.type).toBe("text");
        expect(inputNode.placeholder).toBe("Enter test");
        expect(inputNode.max).toBe("0");
        expect(inputNode.min).toBe("0");
        expect(inputNode.step).toBe("0");
        expect(inputNode.classList.contains("is-invalid")).toBeFalsy();
        expect(inputFeedbackNode.innerHTML).toBe("");
        fireEvent.change(inputNode, { target: { value: 'typed phrase' } });
        await waitFor(() => {
            expect(inputNode.value).toBe('typed phrase');
        });
    });

    it('Render input with error', async () => {
        renderUI({
            ...defaultProps,
            errors: {
                test: ['Should be not empty']
            }
        });

        const inputNode: HTMLInputElement = screen.getByTestId("input");
        const inputFeedbackNode: HTMLElement = screen.getByTestId("input-feedback");

        expect(inputNode.classList.contains("is-invalid")).toBeTruthy();
        expect(inputFeedbackNode.innerHTML).toBe("Should be not empty");
    });
});
