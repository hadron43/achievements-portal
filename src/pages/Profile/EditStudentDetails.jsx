import React, {useState, useEffect} from 'react'
import { FieldInput } from '../../components/ProfileComponents'
import { withRouter } from 'react-router'
import Loading from '../../components/Loading';
import { connect } from 'react-redux';
import { Row, Col, Button } from 'reactstrap';

import { baseUrl } from '../../shared/baseUrl';
import EditEducation from './EditEducation';

const mapStateToProps = (state) => ({
    profileLoaded: state.user.profileLoaded,
    profile: state.user.profile,
    authorized: state.user.authorized,
    token: state.user.token
})

function patchStudentDetials(key, studId, studObject, setSaving, setSavingError, setSavingMessage) {
    setSaving(true)
    setSavingError(false)
    setSavingMessage('')
    fetch(baseUrl + 'main/api/student/' + studId + '/', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + key
        },
        body: JSON.stringify(studObject)
    })
    .then(response => {
        if(response.ok)
            return response
        throw new Error('Error saving student details!')
    })
    .then(response => response.json())
    .then(res => {
        setSaving(false)
        setSavingMessage('Student details successfully saved!')
    })
    .catch(err => {
        console.log(err)
        setSaving(false)
        setSavingError(true)
        setSavingMessage(err.message)
    })
}

function EditStudentDetails(props) {
    const [rollNo, setRollNo] = useState('')
    const [batch, setBatch] = useState('')
    const [major, setMajor] = useState('')
    const [gpa, setGpa] = useState('')
    const [bio, setBio] = useState('')
    const [education, setEducation] = useState([])
    const [studId, setStudId] = useState('')

    const [error, setError] = useState('')
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [savingError, setSavingError] = useState(false)
    const [savingMessage, setSavingMessage] = useState('')

    useEffect(() => {
        fetch(baseUrl+'main/api/student/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + props.token
            }
        })
        .then(response => {
            if(response.ok)
                return response
            throw new Error('Error fetching student details!')
        })
        .then(response => response.json())
        .then(res => {
            res = res[0]
            setRollNo(res.rollNo)
            setBatch(res.batch)
            setMajor(res.major)
            setGpa(res.GPA)
            setBio(res.bio)
            setEducation(res.education)
            setStudId(res.id)
            setLoading(false)
        })
        .catch(err => {
            console.log(err)
            setError(err.message)
            setLoading(false)
        })
    }, [props.token])

    return (
        <>
        <Row className="p-3 p-md-4 ">
            <Col className="xs-12 text-center">
                <h2 className="font-weight-bold">Edit Student Details</h2>
            </Col>
        </Row>
        <Row>
            <Col>
            {
                (loading) ?
                <Loading />
                :
                (error) ?
                <p xs={12} className='text-danger'>{error}</p>
                :
                <>
                    <FieldInput title={"Roll Number"} value={rollNo} setValue={setRollNo} />
                    <FieldInput title={"Batch"} value={batch} setValue={setBatch} type="number" />
                    <FieldInput title={"Major"} value={major} setValue={setMajor} />
                    <FieldInput title={"CGPA"} value={gpa} setValue={setGpa} />
                    {/* <FieldInput title={"Bio"} value={bio} setValue={setBio} type="textarea" /> */}
                    <EditEducation educationList={education} setEducationList={setEducation} />
                    <Button
                        color='success'
                        disabled={saving}
                        onClick={() => patchStudentDetials(props.token,
                            studId,
                            {
                                rollNo: rollNo,
                                batch: batch,
                                major: major,
                                GPA: gpa,
                                bio: bio,
                                education: education
                            },
                            setSaving, setSavingError, setSavingMessage
                        )}
                    >
                        Save Student Details
                    </Button>

                    <p className={`${savingError ? 'text-danger' : 'text-success'} mt-3`}>
                        {savingMessage}
                    </p>
                </>
            }
            </Col>
        </Row>
        </>
    )
}

export default withRouter(connect(mapStateToProps)(EditStudentDetails));