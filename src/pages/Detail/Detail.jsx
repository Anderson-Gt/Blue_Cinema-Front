import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import userServie from '../../api/services/user.service'
import apiConfig from '../../api/apiConfig';
import Modal, { ModalContent } from '../../components/Modal/Modal';
import Seats from '../../components/Seats/Seats';
import Button from '../../components/Button/Button';




import './detail.css';
const Detail = () => {

    const [activeModal, setActiveModal] = useState(false);
    const [activeButton, setActiveButton] = useState(false);
    const { id } = useParams();
    const [item, setItem] = useState(null);
    const [schedule, setSchedule] = useState(null);

    useEffect(() => {
        const getDetail = async () => {
            const response = await userServie.getMovieDetail(id);
            setItem(response);
            window.scrollTo(0, 0);

        }
        getDetail();
    }, [id]);

    const desactiveModal = () =>{
        setActiveModal(false);        
    }

    const setModalActive = async () => {
        setActiveModal(true);
    }

    const updateSchedule = (e) => {
        const selected = e.target.value;
        setSchedule(selected);
        setActiveButton(true);
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


                                <div className="schedule-container">{item.schedules.length > 0
                                    ? <div className="button_dropdown">
                                        {
                                            <select id="schedule_" className="schedule_" defaultValue="" required onChange={updateSchedule}>
                                                <option value="" disabled hidden>Horarios Disponibles</option>
                                                {
                                                    item.schedules.map((id) => <option key={id.idSchedule} value={id.idSchedule}>{id.time}</option>)
                                                }
                                            </select>
                                        }
                                        {schedule != null &&
                                            <Button active={activeButton} onClick={setModalActive} className="btnreserve">Seleccionar Sillas</Button>
                                        }
                                    </div>
                                    : <div className="noSchedule">Por el momento no hay horarios disponibles</div>}
                                </div>

                                <div>{schedule != null &&
                                     <Modal active={activeModal}>
                                        <ModalContent onClose={desactiveModal}>
                                            <h2 className="select-seats">Selecciona tus asientos</h2>
                                            <Seats  item={item} idSchedule={schedule} closeModal={desactiveModal} modal={activeModal}></Seats>
                                        </ModalContent>

                                    </Modal>
                                        
                                        }


                                </div>


                            </div>

                        </div>

                    </>

                )
            }
        </>

    );
}

function formatNumber(number) {
    return new Intl.NumberFormat("ES-CO", { style: 'currency', currency: 'COP', maximumSignificantDigits: 3 }).format(number)
}



export default Detail;