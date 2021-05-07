import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router';
import { Container, Row, Col, Label, Button, Form, Input, CustomInput } from 'reactstrap';

const mapStateToProps = (state) => ({
    authorized: state.user.authorized,
    token: state.user.token,
    listOfInstitutions: [
        "Indraprastha Intitute of Information Technology",
        "Others"
    ]
})

const mapDispatchToProps = (dispatch) => ({

})

class AddAchievement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            institution: '',
            otherInstitution: '',
            dateofachievement: '',
            mentors: [],
            mentorsInput: '',
            team: [],
            teamInput: '',
            tags: [],
            tagsInput: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.addTeamMember = this.addTeamMember.bind(this);
        this.addMentor = this.addMentor.bind(this);
        this.addTag = this.addTag.bind(this);
        this.addTeamMember = this.addTeamMember.bind(this);
        this.removeFromList = this.removeFromList.bind(this);
    }

    handleInputChange(event) {
        const target = event.target
        const value = target.value
        const name = target.name
        
        this.setState({
            [name] : value
        })
    }

    handleSubmit(event) {
        console.log('Submit detected.')
        event.preventDefault();
    }

    addTeamMember() {
        var validation = true
        // Perform validation
        if(validation) {
            this.setState({
                team: [...this.state.team, this.state.teamInput],
                teamInput: ''
            })
        }
    }

    addMentor() {
        var validation = true
        // Perform validation
        if(validation) {
            this.setState({
                mentors: [...this.state.mentors, this.state.mentorsInput],
                mentorsInput: ''
            })
        }
    }

    addTag() {
        var validation = true
        // Perform validation
        if(validation) {
            this.setState({
                tags: [...this.state.tags, this.state.tagsInput],
                tagsInput: ''
            })
        }
    }

    removeFromList(listName, item) {
        let list = this.state[listName]
        let ind = list.indexOf(item);
        list.splice(ind, 1)
        this.setState({
            [listName]: list
        })
        console.log(this.state.mentors)
    }

    render(){
        if(!this.props.authorized)
            return (
                <Redirect to="/login" />
            )
        return(
            <Container className="my-5 bg-color-lightest-grey p-4 p-md-5 rounded-3">
                <h2 className="font-weight-bold">Add Achievement</h2>
                <Form className="mt-5" onSubmit={this.handleSubmit}>
                    <Row className="form-group">
                        <Label htmlFor="title" md={3}>
                            <h4 className="font-weight-bold">Title</h4>
                        </Label>
                        <Col md={9}>
                            <Input type="text" 
                                value={this.state.title}
                                onChange={this.handleInputChange}
                                name="title"
                                placeholder="Enter title"
                                className="w-100"
                                    />
                        </Col>
                    </Row>

                    <Row className="form-group">
                        <Label htmlFor="description" md={3}>
                            <h4 className="font-weight-bold">Description</h4>
                        </Label>
                        <Col md={9}>
                            <Input type="textarea" 
                                value={this.state.description}
                                onChange={this.handleInputChange}
                                name="description"
                                placeholder="Enter description"
                                className="w-100 px-2"
                                    />
                        </Col>
                    </Row>

                    <Row className="form-group">
                        <Label htmlFor="institution" md={3}>
                            <h4 className="font-weight-bold">Institution / Organization</h4>
                        </Label>
                        <Col md={9}>
                            <Input type="select" name="institution" value={this.state.institution} onChange={this.handleInputChange} className="w-100">
                                <>
                                {
                                    this.props.listOfInstitutions.map((institute) => {
                                        return (
                                            <option value={institute}>{institute}</option>
                                        );
                                    })
                                }
                                </>
                            </Input>
                            {
                                (this.state.institution === "Others") ? 
                                <>
                                <Input type="text" 
                                    value={this.state.otherInstitution}
                                    onChange={this.handleInputChange}
                                    name="otherInstitution"
                                    placeholder="Enter full name of the institution / organization"
                                    className="w-100 mt-2"
                                        />
                                </>
                                :
                                <></>
                            }
                        </Col>
                    </Row>

                    <Row className="form-group">
                        <Label htmlFor="dateofachievement" md={3}>
                            <h4 className="font-weight-bold">Date of Achievement</h4>
                        </Label>
                        <Col md={3} className="d-flex">
                            <Input type="date" 
                                name="dateofachievement"
                                value={this.state.dateofachievement}
                                onChange={this.handleInputChange}
                                className="d-flex my-auto"
                                    />
                        </Col>
                    </Row>

                    <Row className="form-group">
                        <Label htmlFor="mentorsInput" md={3}>
                            <h4 className="font-weight-bold">Mentors</h4>
                        </Label>
                        <Col md={9}>
                            <Row>
                            <Col xs={7} md={8} lg={9}>
                                <Input type="email"
                                    name="mentorsInput"
                                    value={this.state.mentorsInput}
                                    onChange={this.handleInputChange}
                                    placeholder="Enter mentor's email ID"
                                    />
                            </Col>
                            <Col xs={5} md={4} lg={3} className="pl-0">
                                <Button color="info" className="w-100" onClick={this.addMentor}>Add Mentor</Button>
                            </Col>
                            <Col xs={12} className="mt-1">
                                <div className="box w-100">
                                {
                                    this.state.mentors.map((mentor) => {
                                        return (
                                            <div className="rounded-pill p-2 pl-3 mr-2 mt-2 bg-color-off-white d-inline-block">
                                                {mentor}
                                                <Button className="rounded-circle ml-3"
                                                    size="sm" color="danger"
                                                    onClick={() => this.removeFromList('mentors', mentor)}
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
                        </Col>
                        
                    </Row>

                    <Row className="form-group">
                        <Label htmlFor="teamInput" md={3}>
                            <h4 className="font-weight-bold">Team Members</h4>
                        </Label>
                        <Col md={9}>
                            <Row>
                            <Col xs={7} md={8} lg={9}>
                                <Input type="email"
                                    name="teamInput"
                                    value={this.state.teamInput}
                                    onChange={this.handleInputChange}
                                    placeholder="Enter team member's email ID"
                                    />
                            </Col>
                            <Col xs={5} md={4} lg={3} className="pl-0">
                                <Button color="info" className="w-100" onClick={this.addTeamMember}>Add Member</Button>
                            </Col>
                            <Col xs={12} className="mt-1">
                                <div className="box w-100">
                                {
                                    this.state.team.map((member) => {
                                        return (
                                            <div className="rounded-pill p-2 pl-3 mr-2 mt-2 bg-color-off-white d-inline-block">
                                                {member}
                                                <Button className="rounded-circle ml-3"
                                                    size="sm" color="danger"
                                                    onClick={() => this.removeFromList('team', member)}
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
                        </Col>
                    </Row>

                    <Row className="form-group">
                        <Label htmlFor="tagsInput" md={3}>
                            <h4 className="font-weight-bold">Tags</h4>
                        </Label>
                        <Col md={9}>
                            <Row>
                            <Col xs={7} md={8} lg={9}>
                                <Input type="email"
                                    name="tagsInput"
                                    value={this.state.tagsInput}
                                    onChange={this.handleInputChange}
                                    placeholder="Enter tags"
                                    />
                            </Col>
                            <Col xs={5} md={4} lg={3} className="pl-0">
                                <Button color="info" className="w-100" onClick={this.addTag}>Add Tag</Button>
                            </Col>
                            <Col xs={12} className="mt-1">
                                <div className="box w-100">
                                {
                                    this.state.tags.map((tag) => {
                                        return (
                                            <div className="rounded-pill p-2 pl-3 mr-2 mt-2 bg-color-off-white d-inline-block">
                                                {tag}
                                                <Button className="rounded-circle ml-3"
                                                    size="sm" color="danger"
                                                    onClick={() => this.removeFromList('tags', tag)}
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
                        </Col>
                    </Row>

                    <Row className="form-group">
                        <Label md={3}>
                            <h4 className="font-weight-bold">Proof</h4>
                        </Label>
                        <Col md={9}>
                            <CustomInput type="file" id="proof" name="proof" />
                        </Col>
                    </Row>

                    <Row>
                        <Col xs="12">
                            <Button color="success" className="mr-3"> Request for Approval </Button>
                            <Button color="danger" >Cancel</Button>
                        </Col>
                    </Row>
                </Form>
            </Container>
        )
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddAchievement));