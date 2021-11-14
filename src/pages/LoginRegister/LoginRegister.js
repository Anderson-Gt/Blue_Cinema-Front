import React, {useState} from 'react';
import './LoginRegister.css';
import {useSpring, animated} from 'react-spring';


function LoginRegister() {
  const [registrationFormStatus,setRegistrationFormStatus] = useState(false);
  const loginProps = useSpring({
    left: registrationFormStatus ? -500 : 0
    
  })
  const registerProps = useSpring({
    left: registrationFormStatus ? 0 : 500
  })

  const loginBtnProps = useSpring({borderBottom: registrationFormStatus ? 'solid 0px transparent': 'solid 2px #1059FF'})
  const registerBtnProps = useSpring({borderBottom: registrationFormStatus ? 'solid 2px #1059FF': 'solid 0px transparent'})

  function registerClicked(){ setRegistrationFormStatus(true)}
  function loginClicked(){ setRegistrationFormStatus(false)}
  
  return (
      <div className="login-register">
        <div className='nav-buttons'>
          <animated.button onClick={loginClicked} id="loginBtn" style={loginBtnProps}>Ingresar</animated.button>
          <animated.button onClick={registerClicked} id="registerBtn" style={registerBtnProps}>Registrarme</animated.button>
        </div>
        <div className="form-group">
          <animated.form action='' id='loginform' style={loginProps}><LoginForm/></animated.form>
          <animated.form action='' id='registerform' style={registerProps}><RegisterForm/></animated.form>
        </div>
          <animated.div className="forgot-panel" style={loginProps}><a href="#">Olvidé mi contraseña</a></animated.div>
        </div>
    
  );
}

function LoginForm(){
  return(
    <React.Fragment>
      <label for='userEmail'>Correo de usuario</label>
      <input type='email' id='userEmail'/>
      <label for='password'>Contraseña</label>
      <input type='password' id='password' />
      <input type='submit' value='Iniciar sesion' className='submit'/>
    </React.Fragment>
  )
}

function RegisterForm(){
  return(
    <React.Fragment>
      <label for="documentType">Tipo de documento</label>
      <select id="documentType">
      <option selected disabled>Selecciona</option>
      <option>Cédula de ciudadania</option>
      <option>Tarjeta de identidad</option>
      <option>Cédula de extranjería</option>
      </select>
      <label for="documentNumber">Numero de documento</label>
      <input type="number" id="documentNumber"/>
      <label for="names">Nombres</label>
      <input type="text" id="names"/>
      <label for="surnames">Apellidos</label>
      <input type="text" id="surnames"/>
      <label for="email">Correo Electronico</label>
      <input type="email" id="email"/>
      <label for="password">Contraseña</label>
      <input type="password" id="password"/>
      <label for="confirmPassword">Confirmar Contraseña</label>
      <input type="password" id="confirmPassword"/>
      <input type='submit' value='Registrarme' className='submit'/>      
    </React.Fragment>
  )
}

export default LoginRegister;
