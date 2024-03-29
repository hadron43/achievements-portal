import React, {useEffect, useState} from 'react';
import { Container, Row, Col, Badge, Button } from 'reactstrap';
import { Redirect, useParams, withRouter } from "react-router";
import { connect } from 'react-redux';
import { ApprovedBadge, RenderUser } from '../../components/Extras';
import Loading from '../../components/Loading';
import NotFound from '../../components/NotFound'
import { fetchAchievement } from '../../redux/ActionCreators';
import { baseUrl_ } from '../../shared/baseUrl';

const mapStateToProps = (state) => ({
    authorized: state.user.authorized,
    token: state.user.token,
})

function Achievement (props) {
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [achievementDetails, setAchievementDetails] = useState(false);
    const {achievementId} = useParams();
    useEffect(() => {
        if(!loading && !errorMessage && !achievementDetails) {
            setLoading(true);
            fetchAchievement(props.token, achievementId, setAchievementDetails, setLoading, setErrorMessage);
        }
    }, [loading, errorMessage, achievementDetails, props, achievementId])

    if(errorMessage)
        return (
            <NotFound />
        );

    return (
        <Container className="p-3 p-md-4 p-lg-5 mt-4 mb-4 bg-color-lightest-grey rounded-3">
        {
        (!props.authorized) ?
        (
            <Redirect to="/login" />
        ) :
        (loading) ?
        (
            <Loading />
        ) :
        (
            <>
            <Row className="mb-5">
                <Col xs={8} md={10} className="d-flex">
                    <h2 className="d-flex d-md-none m-auto font-weight-bold">Achievement</h2>
                    <h1 className="d-none d-md-flex m-auto font-weight-bold">Achievement</h1>
                </Col>

                <Col xs={4} md={2} className="d-flex">
                    <img src="/assets/medal.png" alt="Medal" className="d-flex m-auto"
                        style={{maxHeight: "100%", maxWidth: "100%"}} />
                </Col>
            </Row>

            <Row className="mt-3">
                <Col md={4}>
                    <h3>AID</h3>
                </Col>
                <Col md={8}>
                    <p className="h4 text-black">{achievementDetails.id}</p>
                </Col>
            </Row>

            <Row className="mt-3">
                <Col md={4}>
                    <h3 className="text-color-main">Status</h3>
                </Col>
                <Col md={8}>
                    <h3><ApprovedBadge value={achievementDetails.approved} /></h3>
                </Col>
            </Row>

            {/* <Row className={`${achievementDetails.approvedBy ? "d-block" : "d-none"} mt-3`}>
                <Col md={4}>
                    <h3 className="text-color-main">Approved By</h3>
                </Col>
                <Col md={8}>
                <p className="h4 text-black">{achievementDetails.approvedBy}</p>
                </Col>
            </Row> */}

            <Row className="mt-3">
                <Col md={4}>
                    <h3 className="text-color-main">Title</h3>
                </Col>
                <Col md={8}>
                <p className="h4 text-black">{achievementDetails.title}</p>
                </Col>
            </Row>

            <Row className="mt-3">
                <Col md={4}>
                    <h3 className="text-color-main">Institution</h3>
                </Col>
                <Col md={8}>
                <p className="h4 text-black">{(achievementDetails.institution) ? achievementDetails.institution.title : ""}</p>
                </Col>
            </Row>

            <Row className="mt-3">
                <Col md={4}>
                    <h3 className="text-color-main">Added By</h3>
                </Col>
                <Col md={8}>
                    <RenderUser user={achievementDetails.addedBy} />
                </Col>
            </Row>

            <Row className={`mt-3`}>
                <Col md={4}>
                    <h3 className="text-color-main">Team Members</h3>
                </Col>
                <Col md={8}>
                <p className="h4 text-black">
                    {(achievementDetails.teamMembers && achievementDetails.teamMembers.length > 0) ?(
                        achievementDetails.teamMembers.map((member) => {
                            return (
                                <RenderUser user={member} />
                            );
                        })
                    )
                    :
                    (
                        <>None</>
                    )}
                </p>
                </Col>
            </Row>

            <Row className="mt-3">
                <Col md={4}>
                    <h3 className="text-color-main">Description</h3>
                </Col>
                <Col md={8}>
                <span className="h4 text-black display-linebreak">{achievementDetails.description}</span>
                </Col>
            </Row>

            <Row className="mt-3">
                <Col md={4}>
                    <h3 className="text-color-main">Technical</h3>
                </Col>
                <Col md={8}>
                <p className="h4 text-black">{achievementDetails.technical ? "Yes" : "No"}</p>
                </Col>
            </Row>

            <Row className="mt-3">
                <Col md={4}>
                    <h3 className="text-color-main">Date Created</h3>
                </Col>
                <Col md={8}>
                <p className="h4 text-black">{new Date(achievementDetails.dateCreated).toLocaleString('default', {day: "2-digit", month: 'short', year: "numeric" })}</p>
                </Col>
            </Row>

            <Row className="mt-3">
                <Col md={4}>
                    <h3 className="text-color-main">Date Achieved</h3>
                </Col>
                <Col md={8}>
                <p className="h4 text-black">{new Date(achievementDetails.achievedDate).toLocaleString('default', {day: "2-digit", month: 'short', year: "numeric" })}</p>
                </Col>
            </Row>

            <Row className={`mt-3`}>
                <Col md={4}>
                    <h3 className="text-color-main">Tags</h3>
                </Col>
                <Col md={8}>
                <p className="h4 text-black">
                    {(achievementDetails.tags && achievementDetails.tags.length > 0) ?(
                        achievementDetails.tags.map((tag) => {
                            return (
                                <Badge color="info" pill className="mr-2 mb-2">{tag.title}</Badge>
                            );
                        })
                    )
                    :
                    (
                        <>None</>
                    )}
                </p>
                </Col>
            </Row>

            <Row className='mt-3'>
                <Col md={4}>
                    <h3 className="text-color-main">Proof</h3>
                </Col>
                <Col md={8}>
                    {
                        (achievementDetails.files && achievementDetails.files.length > 0) ?
                        achievementDetails.files.map((file) => {
                            return (
                            <a href={baseUrl_ + file.file} target='_blank' rel="noreferrer">
                                <Button>View Proof</Button>
                            </a>
                            )
                        })
                        :
                        <>
                        <p className="h4 text-black">Not Available</p>
                        </>
                    }
                </Col>
            </Row>

            <Row className={`mt-3 ${achievementDetails.feedback ? "" : "d-none"}`}>
                <Col md={4}>
                    <h3 className="text-color-main">Feedback by admin</h3>
                </Col>
                <Col md={8}>
                <p className="h4 text-black">
                    {achievementDetails.feedback}
                </p>
                </Col>
            </Row>

            </>
        )
        }
        </Container>
    );
}

export default  withRouter(connect(mapStateToProps)(Achievement));