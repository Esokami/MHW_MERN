import {Link, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/esm/Container';
import Login from '../components/Login';

const Main = () => {
    const navigate = useNavigate();

    return (
        <Container>
            <Login/>
        </Container>
    )
}

export default Main;