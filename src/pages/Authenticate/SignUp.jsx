import React from 'react';
import { Container, Row, Col, Form, FormGroup, Input, Button } from 'reactstrap'
import {Link} from 'react-router-dom'

function SignUp(props) {

    return (
        <Container className="my-5">
            <Row className="rounded-3 shadow">
                <Col md="6" className="d-none d-md-flex p-0">
                    <img src="assets/login.jpg" alt="banner" className="d-flex mx-auto w-100 h-100 rounded-left-3"></img>
                </Col>
                
                <Col md="6" xs="12">
                    <Row>
                        <Col xs="12" className="d-flex mt-4">
                            <img src="IIITDLogo.png" alt="IIITD Logo" className="w-25 mt-3 d-flex m-auto"></img>
                        </Col>
                    </Row>

                    <Row className="pl-md-5 pr-md-5 pl-xs-2 pr-xs-2 mt-3">
                        <Col xs="12">
                        <Form>
                            <FormGroup>
                                <Input type="text" name="Name" id="fullname" placeholder="Full Name" />
                            </FormGroup>
                            <FormGroup>
                                <Input type="email" name="email" id="email" placeholder="Email" />
                            </FormGroup>
                            <FormGroup>
                                <Input type="password" name="password" id="password" placeholder="Password" />
                            </FormGroup>
                            <Button color="info" className='bg-color-main-ui rounded-pill w-50 mt-3 mb-4'>Register</Button>
                        </Form>
                        </Col>

                        <Col xs="12">
                            <p>
                            Already Registered?
                            </p>
                            <Link to="/login">
                                <Button color="info" className='bg-color-main-ui rounded-pill w-50  mb-3'>Login</Button>
                            </Link>
                        </Col>

                        <Col xs="12">
                            <hr/>
                        </Col>

                        <Col>
                            <Button outline color='danger' className='w-100 rounded-pill mt-3 mb-4'>
                                <i className="fa fa-lg fa-google mr-3" aria-hidden="true"></i>
                                Continue With Google
                            </Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}

export default SignUp;