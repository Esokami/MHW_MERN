import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import MHWIcon from '../images/MHW_Icon.png'

const ItemNew = (props) => {
    const {items, setItems} = props;
    const [name, setName] = useState("");
    const [objectType, setObjectType] = useState("");
    const [monster, setMonster] = useState("");
    const [materialName, setMaterialName] = useState("");
    const [quantityOwned, setQuantityOwned] = useState("");
    const [quantityNeeded, setQuantityNeeded] = useState("");

    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    const onSubmitHandler = (e) => {
        e.preventDefault();

        axios.post('http://localhost:8000/api/items/', {
            name,
            objectType,
            monster,
            materialName,
            quantityOwned,
            quantityNeeded
        },
        {
            withCredentials: true
        })

            .then((res) => {
                console.log(res);
                console.log(res.data);
                navigate("/dashboard");
                setItems([...items, res.data]);
            })
            .catch((err) => {
                console.log(err);
                setErrors(err.response.data.errors);
            })
    }


    return (
        <Container>
            <div className='d-flex justify-content-between align-items-center header'>
                <h4><img src={MHWIcon} className="mhw-icon"></img><u>Monster Hunter: World</u></h4>
            </div>
            <div className='mhw-body'>
                <div className='d-flex flex-column align-items-center'>
                    <h3>Monster Drop Tracker</h3>
                </div>
                <div>
                    <h2>Create Item to Track</h2>
                </div>
                <Form onSubmit={(onSubmitHandler)}>
                    <Form.Group className='mt-3 d-flex justify-content-around'>
                        <div className='p-2 border border-dark l-body'>
                            <h4>Required</h4>
                            <div>
                                <Form.Label>Name:</Form.Label>
                                <Form.Control type="text" onChange={(e) => setName(e.target.value)}></Form.Control>
                                {
                                    errors.name ? (
                                        <p className="text-danger">{errors.name.message}</p>
                                    ) : null
                                }
                            </div>
                            <div>
                                <Form.Label>Object Type:</Form.Label>
                                <Form.Control type="text" onChange={(e) => setObjectType(e.target.value)}></Form.Control>
                                {
                                    errors.objectType ? (
                                        <p className="text-danger">{errors.objectType.message}</p>
                                    ) : null
                                }
                            </div>
                            <div>
                                <Form.Label>Monster:</Form.Label>
                                <Form.Control type="text" onChange={(e) => setMonster(e.target.value)}></Form.Control>
                                {
                                    errors.monster ? (
                                        <p className="text-danger">{errors.monster.message}</p>
                                    ) : null
                                }
                            </div>
                        </div>
                        <div className='p-2 border border-dark l-body'>
                            <h4>Optional</h4>
                            <Form.Label>Material Name:</Form.Label>
                                <Form.Control type="text" onChange={(e) => setMaterialName(e.target.value)}></Form.Control>
                            <Form.Label>Quantity Owned:</Form.Label>
                                <Form.Control type="number" onChange={(e) => setQuantityOwned(e.target.value)}></Form.Control>
                            <Form.Label>Quantity Needed:</Form.Label>
                                <Form.Control type="number" onChange={(e) => setQuantityNeeded(e.target.value)}></Form.Control>
                        </div>
                    </Form.Group>
                    <Button className='m-2' variant="success" type="submit">Create</Button>
                    <Button className='m-2' variant="warning" onClick={() => navigate("/dashboard")}>Cancel</Button>
                </Form>
            </div>
        </Container>
    )
}

export default ItemNew;