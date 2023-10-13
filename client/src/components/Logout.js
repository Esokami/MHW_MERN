import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/esm/Button';

const Logout = () => {
    const navigate = useNavigate();

    const logoutUser = (e) => {
        axios.post('https://mhw-mern-b2887bec97f6.herokuapp.com/api/users/logout')
            .then((res) => {
                navigate("/");
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <Button variant='warning' onClick={logoutUser}>
            Logout
        </Button>
    )
}

export default Logout;