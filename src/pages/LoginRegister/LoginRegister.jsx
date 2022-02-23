import React, { useState } from 'react';
import background from '../../assets/images/background.jpg';
import Swal from 'sweetalert2';
import { Formik } from 'formik';
import * as Yup from 'yup';
import logo from '../../assets/tmovie.png';
import { useHistory } from 'react-router';

import userService from '../../api/services/user.service';
import AuthService from '../../api/services/auth.service';


import { useSpring, animated } from 'react-spring';

import './loginregister.css';
import styled from 'styled-components';


const LoginForm = propps => ( 
  
      <Formik initialValues={{ email: "", password: "" }} onSubmit={async values => {

        AuthService.login(values.email, values.password).then(
          
          () => {
            Swal.fire({
              position: 'top-end',
              title: 'Bienvenido a BlueCinema!',
              background: '#1059ff',
              color: '#0f0f0f',
              showConfirmButton: false,
              timer: 2000
            })

            window.location.replace("/home");
                        
          },
          (error) => {
            Swal.fire({
              icon: 'error',
              iconColor: 'rgb(248, 24, 24)',
              title: 'Oops...',
              text: 'Error iniciando sesión, verifica que tus datos esten correctos!',
              background: '#0f0f0f',
              color: 'white',
              confirmButtonColor: '#1059ff'
            })

          }
        );
      }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email("Ingrese un correo válido")
            .required("Email es obligatorio"),
          password: Yup.string()
            .min(5, "Debe tener almenos 5 caracteres")

            .required("Contraseña es obligatoria")

        })}
      >
        {props => {
          
          const { values, touched, errors, dirty, isSubmitting, handleChange, handleBlur, handleSubmit, handleReset, style } = props;

          return (
            <animated.form id='loginform' style={propps.style} onSubmit={handleSubmit} >
              <label htmlFor="email">Correo de usuario</label>
              <input id="email" placeholder="Ingrese su Email" type="email" value={values.email} onChange={handleChange} onBlur={handleBlur} className={errors.email && touched.email ? "text-input error" : "text-input"} />
              {errors.email && touched.email && (<div className="input-feedback">{errors.email}</div>)}

              <label htmlFor="password" >Password</label>
              <input id="password" placeholder="Ingrese su Contraseña" type="password" value={values.password} onChange={handleChange} onBlur={handleBlur} className={errors.password && touched.password ? "text-input error" : "text-input"} />
              {errors.password && touched.password && (<div className="input-feedback">{errors.password}</div>)}
              {/* <button type="button" className="outline" onClick={handleReset} disabled={!dirty || isSubmitting}>Reset</button> */}
              <button type="submit" disabled={!dirty || isSubmitting}>Ingresar</button>
            </animated.form>
          );
        }}
      </Formik>
);







// function LoginForm() {

//   let history = useHistory();

//     const [email, setEmail] = useState({value: "", hasError: false});
//     const [password, setPassword] = useState({value: "",hasError: false});

//     const onChangeEmail = (e) => {
//       const email = e.target.value;
//       setEmail(email);
//     };

//     function handleBlurEmail(){
//       const emailRegexp = new RegExp(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/);
//       const hasError = email == "" || !emailRegexp.test(email.value);
//       console.log(hasError)

//     }

//     const onChangePassword = (e) => {
//       const password = e.target.value;
//       setPassword(password);
//     };

//     const handleLogin = (e) => {
//       e.preventDefault();

//       AuthService.login(email, password).then(
//         () => {
//           Swal.fire({
//             position: 'top-end',
//             title: 'Bienvenido a BlueCinema!',
//             background: '#1059ff',
//             color:'#0f0f0f',
//             showConfirmButton: false,
//             timer: 2000
//           })
//          history.push("/home");
//         },
//         (error) => {
//           Swal.fire({
//             icon: 'error',
//             iconColor: 'rgb(248, 24, 24)',
//             title: 'Oops...',
//             text: 'Error iniciando sesión, verifica que tus datos esten correctos!',
//             background: '#0f0f0f',
//             color:'white',
//             confirmButtonColor: '#1059ff' 
//              })

