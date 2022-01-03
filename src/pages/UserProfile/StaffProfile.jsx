import React, { useState, useEffect } from 'react'
import { Col, Row } from 'reactstrap'
import { RenderEducation } from '../../components/Extras'
import Loading from '../../components/Loading'
import { Field } from '../../components/ProfileComponents'
import { baseUrl } from '../../shared/baseUrl'

function StaffProfile({ token, staffId, institutesList, setTitle }) {
    const [staffObj, setStaffObj] = useState({})
    const [loading, setLoading] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')

    useEffect(() => {
        setLoading(true)
        fetch(baseUrl + 'main/api/staff/' + staffId + '/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + token
            }
        })
        .then(response => {
            if(!response.ok)
                throw new Error('Error while fetching staff data!')
            return response.json()
        })
        .then(response => {
            setStaffObj(response)
            setTitle(response.title)
            setLoading(false)
        })
        .catch(err => {
            console.log(err);
            setErrorMsg(err.message)
            setLoading(false)
        })
    }, [token, staffId, setTitle])

    return (
        <>
        <Row className="p-3 p-md-4 ">
            <Col className="xs-12 text-center">
                <h2 className="font-weight-bold">Staff Details</h2>
            </Col>
        </Row>
        <Row>
            <Col>
            {
                (loading) ?
                <Loading />
                :
                (errorMsg) ?
                <p xs={12} className='text-danger'>{errorMsg}</p>
                :
                <>
                    <Field title={"Employee Id."} value={staffObj.employeeId} />
                    <Field title={"Date of joining"} value={staffObj.associatedSince} />
                    <Field title={"Deapartment"} value={staffObj.department} />
                    <Field title={"Designation"} value={staffObj.designation} />
                    <Row className="mt-3 mb-3">
                        <Col md="4">
                            <h3 className="font-weight-bold">Education</h3>
                        </Col>
                        <Col md="8">
                        {
                            (staffObj && staffObj.education) ?
                            staffObj.education.map((education) => (
                                <RenderEducation
                                    institution={(institutesList) ?
                                        (institutesList.find((ins) => ins.id === education.institution)).title : ''}
                                    degree={education.degree}
                                    year={education.year}
                                />
                            ))
                            :
                            <></>
                        }
                        </Col>
                    </Row>
                </>
            }
            </Col>
        </Row>
        </>
    );
}

export default StaffProfile;