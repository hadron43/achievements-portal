import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Row, Col, Button, Input } from 'reactstrap';
import Loading from '../../components/Loading';
import { baseUrl } from '../../shared/baseUrl';

const mapStateToProps = (state) => ({
    authorized: state.user.authorized,
    token: state.user.token
})

function EditPhoneNumbers(props) {
    const [numbers, setNumbers] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        setLoading(false)
        fetch(baseUrl+'auth/api/phone/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + props.token
            }
        })
        .then(response => {
            if(!response.ok)
                throw Error('Error!')
            setNumbers(response.json())
        })
        .catch(err => {
            console.log(err)
            setError(err.message)
        })
    },[props])

    return (
        <Row className="mt-3 mb-3">
        <Col md="4">
        <h3 className="font-weight-bold">Phone</h3>
        </Col>
        <Col md="8">
            <Row>
                <Col>
                    <Input type="phone"
                    name="teamInput"
                    placeholder="Enter phone number"
                    />
                </Col>
                <Col>
                <Button>Add Number</Button>
                </Col>
            </Row>
        </Col>
        <Col md="4"></Col>
        <Col>
            {
                (loading) ?
                <Loading />
                :
                (error) ?
                <h4 className='text-danger h-100'>{error}</h4>
                :
                <>
                {
                    (typeof(numbers) === Array) ?
                        numbers.map((number) => {
                            return (
                                <div className="rounded-pill p-2 pl-3 mr-2 mt-2 bg-color-off-white d-inline-block">
                                    {number.number}
                                    <Button className="rounded-circle ml-3"
                                        size="sm" color="danger"
                                        onClick={() => {
                                            let ind = numbers.indexOf(number)
                                            setNumbers(numbers.splice(ind, 1))
                                        }}
                                            >
                                        <i className="fa fa-times"></i>
                                    </Button>
                                </div>
                            );
                        })
                    :
                    <></>
                }
                </>
            }
        </Col>
        </Row>
    );
}

export default withRouter(connect(mapStateToProps)(EditPhoneNumbers));