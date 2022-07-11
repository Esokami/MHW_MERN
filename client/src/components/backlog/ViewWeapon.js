import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, useParams, useNavigate} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

const ViewWeapon = (props) => {
    const [weapon, setWeapon] = useState({});
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('https://mhw-db.com/weapons/' + id)
            .then((res) => {
                console.log(res.data);
                setWeapon(res.data);
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
            <div className='d-flex flex-row justify-content-between align-items-center'>
                <h1>Monster Hunter World</h1>
                <Link to="/">Back to home</Link>
            </div>
            <div className='d-flex flex-row justify-content-between align-items-center'>
                <h3>{weapon.name}:</h3>
            </div>
            <div>
                <Table striped bordered hover className='mt-3'>
                    <thead>
                    <tr>
                            <th>Type</th>
                            <th>Species</th>
                            <th>Description</th>
                            <th>Locations</th>
                            <th>Rewards</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{weapon.type}</td>
                            <td>{weapon.species}</td>
                            <td>{weapon.description}</td>
                            <td>{weapon.species}</td>
                            <td>{weapon.species}</td>
                        </tr>
                    </tbody>
                </Table>
                <Table striped bordered hover className='mt-3'>
                    <thead>
                        <tr>
                            <th>Elements</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{weapon.name}</td>
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
                            <td>{weapon.name}</td>
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
                            <td>{weapon.name}</td>
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
                            <td>{weapon.species}</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </Container>
    )
}

export default ViewWeapon;