import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, useParams, useNavigate} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

const ViewMonster = (props) => {
    const [monster, setMonster] = useState([]);
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('https://mhw-db.com/monsters/' + id)
            .then((res) => {
                console.log(res.data);
                setMonster(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, []);

    const Capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    return (
        <Container>
            <div className='d-flex justify-content-between align-items-center mt-2'>
                <h4>Monster Hunter: World</h4>
                <Link to={"/"}>Logout</Link>
            </div>
            <div className='d-flex flex-column align-items-center'>
                <h2>Monster Drop Tracker</h2>
            </div>
            <div className='d-flex justify-content-between align-items-center mt-2'>
                <Link to="/dashboard">Back to Dashboard</Link>
                <Link to="/monsters">Back to Monsters</Link>
            </div>
            <div className='d-flex flex-row justify-content-between align-items-center mt-4'>
                <h3>{monster.name}:</h3>
            </div>
            <div>
                <Table striped bordered hover className='mt-3'>
                    <thead>
                    <tr>
                            <th>Type</th>
                            <th>Species</th>
                            <th>Description</th>
                            {/* <th>Locations</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{monster.type}</td>
                            <td>{monster.species}</td>
                            <td>{monster.description}</td>
                            {/* <td>{monster.species}</td> */}
                        </tr>
                    </tbody>
                </Table>
                <Table>
                    <thead>
                        <tr>
                            <th>Rewards</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{monster.rewards}</td>
                        </tr>
                    </tbody>
                </Table>
                {/* <Table striped bordered hover className='mt-3'>
                    <thead>
                        <tr>
                            <th>Elements</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{monster.elements}</td>
                        </tr>
                    </tbody>
                </Table>
                <Table striped bordered hover className='mt-3'>
                    <thead>
                        <tr>
                            <th>Ailments</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{monster.name}</td>
                        </tr>
                    </tbody>
                </Table>
                <Table striped bordered hover className='mt-3'>
                    <thead>
                        <tr>
                            <th>Resistances</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{monster.name}</td>
                        </tr>
                    </tbody>
                </Table>
                <Table striped bordered hover className='mt-3'>
                    <thead>
                        <tr>
                            <th>Weakness</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{monster.species}</td>
                        </tr>
                    </tbody>
                </Table> */}
            </div>
        </Container>
    )
}

export default ViewMonster;