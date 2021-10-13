import React, {useState} from 'react'
import { Col, Container, Row, Button, Table } from 'reactstrap';
import { withRouter } from "react-router";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import SearchBar from '../../components/Search'
import Loading from '../../components/Loading';
import NotFound from '../../components/NotFound'
import { baseUrl } from '../../shared/baseUrl';

const mapStateToProps = (state) => ({
    authorized: state.user.authorized,
    token: state.user.token,
})

function fetchAchievements(key, query, setAchievements, setLoading, setErrorMessage) {
    let token_head = 'Token '+key;
    console.log(token_head)

    var target = baseUrl+'main/api/search?q='+query
    console.log('searching: ', query)
    if(!query)
        target = baseUrl+'main/api/achievement'

    fetch(target, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token_head
        }
    })
    .then((response) => {
        if(!response.ok)
            throw new Error('Unexpected error occurred!')
        console.log(response.error)
        return response
    })
    .then(response => response.json())
    .then(response => {
        console.log(response)
        setAchievements(response.achievements)
        setLoading(false)
        return response
    })
    .catch(error => {
        setLoading(false)
        setErrorMessage(error.message)
        console.log(error)
    })
}

function Results( {achievements} ) {
    return (
        <Table hover responsive className="rounded-2">
            <thead>
                <th className="text-color-main h5">#</th>
                <th className="text-color-main h5">Title</th>
                <th className="text-color-main h5">Description</th>
                <th className="text-color-main h5">Added By</th>
                <th className="text-color-main h5">Date Created</th>
                <th className="text-color-main h5">Details</th>
            </thead>
            <tbody>
                {
                    achievements.map((achievement) => {
                        return (
                            <tr>
                            <th scope="row">{achievement.id}</th>
                            <td>{achievement.title}</td>
                            <td>{achievement.description}</td>
                            <td>{(achievement.addedBy) ? achievement.addedBy.first_name: ''}</td>
                            <td>{new Date(achievement.dateCreated).toLocaleString('default', {day: "2-digit", month: 'short', year: "numeric" })}</td>
                            <td>
                                <Link to={"/achievement/"+achievement.id}>
                                    <Button color="warning">
                                        View
                                    </Button>
                                </Link>
                            </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </Table>
    );
}

function Achievements(props) {
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [achievements, setAchievements] = useState(false);
    const [query, setQuery] = useState('');

    if(!loading && !errorMessage && !achievements) {
        setLoading(true);
        fetchAchievements(props.token, query, setAchievements, setLoading, setErrorMessage);
    }

    if(errorMessage)
        return ( <NotFound message={errorMessage} /> );

    return (
        <Container className="p-3 p-md-4 mt-4 mb-4 bg-color-lightest-grey rounded-3">
            <Row>
                <Col md={{size: 8, offset: 2}}>
                    <SearchBar query={query} setQuery={setQuery} onSearch={ () => {
                        setLoading(true)
                        fetchAchievements(props.token, query, setAchievements, setLoading, setErrorMessage);
                    }} />
                </Col>
            </Row>
            {/* <Row className="mt-4 bg-color-off-white rounded-2 p-2">
                <Col xs="auto">
                    <h3 className="text-color-main font-weight-bold mb-0 mr-4 d-inline">Filters</h3>
                </Col>
                <Col xs="auto">

                </Col>
            </Row> */}
            <Row className="mt-4">
                {
                    (loading) ?
                        <Loading />
                    :
                        <Results achievements={achievements}/>
                }
            </Row>
        </Container>
    )
}

export default withRouter(connect(mapStateToProps)(Achievements));