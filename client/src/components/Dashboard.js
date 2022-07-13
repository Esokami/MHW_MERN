import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

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
            <div>
                <h4>Monster Hunter World</h4>
                <Link to={"/"}>Logout</Link>
            </div>
            <div className='d-flex flex-column align-items-center'>
                <h2>Monster Drop Tracker</h2>
            </div>
            <div>
                <Link to={"/items/new"}>Create New Item to Track</Link>
            </div>
            <div>
                <h3>My Items:</h3>
                <Table>
                    <thead>
                        <tr>
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
                                        <td><Link to={`/items/view/${item._id}`}>View</Link></td>
                                        <td><Button variant="danger" onClick={() => {deleteItem(item._id)}}>Delete</Button></td>
                                    </tr>
                                    )
                            })
                        }
                    </tbody>
                </Table>
            </div>
        </Container>
    )
}

export default Dashboard;