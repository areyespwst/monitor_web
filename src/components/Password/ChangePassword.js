import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import validator from 'validator'

import { Auth } from 'aws-amplify';

import CardLogin from '../common/CardLogin';
import '../../styles/Login.css'

class ChangePassword extends Component {
    state = { // Nombres más legibles
        signedIn: false,
        password1: '',
        password2: '',
        errorPassword1: '',
        errorPassword2: '',
        code: 0
    }

    updatePassword = async (e) => {
        e.preventDefault();
        try {
            await this.resetPassword()
        } catch (error) {
            this.props.snack_bar(true,"Error en actualización de contraseña ","error")
            //console.log("error en actualización de contraseña ", error);
        }
        // alert("Contraseña cambiada")
    }

    resetPassword = async () => {
        const { code, password1 } = this.state;
        try {
            await Auth.forgotPasswordSubmit(this.props.userName, code, password1).catch(err => {
                console.log(err)
                var msgErr
                err == "CodeMismatchException: Invalid verification code provided, please try again." ?
                  msgErr ="Código invalido, ingrese el correcto"
                : msgErr = "Error en cambio de contraseña"
                throw new Error(msgErr);
            });
            // Agregar snackbar exito, la contraseña fue modificada correctamente!
            this.props.snack_bar(true,"La contraseña fue modificada correctamente ","success");
            await Auth.signIn(this.props.userName, password1).catch(() => {throw new Error("Hubo un error en el inicio de sesión automatico, intentelo manualmente")})
            this.setState({ signedIn: true })
        } catch (err) {
            //console.log('Error en cambio de contraseña', err);
            this.props.snack_bar(true,err.message || "Hubo un error con cognito","error")
        }
    }

    saveChangesCode = async (e) => {
        e.preventDefault()
        this.setState({ [e.target.name]: e.target.value })
    }

    validateFormatPass = async (e) => { // Contra qué realiza la validación?
        // Valida conforme va a escribiendo el usuario (se manda llamar en la línea 100)
        e.preventDefault()
        this.setState({ [e.target.name]: e.target.value })
        if (validator.isStrongPassword(e.target.value, {
            minLength: 9, minLowercase: 1,
            minUppercase: 1, minNumbers: 1, minSymbols: 1
          })) {
            await this.setState({errorPassword1: ''})
        } else {
            await this.setState({errorPassword1: "La contraseña debe tener mínimo 9 digitos(combinación de letras mayúsculas y minúsculas, números y caracteres especiales)"})
        }
    }

    validatePass2WithPass1 = async(e) => { // Contra qué realiza la validación? //ValidaFormatoContraseña Valida conContraseña1
        e.preventDefault()
        if(this.state.password1 === e.target.value) {
            await this.setState({password2 : e.target.value, errorPassword2: ''})
        } else {
            await this.setState({password2 : e.target.value, errorPassword2: 'Las contraseñas no coinciden'})
        }
    }

    render() {
        const { signedIn, errorPassword1, errorPassword2 } = this.state;
        const mandarFormulario =
            <div className='Formulario'>
                <form onSubmit={this.updatePassword}>
                    <div className="form-group">

                        <label htmlFor="userName" className='textos'>Usuario</label>
                        <input type="text" className="form-control rounded-3" id="userName" name='userName'
                            value={this.props.userName} disabled/>
                    </div><br />
                    <div className="form-group">
                        <label htmlFor="code" className='textos'>Código (enviado a su correo electrónico)</label>
                        <input type="number" className="form-control rounded-3" id="code" name='code'
                            value={this.props.pass}
                            onChange={(e) => this.saveChangesCode(e)} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password1" className='textos'>Nueva contraseña</label>
                        <input type="password" className="form-control rounded-3" id="password1" 
                        name='password1' onChange={(e) => this.validateFormatPass(e)} 
                        required pattern='^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{9,20}$'/>
                        {errorPassword1 === '' ? null :
                        <span style={{
                        fontWeight: 'bold',
                        color: 'red',
                        }} className='textos'>{errorPassword1}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="password2" className='textos'>Confirmar contraseña</label>
                        <input type="password" className="form-control rounded-3" id="password2" 
                        name='password2' onChange={(e) => this.validatePass2WithPass1(e)} 
                        required pattern='^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{9,20}$'/>
                        {errorPassword2 === '' ? null :
                        <span style={{
                        fontWeight: 'bold',
                        color: 'red',
                        }} className='textos'>{errorPassword2}</span>}
                    </div><br />
                    <div className="form-group elbotondiv d-grid gap-2">
                        <button type="submit" className="form-group elboton btn">Restablecer</button>
                    </div>
                </form><br />
                <Nav.Link href={'/login'} className="olvidcontra">Cancelar</Nav.Link>
                {/* <p className='olvidcontra'>Olvide mi contraseña</p> */}
            </div>
        
        return(
        signedIn ?
          <Navigate to="/dashboard" replace />
        :
          <CardLogin formularioo={mandarFormulario} />
        )
    }
}

export default ChangePassword;