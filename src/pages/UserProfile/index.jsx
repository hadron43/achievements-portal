import React, { useState } from 'react'
import { Redirect, withRouter, useParams } from 'react-router'
import { Container, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
// import Loading from '../../components/Loading';
import { SocialMedia, Field, AchievementsTable, ProjectsTable } from '../../components/ProfileComponents'
import { baseUrl } from '../../shared/baseUrl';
import Loading from '../../components/Loading';
import NotFound from '../../components/NotFound';

const mapStateToProps = (state) => ({
    authorized: state.user.authorized,
    token: state.user.token
})

function fetchProfile(key, profileId, setProfile, setLoading, setErrorMessage) {
    let token_head = 'Token '+key;
    console.log(token_head)
    fetch(baseUrl+'auth/api/profile/'+profileId, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token_head
        }
    })
    .then((response) => {
        if(!response.ok)
            throw new Error('Profile not found!')
        console.log(response.error)
        return response
    })
    .then(response => response.json())
    .then(response => {
        console.log(response)
        setProfile(response)
        setLoading(false)
        return response
    })
    .catch(error => {
        setLoading(false)
        setErrorMessage(error.message)
        console.log(error)
    })
}

function Profile(props) {
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [profile, setProfile] = useState(null);
    const {profileId} = useParams();

    if(!props.authorized)
        return (
            <Redirect to="/login" />
        );

    if(!loading && !errorMessage && !profile) {
        setLoading(true);
        fetchProfile(props.token, profileId, setProfile, setLoading, setErrorMessage);
    }

    if(errorMessage)
        return (
            <NotFound message={errorMessage} />
        );


    if(loading || !profile)
        return (
            <Loading />
        )

    let skill_str = ""
    for(let i=0; profile && i<profile.skills.length; ++i) {
        skill_str += profile.skills[i]
        if(i !== profile.skills.length-1)
            skill_str += ', '
    }
    return (
        <Container className="p-4 p-md-5 mt-4 mb-4 bg-color-lightest-grey rounded-3">
            <Row>
                <Col md="4">
                    <img src="assets/Profile/dp.png" alt="profile" className="rounded-circle w-100 p-3"/>
                </Col>
                <Col md="8">
                    <Field title="Name" value={profile.name} />
                    <Field title="Role" value={[
                        "Student",
                        "Staff",
                        "Admin"
                    ][profile.designation-1]} />
                    <Field title="Date of Birth" value={new Date(profile.dob).toLocaleString('default', {day: "2-digit", month: 'short', year: "numeric" })} />
                    <Field title="Gender" value={
                        [
                            "Female", "Male", "Other"
                        ]
                        [profile.gender-1]} />
                    <Field title="Email" value={profile.email} />
                    <SocialMedia
                        instagram={profile.instagram}
                        facebook={profile.facebook}
                        twitter={profile.twitter}
                        github={profile.github}
                    />
                </Col>
            </Row>
            <Field title="Group" value={profile.group} />
            <Field title="Skills" value={skill_str} />
            <Field title="Address" value={profile.address}></Field>
            <Field title="Achievements" value="" />
            <AchievementsTable achievements={profile.achievements} />
            <Field title="Projects" value="" />
            <ProjectsTable projects={profile.projects} />
        </Container>
    )
}

export default withRouter(connect(mapStateToProps)(Profile));