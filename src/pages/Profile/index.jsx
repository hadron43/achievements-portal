import React, { useEffect, useState } from 'react'
import { Redirect, withRouter } from 'react-router'
import { Container, Row, Col, FormGroup, Input, Label, Button, Progress } from 'reactstrap';
import { connect } from 'react-redux';
import Loading from '../../components/Loading';
import { Field, FieldInput, FieldInputDropDown, InputSocialMedia } from '../../components/ProfileComponents'
import { fetchUserProfile } from '../../redux/ActionCreators';

import { storage } from '../../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from '@firebase/storage';

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
    useEffect(() => {
        if(props.authorized && !props.profileLoaded)
            props.fetchUserProfile(props.token);
    }, [props])

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [showemail, setShowemail] = useState(false)
    const [showphone, setShowphone] = useState(false)
    const [group, setGroup] = useState('')
    const [dob, setdob] = useState(undefined)
    const [gender, setGender] = useState(0)
    const [address, setAddress] = useState('')
    const [github, setGithub] = useState('')
    const [instagram, setInstagram] = useState('')
    const [facebook, setFacebook] = useState('')
    const [twitter, setTwitter] = useState('')
    const [profilepic, setProfilepic] = useState('')

    const [file, setFile] = useState('')
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        setName(props.profile.name)
        setGroup(props.profile.group)
        setAddress(props.profile.address)
        setdob(props.profile.dob)
        setEmail(props.profile.email)
        setShowemail(props.profile.show_email)
        setShowphone(props.profile.show_phone)
        setTwitter(props.profile.twitter)
        setFacebook(props.profile.setFacebook)
        setGithub(props.profile.setGithub)
        setInstagram(props.profile.setInstagram)
        // setProfilepic(props.profile.profile_pic)
    }, [props.profile])

    const handleUpload = () => {
        console.log(file)
        const storageRef = ref(storage, `profile/${props.profile.id}_${file.name}`)
        const uploadTask = uploadBytesResumable(storageRef, file)

        uploadTask.on(
            "state_changed",
            snapshot => {
              const progress = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              );
              setProgress(progress)
            },
            error => {
              console.log(error);
            },
            () => {
                // Upload completed successfully, now we can get the download URL
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    setProfilepic(downloadURL)
                });
            }
        );
    }

    if(!props.authorized)
        return (
            <Redirect to="/login" />
        );
    else if(!props.profileLoaded) {
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
                    <img src={profilepic ? profilepic : "assets/Profile/dp.png"}
                        alt="profile" className="rounded-circle w-100 p-3"/>
                    <Progress multi
                        className={`mt-2 ${progress > 0 && progress !== 100 ? "" : "d-none"}`}>
                        <Progress bar animated color="success"
                            value={progress} />
                    </Progress>
                    <p className="text-danger">Note: Picture should be in 1:1 aspect ratio. File size less than 2 MB.</p>
                    <Input type="file" id="profile_pic" name="profile_pic"
                        onChange={(e) => {
                            if(e.target.files[0])
                                setFile(e.target.files[0])
                        }}/>
                    <Button className="mt-2" color="success" outline
                        disabled={progress > 0 && progress < 100}
                        onClick={handleUpload}>
                        Upload
                    </Button>
                </Col>
                <Col md="8">
                    <FieldInput title="Name" value={name} setValue={setName} />
                    <Field title="Role" value={[
                        "Student",
                        "Staff",
                        "Admin"
                    ][props.profile.designation-1]} />
                    <FieldInput title="Date of Birth" value={dob}
                        setValue={setdob} type="date" />
                    <FieldInputDropDown title="Gender" value={gender} setValue={setGender}
                        values={[{id: 1, title: "Male"}, {id: 2, title: "Female"}, {id: 3, title: "Others"}]} />
                    <FieldInput title="Group" value={group} setValue={setGroup} />
                    <FieldInput title="Email" value={email} setValue={setEmail} />
                    <FieldInput title="Phone" value={phone} setValue={setPhone} />
                    <Row className="mt-3 mb-3">
                        <Col md="4">
                        </Col>
                        <Col md="8">
                            <FormGroup check inline>
                                <Input id="showemail" type="checkbox" value={showemail} onChange={(e) => setShowemail(e.target.value)} />
                                <Label check for="showemail">
                                Show Email
                                </Label>
                            </FormGroup>
                            <FormGroup check inline>
                                <Input id="showphone" type="checkbox" value={showphone} onChange={(e) => setShowphone(e.target.value)} />
                                <Label check for="showphone">
                                Show Phone
                                </Label>
                            </FormGroup>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Field title="Skills" value={skill_str} />
            <FieldInput title="Address" value={address} setValue={setAddress} type="textarea" />
            <InputSocialMedia
                instagram={instagram} setInstagram={setInstagram}
                facebook={facebook} setFacebook={setFacebook}
                twitter={twitter} setTwitter={setTwitter}
                github={github} setGithub={setGithub}
            />
            <Button color="success">Save Changes</Button>
        </Container>
    )
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile));