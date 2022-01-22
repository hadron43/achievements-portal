import React, {Component} from 'react';
import { Container, Row, Col } from 'reactstrap';

import Banner from './Banner';
import { UpdatesCard } from './HomeCard';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { fetchUpdates } from '../../redux/ActionCreators';
import Loading from '../../components/Loading';

const mapStateToProps = state => ({
    isLoading: state.updates.isLoading,
    errMess: state.updates.errMess,

    publications: state.updates.updates.publications,
    staff: state.updates.updates.staff_achievements,
    students: state.updates.updates.student_achievements,
})

const mapDispatchToProps = (dispatch) => ({
    fetchUpdates: () => {dispatch(fetchUpdates())}
});

class  Home extends Component {
    componentDidMount() {
        console.log(this.props.isLoading, this.props.errMess, this.props.publications)
        if(!this.props.isLoading && !this.props.errMess && !this.props.publications)
            this.props.fetchUpdates();
    }

    render() {
        return (
            <>
            <Banner />

            <Container fluid className="mt-3 mb-3">
                <Row className="px-1 px-sm-2 px-lg-3 px-xl-5">
                    <Col size={12}>
                        <h3 className='px-4 pt-4'>Recent Updates</h3>
                    </Col>
                </Row>
                <Row equal className="p-1 p-sm-2 p-lg-3 p-xl-5">
                    {
                        (this.props.isLoading) ?
                        <Loading />
                        :
                        (this.props.errMess) ?
                        <>
                        <p className="text-danger text-center">{this.props.errMess}</p>
                        </>
                        :
                        <>
                            <Col size="12" sm="6" lg="4" xxl="3" className="mb-4">
                                <div className="col-12 h-100">
                                    <UpdatesCard
                                        heading="Projects"
                                        updates={this.props.publications}
                                        errMess={this.props.errMess}/>
                                </div>
                            </Col>
                            <Col size="12" sm="6" lg="4" xxl="3" className="mb-4">
                                <div className="col-12 h-100">
                                    <UpdatesCard
                                        heading="Staff Achievements"
                                        updates={this.props.staff}
                                        errMess={this.props.errMess}/>
                                </div>
                            </Col>
                            <Col size="12" sm="6" lg="4" xxl="3" className="mb-4">
                                <div className="col-12 h-100">
                                    <UpdatesCard
                                        heading="Student Achievements"
                                        updates={this.props.students}
                                        errMess={this.props.errMess}/>
                                </div>
                            </Col>
                        </>
                    }
                </Row>
            </Container>
            </>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));