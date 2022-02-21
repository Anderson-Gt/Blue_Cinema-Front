import React, { useState, useEffect } from "react";
import clsx from 'clsx'
import './seats.css'
import userService from "../../api/services/user.service";
import Button, { OutlineButton } from '../../components/Button/Button';
import Swal from 'sweetalert2';



const seats = Array.from({ length: 5 * 8 }, (_, i) => i + 1);

const EditSeats = props => {
  const [item, setItem] = useState(props.item);
  const seatss = item.chairs.map((x)=>x.idChair);  
  const [selectedSeats, setSelectedSeats] = useState(seatss);  
  const [chairs, setChairs] = useState([]);

  const update = async () => {
    try{
      setItem(props.item);
      const seatt = props.item.chairs.map((x)=>x.idChair);
      setSelectedSeats(seatt);

      userService.getReservedChairs(props.idSchedule, props.item.movies.idMovie).then((lista) =>{
        const list = lista
        for(let i=0;i < selectedSeats.length; i++){
          list.splice(list.indexOf(selectedSeats[i]),1);
        }
        setChairs(list);
      }  
      )

      
    }
    catch{
    }
  }

   useEffect(update,[props.item, props.modal]);
  
  const close = () => {
    update();
    setSelectedSeats(seatss);
    props.onClose();
  }

  const editReserve = () => {

    userService.updateReserve(item.idReserve, selectedSeats).then(
      () => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Reserva #'+item.idReserve+' modificada',
          background: '#0f0f0f',
          color:'white',
          showConfirmButton: false,
          timer: 1800
        })
        props.update();
        close();
        

      },
      (error) => {
        console.log(error.response);
      }
    )
  }


  return (
    <div className="Seats">
      <h2 className="title-value">{item.movies.title} - {formatNumber(item.movies.ticketValue)} COP</h2>
      <ShowCase />
      <Cinema
        movie={chairs}
        selectedSeats={selectedSeats}
        onSelectedSeatsChange={selectedSeats => setSelectedSeats(selectedSeats)}
      />
      <PriceCalculator data={selectedSeats} price={item.movies.ticketValue}></PriceCalculator>
      {selectedSeats.length !== 0 &&

        <div className="buttons">
          {
            <Button onClick={editReserve}>Aceptar</Button>

          }
          {
            <OutlineButton onClick={close}>Cancelar</OutlineButton>
          }
        </div>

      }

    </div>
  )
}

export default EditSeats;

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