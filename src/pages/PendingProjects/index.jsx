import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router';
import Loading from '../../components/Loading';
import PendingProjectsTable from './PendingProjectsTable';
import { fetchPendingProjects } from '../../redux/ActionCreators';

const mapStateToProps = (state) => ({
    authorized: state.user.authorized,
    token: state.user.token,

    pendingProjects: state.admin.pendingProjects,
    pendingProjectsLoading: state.admin.pendingProjectsLoading,
    pendingProjectsLoadingError: state.admin.pendingProjectsLoadingError,
})

const mapDispatchToProps = (dispatch) => ({
    fetchPendingProjects: (key) => dispatch(fetchPendingProjects(key))
})

function PendingProjects(props) {
    if(!props.authorized)
        return (
            <Redirect to="/login" />
        );

    if(!props.pendingProjectsLoading && !props.pendingProjects && !props.pendingProjectsLoadingError) {
        props.fetchPendingProjects(props.token);
    }

    return (
        <Container className="p-3 p-md-4 p-lg-5 mt-4 mb-4 bg-color-lightest-grey rounded-3">
            {
                (props.pendingProjectsLoading) ?
                (
                    <Loading />
                )
                :
                (props.pendingProjectsLoadingError) ?
                (
                    <h3 className="text-danger">
                        {props.pendingProjectsLoadingError}
                    </h3>
                )
                :
                (
                    <>
                    <Row className="mb-5">
                        <Col xs={12}>
                            <h2 className="font-weight-bold text-center">Pending Projects</h2>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={12}>
                        <PendingProjectsTable />
                        </Col>
                    </Row>
                    </>
                )
            }
        </Container>
    )
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PendingProjects));