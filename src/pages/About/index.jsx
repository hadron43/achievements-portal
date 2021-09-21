import React from 'react'
import {Container, Row, Col} from 'reactstrap'

function About() {
    return (
        <Container className="mt-4 mb-4 bg-color-lightest-grey rounded-3">
            <Row className="p-3 p-md-4 ">
                <Col xs="12 text-center">
                    <h2 className="font-weight-bold">About IIITD</h2>
                </Col>
            </Row>
            <Row>
                <Col className="px-0">
                    <img src="/assets/About/administration-bg.jpg"
                        className="w-100"
                        alt="IIIT Delhi New Academic Building" />
                </Col>
            </Row>
            <Row className="p-3 p-md-4 p-lg-5">
                <Col className="xs-12 text-justify">
                    <p>
                        Indraprastha Institute of Information Technology Delhi (IIIT-Delhi) was created by an act of Delhi legislature empowering it to carry out R&D, conduct educational programs, and grant degrees. The General Council is the apex body of the Institute, chaired by Hon'ble Lt. Governor of Delhi and the Board of Governors is the policy and decision-making body of the Institute. The Senate is empowered to take all academic decisions.
                    </p>
                    <p>
                        AchieveIIIT is the official achievement tracker portal of IIIT Delhi.
                        AchieveIIIT is the official achievement tracker portal of IIIT Delhi.
                        AchieveIIIT is the official achievement tracker portal of IIIT Delhi.
                        AchieveIIIT is the official achievement tracker portal of IIIT Delhi.
                        AchieveIIIT is the official achievement tracker portal of IIIT Delhi.
                        AchieveIIIT is the official achievement tracker portal of IIIT Delhi.
                        AchieveIIIT is the official achievement tracker portal of IIIT Delhi.
                        AchieveIIIT is the official achievement tracker portal of IIIT Delhi.
                        AchieveIIIT is the official achievement tracker portal of IIIT Delhi.
                    </p>
                </Col>
            </Row>
        </Container>
    )
}

export default About;