import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router';
import { Container, Row, Col, Label, Button, Form, Input} from 'reactstrap';
// import Loading from '../../components/Loading';
import { fetchStudentsList, fetchProfessorsList, fetchInstitutesList, postNewProject, addProjectPostingSuccess, patchProject } from '../../redux/ActionCreators';
import { AddInstitutionModal } from '../../components/Extras';
import EditTags from '../../components/EditTags';

const mapStateToProps = (state) => ({
    authorized: state.user.authorized,
    token: state.user.token,

    professorsList: state.forms.professorsList,
    professorsLoading: state.forms.professorsLoading,

    studentsList: state.forms.studentsList,
    studentsLoading: state.forms.studentsLoading,

    institutesList: state.forms.institutesList,
    institutesLoading: state.forms.institutesLoading,

    addProjectPosting: state.forms.addProjectPosting,
    addProjectPostingError: state.forms.addProjectPostingError,
    addProjectPostingMessage: state.forms.addProjectPostingMessage
})

const mapDispatchToProps = (dispatch) => ({
    fetchStudentsList: (key) => dispatch(fetchStudentsList(key)),
    fetchProfessorsList: (key) => dispatch(fetchProfessorsList(key)),
    fetchInstitutesList: (key) => dispatch(fetchInstitutesList(key)),
    postNewProject: (key, stateObj, clearFunction) => dispatch(postNewProject(key, stateObj, clearFunction)),
    patchProject: (key, stateObj, clearFunction, projectId) => dispatch(patchProject(key, stateObj, clearFunction, projectId)),
    addProjectPostingMessageClear: () => dispatch(addProjectPostingSuccess(''))
})

const initialState = {
    title: '',
    description: '',
    institution: 1,
    startdate: '',
    enddate: '',
    field: '',
    domain: '',
    mentors: [],
    mentorsInput: '',
    mentorAdding: false,
    mentorsInputErr: '',
    team: [],
    teamInput: '',
    teamAdding: false,
    teamInputErr: '',
    tags: [],
    category: 0,
    type: false,
    url: null,
    progress: 0,
    isModalOpen: false
}

