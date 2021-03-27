import React from 'react'
import { Container, Row, Col, Table } from 'reactstrap'
import user from './data'

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

function Profile() {
    let skill_str = ""
    for(let i=0; i<user.skills.length; ++i) {
        skill_str += user.skills[i]
        if(i !== user.skills.length-1)
            skill_str += ', '
    }

    return (
        <Container className="p-2 p-md-5 mt-4 mb-4 bg-color-lightest-grey rounded-3">
            <Row>
                <Col md="4">
                    <img src={user.image} alt="profile" className="rounded-circle w-100 p-3"/>
                </Col>
                <Col md="8">
                    <Field title="Name" value={user.name} />
                    <Field title="Role" value={user.role} />
                    <Field title="Email" value={user.email} />
                    <Field title="Bio" value={user.bio} />
                    <Field title="User Since" value={user.reg_date} />
                </Col>
            </Row>
            <Field title="Skills" value={skill_str} />
            <Field title="Recent Achievements" value="" />
            <Table hover responsive className="rounded-2">
                <thead>
                    <th className="text-color-main h5">#</th>
                    <th className="text-color-main h5">Title</th>
                    <th className="text-color-main h5">Description</th>
                    <th className="text-color-main h5">Date</th>
                </thead>
                <tbody>
                    {
                        user.achievements.map((achievement) => {
                            let index = user.achievements.indexOf(achievement)
                            return (
                                <tr>
                                <th scope="row">{index+1}</th>
                                <td>{achievement.title}</td>
                                <td>{achievement.description}</td>
                                <td>{achievement.added_on}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </Container>
    )
}

export default Profile;