import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Row, Col, Button, Input } from 'reactstrap';
import { AddInstitutionModal, listOfDegrees, RenderEducation } from '../../components/Extras';
import { fetchInstitutesList } from '../../redux/ActionCreators';

const mapStateToProps = (state) => ({
    authorized: state.user.authorized,
    token: state.user.token,
    institutesList: state.forms.institutesList,
    institutesLoading: state.forms.institutesLoading,
})

const mapDispatchToProps = (dispatch) => ({
    fetchInstitutesList: (key) => dispatch(fetchInstitutesList(key))
})

function EditEducation(props) {
    const [institute, setInstitute] = useState(1)
    const [degree, setDegree] = useState(listOfDegrees[0])
    const [year, setYear] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false)

    useEffect(() => {
        if(!props.institutesList && !props.institutesLoading) {
            props.fetchInstitutesList(props.token)
        }
    }, [props])

    return (
        <Row className="mt-3 mb-3">
            <AddInstitutionModal token={props.token} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
            <Col md="4">
            <h3 className="font-weight-bold">Education</h3>
            </Col>
            <Col md="8">
                <Row>
                    {/* render education objects from education list */}
                    {
                        (props.educationList) ?
                        <>
                        {
                            props.educationList.map((education) => (
                                <>
                                <Col xs={10} className='pr-1'>
                                    <RenderEducation
                                        institution={(props.institutesList) ?
                                            (props.institutesList.find((ins) => ins.id === education.institution)).title : ''}
                                        degree={education.degree}
                                        year={education.year}
                                     />
                                </Col>
                                <Col className='pl-1'>
                                    <Button
                                        color='danger'
                                        className='w-100'
                                        onClick={() => props.setEducationList(props.educationList.filter((edu) => edu !== education))}
                                        >
                                        Delete
                                    </Button>
                                </Col>
                                </>
                            ))
                        }
                        </>
                        :
                        <></>
                    }
                </Row>
                <Row className='mt-3'>
                    <Col md={5} className='pr-1'>
                        <Input type="select" name="institution" value={institute} onChange={e => setInstitute(e.target.value)} className="w-100"
                            disabled={props.institutesLoading}
                            >
                            <>
                            {
                                (props.institutesList) ?
                                props.institutesList.map((institute) => {
                                    return (
                                        <option value={institute.id}>{institute.title}</option>
                                    );
                                })
                                :
                                <></>
                            }
                            </>
                        </Input>
                    </Col>
                    <Col md={3} className='px-1'>
                        <Input type="select" name="degree" value={degree} onChange={e => setDegree(e.target.value)} className="w-100">
                            <>
                            {
                                (listOfDegrees) ?
                                listOfDegrees.map((degree) => {
                                    return (
                                        <option value={degree}>{degree}</option>
                                    );
                                })
                                :
                                <></>
                            }
                            </>
                        </Input>
                    </Col>
                    <Col md={2} className='px-1'>
                        <Input type="text"
                            value={year}
                            onChange={e => setYear(e.target.value)}
                            name="year"
                            placeholder="Year"
                            className="w-100"
                                />
                    </Col>
                    <Col md={2} className='pl-1'>
                        <Button
                            disabled={props.institutesLoading}
                            outline
                            className='w-100'
                            onClick={() => {
                                props.setEducationList([...props.educationList, {institution: parseInt(institute), degree, year: parseInt(year)}])
                            }}
                                >
                            Add
                        </Button>
                    </Col>
                </Row>
                <Row className='mt-2'>
                    <Col><Button color='link' onClick={() => setIsModalOpen(true)}>Can't find your institute? Click here to add institute.</Button></Col>
                </Row>
            </Col>
        </Row>
    );
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditEducation));