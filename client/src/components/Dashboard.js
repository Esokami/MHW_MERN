import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import MHWIcon from '../images/MHW_Icon.png'

const Dashboard = (props) => {
    const [items, setItems] = useState([]);
    const [user, setUser] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8000/api/items')
            .then((res) => {
                console.log(res.data);
                setItems(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, []);

    const deleteItem = (itemId) => {
        axios.delete('http://localhost:8000/api/items/' + itemId)
            .then((res) => {
                const newItemList = items.filter((item, index) => item._id !== itemId);
                setItems(newItemList);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    useEffect(() => {
        axios.get('http://localhost:8000/api/users',
            {withCredentials: true}
        )
            .then((res) => {
                console.log(res.data);
                setUser(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

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
                <div className='d-flex justify-content-between align-items-center mt-2'>
                    <Link to={"/items/new"} className="link-text">Create New Item to Track</Link>
                    <Link to={"/monsters"} className="link-text">View Monsters</Link>
                </div>
                <div className='mt-4'>
                    <h3>My Items:</h3>
                    <Table striped hover bordered className='t-body'>
                        <thead>
                            <tr className='t-head'>
                                <th>Name</th>
                                <th>Object Type</th>
                                <th>Monster</th>
                                <th colSpan={2}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                items.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{item.name}</td>
                                            <td>{item.objectType}</td>
                                            <td>{item.monster}</td>
                                            <td><Link to={`/items/view/${item._id}`} className="link-text">View</Link></td>
                                            <td><Button variant="danger" onClick={() => {deleteItem(item._id)}}>Delete</Button></td>
                                        </tr>
                                        )
                                })
                            }
                        </tbody>
                    </Table>
                </div>
            </div>
        </Container>
    )
}

export default Dashboard;