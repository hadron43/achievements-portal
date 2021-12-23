import React, {useEffect, useState} from 'react';
import { Container, Row, Col, Badge, Button } from 'reactstrap';
import { Redirect, useParams, withRouter } from "react-router";
import { baseUrl } from '../../shared/baseUrl';
import { connect } from 'react-redux';
import { ApprovedBadge, RenderUser } from '../../components/Extras';
import Loading from '../../components/Loading';
import NotFound from '../../components/NotFound';

function fetchProject(key, projectId, setProjectDetails, setLoading, setErrorMessage) {
    let token_head = 'Token '+key;
    console.log(token_head)
    fetch(baseUrl+'main/api/project/'+projectId, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token_head
        }
    })
    .then((response) => {
        if(!response.ok)
            throw new Error('Project not found!')
        console.log(response.error)
        return response
    })
    .then(response => response.json())
    .then(response => {
        console.log(response)
        setProjectDetails(response)
        setLoading(false)
        return response
    })
    .catch(error => {
        setLoading(false)
        setErrorMessage(error.message)
        console.log(error)
    })
}

const mapStateToProps = (state) => ({
    authorized: state.user.authorized,
    token: state.user.token,
})

function Project (props) {
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [projectDetails, setProjectDetails] = useState(false);
    const {projectId} = useParams();
    useEffect(() => {
        if(!loading && !errorMessage && !projectDetails) {
            setLoading(true);
            fetchProject(props.token, projectId, setProjectDetails, setLoading, setErrorMessage);
        }
    }, [loading, errorMessage, projectDetails, projectId, props.token])

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
                    <h1 className="d-flex m-auto font-weight-bold">Project</h1>
                </Col>

                <Col xs={4} md={2} className="d-flex">
                    <img src="/assets/idea.png" alt="Idea" className="d-flex m-auto"
                        style={{maxHeight: "100%", maxWidth: "100%"}} />
                </Col>
            </Row>

            <Row className="mt-3">
                <Col md={4}>
                    <h3>PID</h3>
                </Col>
                <Col md={8}>
                    <p className="h4 text-black">{projectDetails.id}</p>
                </Col>
            </Row>

            <Row className="mt-3">
                <Col md={4}>
                    <h3 className="text-color-main">Title</h3>
                </Col>
                <Col md={8}>
                <p className="h4 text-black">{projectDetails.title}</p>
                </Col>
            </Row>

            <Row className="mt-3">
                <Col md={4}>
                    <h3 className="text-color-main">Status</h3>
                </Col>
                <Col md={8}>
                <h3><ApprovedBadge value={projectDetails.approved} /></h3>
                </Col>
            </Row>

            <Row className="mt-3">
                <Col md={4}>
                    <h3 className="text-color-main">Added By</h3>
                </Col>
                <Col md={8}>
                    <RenderUser user={projectDetails.addedBy} />
                </Col>
            </Row>

            <Row className={`mt-3 ${projectDetails.url ? projectDetails.url : 'd-none' }`}>
                <Col md={4}>
                    <h3 className="text-color-main">URL</h3>
                </Col>
                <Col md={8}>
                    <a href={projectDetails.url} target='_blank' rel="noreferrer">
                        <Button color="primary" className='px-4 rounded-pill'>
                            Link
                        </Button>
                    </a>
                </Col>
            </Row>

            <Row className={`mt-3`}>
                <Col md={4}>
                    <h3 className="text-color-main">Team Members</h3>
                </Col>
                <Col md={8}>
                <p className="h4 text-black">
                    {(projectDetails.members && projectDetails.members.length > 0) ?(
                        projectDetails.members.map((member) => {
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

            <Row className={`mt-3`}>
                <Col md={4}>
                    <h3 className="text-color-main">Mentors</h3>
                </Col>
                <Col md={8}>
                <p className="h4 text-black">
                    {(projectDetails.mentors && projectDetails.mentors.length > 0) ?(
                        projectDetails.mentors.map((mentor) => {
                            return (
                                <RenderUser user={mentor} />
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
                    <h3 className="text-color-main">Domain</h3>
                </Col>
                <Col md={8}>
                <p className="h4 text-black">{projectDetails.domain}</p>
                </Col>
            </Row>

            <Row className="mt-3">
                <Col md={4}>
                    <h3 className="text-color-main">Field</h3>
                </Col>
                <Col md={8}>
                <p className="h4 text-black">{projectDetails.field}</p>
                </Col>
            </Row>

            <Row className="mt-3">
                <Col md={4}>
                    <h3 className="text-color-main">Description</h3>
                </Col>
                <Col md={8}>
                <p className="h4 text-black">{projectDetails.description}</p>
                </Col>
            </Row>

            <Row className="mt-3">
                <Col md={4}>
                    <h3 className="text-color-main">Technical</h3>
                </Col>
                <Col md={8}>
                <p className="h4 text-black">{projectDetails.technical ? "Yes" : "No"}</p>
                </Col>
            </Row>

            <Row className="mt-3">
                <Col md={4}>
                    <h3 className="text-color-main">Date Created</h3>
                </Col>
                <Col md={8}>
                <p className="h4 text-black">{new Date(projectDetails.dateCreated).toLocaleString('default', {day: "2-digit", month: 'short', year: "numeric" })}</p>
                </Col>
            </Row>

            <Row className="mt-3">
                <Col md={4}>
                    <h3 className="text-color-main">Start Date</h3>
                </Col>
                <Col md={8}>
                <p className="h4 text-black">{new Date(projectDetails.startDate).toLocaleString('default', {day: "2-digit", month: 'short', year: "numeric" })}</p>
                </Col>
            </Row>

            <Row className="mt-3">
                <Col md={4}>
                    <h3 className="text-color-main">End Date</h3>
                </Col>
                <Col md={8}>
                <p className="h4 text-black">{new Date(projectDetails.endDate).toLocaleString('default', {day: "2-digit", month: 'short', year: "numeric" })}</p>
                </Col>
            </Row>

            <Row className={`${projectDetails.approvedBy ? "" : "d-none"} mt-3`}>
                <Col md={4}>
                    <h3 className="text-color-main">Approved By</h3>
                </Col>
                <Col md={8}>
                    <RenderUser user={projectDetails.approvedBy} />
                </Col>
            </Row>

            <Row className={`mt-3`}>
                <Col md={4}>
                    <h3 className="text-color-main">Tags</h3>
                </Col>
                <Col md={8}>
                <p className="h4 text-black">
                    {(projectDetails.tags && projectDetails.tags.length > 0) ?(
                        projectDetails.tags.map((tag) => {
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

            <Row className="mt-3">
                <Col md={4}>
                    <h3 className="text-color-main">Proof</h3>
                </Col>
                <Col md={8}>
                    {
                        (projectDetails.proof) ?
                        <a href={projectDetails.proof} target='_blank' rel="noreferrer">
                            <Button>View Proof</Button>
                        </a>
                        :
                        <>
                        <p className="h4 text-black">Not Available</p>
                        </>
                    }
                </Col>
            </Row>

            </>
        )
        }
        </Container>
    );
}

export default  withRouter(connect(mapStateToProps)(Project));