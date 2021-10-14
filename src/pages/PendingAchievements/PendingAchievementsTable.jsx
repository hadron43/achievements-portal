import React, { useState } from 'react';
import { Table, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router";
import { connect } from 'react-redux';

import { approveAchievement, rejectAchievement } from '../../redux/ActionCreators';
import { RejectionModal } from '../../components/Extras';

const mapStateToProps = (state) => ({
    authorized: state.user.authorized,
    token: state.user.token,
    pendingAchievements: state.admin.pendingAchievements
})

const mapDispatchToProps = (dispatch) => ({
    approveAchievement: (key, achievementId, userId) => dispatch(approveAchievement(key, achievementId, userId)),
    rejectAchievement: (key, achievementId, userId, feedback) => dispatch(rejectAchievement(key, achievementId, userId, feedback))
});

function PendingAchievementsTable(props) {
    const [modalOpen, setModalOpen] = useState(false);
    const [achievementId, setAchievementId] = useState(null);
    const [achievementTitle, setAchievementTitle] = useState(null);

    if(!props.pendingAchievements)
        return (<></>);
    return (
        <>
        <RejectionModal
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            id={achievementId}
            title={achievementTitle}
            onReject={(reason) => props.rejectAchievement(props.token, achievementId, null, reason)}
                />
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
                                disabled={achievement.approving || achievement.rejecting || (achievement.approved === 'approved') || (achievement.approved === 'rejected')} >
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
                                disabled={achievement.approving || achievement.rejecting || (achievement.approved === 'approved') || (achievement.approved === 'rejected')}
                                className="w-100"
                                onClick={() => {
                                    setModalOpen(true)
                                    setAchievementId(achievement.id)
                                    setAchievementTitle(achievement.title)
                                }}
                                color="danger" >
                                    {
                                        (achievement.approved === 'rejected') ?
                                            <i className="fa fa-check w-100 text-center" aria-hidden="true"></i>
                                        :
                                        <>Reject</>
                                    }
                                </Button>
                            </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </Table>
        </>
    );
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PendingAchievementsTable));