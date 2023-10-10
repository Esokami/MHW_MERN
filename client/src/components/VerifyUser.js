import React, {useEffect, useState} from "react";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

const VerifyUser = (props) => {
    const [user, setUser] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8000/api/users',
            {withCredentials: true}
        )
            .then((res) => {
                console.log(res.data);
                setUser(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, []);

    return (
        <div>
            <h3>
                {user}
            </h3>
        </div>
    )
}

export default VerifyUser;