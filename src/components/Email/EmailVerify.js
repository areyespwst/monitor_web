import React, { Component } from 'react';
import logoPWST from '../../img/logo.png'
import Card from 'react-bootstrap/Card';
import '../../styles/CardLogin.css'

class EmailVerify extends Component {
    render() {
        return (
            <div>
                <Card className='CardForm border border-end-0 rounded-start'>
                    <Card.Title><Card.Img className='LogoPrincipal' variant="top" src={logoPWST} /></Card.Title>
                    <Card.Body>
                        {this.props.email}
                    </Card.Body>
                </Card>
            </div>
        );
    }
}

export default EmailVerify;
