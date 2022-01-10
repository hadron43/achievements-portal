import React, { useState} from 'react';
import { Modal, CustomInput, Row, Col, Button, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap';
import { withRouter } from "react-router";
import { connect } from 'react-redux';
import { baseUrl } from '../../shared/baseUrl';

const mapStateToProps = (state) => ({
    authorized: state.user.authorized,
    token: state.user.token,
})

const postBanner = (key, bannerObj, addBanner, setLoading, setError, setMessage) => {
    setLoading(true)
    setError(false)
    setMessage('')

    var form_data = new FormData()
    for(const ke in bannerObj)
        form_data.append(ke, bannerObj[ke])

    fetch(baseUrl+'main/api/banner/', {
        method: 'POST',
        headers: {
            'Authorization': 'Token ' + key
        },
        body: form_data
    })
    .then(response => {
        if(!response.ok)
            throw Error("Error occurred while fetching banners!");
        return response;
    })
    .then(response => response.json())
    .then((response) => {
        setLoading(false)
        setMessage('Banner successfully added!')
        addBanner(response)
    })
    .catch(err => {
        console.log(err)
        setLoading(false)
        setError(true)
        setMessage(err.message)
    });
}

function PostBanner (props) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [posting, setPosting] = useState(false);
    const [error, setError] = useState(false)
    const [message, setMessage] = useState('');

    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [link, setLink] = useState('')
    const [file, setFile] = useState(false)

    return (
        <>
        <Button color='success' onClick={() => setIsModalOpen(true)}>
            Add New Banner
        </Button>
        <Modal centered isOpen={isModalOpen} toggle={() => setIsModalOpen(!isModalOpen)}>
            <ModalHeader>
                <h3 className='font-weight-bold'>Add New Banner</h3>
            </ModalHeader>
            <ModalBody>
                <Row className='mb-3'>
                    <Col xs={12}>
                        <h4>Title</h4>
                    </Col>
                    <Col xs={12}>
                        <Input type='textarea' value={title} onChange={(e) => setTitle(e.target.value)} />
                    </Col>
                </Row>
                <Row className='mb-3'>
                    <Col xs={12}>
                        <h4>Description (Upto 50 words)</h4>
                    </Col>
                    <Col xs={12}>
                        <Input type='textarea' value={desc} onChange={(e) => setDesc(e.target.value)} />
                    </Col>
                </Row>
                <Row className='mb-3'>
                    <Col xs={12}>
                        <h4>Link</h4>
                    </Col>
                    <Col xs={12}>
                        <Input type='text' value={link} onChange={(e) => setLink(e.target.value)} />
                    </Col>
                </Row>
                <Row className="mt-3 mb-3">
                    <Col xs={12}>
                        <h3>Image (16:9 ratio)</h3>
                    </Col>
                    <Col xs={12}>
                        <CustomInput type="file" id="file"
                            onChange={(e) => setFile(e.target.files[0])}/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    {
                        <p className={`${error ? 'text-danger' : 'text-success'}`}>
                            {message}
                        </p>
                    }
                    </Col>
                </Row>
            </ModalBody>
            <ModalFooter>
                <Button color="success"
                    onClick={() => postBanner(props.token,
                        {
                            title: title,
                            description: desc,
                            link: link,
                            image: file
                        },
                        props.addBanner, setPosting, setError, setMessage)}
                        disabled={posting}
                    >
                    Add Banner
                </Button>
            </ModalFooter>
        </Modal>
        </>
    );
}

export default  withRouter(connect(mapStateToProps)(PostBanner));