import React from 'react';
import { Table, Button } from 'reactstrap';

function Pending({arrayOfAchievements}) {
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
                            <td>{achievement.date}</td>
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

function Approved({arrayOfAchievements}) {
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
                            <td>{achievement.date}</td>
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

export {Pending, Approved};
