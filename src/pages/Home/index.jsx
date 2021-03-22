import React from 'react';
import { Container, Row, Col } from 'reactstrap';

import Banner from './Banner';
import { UpdatesCard, TopCard } from './HomeCard';
import data from './updates'

function Home() {
    return (
        <>
        <Banner />

        <Container fluid className="mt-3 mb-3">
            <Row equal className="p-1 p-sm-2 p-lg-3 p-xl-5">
                <Col size="12" sm="6" lg="4" xxl="3" className="mb-4">
                    <div className="col-12 h-100"><UpdatesCard {...data.publications}/></div>
                </Col>
                <Col size="12" sm="6" lg="4" xxl="3" className="mb-4">
                    <div className="col-12 h-100"><UpdatesCard {...data.staff}/></div>
                </Col>
                <Col size="12" sm="6" lg="4" xxl="3" className="mb-4">
                    <div className="col-12 h-100"><UpdatesCard {...data.students}/></div>
                </Col>
            </Row>

            <Row equal className="p-1 p-sm-2 p-lg-3 p-xl-5">
                <Col size="12" sm="6" lg="4" xxl="3" className="mb-4">
                    <div className="col-12 h-100"><TopCard {...data.active_departments}/></div>
                </Col>
                <Col size="12" sm="6" lg="4" xxl="3" className="mb-4">
                    <div className="col-12 h-100"><TopCard {...data.active_students}/></div>
                </Col>
                <Col size="12" sm="6" lg="4" xxl="3" className="mb-4">
                    <div className="col-12 h-100"><TopCard {...data.active_staff}/></div>
                </Col>
            </Row>
        </Container>
        </>
    );
}

export default Home;