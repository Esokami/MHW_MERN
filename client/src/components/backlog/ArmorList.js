import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';

const ArmorList = (props) => {
    const [armor, setArmor] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('https://mhw-db.com/armor/sets')
            .then((res) => {
                console.log(res.data)
                setArmor(res.data)
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
                <h3>List of Armor:</h3>
                <input type="text" placeholder='Search...'></input>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Rank</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {armor.sort((a, b) => (a.name > b.name) ? 1 : -1).map((armor, index) => {
                        return (
                            <tr key={index}>
                                <td>{armor.name}</td>
                                <td>{armor.rank}</td>

                                <td><Link to={`/armors/${armor.id}`}>Details</Link></td>
                            </tr>
                        )
                        })}
                </tbody>
            </Table>
        </Container>
    )
}

export default ArmorList;