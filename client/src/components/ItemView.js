import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, useParams, useNavigate} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import MHWIcon from '../images/MHW_Icon.png'

const ItemView = () => {
    const [item, setItem] = useState({});
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect( () => {
        axios.get('http://localhost:8000/api/items/' + id)
            .then((res) => {
                console.log(res.data);
                setItem(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    const deleteItem = (itemId) => {
        axios.delete('http://localhost:8000/api/items/' + itemId, {
            withCredentials: true,
        })
            .then((res) => {
                navigate("/dashboard")
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <Container>
            <div className='d-flex justify-content-between header'>
                <h4><img src={MHWIcon} className="mhw-icon"></img><u>Monster Hunter: World</u></h4>
                <Link to="/dashboard" className="link-text">Dashboard</Link>
            </div>
            <div className='mhw-body'>
                <div className='d-flex flex-column align-items-center'>
                    <h2>Monster Drop Tracker</h2>
                </div>
                <div>
                    <div className='d-flex justify-content-end align-items-center mt-2'>
                        <Link to={`/items/update/${item._id}`} className="link-text">Edit</Link>
                    </div>
                    <hr></hr>
                    <div className='mt-4'>
                        <h3 className='m-name'>{item.name}</h3>
                    </div>
                    <Table striped bordered className='t-body'>
                        <thead>
                            <tr className='t-head'>
                                <th>Object Type</th>
                                <th>Monster</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{item.objectType}</td>
                                <td>{item.monster}</td>
                            </tr>
                        </tbody>
                    </Table>
                    <Table striped bordered className='t-body'>
                        <thead>
                            <tr className='t-head'>
                                <th>Material Name</th>
                                <th>Owned</th>
                                <th>Need</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{item.materialName}</td>
                                <td>{item.quantityOwned}</td>
                                <td>{item.quantityNeeded}</td>
                            </tr>
                        </tbody>
                    </Table>
                    <div className='d-flex justify-content-between'>
                        <Button variant="info" onClick={() => navigate("/dashboard")}>Return</Button>
                        <Button variant="danger" onClick={() => {deleteItem(item._id)}}>Delete</Button>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default ItemView;