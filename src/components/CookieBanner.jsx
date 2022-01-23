import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import Cookies from 'cookies-js';

function CookieBanner() {
    const [crossed, setCrossed] = useState(Cookies.get('achieve_cookie') === 'true')
    return (
        <Container fluid className={`${crossed ? 'd-none ' : ''} p-3 cookie-banner`}>
            <Row>
                <Col className='clear-both'>
                <span className='float-left'>
                We use cookies for enhanced user experience. By continuing to use this website, you agree to our cookie policy.
                </span>

                <Button color='success' size='sm'
                    className='float-right'
                    onClick={() => {
                        Cookies.set('achieve_cookie', 'true')
                        setCrossed(true)
                    }}>
                    Accept
                </Button>
                </Col>
            </Row>
        </Container>
    );
}

export default CookieBanner;