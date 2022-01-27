import React, {useState} from 'react';
import background from '../../assets/images/background.jpg';

import userService from '../../api/services/user.service';
import AuthService from '../../api/services/auth.service';

import {useSpring, animated} from 'react-spring';

import './loginregister.css';
import { useHistory } from 'react-router';



function LoginForm (){

  let history = useHistory();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    
    const onChangeEmail = (e) => {
      const email = e.target.value;
      setEmail(email);
    };

    const onChangePassword = (e) => {
      const password = e.target.value;
      setPassword(password);
    };

    const handleLogin = (e) => {
      e.preventDefault();
      setMessage("");
      
      AuthService.login(email, password).then(
        () => {
         history.push("/home");
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setMessage(resMessage);
          console.log("error iniciando sesión");
        }
      );
    };

   
    
  
    return(
      <div>
        <label name='userEmail'>Correo de usuario</label>
        <input type='email' name="email" value={email} onChange={onChangeEmail} required={true} placeholder="Ingrese su email" id='userEmail'/>
        <label name='password'>Contraseña</label>
        <input type="password" name="password" value={password} onChange={onChangePassword} required={true} placeholder="Ingrese su contraseña" minLength="5" id="password"/>
        <button onClick={handleLogin} className='button'>Iniciar sesion</button>
      </div>
    )
  }


function RegisterForm(){ 

    return(
      <div action="">
        <label name="documentType">Tipo de documento</label>
        <select id="documentType" required={true}>
        <option defaultValue disabled>Selecciona</option>
        <option>Cédula de ciudadania</option>
        <option>Tarjeta de identidad</option>
        <option>Cédula de extranjería</option>
        </select>
        <label name="documentNumber">Numero de documento</label>
        <input type="number" required={true} placeholder="Ingrese su número de documento" min="0" id="documentNumber"/>
        <label name="names">Nombres</label>
        <input type="text" required={true} placeholder="Ingrese sus nombres" id="names"/>
        <label name="surnames">Apellidos</label>
        <input type="text" required={true} placeholder="Ingrese sus apellidos" id="surnames"/>
        <label name="email">Correo Electronico</label>
        <input type="email" required={true} placeholder="Ejemplo: Juan@gmail.com" id="email"/>
        <label name="password">Contraseña</label>
        <input id='pass' name="pass" type="password" required={true} placeholder="Min.5 Incluya Mayuscula,Minuscula,Número" minLength="5" pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{5,}$" id="password"/>
        <label name="confirmPassword">Confirmar Contraseña</label>
        <input name="confirmpass" id="confirmpass" type="password" required={true} placeholder ="Repita su contraseña" minLength="5" id="confirmPassword"/>
        <input type='submit' value='Registrarme' className='submit'/>      
      </div>
    )
  }

const LoginRegister = () => {

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


    return(
      <div className="LoginRegister" style = {{backgroundImage: `url(${background})`}}> 
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
      </div>
    ); 
}

export default LoginRegister;




