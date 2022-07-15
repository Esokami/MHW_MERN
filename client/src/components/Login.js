import React, {useState} from 'react';
import axios from 'axios';
import {useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/esm/Container';
import Form from 'react-bootstrap/esm/Form';
import Button from 'react-bootstrap/esm/Button';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    const loginUser = (e) => {
        e.preventDefault();

        axios.post('http://localhost:8000/api/users/login', 
        {
            email, 
            password,
        },
        {
            withCredentials: true,
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
                    <h3>Login</h3>
                    <Form onSubmit={(loginUser)} className='p-2 l-body'>
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
                                <Form.Label>Password:</Form.Label>
                                <Form.Control type="password" onChange={(e) => setPassword(e.target.value)}></Form.Control>
                                {
                                    errors.password ? (
                                        <p className='text-danger'>{errors.password.message}</p>
                                    ) : null
                                }
                            </div>
                        </Form.Group>
                        <Button className='m-2' variant='success' type="submit">Login</Button>
                    </Form>
                </div>
            </div>
        </Container>
    )
}

export default Login;