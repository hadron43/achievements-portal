import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Table, Button, Input, InputGroup, InputGroupText } from 'reactstrap';
import { ApprovedBadge } from '../components/Extras';
import Loading from './Loading';

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

function FieldInput({title, value, setValue, type="text"}) {
    return (
        <Row className="mt-3 mb-3">
            <Col md="4">
                <h3 className="font-weight-bold">{title}</h3>
            </Col>
            <Col md="8">
                <Input type={type} value={value}
                    onChange={(e) => setValue(e.target.value)}
                    ></Input>
            </Col>
        </Row>
    )
}

function FieldInputDropDown({title, value, setValue, values}) {
    return (
        <Row className="mt-3 mb-3">
            <Col md="4">
                <h3 className="font-weight-bold">{title}</h3>
            </Col>
            <Col md="8">
                <Input type='select' value={value}
                    onChange={(e) => setValue(e.target.value)}
                    >
                    <>
                    {
                        values.map((category) => {
                            return (
                                <option value={category.id}>{category.title}</option>
                            );
                        })
                    }
                    </>
                </Input>
            </Col>
        </Row>
    )
}

function InputSocialMedia({instagram, setInstagram, facebook, setFacebook,
    github, setGithub, twitter, setTwitter}) {
    return (
        <Row className="mt-3 mb-3">
            <Col md="4">
                <h3 className="font-weight-bold">Social Media</h3>
            </Col>
            <Col md="8">
                <InputGroup className="mb-2">
                    <InputGroupText className="p-1">
                        <i class={`fa fa-facebook-square fa-2x text-primary`}></i>
                    </InputGroupText>
                    <Input bsSize="lg" value={facebook} onChange={(e) => setFacebook(e.target.value)} />
                </InputGroup>
                <InputGroup className="mb-2">
                    <InputGroupText className="p-1">
                        <i class={`fa fa-instagram fa-2x text-danger`}></i>
                    </InputGroupText>
                    <Input bsSize="lg" value={instagram} onChange={(e) => setInstagram(e.target.value)} />
                </InputGroup>
                <InputGroup className="mb-2">
                    <InputGroupText className="p-1">
                        <i class={`fa fa-twitter-square fa-2x text-info`}></i>
                    </InputGroupText>
                    <Input bsSize="lg" value={twitter} onChange={(e) => setTwitter(e.target.value)} />
                </InputGroup>
                <InputGroup className="mb-2">
                    <InputGroupText className="p-1">
                        <i class={`fa fa-github-square fa-2x text-dark`}></i>
                    </InputGroupText>
                    <Input bsSize="lg" value={github} onChange={(e) => setGithub(e.target.value)} />
                </InputGroup>
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
                    <i class={`fa fa-facebook-square fa-2x mr-3 text-primary ${!facebook ? "d-none" : ""}`}></i>
                </Link>
                <Link to={{pathname: instagram}} target="_blank">
                    <i class={`fa fa-instagram fa-2x mr-3 text-danger ${!instagram ? "d-none" : ""}`}></i>
                </Link>
                <Link to={{pathname: twitter}} target="_blank">
                    <i class={`fa fa-twitter-square fa-2x mr-3 text-info ${!twitter ? "d-none" : ""}`}></i>
                </Link>
                <Link to={{pathname: github}} target="_blank">
                    <i class={`fa fa-github-square fa-2x mr-3 text-dark ${!github ? "d-none" : ""}`}></i>
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
                <th className="text-color-main h5">Status</th>
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
                            <td><h5><ApprovedBadge value={achievement.approved} /></h5></td>
                            <td>{achievement.description}</td>
                            <td>{new Date(achievement.achievedDate).toLocaleString('default', {day: "2-digit", month: 'short', year: "numeric" })}</td>
                            <td>
                                <Link to={"/achievement/"+achievement.id}>
                                <Button color="info" >View</Button>
                                </Link>
                            </td>
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
                <th className="text-color-main h5">Status</th>
                <th className="text-color-main h5">Description</th>
                <th className="text-color-main h5">Field</th>
                <th className="text-color-main h5">Domain</th>
                <th className="text-color-main h5">Details</th>
            </thead>
            <tbody>
                {
                    props.projects.map((project) => {
                        let index = props.projects.indexOf(project)
                        return (
                            <tr>
                            <th scope="row">{index+1}</th>
                            <td>{project.title}</td>
                            <td><h5><ApprovedBadge value={project.approved} /></h5></td>
                            <td>{project.description}</td>
                            <td>{project.field}</td>
                            <td>{project.domain}</td>
                            <td>
                                <Link to={"/project/"+project.id}>
                                <Button color="info">View</Button>
                                </Link>
                            </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </Table>
        </div>
    );

}

export {Field, SocialMedia, AchievementsTable, ProjectsTable, FieldInput, FieldInputDropDown, InputSocialMedia};