import React from 'react';
import { Table, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { ApprovedBadge } from '../components/Extras'

function AchievementsTable({arrayOfAchievements, deleteAchievement, token}) {
    return (
        <Table hover responsive className="rounded-2">
            <thead>
                <tr>
                <th className="text-color-main h5">#</th>
                <th className="text-color-main h5">Title</th>
                <th className="text-color-main h5">Description</th>
                <th className="text-color-main h5">Status</th>
                <th className="text-color-main h5">Date</th>
                <th className="text-color-main h5">Details</th>
                <th className="text-color-main h5">Edit</th>
                <th className="text-color-main h5">Delete</th>
                </tr>
            </thead>
            <tbody>
                {
                    arrayOfAchievements.map((achievement) => {
                        return (
                            <tr>
                            <th scope="row">{achievement.id}</th>
                            <td>{achievement.title}</td>
                            <td>{achievement.description}</td>
                            <td><h5><ApprovedBadge value={achievement.approved} /></h5></td>
                            <td>{new Date(achievement.achievedDate).toLocaleString('default', {day: "2-digit", month: 'short', year: "numeric" })}</td>
                            <td>
                                <Link to={"/achievement/"+achievement.id}>
                                <Button color="info" >View</Button>
                                </Link>
                            </td>
                            <td>
                                <Link to={"/editachievement/"+achievement.id}>
                                <Button color="secondary"
                                disabled={achievement.approved.toLowerCase() === 'approved'} >Edit</Button>
                                </Link>
                            </td>
                            <td>
                                <Button
                                    onClick={() => deleteAchievement(token, achievement.id)}
                                    color="danger"
                                    className="w-100"
                                    disabled={achievement.deleting || achievement.deleted}
                                >
                                    {
                                        (achievement.deleted) ? 
                                            <i className="fa fa-check w-100 text-center" aria-hidden="true"></i>
                                        :
                                        <>Delete</>
                                    }
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


function ProjectsTable({arrayofProjects, deleteProject, token}) {
    return (
        <Table hover responsive className="rounded-2">
            <thead>
                <tr>
                <th className="text-color-main h5">#</th>
                <th className="text-color-main h5">Title</th>
                <th className="text-color-main h5">Description</th>
                <th className="text-color-main h5">Status</th>
                <th className="text-color-main h5">Start Date</th>
                <th className="text-color-main h5">End Date</th>
                <th className="text-color-main h5">Details</th>
                <th className="text-color-main h5">Edit</th>
                <th className="text-color-main h5">Delete</th>
                </tr>
            </thead>
            <tbody>
                {
                    arrayofProjects.map((project) => {
                        return (
                            <tr>
                            <th scope="row">{project.id}</th>
                            <td>{project.title}</td>
                            <td>{project.description}</td>
                            <td><h5><ApprovedBadge value={project.approved} /></h5></td>
                            <td>{new Date(project.startDate).toLocaleString('default', {day: "2-digit", month: 'short', year: "numeric" })}</td>
                            <td>{new Date(project.endDate).toLocaleString('default', {day: "2-digit", month: 'short', year: "numeric" })}</td>
                            <td>
                                <Link to={"/project/"+project.id}>
                                <Button color="info" >View</Button>
                                </Link>
                            </td>
                            <td>
                                <Link to={"/editproject/"+project.id}>
                                <Button color="secondary"
                                disabled={project.approved.toLowerCase() === 'approved'} >Edit</Button>
                                </Link>
                            </td>
                            <td>
                                <Button
                                    onClick={() => deleteProject(token, project.id)}
                                    color="danger"
                                    className="w-100"
                                    disabled={project.deleting || project.deleting}
                                >
                                    {
                                        (project.deleted) ?
                                            <i className="fa fa-check w-100 text-center" aria-hidden="true"></i>
                                        :
                                            <>Delete</>
                                    }
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

export {AchievementsTable, ProjectsTable};