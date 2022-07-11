import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';

const WeaponList = (props) => {
    const [weapons, setWeapons] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('https://mhw-db.com/weapons')
            .then((res) => {
                console.log(res.data)
                setWeapons(res.data)
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
                <h1>MonsterHunter World</h1>
                <Link to={'/'}>Return Home</Link>
            </div>
            <div className='d-flex justify-content-between alignt-items-center mb-3'>
                <h3>List of Weapons:</h3>
                <input type="text" placeholder='Search...'></input>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Rarity</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {weapons.sort((a, b) => (a.name > b.name) ? 1 : -1).map((weapon, index) => {
                        return (
                            <tr key={index}>
                                <td>{weapon.name}</td>
                                <td>{weapon.type}</td>
                                <td>{weapon.rarity}</td>
                                <td><Link to={`/weapons/${weapon.id}`}>Details</Link></td>
                            </tr>
                        )
                        })}
                </tbody>
            </Table>
        </Container>
    )
}

export default WeaponList;