import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Pending, Approved } from './Tables';
import { pendingAchivements, approveAchivements } from '../../shared/myAchivements';

function MyAchievements() {
    return (
        <Container className="p-4 p-md-5 mt-4 mb-4 bg-color-lightest-grey rounded-3">
            <Row>
                <Col xs="12 text-center">
                    <h2 className="font-weight-bold">My Projects</h2>
                </Col>
            </Row>
            
            <Row className="mt-3">
                <Col xs="12 my-3">
                    <h3 className="">Pending for Approval</h3>
                </Col>
                <Col xs="12" className="bg-color-off-white rounded-2">
                    <Pending arrayOfAchievements={pendingAchivements} />
                </Col>
            </Row>

            <Row className="mt-3">
                <Col xs="12 my-3">
                    <h3>Approved By Admin</h3>
                </Col>
                <Col xs="12" className="bg-color-off-white rounded-2">
                    <Approved arrayOfAchievements={approveAchivements} />
                </Col>
            </Row>
        </Container>
    )
}

export default MyAchievements;