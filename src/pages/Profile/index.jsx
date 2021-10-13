import React from 'react'
import { Redirect, withRouter } from 'react-router'
import { Container, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import Loading from '../../components/Loading';
import { SocialMedia, Field, AchievementsTable, ProjectsTable } from './ProfileComponents'
import { fetchUserProfile } from '../../redux/ActionCreators';

const mapStateToProps = (state) => ({
    profileLoaded: state.user.profileLoaded,
    profile: state.user.profile,
    authorized: state.user.authorized,
    token: state.user.token,
    achievements: state.user.achievements,
    projects: state.user.projects
})

const mapDispatchToProps = (dispatch) => ({
    fetchUserProfile: (key) => dispatch(fetchUserProfile(key))
});

function Profile(props) {
    if(!props.authorized)
        return (
            <Redirect to="/login" />
        );
    else if(!props.profileLoaded) {
        props.fetchUserProfile(props.token);
        return(
            <Loading />
        );
    }

    let skill_str = ""
    for(let i=0; i<props.profile.skills.length; ++i) {
        skill_str += props.profile.skills[i]
        if(i !== props.profile.skills.length-1)
            skill_str += ', '
    }
    return (
        <Container className="p-4 p-md-5 mt-4 mb-4 bg-color-lightest-grey rounded-3">
            <Row>
                <Col md="4">
                    <img src="assets/Profile/dp.png" alt="profile" className="rounded-circle w-100 p-3"/>
                </Col>
                <Col md="8">
                    <Field title="Name" value={props.profile.name} />
                    <Field title="Role" value={[
                        "Student",
                        "Staff",
                        "Admin"
                    ][props.profile.designation-1]} />
                    <Field title="Date of Birth" value={new Date(props.profile.dob).toLocaleString('default', {day: "2-digit", month: 'short', year: "numeric" })} />
                    <Field title="Gender" value={
                        [
                            "Female", "Male", "Other"
                        ]
                        [props.profile.gender-1]} />
                    <Field title="Email" value={props.profile.email} />
                    <SocialMedia
                        instagram={props.profile.instagram}
                        facebook={props.profile.facebook}
                        twitter={props.profile.twitter}
                        github={props.profile.github}
                    />
                </Col>
            </Row>
            <Field title="Group" value={props.profile.group} />
            {/* <Field title="Bio" value={props.profile.bio} /> */}
            {/* <Field title="User Since" value={props.profile.reg_date} /> */}
            <Field title="Skills" value={skill_str} />
            <Field title="Address" value={props.profile.address}></Field>
            <Field title="Achievements" value="" />
            <AchievementsTable achievements={props.profile.achievements} />
            <Field title="Projects" value="" />
            <ProjectsTable projects={props.profile.projects} />
        </Container>
    )
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile));