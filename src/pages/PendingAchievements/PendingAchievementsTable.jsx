import React from 'react';
import { Table, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router";
import { connect } from 'react-redux';

import { approveAchievement } from '../../redux/ActionCreators';

const mapStateToProps = (state) => ({
    authorized: state.user.authorized,
    token: state.user.token,
    pendingAchievements: state.admin.pendingAchievements
})

const mapDispatchToProps = (dispatch) => ({
    approveAchievement: (key, achievementId, userId) => dispatch(approveAchievement(key, achievementId, userId))
});

function PendingAchievementsTable(props) {
    if(!props.pendingAchievements)
        return (<></>);
    return (
        <Table hover responsive className="rounded-2">
            <thead>
                <tr>
                <th className="text-color-main h5">#</th>
                <th className="text-color-main h5">Title</th>
                <th className="text-color-main h5">Description</th>
                <th className="text-color-main h5">Date</th>
                <th className="text-color-main h5">Details</th>
                <th className="text-color-main h5">Approve</th>
                <th className="text-color-main h5">Reject</th>
                </tr>
            </thead>
            <tbody>
                {
                    props.pendingAchievements.map((achievement) => {
                        return (
                            <tr>
                            <th scope="row">{achievement.id}</th>
                            <td>{achievement.title}</td>
                            <td>{achievement.description}</td>
                            <td>{new Date(achievement.achievedDate).toLocaleString('default', {day: "2-digit", month: 'short', year: "numeric" })}</td>
                            <td>
                            <Link to={"/achievement/"+achievement.id}>
                                <Button color="warning" >View</Button>
                                </Link>
                            </td>
                            <td>
                                <Button
                                onClick={() => props.approveAchievement(props.token, achievement.id, null)}
                                color="success"
                                className="w-100"
                                disabled={achievement.approving || achievement.rejecting || (achievement.approved === 'approved') || achievement.rejected} >
                                    {
                                        (achievement.approved === 'approved') ?
                                            <i className="fa fa-check w-100 text-center" aria-hidden="true"></i>
                                        :
                                        <>Approve</>
                                    }
                                </Button>
                            </td>
                            <td>
                                <Button
                                disabled={achievement.approving || achievement.rejecting || (achievement.approved === 'approved') || achievement.rejected}
                                color="danger" >
                                Reject
                                </Button>
                            </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </Table>
    );
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PendingAchievementsTable));