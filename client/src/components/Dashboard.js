import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import MHWIcon from '../images/MHW_Icon.png'
import Logout from './Logout';

const Dashboard = (props) => {
    const [items, setItems] = useState([]);
    const [user, setUser] = useState([]);
    const navigate = useNavigate();

    const [loginStatus, setLoginStatus] = useState(false);

    useEffect(() => {
        axios.get('https://mhw-mern-b2887bec97f6.herokuapp.com/api/items')
            .then((res) => {
                if (res.data.userLoggedIn === null){
                    navigate("/");
                }
                else {
                    console.log(res.data);
                    setItems(res.data);
                }
                
            })
            .catch((err) => {
                console.log(err);
            })
    }, []);

    const deleteItem = (itemId) => {
        axios.delete('https://mhw-mern-b2887bec97f6.herokuapp.com/api/items/' + itemId, {
            withCredentials: true,
        })
            .then((res) => {
                const newItemList = items.filter((item, index) => item._id !== itemId);
                setItems(newItemList);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    useEffect(() => {
        axios.get('https://mhw-mern-b2887bec97f6.herokuapp.com/api/users',
            {withCredentials: true}
        )
            .then((res) => {
                console.log(res.data);
                setUser(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, []);

    return (
        <Container>
            <div className='d-flex justify-content-between align-items-center header'>
                <h4><img src={MHWIcon} className="mhw-icon"></img><u>Monster Hunter: World</u></h4>
                <Logout/>
            </div>
            <div className='mhw-body'>
                <div className='d-flex flex-column align-items-center'>
                    <h2>Monster Drop Tracker</h2>
                </div>
                <div className='d-flex justify-content-between align-items-center mt-2'>
                    <div className='d-flex flex-column'>
                        <Link to={"/items/new/armor"} className="link-text">Track a piece of Armor</Link>
                        <Link to={"/items/new/weapon"} className="link-text">Track a Weapon</Link>
                    </div>
                    <Link to={"/monsters"} className="link-text">View Monsters</Link>
                </div>
                <hr></hr>
                <div className='mt-4'>
                    <h3>My Items:</h3>
                    <Table striped hover bordered className='t-body'>
                        <thead>
                            <tr className='t-head'>
                                <th>Name</th>
                                <th>Object Type</th>
                                <th>Monster</th>
                                <th>Created By</th>
                                <th colSpan={2}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                items.Map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{item.name}</td>
                                            <td>{item.objectType}</td>
                                            <td>{item.monster}</td>
                                            <td>{item.createdBy.username}</td>
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