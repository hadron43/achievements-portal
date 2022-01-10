import React from 'react';
import { Container, Row, Col} from 'reactstrap';

function Footer() {
    return (
        <footer>
        <Container fluid className="bg-color-lightest-grey p-3 mt-5 footer">
            <Row>
                <Col>
                <p className='text-center mb-0'>Copyright © 2022 IIITD | All rights reserved | Created at
                    <a href="https://midas.iiitd.edu.in/" target='_blank' rel='noreferrer'> MidasLabs</a> by
                    <a href="https://github.com/hadron43" target='_blank' rel='noreferrer'> hadron43</a>,
                    <a href="https://github.com/tushar2407" target='_blank' rel='noreferrer'> tushar2407</a></p>
                </Col>
            </Row>
        </Container>
        </footer>
    );
}

export default Footer;