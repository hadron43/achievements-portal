import React, { useEffect, useState} from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Redirect, withRouter } from "react-router";
import { connect } from 'react-redux';
import Loading from '../../components/Loading';
import NotFound from '../../components/NotFound'
import { fetchBanners } from '../../redux/ActionCreators';
import PostBanner from './PostBanner';
import RenderBanners from './RenderBanners';

const mapStateToProps = (state) => ({
    authorized: state.user.authorized,
    token: state.user.token,
})

function EditBanners (props) {
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [banners, setBanners] = useState([]);

    const addBanner = (banner) => {
        setBanners([...banners, banner])
    }

    const deleteBanner = (banner) => {
        setBanners(banners.filter((ban) => ban.id !== banner.id))
    }

    useEffect(() => {
        fetchBanners(props.token, setBanners, setLoading, setErrorMessage)
    }, [props.token])

    if(errorMessage)
        return (
            <NotFound message={errorMessage} />
        );

    return (
        <Container className="p-3 p-md-4 p-lg-5 mt-4 mb-4 bg-color-lightest-grey rounded-3">
        {
        (!props.authorized) ?
        (
            <Redirect to="/login" />
        ) :
        (loading) ?
        (
            <Loading />
        ) :
        (
            <>
            <Row className="mb-5">
                <Col>
                    <h2 className="text-center font-weight-bold">Edit Banners</h2>
                </Col>
            </Row>
            <Row className='mb-4'>
                <Col>
                <PostBanner addBanner={addBanner} deleteBanner={deleteBanner} />
                </Col>
            </Row>
            <Row>
                <Col>
                    <RenderBanners banners={banners} />
                </Col>
            </Row>
            </>
        )
        }
        </Container>
    );
}

export default  withRouter(connect(mapStateToProps)(EditBanners));