class AddProject extends Component {
    constructor(props) {
        super(props);
        this.state = initialState
        if(props.edit) {
            this.state.title = props.projectDetails.title
            this.state.description = props.projectDetails.description
            let insObj = props.projectDetails.institution
            this.state.institution = insObj ? insObj.id : 1
            this.state.startdate = props.projectDetails.startDate
            this.state.enddate = props.projectDetails.endDate
            this.state.field = props.projectDetails.field
            this.state.domain = props.projectDetails.domain
            this.state.url = props.projectDetails.url
            if(props.projectDetails.tags)
                this.state.tags = props.projectDetails.tags
            if(props.projectDetails.mentors)
                this.state.mentors = props.projectDetails.mentors.map(mem => ({user__email: mem.user.email, id: mem.id}))
            if(props.projectDetails.students)
                this.state.team = props.projectDetails.students.map(mem => ({user__email: mem.user.email, id: mem.id}))
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.addTeamMember = this.addTeamMember.bind(this);
        this.addMentor = this.addMentor.bind(this);
        this.addTeamMember = this.addTeamMember.bind(this);
        this.removeFromList = this.removeFromList.bind(this);
        this.clearState = this.clearState.bind(this);
    }

    clearState() {
        this.setState(initialState);
    }

    handleInputChange(event) {
        const target = event.target
        const value = target.value
        const name = target.name

        this.setState({
            [name] : value,
            [name+"Err"] : '',
        })

        if(this.props.addProjectPostingMessage)
            this.props.addProjectPostingMessageClear();
    }

    handleSubmit(event) {
        console.log('Submit detected.')
        if(this.props.edit)
            this.props.patchProject(this.props.token, this.state, this.clearState, this.props.projectDetails.id);
        else
            this.props.postNewProject(this.props.token, this.state, this.clearState);
        event.preventDefault();
    }

    componentDidMount() {
        if(!this.props.professorsLoading && !this.props.professorsList)
            this.props.fetchProfessorsList(this.props.token)
        if(!this.props.studentsLoading && !this.props.studentsList)
            this.props.fetchStudentsList(this.props.token)
        if(!this.props.institutesLoading && !this.props.institutesList)
            this.props.fetchInstitutesList(this.props.token)
    }

    addTeamMember() {
        this.setState({teamAdding: true})
        var studentObj = this.props.studentsList.find(student => student.user__email === this.state.teamInput)
        var validation = studentObj !== undefined
        console.log(this.props.studentsList)

        if(validation && this.state.team.indexOf(studentObj) === -1) {
            this.setState({
                team: [...this.state.team, studentObj],
                teamInput: ''
            })
        }
        else if (this.state.team.indexOf(studentObj) !== -1) {
            this.setState({
                teamInputErr : 'Team member already added!'
            })
        }
        else {
            this.setState({
                teamInputErr : 'No such student found in our database!'
            })
        }
        this.setState({teamAdding: false})
    }

    addMentor() {
        this.setState({mentorAdding: true})
        var profObj = this.props.professorsList.find(prof => prof.user__email === this.state.mentorsInput)
        var validation = profObj !== undefined

        if(validation && this.state.mentors.indexOf(profObj) === -1) {
            this.setState({
                mentors: [...this.state.mentors, profObj],
                mentorsInput: ''
            })
        }
        else if (this.state.mentors.indexOf(profObj) !== -1) {
            this.setState({
                mentorsInputErr : 'Mentor already added!'
            })
        }
        else {
            this.setState({
                mentorsInputErr : 'No such mentor found in our database!'
            })
        }
        this.setState({mentorAdding: false})
    }

    capitalize(input) {
        return input.split(' ').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
    }

    removeFromList(listName, item) {
        let list = this.state[listName]
        let ind = list.indexOf(item);
        list.splice(ind, 1)
        this.setState({
            [listName]: list
        })
    }

    render(){
        if(!this.props.authorized)
            return (
                <Redirect to="/login" />
            )
        return(
            <Container className="my-5 bg-color-lightest-grey p-4 p-md-5 rounded-3">
                <h2 className="font-weight-bold text-center">{(this.props.edit ? 'Edit' : 'Add')} Project</h2>
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
                        <Label htmlFor="description" md={3}>
                            <h4 className="font-weight-bold">URL</h4>
                        </Label>
                        <Col md={9}>
                            <Input type="text"
                                value={this.state.url}
                                onChange={this.handleInputChange}
                                name="url"
                                placeholder="Enter URL"
                                className="w-100 px-2"
                                    />
                        </Col>
                    </Row>

                    <Row className="form-group">
                        <Label htmlFor="institution" md={3}>
                            <h4 className="font-weight-bold">Institution</h4>
                        </Label>
                        <Col md={9}>
                            <Input type="select" name="institution" value={this.state.institution} onChange={this.handleInputChange} className="w-100"
                                disabled={this.props.institutesLoading}
                             >
                                <>
                                {
                                    (this.props.institutesList) ?
                                    this.props.institutesList.map((institute) => {
                                        return (
                                            <option value={institute.id}>{institute.title}</option>
                                        );
                                    })
                                    :
                                    <></>
                                }
                                </>
                            </Input>
                            <AddInstitutionModal token={this.props.token} isModalOpen={this.state.isModalOpen} setIsModalOpen={(value) => this.setState({isModalOpen: value})} />
                            <Button color='link' onClick={() => this.setState({isModalOpen: true})} className='mt-2'>Can't find your institute? Click here to add institute.</Button>
                        </Col>
                    </Row>

                    <Row className="form-group">
                        <Label htmlFor="startdate" md={3}>
                            <h4 className="font-weight-bold">Duration</h4>
                        </Label>
                        <Col md={3} className="d-flex">
                            <Input type="date"
                                name="startdate"
                                value={this.state.startdate}
                                onChange={this.handleInputChange}
                                className="d-flex my-auto"
                                    />
                        </Col>
                        <Label htmlFor="enddate" md={1} className="d-flex">
                            <h4 className="font-weight-bold d-flex m-auto">to</h4>
                        </Label>
                        <Col md={3} className="d-flex">
                            <Input type="date"
                                name="enddate"
                                value={this.state.enddate}
                                onChange={this.handleInputChange}
                                className="d-flex my-auto"
                                    />
                        </Col>
                    </Row>

                    <Row className="form-group">
                        <Label htmlFor="field" md={3}>
                            <h4 className="font-weight-bold">Track</h4>
                        </Label>
                        <Col md={3} className="d-flex">
                            <Input type="text"
                                name="field"
                                value={this.state.field}
                                placeholder="Enter track"
                                onChange={this.handleInputChange}
                                className="d-flex my-auto"
                                    />
                        </Col>
                        <Label htmlFor="domain" md={3} className="d-flex">
                            <h4 className="font-weight-bold d-md-flex m-md-auto">Domain</h4>
                        </Label>
                        <Col md={3} className="d-flex">
                            <Input type="text"
                                name="domain"
                                value={this.state.domain}
                                placeholder="Enter domain"
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
                                <p className="text-danger m-0 px-2">{this.state.mentorsInputErr}</p>
                            </Col>
                            <Col xs={5} md={4} lg={3} className="pl-0">
                                <Button color="info" className="w-100"
                                    onClick={this.addMentor}
                                    disabled={this.props.professorsLoading
                                        || this.state.mentorAdding}
                                    >
                                    Add Mentor
                                </Button>
                            </Col>
                            <Col xs={12} className="mt-1">
                                <div className="box w-100">
                                {
                                    this.state.mentors.map((mentor) => {
                                        return (
                                            <div className="rounded-pill p-2 pl-3 mr-2 mt-2 bg-color-off-white d-inline-block">
                                                {mentor.user__email}
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
                                <p className="text-danger m-0 px-2">{this.state.teamInputErr}</p>
                            </Col>
                            <Col xs={5} md={4} lg={3} className="pl-0">
                                <Button color="info" className="w-100" onClick={this.addTeamMember}
                                    disabled={this.props.studentsLoading
                                        || this.state.teamAdding}
                                 >
                                    Add Member
                                </Button>
                            </Col>
                            <Col xs={12} className="mt-1">
                                <div className="box w-100">
                                {
                                    this.state.team.map((member) => {
                                        return (
                                            <div className="rounded-pill p-2 pl-3 mr-2 mt-2 bg-color-off-white d-inline-block">
                                                {member.user__email}
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
                            <EditTags tags={this.state.tags}
                                addTag={(tag) => this.setState({
                                    tags: [...this.state.tags, tag]
                                })}
                                removeTag={(tag) => {
                                    this.removeFromList('tags', tag)
                                }}
                             />
                        </Col>
                    </Row>

                    <Row>
                        <Col xs="12">
                            <Button color="success" className="mr-3"
                                disabled={this.props.addProjectPosting}
                             >
                                Request for Approval
                            </Button>
                            <Button color="danger" onClick={this.clearState}
                                disabled={this.props.addProjectPosting}
                             >
                                Clear Form
                            </Button>
                        </Col>

                        <Col xs="12" className="mt-2">
                            <h6 className={`${this.props.addProjectPostingError ? "text-danger" : "text-success"}`}>
                                {this.props.addProjectPostingMessage}
                            </h6>
                        </Col>
                    </Row>
                </Form>
            </Container>
        )
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddProject));