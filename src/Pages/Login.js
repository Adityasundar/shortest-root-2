import { getDatabase, ref, set, onValue } from "firebase/database";
import { initializeApp } from "firebase/app";
import config from '../FireBase stuff/config'
import React, { useState } from 'react'
import '../index.css';
import { useNavigate } from "react-router-dom";


const Login = ({sendAuthenticate}) => {


    const navigate = useNavigate()

    //Firebase functions

    const app = initializeApp(config);
    const db = getDatabase();
    const writeUserData = (userId, name) => {
        set(ref(db, 'users/' + userId), {
            username: name,
        }).then(() => {
            console.log("data added")
        }).catch(e => {
            console.log(e)
        })
    }

    const readUserData = async (userID) => {
        const starCountRef = ref(db, 'users/' + userID);
        var data
        onValue(starCountRef, (snapshot) => {
            data = snapshot.val().password
        })
        return data
    }

    //States
    const [username, setUserName] = useState("")
    const [id, setID] = useState("")
    const [password, setPassword] = useState("") 

    const authenticate = async (id, password) => {
        let userPassword = await readUserData(id)
        if (password === userPassword) {
            let bool = await sendAuthenticate()
            console.log(bool)
            if (bool===true){
                navigate(`/${id}`, {state: id})
            }
        } else {
            console.log("wrong password")
        }
    }

    return (
        <div>
            <p className="all-center">
                Login
            </p>
            <input type="text" value={id} onChange={ev => setID(ev.target.value)} placeholder="Username"/>
            <input type="text" value={password} onChange={ev => setPassword(ev.target.value)} placeholder="Password"/>
            <button onClick={() => authenticate(id, parseInt(password))}>Login</button>
        </div>
    )
}

export default Login
