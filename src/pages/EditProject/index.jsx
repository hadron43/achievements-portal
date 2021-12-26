import React, {useState, useEffect} from 'react';
import { Redirect, useParams, withRouter } from "react-router";
import { connect } from 'react-redux';
import { fetchProject } from '../../redux/ActionCreators';
import Loading from '../../components/Loading';
import NotFound from '../../components/NotFound';
import AddProject from '../AddProject';

const mapStateToProps = (state) => ({
    authorized: state.user.authorized,
    token: state.user.token,
})

function EditProject(props) {
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [projectDetails, setProjectDetails] = useState(false);
    const {projectId} = useParams();
    useEffect(() => {
        if(!loading && !errorMessage && !projectDetails) {
            setLoading(true);
            fetchProject(props.token, projectId, setProjectDetails, setLoading, setErrorMessage);
        }
    }, [loading, errorMessage, projectDetails, projectId, props.token])

    if(errorMessage)
        return (
            <NotFound />
        );
    return (
        <>
            {
            (!props.authorized) ?
            (
                <Redirect to="/login" />
            ) :
            (loading) ?
            (
                <Loading />
            ) :
                <AddProject edit={true} projectDetails={projectDetails} />
            }
        </>
    );
}

export default withRouter(connect(mapStateToProps)(EditProject));