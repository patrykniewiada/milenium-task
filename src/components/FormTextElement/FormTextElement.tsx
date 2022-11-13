import React, {ForwardedRef, forwardRef} from 'react';
import {Form, InputGroup} from "react-bootstrap";

type PropsType = {
    name: string,
    type?: string,
    msg?: string,
    min?: number,
    max?: number,
    step?: number,
    errors?: { [key: string]: string[] },
    dataTestId?: string
};

const FormTextElement = forwardRef((props: PropsType, ref: ForwardedRef<HTMLInputElement>) => {

    const inputErrors = props.errors?.[props.name]?.filter(err => err !== null) ?? [];

    return (
        <Form.Group className="mb-3" controlId={props.name} data-testid="input-holder">
            <Form.Label>{props.name}</Form.Label>
            <InputGroup hasValidation>
                <Form.Control
                    name={props.name}
                    type={props.type}
                    ref={ref} placeholder={`Enter ${props.name}`}
                    min={props.min}
                    max={props.max}
                    step={props.step}
                    isInvalid={!!inputErrors.length}
                    required={true}
                    data-testid={props.dataTestId ? props.dataTestId : "input"}
                />
                <Form.Control.Feedback type="invalid" data-testid="input-feedback">
                    {inputErrors.join(", ")}
                </Form.Control.Feedback>
            </InputGroup>
        </Form.Group>
    );
});

export default FormTextElement;