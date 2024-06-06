import { getDatabase, ref, set, onValue } from "firebase/database";
import { initializeApp } from "firebase/app";
import config from './FireBase stuff/config'

import './index.css';
import {Route, BrowserRouter, Routes} from 'react-router-dom';
import Login from './Pages/Login';
import User from './Pages/User';
import {useEffect} from "react"



import React, { Component } from 'react'

export default class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            renderUser: false
        }
    }

    setAuthenticate = () => {
        this.setState({
            renderUser: true
        }, () => {return true})
    }

    
    render() {
        return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login sendAuthenticate={this.setAuthenticate}/>}/>
                <Route path='/:user' element={<User renderUser={this.state.renderUser}/>}/>
            </Routes>
        </BrowserRouter>
        )
    }
}

