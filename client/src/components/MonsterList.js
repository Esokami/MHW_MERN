import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Pagination from 'react-bootstrap/Pagination';
import MHWIcon from '../images/MHW_Icon.png';
import SearchIcon from '../images/SearchIcon.webp';

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
            <div className='d-flex justify-content-between align-items-center header'>
                <h4><img src={MHWIcon} className="mhw-icon"></img><u>Monster Hunter: World</u></h4>
                <Link to={"/"} className="link-text">Logout</Link>
            </div>
            <div className='mhw-body'>
                <div className='d-flex flex-column align-items-center'>
                    <h2>Monster Drop Tracker</h2>
                </div>
                <div className='d-flex flex-row justify-content-between align-items-center mt-2'>
                    <Link to={'/dashboard'} className="link-text">Return to Dashboard</Link>
                </div>
                <div className='d-flex justify-content-between alignt-items-center mb-3 mt-4'>
                    <h3>List of Monsters:</h3>
                    <div>
                        <input type="text" placeholder='Search...' className="s-icon"></input>
                    </div>
                </div>
                    <Table striped bordered hover className='m-body'>
                        <thead>
                            <tr className='t-head'>
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
                                        <td><Link to={`/monsters/${monster.id}`} className="link-text">Details</Link></td>
                                    </tr>
                                )
                                })}
                        </tbody>
                    </Table>
            </div>
        </Container>
    )
}

export default MonsterList;