import {Link, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/esm/Container';
import Login from '../components/Login';
import Register from '../components/Register';
import MHWIcon from '../images/MHW_Icon.png'

const Main = () => {

    return (
        <Container>
            <div className='d-flex justify-content-between align-items-center header'>
                <h4><img src={MHWIcon} className="mhw-icon"></img><u>Monster Hunter: World</u></h4>
            </div>
            <div className='mhw-body'>
                <div className='d-flex flex-column align-items-center'>
                    <h2>Monster Drop Tracker</h2>
                </div>
                <div className='mt-3 d-flex justify-content-around'>
                    <Login/>
                    <Register/>
                </div>
                <div>
                    <p>Hello!  This is a fan made project using the public api: https://docs.mhw-db.com/ <br>
                    </br>Used to track monster drops needed when trying to craft.</p>
                </div>
            </div>
        </Container>
    )
}

export default Main;