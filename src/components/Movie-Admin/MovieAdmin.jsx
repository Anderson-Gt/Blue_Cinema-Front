import React, { useState, useEffect } from "react";
import PageHeader from "../Page-Header/PageHeader";

import userService from "../../api/services/user.service";
import MovieCard from "../Movie-Card/MovieCard";
import { Link } from "react-router-dom";
import apiConfig from "../../api/apiConfig";

import { BiPlus, BiTrash, BiPencil } from "react-icons/bi";


import './movie-admin.css'

const MovieAdmin = () => {
    return (
        <>
            <PageHeader />
            <div className="adminMovies">
                <AdminGrid />
            </div>
        </>
    )

}


const AdminGrid = () => {
    const [items, setItems] = useState([]);


    useEffect(() => {
        const getList = async () => {
            try {
                const response = await userService.getMoviesOnBillboard();
                setItems(response);
            } catch {
                console.log('error');

            }
        }
        getList();
    }, []);

    return (
        <>
            <div className="movie-grid">
                <div className="newCard">
                    <div className="add">
                        <BiPlus className="iconNew"/>
                    </div>
                        <h3 className="add-h3">Agregar Pelicula</h3>
                </div>

                {
                    items.map((item, i) => <AdminMovieCard item={item} key={i} />)
                }
            </div>
        </>
    );
}


const AdminMovieCard = props => {

    const item = props.item;
    const link = '/movies/' + item.idMovie;
    const bg = apiConfig.originalImage(item.image);

    return (
        <div>
            <Link to={link}>
                <div className="movie-card" style={{ backgroundImage: `url(${bg})` }}>
                </div>
                <h3>{item.title}</h3>
            </Link>
            <div className="admin-btns">
                {
                    <button className="edit"><BiPencil className="edit-i" /> Editar</button>

                }
                {
                    <button className="delete"><BiTrash className="delete-i" /> Eliminar</button>
                }
            </div>

        </div>


    );
}




export default MovieAdmin;