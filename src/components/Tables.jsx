import React from 'react';
import { Table, Button } from 'reactstrap';

function AchievementsTable({arrayOfAchievements}) {
    return (
        <Table hover responsive className="rounded-2">
            <thead>
                <th className="text-color-main h5">#</th>
                <th className="text-color-main h5">Title</th>
                <th className="text-color-main h5">Description</th>
                <th className="text-color-main h5">Date</th>
                <th className="text-color-main h5">Details</th>
                <th className="text-color-main h5">Delete</th>
            </thead>
            <tbody>
                {
                    arrayOfAchievements.map((achievement) => {
                        return (
                            <tr>
                            <th scope="row">{achievement.id}</th>
                            <td>{achievement.title}</td>
                            <td>{achievement.description}</td>
                            <td>{new Date(achievement.achievedDate).toLocaleString('default', {day: "2-digit", month: 'short', year: "numeric" })}</td>
                            <td><Button color="warning" >View</Button></td>
                            <td><Button color="danger" >Delete</Button></td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </Table>
    );
}

function PendingAchievementsTable({arrayOfAchievements}) {
    return (
        <Table hover responsive className="rounded-2">
            <thead>
                <th className="text-color-main h5">#</th>
                <th className="text-color-main h5">Title</th>
                <th className="text-color-main h5">Description</th>
                <th className="text-color-main h5">Date</th>
                <th className="text-color-main h5">Details</th>
                <th className="text-color-main h5">Approve</th>
                <th className="text-color-main h5">Reject</th>
            </thead>
            <tbody>
                {
                    arrayOfAchievements.map((achievement) => {
                        return (
                            <tr>
                            <th scope="row">{achievement.id}</th>
                            <td>{achievement.title}</td>
                            <td>{achievement.description}</td>
                            <td>{new Date(achievement.achievedDate).toLocaleString('default', {day: "2-digit", month: 'short', year: "numeric" })}</td>
                            <td><Button color="warning" >View</Button></td>
                            <td><Button color="success" >Approve</Button></td>
                            <td><Button color="danger" >Reject</Button></td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </Table>
    );
}

function PendingProjectsTable({arrayOfProjects}) {
    return (
        <Table hover responsive className="rounded-2">
            <thead>
                <th className="text-color-main h5">#</th>
                <th className="text-color-main h5">Title</th>
                <th className="text-color-main h5">Description</th>
                <th className="text-color-main h5">Date</th>
                <th className="text-color-main h5">Details</th>
                <th className="text-color-main h5">Approve</th>
                <th className="text-color-main h5">Reject</th>
            </thead>
            <tbody>
                {
                    arrayOfProjects.map((project) => {
                        return (
                            <tr>
                            <th scope="row">{project.id}</th>
                            <td>{project.title}</td>
                            <td>{project.description}</td>
                            <td>{new Date(project.achievedDate).toLocaleString('default', {day: "2-digit", month: 'short', year: "numeric" })}</td>
                            <td><Button color="warning" >View</Button></td>
                            <td><Button color="success" >Approve</Button></td>
                            <td><Button color="danger" >Reject</Button></td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </Table>
    );
}

function ProjectsTable({arrayofProjects}) {
    return (
        <Table hover responsive className="rounded-2">
            <thead>
                <th className="text-color-main h5">#</th>
                <th className="text-color-main h5">Title</th>
                <th className="text-color-main h5">Description</th>
                <th className="text-color-main h5">Start Date</th>
                <th className="text-color-main h5">End Date</th>
                <th className="text-color-main h5">Details</th>
                <th className="text-color-main h5">Delete</th>
            </thead>
            <tbody>
                {
                    arrayofProjects.map((project) => {
                        return (
                            <tr>
                            <th scope="row">{project.id}</th>
                            <td>{project.title}</td>
                            <td>{project.description}</td>
                            <td>{new Date(project.startDate).toLocaleString('default', {day: "2-digit", month: 'short', year: "numeric" })}</td>
                            <td>{new Date(project.endDate).toLocaleString('default', {day: "2-digit", month: 'short', year: "numeric" })}</td>
                            <td><Button color="warning" >View</Button></td>
                            <td><Button color="danger" >Delete</Button></td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </Table>
    );
}

export {AchievementsTable, ProjectsTable, PendingAchievementsTable, PendingProjectsTable};
