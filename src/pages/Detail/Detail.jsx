import React, { useEffect, useState} from 'react';
import { useParams } from 'react-router';

import userServie from '../../api/services/user.service'
import apiConfig from '../../api/apiConfig';
import Modal, { ModalContent } from '../../components/Modal/Modal';
import Seats from '../../components/Seats/Seats';

import Button, { OutlineButton } from '../../components/Button/Button';

import './detail.css';

const Detail = () => {

    const [activeModal, setActiveModal] = useState(false);

    const { id } = useParams();

    const [item, setItem] = useState(null);

    useEffect(() => {
        const getDetail = async () => {
            const response = await userServie.getMovieDetail(id);
            setItem(response);
            window.scrollTo(0, 0);
        }
        getDetail();
    }, [id]);

    const setModalActive = async () => {
        setActiveModal(true);
    }

    return (
        <>
            {
                item && (
                    <>
                        <div className="banner" style={{ backgroundImage: `url(${apiConfig.originalImage(item.image)})` }}></div>
                        <div className="mb-3 movie-content container">
                            <div className="movie-content__poster">
                                <div className="movie-content__poster__img" style={{ backgroundImage: `url(${apiConfig.originalImage(item.image)})` }}></div>
                            </div>
                            <div className="movie-content__info">
                                <h1 className="title">
                                    {item.title}
                                </h1>
                                <div className="movie__info">
                                    {
                                        <span className="gender__item">{item.gender}</span>
                                    }
                                    {
                                        <span className="format__item">{item.format}</span>
                                    }
                                    {
                                        <span className="duration__item">{item.duration}</span>
                                    }

                                </div>
                                <div className="synopsis">{item.synopsis}</div>
                                <div className="ticketValue">Valor de la boleta: {formatNumber(item.ticketValue)} COP</div>
                                <div className="button_dropdown">
                                    {
                                        <select className="schedule_" id="schedule" required={true}>
                                            <option defaultValue disabled>Horarios Disponibles</option>
                                            <option>12:00 pm</option>
                                            <option>3:00 pm</option>
                                            <option>6:00 pm</option>
                                            <option>9:00 pm</option>
                                        </select>
                                    }
                                    {
                                        <Button onClick={setModalActive} className="btnreserve">Reservar ahora</Button>
                                    }


                                </div>
                                <Modal active={activeModal}>
                                    <ModalContent onClose={setActiveModal}>
                                        <h2 className="select-seats">Selecciona tus asientos</h2>                                      
                                        <Seats item={item}></Seats>
                                        <div>
                                            {
                                                <Button>Aceptar</Button>

                                            }
                                            {
                                                <OutlineButton>Cancelar</OutlineButton>
                                            }
                                        </div>
                                          
                                        
                                    </ModalContent>

                                </Modal>


                            </div>
                        </div>
                    </>

                )
            }
        </>

    );
}

function formatNumber(number){
    return new Intl.NumberFormat("ES-CO",{style:'currency', currency: 'COP',maximumSignificantDigits:3}).format(number)
}



export default Detail;