import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router';
import { Link, useLocation } from 'react-router-dom';
import authService from '../../api/services/auth.service';
import userService from '../../api/services/user.service';
import logo from '../../assets/tmovie.png';
import './header.css';
import {BiMenu, BiLogOut, BiCog, BiUser} from "react-icons/bi";


const headerNav = [
    {
        display: 'Inicio',
        path: '/home'
    },
    {
        display: 'Cartelera',
        path: '/billboard'
    },
    {
        display: 'Mis reservas',
        path: '/reserves'
    }
];



const Header = () => {

  

    let history = useHistory();
    const { pathname } = useLocation();
    const headerRef = useRef(null);
    const [name, setName] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);

    const active = headerNav.findIndex(e => e.path === pathname);

    const handleLogout = () => {
        authService.logout();
        history.push('/');
        window.location.reload();
    }
   
   

    useEffect(() => {

        const getName = async () => {
            try {
                const name = await userService.getUserName();
                setName(name);

                const admin = await userService.getRolesCurrentUser().includes("ROLE_ADMIN");
                setIsAdmin(admin);
                
            } catch {
                console.log("error");
            }
        }
        getName();


        const shrinkHeader = () => {
            if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
                headerRef.current.classList.add('shrink');
            } else {
                headerRef.current.classList.remove('shrink');
            }
        }
        window.addEventListener('scroll', shrinkHeader);
        return () => {
            window.removeEventListener('scroll', shrinkHeader);
        };
    }, []);

    return (
        <div ref={headerRef} className="header">
            <div className="header__wrap container">
                <div className="logo">
                    <img src={logo} alt="" />
                    <Link to="/home">BlueCinema</Link>
                </div>
                <ul className="header__nav">
                    {
                        headerNav.map((e, i) => (
                            <li key={i} className={`${i === active ? 'active' : ''}`}>
                                <Link to={e.path}>
                                    {e.display}
                                </Link>
                            </li>
                        ))
                    }
                </ul>
                <div className="dropdown">
                    <button className="dropbtn" onClick={myFunction}>
                        {name}  
                        <BiMenu className="icon" size='1.5em'/>                        
                    </button>
                    <div className="dropdown-content" id="myDropdown">
                        <a><BiUser size='1.2rem'/> Mi perfil</a>
                        {isAdmin===true &&
                            <a><BiCog size='1.2rem'/> Administrar</a>
                        }
                        
                        <a onClick={handleLogout}><BiLogOut size='1.2rem'/> Salir</a>
                    </div>

                </div>
            </div>
        </div>
    );
}

const myFunction = () => {
    document.getElementById("myDropdown").classList.toggle("show");      
}

window.onclick = function(e) {
    if (!e.target.matches('.dropbtn')) {
    var myDropdown = document.getElementById("myDropdown");
      if (myDropdown !=null && myDropdown.classList.contains('show')) {
        myDropdown.classList.remove('show');
      }
      else{
      }
    }
  }


export default Header;