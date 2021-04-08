import React, {Component} from 'react';
import { Container, Row, Col } from 'reactstrap';

import Banner from './Banner';
import { UpdatesCard, TopCard } from './HomeCard';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { fetchUpdates } from '../../redux/ActionCreators';

const mapStateToProps = state => {
    return {
        isLoading: state.updates.isLoading,
        errMess: state.updates.errMess,

        publications: state.updates.updates.publications,
        staff: state.updates.updates.staff,
        students: state.updates.updates.students,

        active_departments: state.updates.updates.active_departments,
        active_students: state.updates.updates.active_students,
        active_staff: state.updates.updates.active_staff
    }
}

const mapDispatchToProps = (dispatch) => ({
    fetchUpdates: () => {dispatch(fetchUpdates())}
});

class  Home extends Component {
    componentDidMount() {
        this.props.fetchUpdates();
    }

    render() {
        return (
            <>
            <Banner />

            <Container fluid className="mt-3 mb-3">
                <Row equal className="p-1 p-sm-2 p-lg-3 p-xl-5">
                    <Col size="12" sm="6" lg="4" xxl="3" className="mb-4">
                        <div className="col-12 h-100"><UpdatesCard {...this.props.publications} isLoading={this.props.isLoading} errMess={this.props.errMess}/></div>
                    </Col>
                    <Col size="12" sm="6" lg="4" xxl="3" className="mb-4">
                        <div className="col-12 h-100"><UpdatesCard {...this.props.staff} isLoading={this.props.isLoading} errMess={this.props.errMess}/></div>
                    </Col>
                    <Col size="12" sm="6" lg="4" xxl="3" className="mb-4">
                        <div className="col-12 h-100"><UpdatesCard {...this.props.students} isLoading={this.props.isLoading} errMess={this.props.errMess}/></div>
                    </Col>
                </Row>

                <Row equal className="p-1 p-sm-2 p-lg-3 p-xl-5">
                    <Col size="12" sm="6" lg="4" xxl="3" className="mb-4">
                        <div className="col-12 h-100"><TopCard {...this.props.active_departments} isLoading={this.props.isLoading} errMess={this.props.errMess}/></div>
                    </Col>
                    <Col size="12" sm="6" lg="4" xxl="3" className="mb-4">
                        <div className="col-12 h-100"><TopCard {...this.props.active_students} isLoading={this.props.isLoading} errMess={this.props.errMess}/></div>
                    </Col>
                    <Col size="12" sm="6" lg="4" xxl="3" className="mb-4">
                        <div className="col-12 h-100"><TopCard {...this.props.active_students} isLoading={this.props.isLoading} errMess={this.props.errMess}/></div>
                    </Col>
                </Row>
            </Container>
            </>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));