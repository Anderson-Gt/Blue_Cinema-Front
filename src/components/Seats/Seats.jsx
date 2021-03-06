import React, { useState, useEffect} from "react";
import clsx from 'clsx'
import './seats.css'
import userService from "../../api/services/user.service";
import Button, { OutlineButton } from '../../components/Button/Button';
import { useHistory } from 'react-router';
import Swal from 'sweetalert2';


const seats = Array.from({ length: 5 * 8 }, (_, i) => i + 1);

const Seats = props => {
  let history = useHistory();
  const [selectedSeats, setSelectedSeats] = useState([]);

  const item = props.item;
  const idSchedule = parseInt(props.idSchedule);
  const [chairs, setChairs] = useState([]);

  
  const close = () => {
    setSelectedSeats([]);
    props.closeModal();    
  }

  useEffect(()=>{setSelectedSeats([])}, [props.modal]);

  const createReserve = () => {

    userService.createReserve(item.idMovie, idSchedule, selectedSeats).then(
      () => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Se ha registrado tu reserva',
          background: '#0f0f0f',
          color:'white',
          showConfirmButton: false,
          timer: 1800
        })
        history.push('/billboard');

      },
      (error) => {
        console.log(error.response);
      }
    )
  }

  const getReservedChairs = async () => {
    try{
      const listReservedChairs = await userService.getReservedChairs(idSchedule, item.idMovie);
      setChairs(listReservedChairs);
    }
    catch{
      console.log("error");
    }
  }

  useEffect(getReservedChairs, [idSchedule, item.idMovie]);

  return (
    <div className="Seats">
      <h2 className="title-value">{item.title} - {formatNumber(item.ticketValue)} COP</h2>
      <ShowCase />
      <Cinema
        movie={chairs}
        selectedSeats={selectedSeats}
        onSelectedSeatsChange={selectedSeats => setSelectedSeats(selectedSeats)}
      />
      <PriceCalculator data={selectedSeats} price={item.ticketValue}></PriceCalculator>
      {selectedSeats.length !== 0 &&

        <div className="buttons">
          {
            <Button onClick={createReserve}>Reservar</Button>

          }
          {
            <OutlineButton onClick={close}>Cancelar</OutlineButton>
          }
        </div>

      }

    </div>
  )
}

export default Seats;

const ShowCase = () => {
  return (
    <ul className="ShowCase">
      <li>
        <span className="seat" /> <small>DISPONIBLE</small>
      </li>
      <li>
        <span className="seat selected" /> <small>SELECCIONADA</small>
      </li>
      <li>
        <span className="seat occupied" /> <small>OCUPADA</small>
      </li>
    </ul>
  )
}


const PriceCalculator = props => {
  const data = props.data;
  const price = props.price

  var asiento = "";

  if (data.length === 1) {
    asiento = "silla";

  } else {
    asiento = "sillas";
  }
  return (
    <div className="inf">
      <p className="selected_seat">Seleccionaste {data.length} {asiento}: {data.map((i) => { if (data.length === 1) { return "#" + i } else { return "#" + i + ", " } })} </p>
      <p className="total_price">Precio total: {formatNumber(data.length * price)} COP</p>
    </div>
  )
}

function formatNumber(number) {
  return new Intl.NumberFormat("ES-CO", { style: 'currency', currency: 'COP', maximumSignificantDigits: 3 }).format(number)
}


const Cinema = ({ movie, selectedSeats, onSelectedSeatsChange }) => {
  const handleSelectedState = (seat) => {

    const isSelected = selectedSeats.includes(seat)
    if (isSelected) {
      onSelectedSeatsChange(
        selectedSeats.filter(selectedSeat => selectedSeat !== seat),
      )
    } else {
      onSelectedSeatsChange([...selectedSeats, seat])
    }
  }

  return (
    <div className="Cinema">
      <div className="screen" />
      <div className="seats">
        {seats.map(seat => {
          const isSelected = selectedSeats.includes(seat)
          const isOccupied = movie.includes(seat)

          return (
            <span
              tabIndex="0"
              key={seat}
              className={clsx(
                'seat',
                isSelected && 'selected',
                isOccupied && 'occupied',
              )}
              onClick={isOccupied ? null : () => handleSelectedState(seat)}
              onKeyPress={
                isOccupied
                  ? null
                  : e => {
                    if (e.key === 'Enter') {
                      handleSelectedState(seat)
                    }
                  }
              }
            />
          )
        })}
      </div>
    </div>
  )
}







