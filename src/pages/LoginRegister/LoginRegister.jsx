import React, { useState } from 'react';
import background from '../../assets/images/background.jpg';
import Swal from 'sweetalert2';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useHistory } from 'react-router';

import userService from '../../api/services/user.service';
import AuthService from '../../api/services/auth.service';


import { useSpring, animated } from 'react-spring';

import './loginregister.css';


const LoginForm = propps => (



  <Formik initialValues={{ email: "", password: "" }} onSubmit={async (values, { resetForm }) => {


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

        propps.redirect();

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

        resetForm({})

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

      const { values, touched, errors, dirty, isSubmitting, handleChange, handleBlur, handleSubmit, handleReset } = props;

      return (
        <animated.form id='loginform' style={propps.style} onSubmit={handleSubmit} redirect={propps.redirect} >
          <label htmlFor="email">Correo de usuario</label>
          <input id="email" placeholder="Ingrese su Email" type="email" value={values.email} onChange={handleChange} onBlur={handleBlur} className={errors.email && touched.email ? "text-input error" : "text-input"} />
          {errors.email && touched.email && (<div className="input-feedback">{errors.email}</div>)}

          <label htmlFor="password" >Contraseña</label>
          <input id="password" placeholder="Ingrese su Contraseña" type="password" value={values.password} onChange={handleChange} onBlur={handleBlur} className={errors.password && touched.password ? "text-input error" : "text-input"} />
          {errors.password && touched.password && (<div className="input-feedback">{errors.password}</div>)}
          {/* <button type="button" className="outline" onClick={handleReset} disabled={!dirty || isSubmitting}>Reset</button> */}
          <div className="loginBtnCont">
            <button className="loginBtn" type="submit" disabled={!dirty || isSubmitting}>Ingresar</button>
          </div>
        </animated.form>
      );
    }}
  </Formik>
);





const RegisterForm = (propps) => (

  <Formik initialValues={{ documentType: "", documentNumber: "", names: "", surnames: "", email: "", password: "", confirmPassword: "" }} onSubmit={async values => {
    console.log(values)
    userService.createUser(values.documentType, values.documentNumber, values.names, values.surnames, values.email, values.password).then(

      () => {
        Swal.fire({
          title: 'Registro exitoso!',
          text: 'Ahora puedes iniciar sesión y disfrutar de lo que tenemos para ti',
          icon: 'success',
          background: '#0f0f0f',
          color: 'white',
          confirmButtonColor: '#1059ff'
        }).then((ok) => {
          if (ok.isConfirmed) {
            window.location.reload();
          }
        }
        )
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          iconColor: 'rgb(248, 24, 24)',
          title: 'Error en el registro',
          text: 'Algo salió mal, verifica que el usuario no se encuentre registrado',
          background: '#0f0f0f',
          color: 'white',
          confirmButtonColor: '#1059ff'
        })

      }
    );
  }}
    validationSchema={Yup.object().shape({
      documentType: Yup.string()
        .required("Selecciona una opción"),

      documentNumber: Yup.string()
        .required("Número obligatorio")
        .matches(/^[0-9]+$/, "Sólo números")
        .min(5, "No válido"),

      names: Yup.string()
        .required("Ingrese sus nombres")
        .matches(/^[aA-zZ\s]+$/, "No válido"),

      surnames: Yup.string()
        .required("Ingrese sus apellidos")
        .matches(/^[aA-zZ\s]+$/, "No válido"),

      email: Yup.string()
        .email("Ingrese un correo válido")
        .required("Email es obligatorio"),
      password: Yup.string()
        .min(5, "Debe tener almenos 5 caracteres")
        .required("Contraseña es obligatoria")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{5,}$/, "Incluya Mayuscula,Minuscula,Número"),
      confirmPassword: Yup.string()
        .required("Confirme su contraseña")
        .oneOf([Yup.ref('password'), null], "Las contraseñas deben coincidir")


    })}
  >
    {props => {

      const { values, touched, errors, dirty, isSubmitting, handleChange, handleBlur, handleSubmit, handleReset } = props;

      return (
        <animated.form id='registerform' style={propps.style} onSubmit={handleSubmit} >
          <label htmlFor="documentType">Tipo de documento</label>
          <select required={true} id="documentType" type="text" value={values.documentType} onChange={handleChange} onBlur={handleBlur} className={errors.documentType && touched.documentType ? "text-input error" : "text-input"}>
            <option value="" defaultValue disabled label="Selecciona" />
            <option value="CC" label="Cédula de ciudadania" />
            <option value="TI" label="Tarjeta de identidad" />
            <option value="CE" label="Cédula de extranjería" />
          </select>
          {errors.documentType && touched.documentType && (<div className="input-feedback">{errors.documentType}</div>)}

          <label htmlFor="documentNumber">Numero de documento</label>
          <input id="documentNumber" placeholder="Ingrese su número de documento" type="text" value={values.documentNumber} onChange={handleChange} onBlur={handleBlur} className={errors.documentNumber && touched.documentNumber ? "text-input error" : "text-input"} />
          {errors.documentNumber && touched.documentNumber && (<div className="input-feedback">{errors.documentNumber}</div>)}

          <label htmlFor="names">Nombres</label>
          <input id="names" placeholder="Ingrese sus nombres" type="text" value={values.names} onChange={handleChange} onBlur={handleBlur} className={errors.names && touched.names ? "text-input error" : "text-input"} />
          {errors.names && touched.names && (<div className="input-feedback">{errors.names}</div>)}

          <label htmlFor="surnames">Apellidos</label>
          <input id="surnames" placeholder="Ingrese sus apellidos" type="text" value={values.surnames} onChange={handleChange} onBlur={handleBlur} className={errors.surnames && touched.surnames ? "text-input error" : "text-input"} />
          {errors.surnames && touched.surnames && (<div className="input-feedback">{errors.surnames}</div>)}

          <label htmlFor="email">Correo de usuario</label>
          <input id="email" placeholder="Ingrese su Email" type="email" value={values.email} onChange={handleChange} onBlur={handleBlur} className={errors.email && touched.email ? "text-input error" : "text-input"} />
          {errors.email && touched.email && (<div className="input-feedback">{errors.email}</div>)}

          <label htmlFor="password" >Contraseña</label>
          <input id="password" placeholder="Incluya Mayuscula,Minuscula,Número" type="password" value={values.password} onChange={handleChange} onBlur={handleBlur} className={errors.password && touched.password ? "text-input error" : "text-input"} />
          {errors.password && touched.password && (<div className="input-feedback">{errors.password}</div>)}

          <label htmlFor="confirmPassword">Confirmar contraseña</label>
          <input id="confirmPassword" placeholder="Repita su contraseña" type="password" value={values.confirmPassword} onChange={handleChange} onBlur={handleBlur} className={errors.confirmPassword && touched.confirmPassword ? "text-input error" : "text-input"} />
          {errors.confirmPassword && touched.confirmPassword && (<div className="input-feedback">{errors.confirmPassword}</div>)}

          {/* <button type="button" className="outline" onClick={handleReset} disabled={!dirty || isSubmitting}>Reset</button> */}
          <div className="registerBtnCont">
            <button className="registerBtn" type="submit" disabled={!dirty || isSubmitting}>Registrarme</button>
          </div>
        </animated.form>
      );
    }}
  </Formik>




)














