import React, { useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router';
import Loading from '../../components/Loading';
import PendingAchievementsTable from './PendingAchievementsTable.jsx';
import { fetchPendingAchievements } from '../../redux/ActionCreators';
import NotFound from '../../components/NotFound'

const mapStateToProps = (state) => ({
    authorized: state.user.authorized,
    token: state.user.token,

    pendingAchievements: state.admin.pendingAchievements,
    pendingAchievementsLoading: state.admin.pendingAchievementsLoading,
    pendingAchievementsLoadingError: state.admin.pendingAchievementsLoadingError,
})

const mapDispatchToProps = (dispatch) => ({
    fetchPendingAchievements: (key, silent) => dispatch(fetchPendingAchievements(key, silent))
})

function PendingAchievements(props) {
    useEffect(() => {
        props.fetchPendingAchievements(props.token)
        let intervalId = setInterval(() => {
            props.fetchPendingAchievements(props.token, true);
        }, 10000)
        return () => clearInterval(intervalId)
        // eslint-disable-next-line
    }, [])

    if(!props.authorized)
        return (
            <Redirect to="/login" />
        );

    return (
        <Container className="p-3 p-md-4 p-lg-5 mt-4 mb-4 bg-color-lightest-grey rounded-3">
            {
                (props.pendingAchievementsLoading) ? 
                (
                    <Loading />
                )
                :
                (props.pendingAchievementsLoadingError) ? 
                (
                    <NotFound message={props.pendingAchievementsLoadingError} />
                )
                :
                (
                    <>
                    <Row className="mb-5">
                        <Col xs={12}>
                            <h2 className="font-weight-bold text-center">Pending Achievements</h2>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={12}>
                        <PendingAchievementsTable />
                        </Col>
                    </Row>
                    </>
                )
            }
        </Container>
    )
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PendingAchievements));