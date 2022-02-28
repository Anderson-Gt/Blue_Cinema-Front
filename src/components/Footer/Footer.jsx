import React from 'react';

import './footer.css';

import { Link } from 'react-router-dom';

import bg from '../../assets/footer-bg.jpg';
import logo from '../../assets/tmovie.png';
import cidenetLogo from '../../assets/cidenet-logo.png';
import Modal, { ModalContent } from '../Modal/Modal';
import { useState } from 'react';

const Footer = () => {
    const [activeModal, setActiveModal] = useState(false);
    const [content, setContent] = useState(null);

    const aboutBlueCinema = () => {
        setActiveModal(true);
        setContent(
            <>
                <h2>Acerca de BlueCinema</h2>
                <div>
                    <p className="pBlueC">
                        <strong>BlueCinema </strong> es una aplicación Web responsive desarrollada por
                        <strong> Anderson Gutierrez, </strong>
                        que funciona como portal transaccional que permite vender boletas por internet,
                        supliendo la necesidad de fortalecer el canal de venta digital para <strong>Cidenet Pictures</strong> según sus historias de usuario.
                    </p>
                    <div className="gratefulness">
                        <h2>Agradecimientos a: </h2>
                    </div>
                    <p className="list">
                        <p><strong>Anderson Daniel Vargas: </strong>Líder técnico</p>
                        <p><strong>Juan Esteban Piedrahita: </strong>SCRUM máster</p>
                        <p><strong>Cidenet</strong></p>
                        <p><strong>Digital School</strong></p>
                    </p>

                </div>
            </>

        );
    }

    const aboutCidenet = () => {
        setActiveModal(true);
        setContent(
            <>
                <h2>Acerca de Cidenet</h2>
                <a className="cidenetLogo" href="https://www.cidenet.com.co/">
                    <img src={cidenetLogo}></img>
                </a>
                <div>
                    <h3 className="titleCidenet">Somos tu aliado estratégico en el desarrollo de software a la medida</h3>
                    <p className="pCidenet">
                        Somos una empresa de desarrollo de software, fundada en 2012, que trabaja bajo un modelo de Fábrica Ágil, con un equipo humano enfocado en encontrar soluciones efectivas a tus necesidades.
                    </p>
                </div>
            </>

        );
    }



    return (
        <div className="footer" style={{ backgroundImage: `url(${bg})` }}>
            <div className="footer__content container">
                <div className="footer__content__logo">
                    <div className="logo">
                        <img src={logo} alt="" />
                        <Link to="/home">BlueCinema</Link>
                    </div>
                </div>
                <div className="footer__content__menus">
                    <div className="footer__content__menu">
                        <a onClick={aboutBlueCinema}>Acerca de BlueCinema</a>
                    </div>
                    <div className="footer__content__menu">
                        <a onClick={aboutCidenet}>Acerca de Cidenet</a>
                    </div>
                    <div className="footer__content__menu">
                        <a href="http://localhost:8080/swagger-ui/index.html">Documentación API</a>
                    </div>
                </div>
            </div>
            <Modal active={activeModal}>
                <ModalContent onClose={setActiveModal}>
                    {content}
                </ModalContent>
            </Modal>
        </div>
    );
}

export default Footer;