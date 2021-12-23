import React, { useState } from 'react';
import { Table, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router";
import { connect } from 'react-redux';

import { approveProject, rejectProject } from '../../redux/ActionCreators';
import { RejectionModal } from '../../components/Extras';

const mapStateToProps = (state) => ({
    authorized: state.user.authorized,
    token: state.user.token,
    pendingProjects: state.admin.pendingProjects
})

const mapDispatchToProps = (dispatch) => ({
    approveProject: (key, projectId, userId) => dispatch(approveProject(key, projectId, userId)),
    rejectProject: (key, projectId, userId, feedback) => dispatch(rejectProject(key, projectId, userId, feedback))
});

function PendingProjectsTable(props) {
    const [modalOpen, setModalOpen] = useState(false);
    const [projectId, setProjectId] = useState(null);
    const [projectTitle, setProjectTitle] = useState(null);

    if(!props.pendingProjects)
        return (<></>);

    return (
        <>
        <RejectionModal
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            id={projectId}
            title={projectTitle}
            onReject={(reason) => props.rejectProject(props.token, projectId, null, reason)}
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
                    props.pendingProjects.map((project) => {
                        return (
                            <tr>
                            <th scope="row">{project.id}</th>
                            <td>{project.title}</td>
                            <td>{project.description}</td>
                            <td>{new Date(project.dateCreated).toLocaleString('default', {day: "2-digit", month: 'short', year: "numeric" })}</td>
                            <td>
                                <Link to={"/project/"+project.id}>
                                <Button color="info" >View</Button>
                                </Link>
                            </td>
                            <td>
                                <Button
                                onClick={() => props.approveProject(props.token, project.id, null)}
                                color="success"
                                className="w-100"
                                disabled={project.approving || project.rejecting || (project.approved === 'approved') || (project.approved === 'rejected')} >
                                    {
                                        (project.approved === 'approved') ?
                                            <i className="fa fa-check w-100 text-center" aria-hidden="true"></i>
                                        :
                                        <>Approve</>
                                    }
                                </Button>
                            </td>
                            <td>
                                <Button
                                disabled={project.approving || project.rejecting || (project.approved === 'approved') || (project.approved === 'rejected')}
                                className="w-100"
                                onClick={() => {
                                    setModalOpen(true)
                                    setProjectId(project.id)
                                    setProjectTitle(project.title)
                                }}
                                color="danger" >
                                    {
                                        (project.approved === 'rejected') ?
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PendingProjectsTable));