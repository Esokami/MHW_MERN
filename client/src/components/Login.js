import React, {useState} from 'react';
import axios from 'axios';
import {Link, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/esm/Container';
import Form from 'react-bootstrap/esm/Form';
import Button from 'react-bootstrap/esm/Button';

const Login = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const [errors, setErrors] = useState([]);

    const registerUser = (e) => {
        e.preventDefault();

        axios.post('http://localhost:8000/api/users/register', {
            email,
            username,
            password
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
                <h2>Monster Drop Tracker</h2>
            </div>
            <div className='mt-3 d-flex justify-content-around'>
                <div>
                    <h3>Login</h3>
                    <Form className='p-2 border border-dark'>
                        <Form.Group>
                            <div>
                                <Form.Label>Username:</Form.Label>
                                <Form.Control type="text"></Form.Control>
                            </div>
                            <div>
                                <Form.Label>Password:</Form.Label>
                                <Form.Control type="password"></Form.Control>
                            </div>
                        </Form.Group>
                        <Button className='m-2' variant='success' type="submit">Login</Button>
                    </Form>
                </div>
                <div>
                    <h3>Register</h3>
                    <Form onSubmit={(registerUser)} className='p-2 border border-dark'>
                        <Form.Group>
                            <div>
                                <Form.Label>Email:</Form.Label>
                                <Form.Control type="text"></Form.Control>
                            </div>
                            <div>
                                <Form.Label>Username:</Form.Label>
                                <Form.Control type="text"></Form.Control>
                            </div>
                            <div>
                                <Form.Label>Password:</Form.Label>
                                <Form.Control type="password"></Form.Control>
                            </div>
                            <div>
                                <Form.Label>Confirm Password:</Form.Label>
                                <Form.Control type="password"></Form.Control>
                            </div>
                        </Form.Group>
                        <Button className='m-2' variant='info' type="submit">Register</Button>
                    </Form>
                </div>
            </div>
        </Container>
    )
}

export default Login;