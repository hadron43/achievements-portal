import React from 'react';
import {Button} from 'reactstrap';
import Carousel from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';

const mapStateToProps = state => {
    return {
        blogs: state.blogs
    };
}

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
            <Button color="info" className="rounded bg-color-main-ui pl-3 pr-3" size="lg" >Read More </Button>
            </div>
        </div>
        </div>
    );
}

function Banner(props) {
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
            <BannerCard storyNo="1" image={props.blogs[0].imagePath} title={props.blogs[0].title} plot={props.blogs[0].detailedPlot}/>
            <BannerCard storyNo="2" image={props.blogs[1].imagePath} title={props.blogs[1].title} plot={props.blogs[1].detailedPlot}/>
            <BannerCard storyNo="3" image={props.blogs[2].imagePath} title={props.blogs[2].title} plot={props.blogs[2].detailedPlot}/>
        </Carousel>
    );
}

export default withRouter(connect(mapStateToProps)(Banner));