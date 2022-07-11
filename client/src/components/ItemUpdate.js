import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Link, useNavigate, useParams} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const ItemUpdate = (props) => {
    const {id} = useParams();
    const [name, setName] = useState("");
    const [objectType, setObjectType] = useState("");
    const [monster, setMonster] = useState("");
    const [material, setMaterial] = useState("");
    const [quantityOwned, setQuantityOwned] = useState("");
    const [quantityNeeded, setQuantityNeeded] = useState("");

    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    useEffect(() => {
        axios.get('http://localhost:8000/api/items/' + id)
            .then((res) => {
                console.log(res);
                setName(res.data.name);
                setObjectType(res.data.objectType);
                setMonster(res.data.monster);
                setMaterial(res.data.material);
                setQuantityOwned(res.data.quantityOwned);
                setQuantityNeeded(res.data.quantityNeeded);
            })
            .catch((err) =>{
                console.log(err);
            });
    }, [])

    const updateItem = (e) => {
        e.preventDefault();

        axios.put('http://localhost:8000/api/items' + id, {
            name,
            objectType,
            monster,
            material,
            quantityOwned,
            quantityNeeded
        })

            .then((res) => {
                console.log(res);
                console.log(res.data);
                navigate("/dashboard");
            })
            .catch((err) => {
                console.log(err);
                setErrors(err.response.data.errors);
            })
    }

    return (
        <Container>
            <div>
                <h4>Monster Hunter World</h4>
            </div>
            <div className='d-flex flex-column align-items-center'>
                <h3>Monster Drop Tracker</h3>
            </div>
            <div>
                <h2>Edit {name}</h2>
            </div>
            <Form onSubmit={(updateItem)}>
                <Form.Group className='mt-3 d-flex justify-content-around'>
                    <div className='p-2 border border-dark'>
                        <h4>Required</h4>
                        <Form.Label>Name:</Form.Label>
                        <Form.Control type="text" name="name" value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
                        {
                        errors.name ? (
                            <p className="text-danger">{errors.name.message}</p>
                        ) : null
                        }
                        <Form.Label>Object Type:</Form.Label>
                        <Form.Control type="text" name="objectType" value={objectType} onChange={(e) => setObjectType(e.target.value)}></Form.Control>
                        {
                        errors.objectType ? (
                            <p className="text-danger">{errors.objectType.message}</p>
                        ) : null
                        }
                        <Form.Label>Monster:</Form.Label>
                        <Form.Control type="text" name="monster" value={monster} onChange={(e) => setMonster(e.target.value)}></Form.Control>
                        {
                        errors.monster ? (
                            <p className="text-danger">{errors.monster.message}</p>
                        ) : null
                        }
                    </div>
                    <div className='p-2 border border-dark'>
                        <h4>Optional</h4>
                        <Form.Label>Material Name:</Form.Label>
                            <Form.Control type="text" name="material" value={material} onChange={(e) => setMaterial(e.target.value)}></Form.Control>
                        <Form.Label>Quantity Owned:</Form.Label>
                            <Form.Control type="number" name="quantityOwned" value={quantityOwned} onChange={(e) => setQuantityOwned(e.target.value)}></Form.Control>
                        <Form.Label>Quantity Needed:</Form.Label>
                            <Form.Control type="number" name="quantityNeeded" value={quantityNeeded} onChange={(e) => setQuantityNeeded(e.target.value)}></Form.Control>
                    </div>
                </Form.Group>
                <Button className='m-2' variant="success" type="submit">Create</Button>
                <Button className='m-2' variant="warning" type="submit">Cancel</Button>
            </Form>
        </Container>
    )
}

export default ItemUpdate;