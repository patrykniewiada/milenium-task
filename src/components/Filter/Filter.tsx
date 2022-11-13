import React from 'react';
import {Form} from "react-bootstrap";

type FilterProps = {
    filterValue: string,
    setFilterValue: Function
}

const Filter = ({filterValue, setFilterValue}: FilterProps) => {
    return (
        <Form.Group className="mb-3" controlId="searchBar">
            <Form.Label>Search</Form.Label>
            <Form.Control
                data-testid="filter"
                value={filterValue}
                onChange={e => setFilterValue(e.target.value)}
                placeholder={`Type to search by beneficiary`}
            />
        </Form.Group>
    );
};

export default Filter;