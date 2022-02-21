import React, { useState, useEffect } from 'react';
import PageHeader from "../Page-Header/PageHeader";
import userService from "../../api/services/user.service";
import apiConfig from '../../api/apiConfig';
import "./reserves.css";
import { Link } from 'react-router-dom';
import Modal, { ModalContent } from '../../components/Modal/Modal';
import { BiTrash, BiPencil } from "react-icons/bi";
import EditSeats from '../Seats/EditSeats';
import Swal from 'sweetalert2';

function reserveMessage(number, name) {
    var message = "";
    if (number === 0) {
        message = name + ", parece que por el momento no tienes reservas registradas, te recomendamos ver lo que tenemos para tí en Cartelera";
    } else {
        message = name + ", esta es tu lista de reservas registradas: ";
    }
    return message
}

const Reserves = () => {

    return (
        <>
            <PageHeader></PageHeader>
            <div className="reserves-grid">
                <ReserveGrid></ReserveGrid>
            </div>
        </>
    );
};

const ReserveGrid = () => {
    const [items, setItems] = useState([]);
    const [message, setMessage] = useState("");

    const getList = async () => {
        try {
            const response = await userService.getUserReserves();
            setItems(response);
            const name = await userService.getUserName();
            const msg = await reserveMessage(response.length, name);
            setMessage(msg);
        } catch {
            console.log("error");
        }
        
    }
    useEffect(getList, []);


    return (
        <>
            <h2 className="message">{message}</h2>
            <div className="reserve-grid">
                {items.length !== 0 &&
                    items.map((item, i) => <ReserveCard item={item} update={getList} key={i} />)
                }
            </div>
        </>

    );
}


const ReserveCard = props => {

    
    
    const [activeModal, setActiveModal] = useState(false);
    const item = props.item;
    const [schedulee, setSchedule] = useState("");
    const link = '/movies/' + item.movies.idMovie
    const chairs = item.chairs;
    const listItems = chairs.map((id) =>
    <span key={id.idChair.toString()}>#{id.idChair}, </span>)


    const image = item.movies.image;

    userService.getSchedule(item.idSchedule).then(val=>
        setSchedule(val)
    )

    const setModalActive = async () => {
        setActiveModal(true);

    }

    const deletefunct = () => {


        Swal.fire({
            title: 'Eliminar Reserva #'+item.idReserve,
            text: "Tus sillas reservadas quedarán libres",
            icon: 'warning',
            iconColor: 'rgb(248, 24, 24)',
            background: '#0f0f0f',
            color: 'white',
            showCancelButton: true,
            confirmButtonColor: 'rgb(221, 4, 4)',
            confirmButtonText: 'Eliminar',
            cancelButtonColor: '#1059ff',
            cancelButtonText: 'Cancelar'

        }).then((result) => {
            if (result.isConfirmed) {

                userService.deleteReserve(item.idReserve).then(
                    () => {
                        props.update();
                    },
                    (error) => {
                        console.log(error.response.status);
                    }
                )
                Swal.fire({
                    title: 'Reserva Eliminada',
                    text: 'Tus sillas han sido liberadas',
                    icon: 'success',
                    background: '#0f0f0f',
                    color: 'white',
                    confirmButtonColor: '#1059ff'
                }

                )
            }
        })
    }

    

    return (
        <div className="background">
            <div className="card-container">
                <Link to={link} className="image">
                    <img src={apiConfig.originalImage(image)} alt="" />
                
                </Link>
            
                

                <div className="info-container">
                    <h2 className="movieTitle">{item.movies.title}</h2>
                    <div className="reserv-info">
                        <h4 className="id_reserve">ID Reserva: #{item.idReserve}</h4>
                        <h4 className="schedule_item">Hora: {schedulee} </h4>
                        <h4 className="chairs_item">Cantidad Sillas: {item.amount}</h4>
                        <h4 className="chairs_code">Código Sillas: {listItems}</h4>
                        <h4 className="price_item">Valor: {formatNumber(item.totalPrice)}</h4>
                    </div>
                    <div>
                        {
                            <button className="edit-button" onClick={setModalActive}><BiPencil className="edit-icon" /> Editar</button>

                        }
                        {
                            <button className="delete-button" onClick={deletefunct}><BiTrash className="delete-icon" /> Eliminar</button>
                        }
                    </div>

                </div>
            </div>
                <Modal active={activeModal}>
                <ModalContent onClose={setActiveModal}>
                    <h2 className="select-seats">Editar reserva #{item.idReserve}</h2>
                    <EditSeats  item={item} idSchedule={item.idSchedule} onClose={setActiveModal} update={props.update} modal={activeModal}></EditSeats>
                </ModalContent>

            </Modal>            
        </div>

    );
}

function formatNumber(number) {
    return new Intl.NumberFormat("ES-CO", { style: 'currency', currency: 'COP', maximumSignificantDigits: 3 }).format(number)
}

export default Reserves;
