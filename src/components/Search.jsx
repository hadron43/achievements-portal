import React from 'react'
import {Row, Col, InputGroup, InputGroupText, Input, InputGroupAddon, Button} from 'reactstrap'

function SearchBar({query, setQuery, onSearch}) {
    return (
        <Row className="w-100">
            <Col xs="9">
            <InputGroup className="rounded-pill p-0">
                <InputGroupAddon addonType="prepend">
                <InputGroupText className="text-color-main bg-color-lightest-grey"> <i class="fa fa-search" aria-hidden="true"></i> </InputGroupText>
                </InputGroupAddon>
                <Input placeholder="Enter title" value={query} onChange={(event) => {
                        setQuery(event.target.value)
                    }} className="p-3"/>
            </InputGroup>
            </Col>
            <Col xs="3" className="p-0">
                <Button color="info" onClick={onSearch} className="bg-color-main-ui w-100 rounded-pill">Search</Button>
            </Col>
        </Row>
    );
}

export default SearchBar;