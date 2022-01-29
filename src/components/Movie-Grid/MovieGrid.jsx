import React, { useState, useEffect} from 'react';


import './movie-grid.css';

import MovieCard from '../Movie-Card/MovieCard';
import userService from '../../api/services/user.service';

const MovieGrid = () => {

    const [items, setItems] = useState([]);
    

    useEffect(() => {
        const getList = async () => {
            try{
                const response = await userService.getMoviesOnBillboard();
                setItems(response);                
            }catch{
                console.log('error');
                
            }
        }
        getList();
    }, []);

    return (
        <> 
            <div className="movie-grid">
                {
                    items.map((item, i) => <MovieCard  item={item} key={i}/>)
                }
            </div>
        </>
    );
}



export default MovieGrid;