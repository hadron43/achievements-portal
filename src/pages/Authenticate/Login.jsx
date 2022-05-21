import React, { useEffect } from 'react';
import { Container, Row, Col, Button } from 'reactstrap'
import { withRouter, Redirect } from 'react-router-dom';
import { login, loginOSA } from '../../redux/ActionCreators';
import { connect } from 'react-redux';
import Loading from '../../components/Loading';
import Cookies from 'cookies-js';

const mapStateToProps = (state) => ({
    authorized: state.user.authorized,
    loggingIn: state.user.loggingIn,
    error: state.user.error
});

const mapDispatchToProps = (dispatch) => ({
    login: (email, password) => {dispatch(login(email, password))},
    loginOSA: () => {dispatch(loginOSA())}
});

function Login(props) {
    useEffect(() => {
        let osa_token = Cookies.get('osa_token')
        if(osa_token && osa_token.length > 2)
            props.loginOSA()
        // eslint-disable-next-line
    }, [])

    if(props.authorized)
        return (
            <Redirect to="/profile" />
        );
    return (
        <Container className="my-5">
            <Row className="rounded-3 shadow">
                <Col md="6" className="d-none d-md-flex p-0">
                    <img src="assets/login.jpg" alt="banner" className="d-flex mx-auto w-100 h-100 rounded-left-3"></img>
                </Col>

                <Col md="6" xs="12" className="py-3">
                    <Row>
                        <Col xs="12" className="d-flex mt-4">
                            <img src="IIITDLogo.png" alt="IIITD Logo" className="w-25 d-flex mx-auto mt-4 mb-4"></img>
                        </Col>
                    </Row>

                    <Row className="pl-md-5 pr-md-5 pl-xs-2 pr-xs-2 mt-3">
                        <Col xs="12">
                            <p className="h4 text-danger">{props.error}</p>
                            {
                                (props.loggingIn) ?
                                <Loading />
                                :
                                <p className='text-center text-primary font-weight-bold h4 my-5 px-4'>Login on OSA Website first, and then hit refresh!</p>
                            }
                        </Col>
                        
                        <Col xs="12">
                            <p>
                            Not Registered Yet? Sign up on OSA website.
                            </p>
                            <a href='http://fh.iiitd.edu.in/' target='_blank' rel='noreferrer'>
                                <Button color="info" className='bg-color-main-ui px-5 rounded-pill mb-3'>Go to OSA Website</Button>
                            </a>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));