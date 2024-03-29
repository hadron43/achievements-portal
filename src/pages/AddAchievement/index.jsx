import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router';
import { Container, Row, Col, Label, Button, Form, Input, CustomInput } from 'reactstrap';
import { fetchStudentsList, fetchInstitutesList, postNewAchievement, addAchievementPostingSuccess, patchAchievement } from '../../redux/ActionCreators';
import { AddInstitutionModal } from '../../components/Extras';
import EditTags from '../../components/EditTags';

const mapStateToProps = (state) => ({
    authorized: state.user.authorized,
    token: state.user.token,

    studentsList: state.forms.studentsList,
    studentsLoading: state.forms.studentsLoading,

    institutesList: state.forms.institutesList,
    institutesLoading: state.forms.institutesLoading,

    tagsList: state.forms.tagsList,
    tagsLoading: state.forms.tagsLoading,

    awardCategory: state.forms.awardCategory,

    addAchievementPosting: state.forms.addAchievementPosting,
    addAchievementPostingError: state.forms.addAchievementPostingError,
    addAchievementPostingMessage: state.forms.addAchievementPostingMessage
})

const mapDispatchToProps = (dispatch) => ({
    fetchStudentsList: (key) => dispatch(fetchStudentsList(key)),
    fetchInstitutesList: (key) => dispatch(fetchInstitutesList(key)),
    postNewAchievement: (key, stateObj, clearFunction) => dispatch(postNewAchievement(key, stateObj, clearFunction)),
    patchAchievement: (key, stateObj, clearFunction, achievementId) => dispatch(patchAchievement(key, stateObj, clearFunction, achievementId)),
    addAchievementPostingMessageClear: () => dispatch(addAchievementPostingSuccess(''))
})

const initialState = {
    title: '',
    description: '',
    institution: 1,
    dateofachievement: '',
    team: [],
    teamInput: '',
    teamAdding: false,
    teamInputErr: '',
    tags: [],
    category: 0,
    type: false,
    proof: null,
    file: null,
    progress: 0,
    isModalOpen: false
}

class AddAchievement extends Component {
    constructor(props) {
        super(props);
        this.state = initialState

        if(props.edit) {
            this.state.title = props.achievementDetails.title
            this.state.description = props.achievementDetails.description
            let insObj = props.achievementDetails.institution
            this.state.institution = insObj ? insObj.id : 1
            this.state.dateofachievement = props.achievementDetails.achievedDate
            this.state.category = props.achievementDetails.category
            this.state.proof = props.achievementDetails.proof
            this.state.type = props.achievementDetails.technical
            if(props.achievementDetails.tags)
                this.state.tags = props.achievementDetails.tags
            if(props.achievementDetails.teamMembers)
                this.state.team = props.achievementDetails.teamMembers.map(mem => ({user__email: mem.email, user__id: mem.id}))
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.addTeamMember = this.addTeamMember.bind(this);
        this.addTeamMember = this.addTeamMember.bind(this);
        this.removeFromList = this.removeFromList.bind(this);
        this.clearState = this.clearState.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
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

        if(this.props.addAchievementPostingMessage)
            this.props.addAchievementPostingMessageClear();
    }

    handleFileChange(event) {
        if(event.target.files[0]) {
            this.setState({
                file : event.target.files[0]
            })
        }
    }

    handleSubmit(event) {
        console.log('Submit detected.')
        if(this.props.edit)
            this.props.patchAchievement(this.props.token, this.state, this.clearState, this.props.achievementDetails.id);
        else
            this.props.postNewAchievement(this.props.token, this.state, this.clearState);
        event.preventDefault();
    }

    componentDidMount() {
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
                <h2 className="font-weight-bold text-center">{(this.props.edit ? 'Edit' : 'Add')} Achievement</h2>
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
                        <Label htmlFor="category" md={3}>
                            <h4 className="font-weight-bold">Category</h4>
                        </Label>
                        <Col md={9}>
                            <Input type="select" name="category" value={this.state.category} onChange={this.handleInputChange} className="w-100">
                                <>
                                {
                                    this.props.awardCategory.map((category) => {
                                        return (
                                            <option value={category.id}>{category.title}</option>
                                        );
                                    })
                                }
                                </>
                            </Input>
                        </Col>
                    </Row>

                    <Row className="form-group">
                        <Label htmlFor="type" md={3}>
                            <h4 className="font-weight-bold">Type</h4>
                        </Label>
                        <Col md={9}>
                            <Input type="select" name="type" value={this.state.type} onChange={this.handleInputChange} className="w-100">
                                <option value={true}>Technical</option>
                                <option value={false}>Non Technical</option>
                            </Input>
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

                    <Row className="form-group">
                        <Label md={3}>
                            <h4 className="font-weight-bold">Proof</h4>
                        </Label>
                        <Col md={9}>
                            <CustomInput type="file" id="proof" name="proof"
                                onChange={this.handleFileChange}/>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs="12">
                            <Button color="success" className="mr-3"
                                disabled={this.props.addAchievementPosting}
                             >
                                Request for Approval
                            </Button>
                            <Button color="danger" onClick={this.clearState}
                                disabled={this.props.addAchievementPosting}
                             >
                                Clear Form
                            </Button>
                        </Col>

                        <Col xs="12" className="mt-2">
                            <h6 className={`${this.props.addAchievementPostingError ? "text-danger" : "text-success"}`}>
                                {this.props.addAchievementPostingMessage}
                            </h6>
                        </Col>
                    </Row>
                </Form>
            </Container>
        )
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddAchievement));