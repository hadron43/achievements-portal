import React, { useState, useEffect } from 'react'
import { Col, Row } from 'reactstrap'
import { RenderEducation } from '../../components/Extras'
import Loading from '../../components/Loading'
import { Field } from '../../components/ProfileComponents'
import { baseUrl } from '../../shared/baseUrl'

function StudentProfile({ token, studentId, institutesList }) {
    const [studObj, setStudObj] = useState({})
    const [loading, setLoading] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')

    useEffect(() => {
        setLoading(true)
        fetch(baseUrl + 'main/api/student/' + studentId + '/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + token
            }
        })
        .then(response => {
            if(!response.ok)
                throw new Error('Error while fetching student data!')
            return response.json()
        })
        .then(response => {
            setStudObj(response)
            setLoading(false)
        })
        .catch(err => {
            console.log(err);
            setErrorMsg(err.message)
            setLoading(false)
        })
    }, [token, studentId])

    return (
        <>
        <Row className="p-3 p-md-4 ">
            <Col className="xs-12 text-center">
                <h2 className="font-weight-bold">Student Details</h2>
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
                    <Field title={"Roll Number"} value={studObj.rollNo} />
                    <Field title={"Batch"} value={studObj.batch} />
                    <Field title={"Major"} value={studObj.major} />
                    <Field title={"CGPA"} value={studObj.GPA} />
                    <Field title={"Bio"} value={studObj.bio} />
                    <Row className="mt-3 mb-3">
                        <Col md="4">
                            <h3 className="font-weight-bold">Education</h3>
                        </Col>
                        <Col md="8">
                        {
                            (studObj && studObj.education) ?
                            studObj.education.map((education) => (
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

export default StudentProfile;