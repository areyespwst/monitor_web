import React, { Component } from 'react';
import Verify from './EmailVerify.js'


import { useLocation} from "react-router-dom"

function GetEmail(props) {
    let location = useLocation();


    return (
        <Verify email={location.state.email} userName= {location.state.userName} snack_bar={props.snack_bar}/>
        );
    
}

export default GetEmail;