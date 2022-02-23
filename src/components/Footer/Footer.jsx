import React from 'react';

import './footer.css';

import { Link } from 'react-router-dom';

import bg from '../../assets/footer-bg.jpg';
import logo from '../../assets/tmovie.png';

const Footer = () => {
    return (
        <div className="footer" style={{backgroundImage: `url(${bg})`}}>
            <div className="footer__content container">
                <div className="footer__content__logo">
                    <div className="logo">
                        <img src={logo} alt="" />
                        <Link to="/home">BlueCinema</Link>
                    </div>
                </div>
                <div className="footer__content__menus">
                    <div className="footer__content__menu">
                        <Link to="/">Acerca de BlueCinema</Link>
                    </div>
                    <div className="footer__content__menu">
                        <Link to="/">Acerca de Cidenet</Link>
                    </div>
                    <div className="footer__content__menu">
                        <Link to="/">Documentación API</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;