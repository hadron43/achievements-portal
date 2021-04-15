import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router';
import { LocalForm, Control } from 'react-redux-form';
import { Container, Row, Col, Label, Button } from 'reactstrap';

const mapStateToProps = (state) => ({
    authorized: state.user.authorized,
    token: state.user.token
})

const mapDispatchToProps = (dispatch) => ({

})

class AddAchievement extends Component {
    render(){
        if(!this.props.authorized)
            return (
                <Redirect to="/login" />
            )
        return(
            <Container className="my-5 bg-color-lightest-grey p-4 p-md-5 rounded-3">
                <h2 className="font-weight-bold">Add Achievement</h2>
                <LocalForm className="mt-5">
                    <Row className="form-group">
                        <Label htmlFor="title" md={3}>
                            <h4 className="font-weight-bold">Achievement Title</h4>
                        </Label>
                        <Col md={9}>
                            <Control.text model=".title" id="title" name="title"
                                placeholder="Enter title"
                                className="form-control"
                                    />
                        </Col>
                    </Row>

                    <Row className="form-group">
                        <Label htmlFor="description" md={3}>
                            <h4 className="font-weight-bold">Description</h4>
                        </Label>
                        <Col md={9}>
                            <Control.textarea model=".description" id="description" name="description"
                                placeholder="Enter Description"
                                className="form-control"
                                    />
                        </Col>
                    </Row>

                    <Row className="form-group">
                        <Label htmlFor="doa" md={3}>
                            <h4 className="font-weight-bold">Date of Achievement</h4>
                        </Label>
                        <Col md={3}>
                            <Control.text model=".doa" id="doa" name="doa"
                                placeholder="Date"
                                className="form-control"
                                    />
                        </Col>
                    </Row>

                    <Row className="form-group">
                        <Label htmlFor="mentors" md={3}>
                            <h4 className="font-weight-bold">Mentors</h4>
                        </Label>
                        <Col md={9}>
                            <Control.text model=".mentors" id="mentors" name="mentors"
                                placeholder="Enter Mentors"
                                className="form-control"
                                    />
                        </Col>
                    </Row>

                    <Row className="form-group">
                        <Label htmlFor="team" md={3}>
                            <h4 className="font-weight-bold">Team Members</h4>
                        </Label>
                        <Col md={9}>
                            <Control.text model=".team" id="team" name="team"
                                placeholder="Enter Team Members"
                                className="form-control"
                                    />
                        </Col>
                    </Row>

                    <Row className="form-group">
                        <Label md={3}>
                            <h4 className="font-weight-bold">Proof</h4>
                        </Label>
                        <Col md={9}>
                            <Button color="info" > Upload </Button>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs="12">
                            <Button color="success" className="mr-3"> Request for Approval </Button>
                            <Button color="danger" >Cancel</Button>
                        </Col>
                    </Row>
                </LocalForm>
            </Container>
        )
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddAchievement));