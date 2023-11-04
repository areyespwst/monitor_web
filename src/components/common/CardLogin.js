import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import logoPWST from '../../img/logo.png'
import '../../styles/CardLogin.css'
import Imagen1 from '../../img/Imagen1.png'
import logoblanco from '../../img/logoBlanco.png'
//import siguiente from '../../img/siguiente.png'

class CardLogin extends Component {
    state = {
        wid: 0,
        hei: 0,
        data : [
            {
                title: '¡Bienvenido a OMS!',
                msg: 'Te ayudamos a gestionar tus ordenes.'
            },
            {
                title: '¡Bienvenido a OMS!2',
                msg: 'Te ayudamos a gestionar tus ordenes.2'
            },
            {
                title: '¡Bienvenido a OMS!3',
                msg: 'Te ayudamos a gestionar tus ordenes.3'
            }
        ]
    }

    componentDidMount = () => {
        this.setState({wid: window.innerWidth, hei: window.innerHeight})
    }

    render() {
        const uno = 
            <div name="uno">
                <p className='textoGen uno'>¡Bienvenido a OMS!</p>
                <p className='textoGen dos'>Te ayudamos a gestionar<br/>tus ordenes.</p>

                {/* <div style={{marginTop: '35px'}}>
                    <p className='textoGen dos'>1 de 3
                    <a href="/dashboard"></a>
                    <Card.Img src={siguiente} className='siguiente'/></p>
                </div> */}
            </div>

        return (
            <div className='divTodo' style={{width: this.state.wid, height: this.state.hei}}>
                <CardGroup className='DivPrincipal rounded-3 shadow-sm bg-white rounded'>
                    <Card className='CardForm border border-end-0 rounded-start'>
                        <Card.Title>
                        <Card.Img className='LogoPrincipal' variant="top" src={logoPWST} />

                        </Card.Title>
                        <Card.Body>
                            {this.props.formularioo}
                        </Card.Body>
                    </Card>
                    <Card style={{backgroundColor: '#3D70B0',}}>
                        <div id="map"><Card.Img variant="top" src={Imagen1}/></div>
                        <div id="ModalContacto">
                            <Card.Text className='textoGen creado'>Creada por</Card.Text>
                            <Card.Img variant="top" src={logoblanco} className='logoBlanco'/>
                        </div>
                        
                        {uno}
                            
                    </Card>
                </CardGroup>
            </div>
        );
    }
}

export default CardLogin;