import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';

const MonsterList = (props) => {
    const [monsters, setMonsters] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('https://mhw-db.com/monsters')
            .then((res) => {
                console.log(res.data)
                setMonsters(res.data)
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
                <Link to={'/'}>Return Home</Link>
            </div>
            <div className='d-flex justify-content-between alignt-items-center mb-3'>
                <h3>List of Monsters:</h3>
                <input type="text" placeholder='Search...'></input>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Species</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {monsters.sort((a, b) => (a.name > b.name) ? 1 : -1).map((monster, index) => {
                        return (
                            <tr key={index}>
                                <td>{monster.name}</td>
                                <td>{Capitalize(monster.type)}</td>
                                <td>{Capitalize(monster.species)}</td>
                                <td><Link to={`/monsters/${monster.id}`}>Details</Link></td>
                            </tr>
                        )
                        })}
                </tbody>
            </Table>
        </Container>
    )
}

export default MonsterList;