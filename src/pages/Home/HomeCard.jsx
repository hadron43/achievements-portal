import React from 'react';
import {Container, Button} from 'reactstrap';
import {Link} from 'react-router-dom';

function UpdatesCard({heading, updates, buttonText, buttonLink}) {
    return (
        <Container className="shadow rounded-lg bg-color-lightest-grey p-4 pb-5 h-100">
            
            <h4 className="text-color-main font-weight-bold mb-4">{heading}</h4>
            
            {updates.map((update) => {
                return (
                    <p>{update}</p>
                );
            })}

            <div className="bottom clearfix w-100">
                <Link to={buttonLink}>
                    <Button color="info" className="mt-2 float-right bottom-button bg-color-main-ui">{buttonText}</Button>
                </Link>
            </div>
        </Container>
    );
}

export default UpdatesCard;