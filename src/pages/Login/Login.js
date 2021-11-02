import React,{useState} from 'react';
import './Login.css';
import Title from './components/Title/Title';
import Label from './components/Label/Label';
import Input from './components/Input/Input';

const Login = () =>{

    const[user, setUser] = useState('');
    const[password,setPassword]=useState('');

    function handleChange(name,value){
        if(name==='usuario'){
            setUser(value)
        }
        else{
            setPassword(value)
        }
    }

    function handleSubmit(){
        let account = {user,password}
        if(account){
            console.log('account:',account)
        }
    }

    return(
        <div className='login-box'>
            
            <Title text = 'Iniciar Sesion'/>
            <Label text = 'Usuario'/>
            <div class='user-box'>
            <Input
            attribute={{
                id: 'usuario',
                name: 'usuario',
                type: 'text',
                placeholder:'Ingrese su usuario'
            }}
            handleChange={handleChange}
            />
            </div>

            <Label text = 'Contraseña'/>
            <div class='user-box'>
            <Input
            attribute={{
                id: 'contraseña',
                name: 'contraseña',
                type: 'password',
                placeholder:'Ingrese su contraseña'
            }}
            handleChange={handleChange}
            />
            </div>
            <button onClick={handleSubmit}>
                Ingresar
            </button>
            </div>
    )
};

export default Login;