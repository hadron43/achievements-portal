import React, { Component } from 'react';
import { Container, Row, Col, Form, FormGroup, Input, Button } from 'reactstrap'
import {Link, withRouter, Redirect} from 'react-router-dom';
import { login } from '../../redux/ActionCreators';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
    authorized: state.user.authorized,
    loggingIn: state.user.loggingIn,
    error: state.user.error
});

const mapDispatchToProps = (dispatch) => ({
    login: (email, password) => {dispatch(login(email, password))}
});

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    handleUsernameChange(event) {
        this.setState({username: event.target.value});
    }
    handlePasswordChange(event) {
        this.setState({password: event.target.value});
    }
    handleSubmit(event) {
        this.props.login(this.state.username, this.state.password);
        this.setState ({
            username: "",
            password: ""
        })
    }

    render() {
        if(this.props.authorized)
            return (
                <Redirect to="/profile" />
            );
        return (
            <Container className="my-5">
                <Row className="rounded-3 shadow">
                    <Col md="6" className="d-none d-md-flex p-0">
                        <img src="assets/login.jpg" alt="banner" className="d-flex mx-auto w-100 h-100 rounded-left-3"></img>
                    </Col>
                    
                    <Col md="6" xs="12">
                        <Row>
                            <Col xs="12" className="d-flex mt-4">
                                <img src="IIITDLogo.png" alt="IIITD Logo" className="w-25 d-flex m-auto"></img>
                            </Col>
                        </Row>

                        <Row className="pl-md-5 pr-md-5 pl-xs-2 pr-xs-2 mt-3">
                            <Col xs="12">
                            <p className="h4 text-danger">{this.props.error}</p>
                            <Form>
                                <FormGroup>
                                    <Input type="text" name="username" id="username" placeholder="Username"
                                        value={this.state.username} onChange={this.handleUsernameChange}/>
                                </FormGroup>
                                <FormGroup>
                                    <Input type="password" name="password" id="password" placeholder="Password"
                                        value={this.state.password} onChange={this.handlePasswordChange}/>
                                </FormGroup>
                                <Button color="info" disabled={this.props.loggingIn} onClick={this.handleSubmit} className='bg-color-main-ui w-50 rounded-pill mt-3 mb-4'>Login</Button>
                            </Form>
                            </Col>

                            <Col xs="12">
                                <p>
                                Not Registered Yet?
                                </p>
                                <Link to="/signup">
                                    <Button color="info" className='bg-color-main-ui w-50 rounded-pill mb-3'>Sign Up</Button>
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
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));