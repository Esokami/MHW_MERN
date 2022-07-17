import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, useParams, useNavigate} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import MHWIcon from '../images/MHW_Icon.png'

const ViewMonster = (props) => {
    const [monster, setMonster] = useState([]);
    const [reward, setReward] = useState([]);
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('https://mhw-db.com/monsters/' + id)
            .then((res) => {
                console.log(res.data.rewards)
                console.log(res.data);
                setMonster(res.data);
                // setReward(res.data.rewards);
                
                // const {items: items, data} = res.data.rewards;
                setReward(res.data.rewards)
            })
            .catch((err) => {
                console.log(err);
            })
    }, []);

    const Capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    return (
        <Container>
            <div className='d-flex justify-content-between align-items-center header'>
                <h4><img src={MHWIcon} className="mhw-icon"></img><u>Monster Hunter: World</u></h4>
                <Link to={"/"} className="link-text">Logout</Link>
            </div>
            <div className='mhw-body'>
                <div className='d-flex flex-column align-items-center'>
                    <h2>Monster Drop Tracker</h2>
                </div>
                <div className='d-flex justify-content-between align-items-center mt-2'>
                    <Link to="/dashboard" className="link-text">Back to Dashboard</Link>
                    <Link to="/monsters" className="link-text">Back to Monsters</Link>
                </div>
                <hr></hr>
                <div className='mt-4'>
                    <h2 className='m-name'>{monster.name}</h2>
                </div>
                <div>
                    <Table striped bordered className='mt-3 v-body'>
                        <thead>
                        <tr className='t-head'>
                                <th>Type</th>
                                <th>Species</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{monster.type}</td>
                                <td>{monster.species}</td>
                                <td>{monster.description}</td>
                            </tr>
                        </tbody>
                    </Table>
                    <Table striped bordered className='mt-3 v-body'>
                        <thead>
                            <tr className='t-head'>
                                <th>Rewards</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                reward.map((object, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{object.item.name}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                </div>
            </div>
        </Container>
    )
}

export default ViewMonster;