//              setEmail({value: ""});
//              setPassword({value: ""});

//         }
//       );
//     };




//   return (
//     <form>
//       <label name='userEmail'>Correo de usuario</label>
//       <input type='email' name="email" value={email.value} onChange={onChangeEmail} onBlur={handleBlurEmail} aria-errormessage="emailErrorID" aria-invalid={email.hasError} required="true" placeholder="Ingrese su email" id='userEmail'/>
//       <p id="msgID" aria-live="assertive" style={{ visibility: email.hasError ? "visible" : "hidden" }}>
//       Please enter a valid email
//     </p>

//       <label name='password'>Contraseña</label>
//       <input type="password" name="password" value={password.value} onChange={onChangePassword} required="true" placeholder="Ingrese su contraseña" minLength="5" id="password"/>
//       <button type="submit" onClick={handleLogin} className='button'>Iniciar sesion</button>
//     </form>
//   )
// }



function RegisterForm() {

  return (
    <React.Fragment>
      <label name="documentType">Tipo de documento</label>
      <select id="documentType" required={true}>
        <option defaultValue disabled>Selecciona</option>
        <option>Cédula de ciudadania</option>
        <option>Tarjeta de identidad</option>
        <option>Cédula de extranjería</option>
      </select>
      <label name="documentNumber">Numero de documento</label>
      <input type="number" required={true} placeholder="Ingrese su número de documento" min="0" id="documentNumber" />
      <label name="names">Nombres</label>
      <input type="text" required={true} placeholder="Ingrese sus nombres" id="names" />
      <label name="surnames">Apellidos</label>
      <input type="text" required={true} placeholder="Ingrese sus apellidos" id="surnames" />
      <label name="email">Correo Electronico</label>
      <input type="email" required={true} placeholder="Ejemplo: Juan@gmail.com" id="email" />
      <label name="password">Contraseña</label>
      <input id='pass' name="pass" type="password" required={true} placeholder="Min.5 Incluya Mayuscula,Minuscula,Número" minLength="5" pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{5,}$" id="password" />
      <label name="confirmPassword">Confirmar Contraseña</label>
      <input name="confirmpass" id="confirmpass" type="password" required={true} placeholder="Repita su contraseña" minLength="5" id="confirmPassword" />
      <input type='submit' value='Registrarme' className='submit' />
    </React.Fragment>
  )
}

const LoginRegister = () => {

  const [registrationFormStatus, setRegistrationFormStatus] = useState(false);
  const loginProps = useSpring({
    left: registrationFormStatus ? -500 : 0

  })
  const registerProps = useSpring({
    left: registrationFormStatus ? 0 : 500
  })

  const loginBtnProps = useSpring({ borderBottom: registrationFormStatus ? 'solid 0px transparent' : 'solid 2px #1059FF' })
  const registerBtnProps = useSpring({ borderBottom: registrationFormStatus ? 'solid 2px #1059FF' : 'solid 0px transparent' })

  function registerClicked() { setRegistrationFormStatus(true) }
  function loginClicked() { setRegistrationFormStatus(false) }

  //const AnimatedLogin = styled(animated(LoginForm))`{loginProps}`;

  return (
    <div className="LoginRegister" style={{ backgroundImage: `url(${background})` }}>
      <div className="login-register">
        <div className='nav-buttons'>
          <animated.button onClick={loginClicked} id="loginBtn" style={loginBtnProps}>Ingresar</animated.button>
          <animated.button onClick={registerClicked} id="registerBtn" style={registerBtnProps}>Registrarme</animated.button>
        </div>
        <div className="form-group">
          <LoginForm style={loginProps}/>



          <animated.form action='' id='registerform' style={registerProps}><RegisterForm/></animated.form>

        </div>
        <animated.div className="forgot-panel" style={loginProps}><a href="#">Olvidé mi contraseña</a></animated.div>
      </div>
    </div>
  );
}

export default LoginRegister;





