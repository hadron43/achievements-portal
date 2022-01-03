import React, {useState, useEffect} from 'react'
import { FieldInput, FieldInputDropDown } from '../../components/ProfileComponents'
import { withRouter } from 'react-router'
import Loading from '../../components/Loading';
import { connect } from 'react-redux';
import { Row, Col, Button } from 'reactstrap';

import { baseUrl } from '../../shared/baseUrl';
import EditEducation from './EditEducation';
import { listOfTitles } from '../../components/Extras';

const mapStateToProps = (state) => ({
    profileLoaded: state.user.profileLoaded,
    profile: state.user.profile,
    authorized: state.user.authorized,
    token: state.user.token
})

function patchStaffDetials(key, staffObject, setSaving, setSavingError, setSavingMessage) {
    setSaving(true)
    setSavingError(false)
    setSavingMessage('')
    fetch(baseUrl + 'main/api/staff/1/', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + key
        },
        body: JSON.stringify(staffObject)
    })
    .then(response => {
        if(response.ok)
            return response
        throw new Error('Error saving staff details!')
    })
    .then(response => response.json())
    .then(res => {
        setSaving(false)
        setSavingMessage('Staff details successfully saved!')
    })
    .catch(err => {
        console.log(err)
        setSaving(false)
        setSavingError(true)
        setSavingMessage(err.message)
    })
}

function EditStaffDetails(props) {
    const [empId, setEmpId] = useState('')
    const [joiningDate, setJoiningDate] = useState('')
    const [department, setDepartment] = useState('')
    const [title, setTitle] = useState('')
    const [designation, setDesignation] = useState('')
    const [education, setEducation] = useState([])

    const [error, setError] = useState('')
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [savingError, setSavingError] = useState(false)
    const [savingMessage, setSavingMessage] = useState('')

    useEffect(() => {
        fetch(baseUrl+'main/api/staff/', {
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
            setEmpId(res.employeeId)
            setJoiningDate(res.associatedSince)
            setDepartment(res.department)
            setTitle(res.title)
            setDesignation(res.designation)
            setEducation(res.education)
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
                <h2 className="font-weight-bold">Edit Staff Details</h2>
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
                    <FieldInput title={"Employee Id"} value={empId} setValue={setEmpId} type="number" />
                    <FieldInput title={"Joining Date"} value={joiningDate} setValue={setJoiningDate} type="date" />
                    <FieldInput title={"Department"} value={department} setValue={setDepartment} />
                    <FieldInputDropDown title="Title" value={title} setValue={setTitle} values={listOfTitles} />
                    {/* <FieldInput title={"Title"} value={title} setValue={setTitle} /> */}
                    <FieldInput title={"Designation"} value={designation} setValue={setDesignation} />
                    <EditEducation educationList={education} setEducationList={setEducation} />
                    <Button
                        color='success'
                        disabled={saving}
                        onClick={() => patchStaffDetials(props.token,
                            {
                                employeeId: empId,
                                associatedSince: joiningDate,
                                department: department,
                                title: title,
                                designation: designation,
                                education: education
                            },
                            setSaving, setSavingError, setSavingMessage
                        )}
                    >
                        Save Staff Details
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

export default withRouter(connect(mapStateToProps)(EditStaffDetails));