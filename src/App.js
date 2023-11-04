import React, { Component } from 'react';
import './App.css';

import { BrowserRouter,Routes, Route  } from 'react-router-dom'
import Home from './components/Home';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ForgotPassword from './components/Password/ForgotPassword1';
import ChangeTemporaryPass from './components/Password/ChangeTemporaryPass';
import SnackBar from './Functions/SnackBar';
import EmailVerify from './components/Email/EmailVerify';


class App extends Component {

  state = {
    snackmensaje: "",
    snackver: false,
    tiposnack: "error"
  }

  ver_snack = (activo, texto,tipo) => {
    console.log("que llego", activo, texto,tipo)
    this.setState({
      snackver: activo,
      snackmensaje: texto,
      tiposnack:tipo
    });
  };
  cerrar_snack = () => {

    this.setState({ snackver: false });
  };

  // componentDidMount () {
  //   Auth.currentSession()
  //     .then(() => console.log("En sesion"))
  //     .catch(err => console.log("Error en obtener sesión", err))
  // }

  render() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/login' element ={<Login snack_bar={this.ver_snack} />}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/olvide_contrasenia" element={<ForgotPassword snack_bar={this.ver_snack}/>}/>
          <Route path="/cambio_temporal" element={<ChangeTemporaryPass snack_bar={this.ver_snack}/>}/>
          <Route path="/validar_correo" element={<EmailVerify snack_bar={this.ver_snack}/>}/>
        </Routes>
      </BrowserRouter>
      <SnackBar ver_snack={this.state.snackver} mensaje={this.state.snackmensaje} cerra_snack={this.cerrar_snack} tipo_snack={this.state.tiposnack} />
    </div>
  );
}
}

export default App;
