// import { Button } from '@mui/material';
import { Auth } from 'aws-amplify';
import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import logoPWST from '../img/logo.png'

class Dashboard extends Component {
  state = {
    signedOut : false,
    emailVerified: null,
    email: ''
  }
  
  componentDidMount = async () => {
    try {
      const data = await Auth.currentAuthenticatedUser({
        bypassCache: false 
      }).catch(err => {throw err})
      data.attributes.email_verified ?
        data.attributes.email_verified === false ?
          this.setState({emailVerified: false, email: data.attributes.email})
        : this.setState({emailVerified: true})
      :
        this.setState({emailVerified: false, email: data.attributes.email})
      
    } catch(err) {
      err === "The user is not authenticated" ?
        this.setState({ signedOut: true })
      : console.log(err);
    }
  }
  signOut = async (e) => {
    e.preventDefault();
    try {
      console.log("Entro a función de cerrar sesion");
      await Auth.signOut({ global: true }).catch(() => {throw new Error("Error en cerrar sesión")})
      this.setState({ signedOut: true })
      
    } catch (err) {
      // Incluir snackbar para que el usuario visualice el error
      this.props.snack_bar(true,err.message || "Hubo un error con cognito","error")
    }
  }

  render() {
    const email =
    
    this.state.emailVerified === false ?
      <div>
        <h5>Su correo aún no ha sido validado</h5>
        <button>Validar correo</button>
      </div>
    :  <h1>No se tiene que validar</h1>
    
      return(
        this.state.signedOut ?
          <Navigate to="/login" replace />
        :
          <div>
            <img src={logoPWST} style={{width:'250px'}} alt="Logo PWST"/>
            <h3>Bienvenido a OMS</h3>
            
            <button onClick={this.signOut}>Cerrar sesión</button>
            <br/><br/><br/>
            
          </div>
        
      )
    
  }
}

export default Dashboard;