// function RegisterForm() {

//   return (
//     <React.Fragment>
//       <label name="documentType">Tipo de documento</label>
//       <select id="documentType" required={true}>
//         <option defaultValue disabled>Selecciona</option>
//         <option>Cédula de ciudadania</option>
//         <option>Tarjeta de identidad</option>
//         <option>Cédula de extranjería</option>
//       </select>
//       <label name="documentNumber">Numero de documento</label>
//       <input type="number" required={true} placeholder="Ingrese su número de documento" min="0" id="documentNumber" />
//       <label name="names">Nombres</label>
//       <input type="text" required={true} placeholder="Ingrese sus nombres" id="names" />
//       <label name="surnames">Apellidos</label>
//       <input type="text" required={true} placeholder="Ingrese sus apellidos" id="surnames" />
//       <label name="email">Correo Electronico</label>
//       <input type="email" required={true} placeholder="Ejemplo: Juan@gmail.com" id="email" />
//       <label name="password">Contraseña</label>
//       <input id='pass' name="pass" type="password" required={true} placeholder="Min.5 Incluya Mayuscula,Minuscula,Número" minLength="5" pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{5,}$" id="password" />
//       <label name="confirmPassword">Confirmar Contraseña</label>
//       <input name="confirmpass" id="confirmpass" type="password" required={true} placeholder="Repita su contraseña" minLength="5" id="confirmPassword" />
//       <input type='submit' value='Registrarme' className='submit' />
//     </React.Fragment>
//   )
// }

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

  let history = useHistory();

  const login = () => {
    history.push("/home");
  }

  return (
    <div className="LoginRegister" style={{ backgroundImage: `url(${background})` }}>
      <div className="login-register">
        <div className='nav-buttons'>
          <animated.button onClick={loginClicked} id="loginBtn" style={loginBtnProps}>Ingresar</animated.button>
          <animated.button onClick={registerClicked} id="registerBtn" style={registerBtnProps}>Registrarme</animated.button>
        </div>
        <div className="form-group">
          <LoginForm style={loginProps} redirect={login} />
          <RegisterForm style={registerProps} />
        </div>
        <animated.div className="forgot-panel" style={loginProps}><a onClick={registerClicked}>No te has registrado?</a></animated.div>
      </div>
    </div>
  );
}

export default LoginRegister;





