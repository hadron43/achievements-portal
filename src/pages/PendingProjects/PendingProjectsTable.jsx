import React from 'react';
import { Table, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router";
import { connect } from 'react-redux';

import { approveProject } from '../../redux/ActionCreators';

const mapStateToProps = (state) => ({
    authorized: state.user.authorized,
    token: state.user.token,
    pendingProjects: state.admin.pendingProjects
})

const mapDispatchToProps = (dispatch) => ({
    approveProject: (key, projectId, userId) => dispatch(approveProject(key, projectId, userId))
});

function PendingProjectsTable(props) {
    if(!props.pendingProjects)
        return (
            <>
            </>
        );

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
                    props.pendingProjects.map((project) => {
                        return (
                            <tr>
                            <th scope="row">{project.id}</th>
                            <td>{project.title}</td>
                            <td>{project.description}</td>
                            <td>{new Date(project.dateCreated).toLocaleString('default', {day: "2-digit", month: 'short', year: "numeric" })}</td>
                            <td>
                                <Link to={"/project/"+project.id}>
                                <Button color="warning" >View</Button>
                                </Link>
                            </td>
                            <td>
                                <Button
                                onClick={() => props.approveProject(props.token, project.id, null)}
                                color="success"
                                className="w-100"
                                disabled={project.approving || project.rejecting || (project.approved == 'approved') || project.rejected} >
                                    {
                                        (project.approved == 'approved') ?
                                            <i className="fa fa-check w-100 text-center" aria-hidden="true"></i>
                                        :
                                        <>Approve</>
                                    }
                                </Button>
                            </td>
                            <td>
                                <Button
                                disabled={project.approving || project.rejecting || (project.approved == 'approved') || project.rejected}
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PendingProjectsTable));