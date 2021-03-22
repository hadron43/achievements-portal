import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import Banner from './Banner';
import UpdatesCard from './HomeCard';

function Pubs() {
    return (
        <UpdatesCard
            heading="Recent Publications"
            updates={[
                "Student X published Y papaer in Z conference. Congratulations to the whole team!",
                "Student X published Y papaer in Z conference. Congratulations to the whole team!",
                "Student X published Y papaer in Z conference. Congratulations to the whole team!",
                "Student X published Y papaer in Z conference. Congratulations to the whole team!"
            ]}
            buttonText="More Updates"
            buttonLink=""
        />
    )
}

function Staff() {
    return (
        <UpdatesCard
            heading="Staff Achievements"
            updates={[
                "Staff X achieved Y papaer in Z. Congratulations to the whole team!",
                "Staff X achieved Y papaer in Z. Congratulations to the whole team!",
                "Staff X achieved Y papaer in Z. Congratulations to the whole team!",
                "Staff X achieved Y papaer in Z. Congratulations to the whole team!",
            ]}
            buttonText="More Updates"
            buttonLink=""
        />
    )
}

function Students() {
    return (
        <UpdatesCard
            heading="Student Achievements"
            updates={[
                "Student X achieved Y papaer in Z. Congratulations to the whole team!",
                "Student X achieved Y papaer in Z. Congratulations to the whole team!",
                "Student X achieved Y papaer in Z. Congratulations to the whole team!",
                "Student X achieved Y papaer in Z. Congratulations to the whole team!",
            ]}
            buttonText="More Updates"
            buttonLink=""
        />
    )
}

function Home() {
    return (
        <>
        <Banner />

        <Container fluid className="mt-3 mb-3">
            <Row equal className="p-1 p-sm-2 p-lg-3 p-xl-5">
                <Col size="12" sm="6" md="4" xxl="3" className="mb-4">
                    <div className="col-12 h-100"><Pubs /></div>
                </Col>
                <Col size="12" sm="6" md="4" xxl="3" className="mb-4">
                    <div className="col-12 h-100"><Staff /></div>
                </Col>
                <Col size="12" sm="6" md="4" xxl="3" className="mb-4">
                    <div className="col-12 h-100"><Students /></div>
                </Col>
            </Row>
        </Container>
        </>
    );
}

export default Home;