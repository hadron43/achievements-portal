import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Col, Row, Button, Input } from 'reactstrap';
import { fetchTagsList } from '../redux/ActionCreators';
import { AddTagModal } from './Extras';

const mapStateToProps = (state) => ({
    token: state.user.token,

    tagsList: state.forms.tagsList,
    tagsLoading: state.forms.tagsLoading
})

const mapDispatchToProps = (dispatch) => ({
    fetchTagsList: (key) => dispatch(fetchTagsList(key))
})

function EditTags(props) {
    // requires: tags, addTag, removeTag
    const [selectedTag, setSelectedTag] = useState(0)
    const [isModalOpen, setIsModalOpen] = useState(false)

    useEffect(() => {
        if(!props.tagsLoading && !props.tagsList)
            props.fetchTagsList(props.token)
        // eslint-disable-next-line
    }, [])

    return (
        <>
        <Row>
            <Col xs={7} md={8} lg={9}>
                <Input type="select" name="category" onChange={(e) => setSelectedTag(parseInt(e.target.value))} className="w-100">
                    <>
                    <option value={0}>-- Select Tag --</option>
                    {
                        (!props.tagsList) ?
                        <></>
                        :
                        props.tagsList.map((tag) => {
                            return (
                                <option value={tag.id}>{tag.title}</option>
                            );
                        })
                    }
                    </>
                </Input>
            </Col>
            <Col xs={5} md={4} lg={3} className="pl-0">
                <Button color="info" className="w-100"
                    onClick={() => {
                        let tagsFilter = props.tagsList.filter((tag) => tag.id === selectedTag)
                        let alreadyPresent = props.tags.filter((tag) => tag.id === selectedTag).length > 0
                        if(tagsFilter.length > 0 && !alreadyPresent)
                            props.addTag(tagsFilter[0])
                    }}
                    disabled={props.tagsLoading || !selectedTag}
                    >
                    Add Tag
                </Button>
            </Col>
        </Row>
        <Row className='mt-2'>
            <Col>
            {/* Display already selected tags by user */}
            <div className="box w-100">
                {
                    (!props.tags) ?
                    <></>
                    :
                    props.tags.map((tag) => {
                        return (
                            <div className="rounded-pill p-2 pl-3 mr-2 mt-2 bg-color-off-white d-inline-block">
                                {tag.title}
                                <Button className="rounded-circle ml-3"
                                    size="sm" color="danger"
                                    onClick={() => props.removeTag(tag)}
                                        >
                                    <i className="fa fa-times"></i>
                                </Button>
                            </div>
                        );
                    })
                }
            </div>
            </Col>
        </Row>
        <Row className='mt-2'>
            <Col>
                <AddTagModal token={props.token} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
                <Button color="link"
                    onClick={() => setIsModalOpen(true)}
                >
                Can't find your tag? Click here to add a new tag.
                </Button>
            </Col>
        </Row>
        </>
    )
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditTags));