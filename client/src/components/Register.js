import React, {useState} from 'react';
import axios from 'axios';
import {useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/esm/Container';
import Form from 'react-bootstrap/esm/Form';
import Button from 'react-bootstrap/esm/Button';

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    const registerUser = (e) => {
        e.preventDefault();

        axios.post('http://localhost:8000/api/users/register', {
            email,
            username,
            password,
            confirmPassword
        }, 
        {
            withCredentials: true
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
            <div className='mt-3 d-flex justify-content-around'>
                <div>
                    <h3>Register</h3>
                    <Form onSubmit={(registerUser)} className='p-2 r-body'>
                        <Form.Group>
                            <div>
                                <Form.Label>Email:</Form.Label>
                                <Form.Control type="text" onChange={(e) => setEmail(e.target.value)}></Form.Control>
                                {
                                    errors.email ? (
                                        <p className="text-danger">{errors.email.message}</p>
                                    ) : null
                                }
                            </div>
                            <div>
                                <Form.Label>Username:</Form.Label>
                                <Form.Control type="text" onChange={(e) => setUsername(e.target.value)}></Form.Control>
                                {
                                    errors.username ? (
                                        <p className="text-danger">{errors.username.message}</p>
                                    ) : null
                                }
                            </div>
                            <div>
                                <Form.Label>Password:</Form.Label>
                                <Form.Control type="password" onChange={(e) => setPassword(e.target.value)}></Form.Control>
                                {
                                    errors.password ? (
                                        <p className="text-danger">{errors.password.message}</p>
                                    ) : null
                                }
                            </div>
                            <div>
                                <Form.Label>Confirm Password:</Form.Label>
                                <Form.Control type="password" onChange={(e) => setConfirmPassword(e.target.value)}></Form.Control>
                                {
                                    errors.confirmPassword ? (
                                        <p className="text-danger">{errors.confirmPassword.message}</p>
                                    ) : null
                                }
                            </div>
                        </Form.Group>
                        <Button className='m-2' variant='info' type="submit">Register</Button>
                    </Form>
                </div>
            </div>
        </Container>
    )
}

export default Register;