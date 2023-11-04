import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';

import { Auth } from 'aws-amplify';

import CardLogin from './common/CardLogin';
import '../styles/Login.css'
import ChangeTemporaryPass from './Password/ChangeTemporaryPass';



class Login extends Component {
    state = { // El nombre no es claro, no nos indica a que hace referencia este estado
        userName: '',
        password: '',
        signedIn: false,
        temporary: false,
    }

    sendLogin = async (e) => { // Los nombres de los métodos deben de ser mas especificos
        e.preventDefault();
        const { userName, password } = this.state;
        try {
            const data = await Auth.signIn(userName, password).catch(() => {throw new Error("Los datos de acceso son incorrectos")})
            data.challengeName === 'NEW_PASSWORD_REQUIRED' ?
                this.setState({ temporary: true, ladata: data })
            :
                this.setState({ signedIn: true })
            
            
        } catch (err) {
            this.props.snack_bar(true,err.message || "Hubo un error con cognito","error")
        }
    }

    saveChangesForm = async (e) => {
        e.preventDefault()
        await this.setState({ [e.target.name]: e.target.value })
    }

    render() {
        const { signedIn, temporary, userName, password } = this.state;

        const formulariomandar =
            <div className='Formulario'>
                <form onSubmit={this.sendLogin}>
                    <div className="form-group">

                        <label htmlFor="userName" className='textos'>Usuario</label>
                        <input type="text" className="form-control rounded-3" id="userName" name='userName' onChange={(e) => this.saveChangesForm(e)} required />
                    </div><br />
                    <div className="form-group">
                        <label htmlFor="password" className='textos'>Contraseña</label>
                        <input type="password" className="form-control rounded-3" id="password" name='password' onChange={(e) => this.saveChangesForm(e)} required />
                    </div>
                    <br /><br />
                    <div className="form-group elbotondiv d-grid gap-2">
                        <button type="submit" className="form-group elboton btn">Continuar</button>

                    </div>
                </form><br />
                <Nav.Link href={'/olvide_contrasenia'} className="olvidcontra">¿Olvidaste la contraseña?</Nav.Link>
            </div>

        return(
        signedIn ?
          <Navigate to="/dashboard" replace />
        :
            temporary ?
              <ChangeTemporaryPass replace user={userName} pass ={password} data={this.state.ladata} snack_bar={this.props.snack_bar} />
            :
              <CardLogin formularioo={formulariomandar} />

        )
    }
}

export default Login