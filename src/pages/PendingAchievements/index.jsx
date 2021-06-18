import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router';
import Loading from '../../components/Loading';
import { PendingAchievementsTable } from '../../components/Tables';
import { fetchPendingAchievements } from '../../redux/ActionCreators';

const mapStateToProps = (state) => ({
    authorized: state.user.authorized,
    token: state.user.token,

    pendingAchievements: state.admin.pendingAchievements,
    pendingAchievementsLoading: state.admin.pendingAchievementsLoading,
    pendingAchievementsLoadingError: state.admin.pendingAchievementsLoadingError,
})

const mapDispatchToProps = (dispatch) => ({
    fetchPendingAchievements: (key) => dispatch(fetchPendingAchievements(key))
})

function PendingAchievements(props) {
    if(!props.authorized)
        return (
            <Redirect to="/login" />
        );

    if(!props.pendingAchievementsLoading && !props.pendingAchievements && !props.pendingAchievementsLoadingError) {
        props.fetchPendingAchievements(props.token);
    }

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
                    <h3 className="text-danger">
                        {props.pendingAchievementsLoadingError}
                    </h3>
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
                        <PendingAchievementsTable arrayOfAchievements={props.pendingAchievements} />
                        </Col>
                    </Row>
                    </>
                )
            }
        </Container>
    )
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PendingAchievements));