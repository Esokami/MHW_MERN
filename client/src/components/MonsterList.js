import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Pagination from 'react-bootstrap/Pagination';

let active = 10;
let items = [];
for (let number = 1; number <= 5; number++){
    items.push(
        <Pagination.Item key={number} active={number === active}>
            {number}
        </Pagination.Item>
    )
}

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
            <div className='d-flex justify-content-between align-items-center mt-2'>
                <h4>Monster Hunter: World</h4>
                <Link to={"/"}>Logout</Link>
            </div>
            <div className='d-flex flex-column align-items-center'>
                <h2>Monster Drop Tracker</h2>
            </div>
            <div className='d-flex flex-row justify-content-between align-items-center mt-2'>
                <Link to={'/dashboard'}>Return to Dashboard</Link>
            </div>
            <div className='d-flex justify-content-between alignt-items-center mb-3 mt-4'>
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