import React, { Component } from 'react';
import Nav from 'react-bootstrap/Nav';

import { Auth } from 'aws-amplify';

import CardLogin from '../common/CardLogin';
import '../../styles/Login.css'
import ChangePassword from './ChangePassword';

class ForgotPassword extends Component {
    state = {
        userName: '', // Cambiar a CamelCase userName
        findUser: false,
    }

    sendCodeUser = async (e) => {
        e.preventDefault();
        const { userName } = this.state;

        try {
            await Auth.forgotPassword(userName).catch(err => {
                var sendErr = err.toString()
                switch(sendErr){
                    
                case "LimitExceededException: Attempt limit exceeded, please try after some time.":
                    throw new Error("Lo sentimos, ha superado el numero de intentos. Intentelo nuevamente despues de un tiempo");
                    //break;
                case "NotAuthorizedException: User password cannot be reset in the current state.":
                    throw new Error("Lo sentimos, comuniquese con un administrador para recuperar su contraseña");
                    //break;
                case "InvalidParameterException: Cannot reset password for the user as there is no registered/verified email or phone_number":
                    throw new Error("Lo sentimos, no puede cambiar su contraseña si no ha validado su correo electronico")
                    //break;
                default:
                    throw new Error("Usuario no encontrado")
                }
            })
                
            this.setState({ findUser: true })
                
        } catch (err) {
            //console.log('ERROR', err);
            this.props.snack_bar(true,err.message || "Hubo un error con cognito","error")
        }
    }

    getUser = async (e) => {
        e.preventDefault()
        this.setState({ [e.target.name]: e.target.value })
    }

    render() {
        const { findUser } = this.state;
        const mandarFormulario = 
            <div className='Formulario'>
                <form onSubmit={this.sendCodeUser}>
                    <div className="form-group">

                        <label htmlFor="userName" className='textos'>Usuario</label>
                        <input type="text" className="form-control rounded-3" id="userName" name='userName' onChange={(e) => this.getUser(e)} required />
                    </div><br />
                    <div className="form-group elbotondiv d-grid gap-2">
                        <button type="submit" className="form-group elboton btn">Continuar</button>

                    </div>
                </form><br />
                <Nav.Link href={'/login'} className="olvidcontra">Cancelar</Nav.Link>
            </div>

        return(
        findUser ?
          <ChangePassword userName={this.state.userName} snack_bar={this.props.snack_bar} />
        :
          <CardLogin formularioo={mandarFormulario} />
        )
    }
}

export default ForgotPassword;