import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, useParams, useNavigate} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

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
    })

    return (
        <Container>
            <div className='d-flex justify-content-between'>
                <h4>Monster Hunter World</h4>
                <Link to="/dashboard">Dashboard</Link>
            </div>
            <div className='d-flex flex-column align-items-center'>
                <h3>Monster Drop Tracker</h3>
            </div>
            <div>
                <div className='d-flex justify-content-between'>
                    <h3>Anguish {item.name}</h3>
                    <Link to="/items/edit">Edit</Link>
                </div>
                <Table>
                    <thead>
                        <tr>
                            <th>Object Type</th>
                            <th>Monster</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Great Sword {item.objectType}</td>
                            <td>Deviljho {item.monster}</td>
                        </tr>
                    </tbody>
                </Table>
                <Table>
                    <thead>
                        <tr>
                            <th>Material Name</th>
                            <th>Owned</th>
                            <th>Need</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Deviljho Tallfang {item.materialName}</td>
                            <td>3 {item.quantityOwned}</td>
                            <td>2 {item.quantityNeeded}</td>
                        </tr>
                    </tbody>
                </Table>
                <Button className='m-2' variant='danger' type="submit">Delete</Button>
                </div>
        </Container>
    )
}

export default ItemView;