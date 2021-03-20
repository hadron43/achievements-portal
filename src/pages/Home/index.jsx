import React from 'react';
import { Container } from 'reactstrap';
import Banner from './Banner';

function Home() {
    return (
        <Container fluid className="bg-color-lightest-grey">
            <Banner />
        </Container>
    );
}

export default Home;