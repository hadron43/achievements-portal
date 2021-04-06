import React from 'react'
import { Col, Container, Row, InputGroup, InputGroupAddon, Input, InputGroupText, Button, Table } from 'reactstrap';

import { pending } from '../../shared/pending'

function SearchBar() {
    return (
        <Row className="w-100">
            <Col xs="9">
            <InputGroup className="rounded-pill p-0">
                <InputGroupAddon addonType="prepend">
                <InputGroupText className="text-color-main bg-color-lightest-grey"> <i class="fa fa-search" aria-hidden="true"></i> </InputGroupText>
                </InputGroupAddon>
                <Input placeholder="Query"  className="p-3"/>
            </InputGroup>
            </Col>
            <Col xs="3" className="p-0">
                <Button color="info" className="bg-color-main-ui w-100 rounded-pill">Search</Button>
            </Col>
        </Row>
    );
}

function Results() {
    return (
        <Table hover responsive className="rounded-2">
            <thead>
                <th className="text-color-main h5">#</th>
                <th className="text-color-main h5">Title</th>
                <th className="text-color-main h5">Description</th>
                <th className="text-color-main h5">Added By</th>
                <th className="text-color-main h5">Date</th>
                <th className="text-color-main h5">Proof</th>
                <th className="text-color-main h5">Approve</th>
                <th className="text-color-main h5">Reject</th>
            </thead>
            <tbody>
                {
                    pending.map((achievement) => {
                        return (
                            <tr>
                            <th scope="row">{achievement.id}</th>
                            <td>{achievement.title}</td>
                            <td>{achievement.description}</td>
                            <td>{achievement.addedBy}</td>
                            <td>{achievement.date}</td>
                            <td><Button color="warning" >View</Button></td>
                            <td><Button color="info" >Approve</Button></td>
                            <td><Button color="danger" >Reject</Button></td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </Table>
    );
}

function Search() {
    return (
        <Container className="p-3 p-md-4 mt-4 mb-4 bg-color-lightest-grey rounded-3">
            <Row>
                <Col md={{size: 8, offset: 2}}>
                    <SearchBar />
                </Col>
            </Row>
            <Row className="mt-4 bg-color-off-white rounded-2 p-2">
                <Col xs="auto">
                    <h3 className="text-color-main font-weight-bold mb-0 mr-4 d-inline">Filters</h3>
                </Col>
                <Col xs="auto">

                </Col>
            </Row>
            <Row className="mt-4">
                <Results />
            </Row>
        </Container>
    )
}

export default Search;