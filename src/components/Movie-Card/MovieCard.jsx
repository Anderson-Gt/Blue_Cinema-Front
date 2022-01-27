import React from 'react';

import './movie-card.css';

import { Link } from 'react-router-dom';



import apiConfig from '../../api/apiConfig';

const MovieCard = props => {

    const item = props.item;

    const link = '/movies/' + item.idMovie;

    const bg = apiConfig.originalImage(item.image);

    return (
        <Link to={link}>
            <div className="movie-card" style={{ backgroundImage: `url(${bg})` }}>

            </div>
            <h3>{item.title}</h3>
            <div className="info">
                {
                    <span className="gender__item">{item.gender}</span>
                    
                }
                {
                    <span className="info_duration__item">{item.duration}</span>
                }

            </div>
        </Link>

    );
}

export default MovieCard;