import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Table, Button } from 'reactstrap';
import Loading from '../../components/Loading';

function Field({title, value}) {
    return (
        <Row className="mt-3 mb-3">
            <Col md="4">
                <h3 className="font-weight-bold">{title}</h3>
            </Col>
            <Col md="8">
                <p className="h4">{value}</p>
            </Col>
        </Row>
    )
}

function SocialMedia({instagram, facebook, github, twitter}) {
    return (
        <Row className="mt-3 mb-3">
            <Col md="4">
                <h3 className="font-weight-bold">Social Media</h3>
            </Col>
            <Col md="8">
                <Link to={{pathname: facebook}} target="_blank">
                    <i class="fa fa-facebook-square fa-2x mr-3 text-primary"></i>
                </Link>
                <Link to={{pathname: instagram}} target="_blank">
                    <i class="fa fa-instagram fa-2x mr-3 text-danger"></i>
                </Link>
                <Link to={{pathname: twitter}} target="_blank">
                    <i class="fa fa-twitter-square fa-2x mr-3 text-info"></i>
                </Link>
                <Link to={{pathname: github}} target="_blank">
                    <i class="fa fa-github-square fa-2x mr-3"></i>
                </Link>
            </Col>
        </Row>
    );
}

function AchievementsTable(props) {
    if(!props.achievements)
        return (
            <Loading />
        );
    else if(props.achievements.length === 0)
        return (
            <div className="w-100 rounded-3 p-3 bg-color-silver">
                <p className="h3 text-center my-5">No achievements to show</p>
            </div>
        );

    return (
        <div className="bg-color-off-white rounded-2 col-12">
        <Table hover responsive className="rounded-2">
            <thead>
                <th className="text-color-main h5">#</th>
                <th className="text-color-main h5">Title</th>
                <th className="text-color-main h5">Description</th>
                <th className="text-color-main h5">Achieved Date</th>
                <th className="text-color-main h5">Details</th>
            </thead>
            <tbody>
                {
                    props.achievements.map((achievement) => {
                        let index = props.achievements.indexOf(achievement)
                        return (
                            <tr>
                            <th scope="row">{index+1}</th>
                            <td>{achievement.title}</td>
                            <td>{achievement.description}</td>
                            <td>{new Date(achievement.achievedDate).toLocaleString('default', {day: "2-digit", month: 'short', year: "numeric" })}</td>
                            <td><Button color="warning" >View</Button></td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </Table>
        </div>
    ); 
        
}

function ProjectsTable(props) {
    if(!props.projects)
        return (
            <Loading />
        );
    else if(props.projects.length === 0)
        return (
            <div className="w-100 rounded-3 p-3 bg-color-silver">
                <p className="h3 text-center my-5">No projects to show</p>
            </div>
        );

    return (
        <div className="bg-color-off-white rounded-2 col-12">
        <Table hover responsive className="rounded-2">
            <thead>
                <th className="text-color-main h5">#</th>
                <th className="text-color-main h5">Title</th>
                <th className="text-color-main h5">Description</th>
                <th className="text-color-main h5">Field</th>
                <th className="text-color-main h5">Domain</th>
                <th className="text-color-main h5">Detals</th>
            </thead>
            <tbody>
                {
                    props.projects.map((project) => {
                        let index = props.projects.indexOf(project)
                        return (
                            <tr>
                            <th scope="row">{index+1}</th>
                            <td>{project.title}</td>
                            <td>{project.description}</td>
                            <td>{project.field}</td>
                            <td>{project.domain}</td>
                            <td><Button color="warning">View</Button></td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </Table>
        </div>
    ); 
        
}

export {Field, SocialMedia, AchievementsTable, ProjectsTable};