import React from 'react';
import {Container, Row, Col} from 'reactstrap';

function NotFound (props) {
    let message = props.message ? props.message : "Error 404! Page Not Found."
    return (
        <Container className="p-3 p-md-4 p-lg-5 mt-4 mb-4 bg-color-lightest-grey rounded-3">
            <Row>
                <Col xs={12} className="d-flex">
                    <img src="/assets/page-not-found.png" alt="Page not found" className="d-flex m-auto"
                        style={{maxWidth: "80%", maxHeight: "80%"}} />
                </Col>

                <Col xs={12}>
                    <h3 className="text-danger text-center mt-5">{message}</h3>
                </Col>
            </Row>
        </Container>
    );
}

export default NotFound;