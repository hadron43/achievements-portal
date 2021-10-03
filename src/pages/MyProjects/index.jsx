import React from 'react';
import { Redirect, withRouter } from 'react-router';
import { Container, Row, Col } from 'reactstrap';
import { ProjectsTable } from '../../components/Tables';
import { connect } from 'react-redux';
import { deleteProject, fetchUserProjects } from '../../redux/ActionCreators';
import Loading from '../../components/Loading';

const mapStateToProps = (state) => ({
    authorized: state.user.authorized,
    token: state.user.token,
    projects: state.user.projects,
})

const mapDispatchToProps = (dispatch) => ({
    fetchUserProjects: (key) => dispatch(fetchUserProjects(key)),
    deleteProject: (key, projectId) => dispatch(deleteProject(key, projectId))
})

function MyAchievements(props) {
    if(!props.authorized)
        return (
            <Redirect to="/login" />
        );
    if(!props.projects) {
        props.fetchUserProjects(props.token);
    }

    return (
        <Container className="p-4 p-md-5 mt-4 mb-4 bg-color-lightest-grey rounded-3">
            <Row>
                <Col xs="12 text-center">
                    <h2 className="font-weight-bold">My Projects</h2>
                </Col>
            </Row>

            <Row className="mt-5">
                <Col xs="12" className="bg-color-off-white rounded-2">
                {
                    props.projects ?
                        <ProjectsTable
                            arrayofProjects={props.projects}
                            deleteProject={props.deleteProject}
                            token={props.token}
                            />
                    :
                        <Loading />
                }
                </Col>
            </Row>

            {/* <Row className="mt-3">
                <Col xs="12 my-3">
                    <h3>Approved By Admin</h3>
                </Col>
                <Col xs="12" className="bg-color-off-white rounded-2">
                    <Approved arrayOfAchievements={approveAchivements} />
                </Col>
            </Row> */}
        </Container>
    )
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MyAchievements));