import React, { useState, useEffect} from 'react';
import PageHeader from "../Page-Header/PageHeader";
import userService from "../../api/services/user.service";
import apiConfig from '../../api/apiConfig';
import "./reserves.css";
import { Link } from 'react-router-dom';
import Button, { DeleteButton } from '../../components/Button/Button';

function reserveMessage(number,name){
    var message = "";
    
    if(number===0){
        message = name+", parece que por el momento no tienes reservas registradas, te recomendamos ver lo que tenemos para tí en Cartelera";

    }else{
        message= name+ ", esta es tu lista de reservas registradas: ";
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
    const [name, setName] = useState("");
    useEffect(() => {
        const getList = async () => {
            try {
                const response = await userService.getUserReserves();
                setItems(response);
                const name = await userService.getUserName();
                setName(name);
            } catch {
                console.log("error");
            }
        }
        getList();
    }, []);


    return (
        <> 
            <h2 className="message">{reserveMessage(items.length, name)}</h2>
            <div className="reserve-grid">
                {
                    items.map((item, i) => <ReserveCard  item={item} key={i}/>)
                }
            </div>
        </>       

    );
}


const ReserveCard = props => {

    const [schedulee, setSchedule] = useState("");
    const item = props.item;
    const bg = apiConfig.originalImage(item.movies.image);
    const link = '/movies/' + item.movies.idMovie;
    const chairs = item.chairs;
    const listItems = chairs.map((id) => 
        <span key={id.idChair.toString()}>#{id.idChair}, </span>
    )
    useEffect(() => {
        const getSchedule = async (id) => {
            try {
                const response = await userService.getSchedule(id);
                setSchedule(response);
            } catch {
                console.log("error");
            }
        }
        getSchedule(item.idSchedule);
    }, []);

    return (
        <div className="background">
            <div className="card-container">
                <Link to={link} className="image">
                    <img src = {apiConfig.originalImage(item.movies.image)} alt=""/>
                </Link>
                
                <div className="info-container">
                    <h2 className="movieTitle">{item.movies.title}</h2>
                    <div className="reserv-info">
                        <h4 className="schedule_item">Hora: {schedulee} </h4>
                        <h4 className="chairs_item">Cantidad Sillas: {item.amount}</h4>
                        <h4 className="chairs_code">Código Sillas: {listItems}</h4>
                        <h4 className="price_item">Valor: {formatNumber(item.totalPrice)}</h4>
                    </div>
                    <div>
                                            {
                                                <Button>Editar</Button>

                                            }
                                            {
                                                <DeleteButton>Eliminar</DeleteButton>
                                            }
                                        </div>

                </div>
            </div>
        </div>

    );
}

function formatNumber(number){
    return new Intl.NumberFormat("ES-CO",{style:'currency', currency: 'COP',maximumSignificantDigits:3}).format(number)
}

export default Reserves;
