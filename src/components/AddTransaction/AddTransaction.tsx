import React, {Dispatch, RefObject, useCallback, useRef, useState} from 'react';
import {addTransactionAction} from "../../store/actionCreators";
import {useDispatch} from "react-redux";
import FormTextElement from "../FormTextElement/FormTextElement";
import {isMoreThanZero, isPositiveInteger, notEmpty} from "../../validators/validators";
import {Button, Form} from "react-bootstrap";
import {toast} from "react-toastify";

const AddTransaction = () => {

    const dispatch: Dispatch<any> = useDispatch();
    const [formErrors, setFormErrors] = useState<{[key: string]: string[]}>({});
    const [validated, setValidated] = useState<boolean>(false);

    const descriptionRef = useRef<HTMLInputElement>(document.createElement('input'));
    const addressRef = useRef<HTMLInputElement>(document.createElement('input'));
    const accountRef = useRef<HTMLInputElement>(document.createElement('input'));
    const beneficiaryRef = useRef<HTMLInputElement>(document.createElement('input'));
    const amountRef = useRef<HTMLInputElement>(document.createElement('input'));

    const addTransaction = useCallback(
        (transaction: ITransaction) => dispatch(addTransactionAction(transaction)
        ), [dispatch]);

    const validateField = (refInput: RefObject<HTMLInputElement>, validator: Function, message: string) => {

        if(!refInput) {
            return false;
        }

        const value = refInput?.current?.value ?? "";
        const name = refInput?.current?.name ?? "";
        const validation = validator(value);

        setFormErrors(prevState => {
            let currentErrors = prevState[name] ?? [];

            if(validation) {
                delete currentErrors[currentErrors.indexOf(message)];
                currentErrors = currentErrors.filter(el => el !== null);
            } else if(!currentErrors.includes(message))  {
                currentErrors.push(message);
            }

            return {
                ...prevState,
                [name]: currentErrors
            };
        });

        return validation;
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const validation = [
            validateField(descriptionRef, notEmpty, "Cannot be empty"),
            validateField(addressRef, notEmpty, "Cannot be empty"),
            validateField(accountRef, notEmpty, "Cannot be empty"),
            validateField(accountRef, isPositiveInteger, "Should be positive integer"),
            validateField(beneficiaryRef, notEmpty, "Cannot be empty"),
            validateField(amountRef, notEmpty, "Cannot be empty"),
            validateField(amountRef, isMoreThanZero, "Should be a number bigger than 0")
        ];

        setValidated(validation.includes(false));

        if(!validation.includes(false)) {
            addTransaction({
                description: descriptionRef.current.value,
                address: addressRef.current.value,
                account: accountRef.current.value,
                beneficiary: beneficiaryRef.current.value,
                amount: Number(amountRef.current.value),
                date: new Date().toISOString(),
            });

             descriptionRef.current.value  = "";
             addressRef.current.value  = "";
             accountRef.current.value  = "";
             beneficiaryRef.current.value  = "";
             amountRef.current.value  = "";

            toast.success(`Transaction has been added!`);

        } else {
            toast.error(
                `Form validation error!`
            );
        }
    };

    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <FormTextElement dataTestId="description" type="text" name="Description" errors={formErrors} ref={descriptionRef}/>
            <FormTextElement dataTestId="address" type="text" name="Address" errors={formErrors} ref={addressRef}/>
            <FormTextElement dataTestId="account" type="number" name="Account" errors={formErrors} ref={accountRef} min={1} step={1}/>
            <FormTextElement dataTestId="beneficiary" type="text" name="Beneficiary" errors={formErrors} ref={beneficiaryRef}/>
            <FormTextElement dataTestId="amount" type="number" name="Amount" errors={formErrors} ref={amountRef}  min={1} step={0.01}/>
            <Button variant="primary" data-testid="submit-form" type="submit">
                Save
            </Button>
        </Form>
    );
};

export default AddTransaction;