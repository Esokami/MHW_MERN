import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import MHWIcon from '../../images/MHW_Icon.png';

const ItemNew = (props) => {
    const {items, setItems} = props;
    const [name, setName] = useState("");
    const [objectType, setObjectType] = useState("");
    const [monster, setMonster] = useState("");
    const [materialName, setMaterialName] = useState("");
    const [quantityOwned, setQuantityOwned] = useState("");
    const [quantityNeeded, setQuantityNeeded] = useState("");

    //Setting up item and monster selector using API data
    const [rewardList, setRewardList] = useState([]);
    const [monsterList, setMonsterList] = useState([]);
    const [weaponList, setWeaponList] = useState([]);

    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    //Get list of Weapon from API
    useEffect(() => {
        axios.get('https://mhw-db.com/weapons')
            .then((res) => {
                console.log(res.data);
                setWeaponList(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, []);

    //Get Monster and Reward from API
    useEffect(() => {
        axios.get('https://mhw-db.com/monsters')
            .then((res) => {
                console.log(res.data);
                setMonsterList(res.data);
                setRewardList(res.data.rewards);
            })
            .catch((err) => {
                console.log(err);
            })
    }, []);


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
                <hr></hr>
                <div>
                    <h3>Track a Weapon</h3>
                </div>
                <Form onSubmit={(onSubmitHandler)}>
                    <Form.Group className='mt-3 d-flex justify-content-around'>
                        <div className='p-2 border border-dark l-body'>
                            <h4>Required</h4>
                            <div>
                                <Form.Label>Monster:</Form.Label>
                                <Form.Select value={monster} onChange={(e) => setMonster(e.target.value)}>
                                    <option value="none" selected>--Select a Monster--</option>
                                    {
                                        monsterList
                                        .sort((a, b) => (a.name > b.name) ? 1: -1)
                                        .map((monster, index) => {
                                            return (
                                                <option>{monster.name}</option>
                                            )
                                        })
                                    // errors.monster ? (
                                    //     <p className="text-danger">{errors.monster.message}</p>
                                    // ) : null
                                    }
                                </Form.Select>
                            </div>
                            <div>
                                <Form.Label>Weapon Name:</Form.Label>
                                <Form.Select value={name} onChange={(e) => setName(e.target.value)}>
                                    <option value="none" selected>--Select Weapon--</option>
                                    {
                                        weaponList
                                        .sort((a, b) => (a.name > b.name) ? 1: -1)
                                        .map((weapon, index) => {
                                            return (
                                                <option>{weapon.name}</option>
                                            )
                                        })

                                        // errors.name ? (
                                        //     <p className="text-danger">{errors.name.message}</p>
                                        // ) : null
                                    }
                                </Form.Select>
                            </div>
                            <div>
                                <Form.Label>Weapon Type:</Form.Label>
                                <Form.Select onChange={(e) => setObjectType(e.target.value)}>
                                    <option value="none" selected>--Select Type--</option>
                                    <option>Bow</option>
                                    <option>Charge Blade</option>
                                    <option>Dual Blades</option>
                                    <option>Great Sword</option>
                                    <option>Gunlance</option>
                                    <option>Hammer</option>
                                    <option>Heavy Bowgun</option>
                                    <option>Hunting Horn</option>
                                    <option>Insect Glaive</option>
                                    <option>Lance</option>
                                    <option>Light Bowgun</option>
                                    <option>Long Sword</option>
                                    <option>Switch Axe</option>
                                    <option>Sword and Shield</option>
                                </Form.Select>
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