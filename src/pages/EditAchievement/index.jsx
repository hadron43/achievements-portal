import React, {useState, useEffect} from 'react';
import { Redirect, useParams, withRouter } from "react-router";
import { connect } from 'react-redux';
import { fetchAchievement } from '../../redux/ActionCreators';
import Loading from '../../components/Loading';
import NotFound from '../../components/NotFound';
import AddAchievement from '../AddAchievement';

const mapStateToProps = (state) => ({
    authorized: state.user.authorized,
    token: state.user.token,
})

function EditAchievement(props) {
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [achievementDetails, setAchievementDetails] = useState(false);
    const {achievementId} = useParams();
    useEffect(() => {
        if(!loading && !errorMessage && !achievementDetails) {
            setLoading(true);
            fetchAchievement(props.token, achievementId, setAchievementDetails, setLoading, setErrorMessage);
        }
    }, [loading, errorMessage, achievementDetails, achievementId, props.token])

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
                <AddAchievement edit={true} achievementDetails={achievementDetails} />
            }
        </>
    );
}

export default withRouter(connect(mapStateToProps)(EditAchievement));