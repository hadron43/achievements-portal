import React, { useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router';
import Loading from '../../components/Loading';
import PendingProjectsTable from './PendingProjectsTable';
import { fetchPendingProjects } from '../../redux/ActionCreators';
import NotFound from '../../components/NotFound';

const mapStateToProps = (state) => ({
    authorized: state.user.authorized,
    token: state.user.token,

    pendingProjects: state.admin.pendingProjects,
    pendingProjectsLoading: state.admin.pendingProjectsLoading,
    pendingProjectsLoadingError: state.admin.pendingProjectsLoadingError,
})

const mapDispatchToProps = (dispatch) => ({
    fetchPendingProjects: (key, silent) => dispatch(fetchPendingProjects(key, silent))
})

function PendingProjects(props) {
    useEffect(() => {
        props.fetchPendingProjects(props.token);
        let intervalId = setInterval(() => {
            props.fetchPendingProjects(props.token, true);
        }, 10000)
        return () => clearInterval(intervalId)
        //eslint-disable-next-line
    }, [])

    if(!props.authorized)
        return (
            <Redirect to="/login" />
        );

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
                    <NotFound message={props.pendingProjectsLoadingError} />
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