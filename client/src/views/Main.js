import {Link, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/esm/Container';
import Login from '../components/Login';
import Register from '../components/Register';

const Main = () => {

    return (
        <Container>
            <div>
                <h4>Monster Hunter World</h4>
            </div>
            <div className='d-flex flex-column align-items-center'>
                <h2>Monster Drop Tracker</h2>
            </div>
            <div className='mt-3 d-flex justify-content-around'>
                <Login/>
                <Register/>
            </div>
        </Container>
    )
}

export default Main;