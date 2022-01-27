import React, {useContext, useState} from "react";

import { createContext } from "react";

import './seats.css';


const MovieContext = createContext({
	
})

function formatNumber(number){
    return new Intl.NumberFormat("ES-CO",{style:'currency', currency: 'COP', maximumSignificantDigits:3}).format(number)
}

const PriceCalculator = props => {
    const {movies} = useContext(MovieContext)
    const item = props.item;
    
    var numberSeats = movies.totalSeats;
    var asiento = "";
    
    if(numberSeats===1){
        asiento="silla";

    }else{
        asiento="sillas";
    }	
	return (
		<div>
			<p className="selected_seat">Seleccionaste {numberSeats} {asiento} y el precio total es: {formatNumber(movies.totalSeats*item.ticketValue)} COP</p>
		</div>
	)
}


const Seat = (props) => {
    const { movies } = useContext(MovieContext)
    const context = useContext(MovieContext)

    const seatNumber = props.seatno
    const seatStatus = props.seatColor ? props.seatColor : "seat-grey" 

    const seatClickHandler = (event, seatNumber) => {
        event.stopPropagation()
        const seatColor = document.querySelector(`.seat-${seatNumber}`).classList
        if (movies.seatNumbers.includes(seatNumber)) {
            const newMovieSeats = movies.seatNumbers.filter((seat) => {
                return seat !== seatNumber
            })
            seatColor.remove("seat-black")
            seatColor.add("seat-grey")
            context.changeState({...movies, seatNumbers: newMovieSeats, totalSeats: movies.totalSeats-1 })
        } else {
            seatColor.remove("seat-grey")
            seatColor.add("seat-black")
            context.changeState({...movies, seatNumbers: [...movies.seatNumbers, seatNumber], totalSeats: movies.totalSeats+1 })
        }
    }

    return (
        <div className="col-2 col-md-2">
            <div className={`seat seat-${seatNumber} ${seatStatus}`}
                onClick={(e) => seatClickHandler(e,props.seatno)} />
        </div>
    )
}

const SeatAvailability = () => {
	return (
		<div className="row">
			Silla Libre: <Seat seatColor="seat-grey" />
			Silla Reservada: <Seat seatColor="seat-black" />
		</div>
	)
}

const GenerateSeats = (seatNumbers) => {
	return (
		<div className="row">
			{
				seatNumbers.map((seatNumber) => {
					return <Seat seatno={seatNumber} key={seatNumber}/>
				})
			}
		</div>
	)
}

const SeatMatrix = () => {
	return (
		<div className="movie-complex">
			<div className="screen"></div>
			<div className="container row movie-layout">
				<div className="movie-column-1">
					{GenerateSeats([1,2,3,4,5])}
					{GenerateSeats([6,7,8,9,10])}
				</div>
				<div className="movie-column-2">
					{GenerateSeats([11, 12, 13, 14, 15])}
					{GenerateSeats([16, 17, 18, 19, 20])}
					{GenerateSeats([21, 22, 23, 24, 25])}
					{GenerateSeats([26, 27, 28, 29, 30])}
				</div>
				<div className="movie-column-3">
					{GenerateSeats([31,32,33,34,35])}
					{GenerateSeats([36,37,38,39,40])}
				</div>
			</div>
		</div>
	)
}



const Seats = props => {
    const item = props.item;
    const [movies, EditMovies] = useState({		
		totalSeats: 0,
		seatNumbers: []
	})

	return (
		<div className="main_container">
            <MovieContext.Provider value={{ movies, changeState: EditMovies }}>
                <h2 className="title-value">{item.title} - {formatNumber(item.ticketValue)} COP</h2>
                <SeatAvailability/>
                <SeatMatrix/>          
                <PriceCalculator item={item}/>
			</MovieContext.Provider>
		</div>
	)
}

export default Seats;