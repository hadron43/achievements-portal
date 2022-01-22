import React from 'react';
import {Container, Row, Col, Button} from 'reactstrap';
import {Link} from 'react-router-dom';

import Loading from '../../components/Loading';

function UpdatesCard({heading, updates, buttonText="More Updates", buttonLink}) {
    if(!updates)
        return (<></>)
    return (
        <Container className="shadow rounded-lg bg-color-lightest-grey p-4 pb-5 h-100">

            <h4 className="text-color-main font-weight-bold mb-4">
                {heading}
            </h4>

            {
                (!updates.length) ?
                <p className="text-info">No updates yet!</p>
                :
                updates.map((update) => {
                    return (
                        <>
                        <p>{update.title}</p>
                        </>
                    );
                })
            }

            <br />

            <div className={`${buttonLink ? '' : 'd-none'} bottom clearfix w-100`}>
                <Link to={buttonLink}>
                    <Button color="info" className="mt-2 float-right bottom-button bg-color-main-ui">{buttonText}</Button>
                </Link>
            </div>

        </Container>
    );
}

function rankToColor(rank) {
    var color = "bg-white";
    if(rank === 1)
        color = "bg-warning";
    else if(rank === 2)
        color = "bg-color-silver";
    else if(rank === 3)
        color = "bg-color-bronze";
    return color;
}

function TopCard({heading, toppers, buttonText, buttonLink, isLoading, errMess}) {
    return (
        <Container fluid className="shadow rounded-lg bg-color-lightest-grey p-4 pb-5 h-100">

            <h4 className="text-color-main font-weight-bold mb-4">
                {(!isLoading && !errMess) ? heading : (errMess) ? {errMess} : "Loading..."}
            </h4>
            {
                (!isLoading && !errMess) ?
                    <>
                    {toppers.map((update) => {
                        return (
                            <Row className="mb-2">
                                <Col xs="1" className="d-flex">
                                    <p className="d-flex m-auto">{update.rank}</p>
                                </Col>
                                <Col xs="8" className="d-flex">
                                <p className="d-flex mt-auto mb-auto">{update.name}</p>
                                </Col>
                                <Col xs="2" className={`d-flex rounded p-2 ${rankToColor(update.rank)}`}>
                                    <p className="d-flex m-auto">{update.points}</p>
                                </Col>
                            </Row>
                        );
                    })}
                    <br />
                    <div className="bottom clearfix w-100">
                        <Link to={buttonLink}>
                            <Button color="info" className="mt-2 float-right bottom-button bg-color-main-ui">{buttonText}</Button>
                        </Link>
                    </div>
                    </>
                :
                (errMess) ? <></>
                :
                <Loading />
            }

        </Container>
    );
}

export {UpdatesCard, TopCard};