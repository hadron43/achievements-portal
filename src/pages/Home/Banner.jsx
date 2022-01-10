import React, { useState, useEffect } from 'react';
import {Button} from 'reactstrap';
import Carousel from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import { addBanners, fetchBanners } from '../../redux/ActionCreators';
import Loading from '../../components/Loading';
import NotFound from '../../components/NotFound'
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

function Arrow({icon}) {
    return (
        <div className="rounded-circle bg-color-main d-flex p-2 arrow m-2">
            <i class={"fa fa-2x d-flex m-auto "+icon}></i>
        </div>
    );
}

function BannerCard(props) {
    return (
        <div>
        <div className="container-fluid row pl-3 pr-3">
        <div className="col-xs-12 col-sm-5 d-flex">
            <img className="d-flex m-auto" src={props.image} alt="Banner" width="90%"></img>
        </div>

        <div className="col-xs-12 col-sm-7 pt-3 pb-3">
            <h3 className="text-color-main pt-lg-5 pt-3">
                {props.title}
            </h3>
            <p>
                {props.plot}
            </p>
            <a href={props.link} className={`${props.link ? '' : 'd-none'}`}>
            <Button color="info" className="rounded bg-color-main-ui pl-3 pr-3" size="lg" >Read More </Button>
            </a>
            </div>
        </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    banners: state.updates.banners
})

const mapDispatchToProps = (dispatch) => ({
    addBanners: (banners) => dispatch(addBanners(banners))
})

function Banner(props) {
    const [banners, setBanners] = useState(props.banners)
    const [loading, setLoading] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')

    useEffect(() => {
        if(!banners)
            fetchBanners('', setBanners, setLoading, setErrorMsg)
    }, [banners])

    useEffect(() => {
        props.addBanners(banners)
        // eslint-disable-next-line
    }, [banners])

    if(loading)
        return (
            <Loading />
        )
    if(errorMsg)
        return (
            <NotFound message={errorMsg} />
        )

    return (
        <Carousel
            slidesPerPage={1}
            centered
            arrowLeft={<Arrow icon="fa-arrow-left"/>}
            arrowRight={<Arrow icon="fa-arrow-right"/>}
            addArrowClickHandler
            infinite
            autoPlay={8000}
            animationSpeed={1500}
            breakpoints={{
              768: {
                arrowLeft: false,
                arrowRight: false
              }
            }}
            className="bg-color-lightest-grey"
        >
            {
                (banners) ?
                    banners.map((banner) => {
                        return (
                            <BannerCard image={banner.image} title={banner.title} plot={banner.description} link={banner.link} />
                        )
                    })
                :
                <BannerCard  image={'assets/Home/1.jpg'} title={'Welcome to Achievement Portal!'} plot={''}/>
            }
        </Carousel>
    );
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Banner))