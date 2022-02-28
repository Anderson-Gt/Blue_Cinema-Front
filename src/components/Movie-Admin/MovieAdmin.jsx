import React, { useState, useEffect } from "react";
import PageHeader from "../Page-Header/PageHeader";

import userService from "../../api/services/user.service";
import { Link } from "react-router-dom";
import apiConfig from "../../api/apiConfig";
import Modal, { ModalContent } from "../Modal/Modal";
import Swal from "sweetalert2";

import { BiPlus, BiTrash, BiPencil } from "react-icons/bi";


import './movie-admin.css'
import { Formik, Field } from "formik";
import * as Yup from 'yup';

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
    const [activeModal, setActiveModal] = useState(false);
    const [items, setItems] = useState([]);


    useEffect(() => {
        const getList = async () => {
            try {
                const response = await userService.getMoviesList();
                setItems(response);
            } catch {
                console.log('error');

            }
        }
        getList();
    }, []);

    return (
        <>

            <h2 className="adminMessage">Administrar productos</h2>
            <div className="movie-grid">
                <div onClick={setActiveModal} className="newCard">
                    <div className="add">
                        <BiPlus className="iconNew" />
                    </div>
                    <h3 className="add-h3">Agregar Pelicula</h3>
                </div>

                {
                    items.map((item, i) => <AdminMovieCard item={item} key={i} />)
                }

                <Modal active={activeModal}>
                    <ModalContent onClose={setActiveModal}>
                        <h2>Agregar Pelicula</h2>
                        <MovieForm />
                    </ModalContent>
                </Modal>


            </div>
        </>
    );
}


const AdminMovieCard = props => {

    const item = props.item;
    const link = '/movies/' + item.idMovie;
    const bg = apiConfig.originalImage(item.image);
    const [activeModal, setActiveModal] = useState(false);

    const deleteMovie = () => {


        Swal.fire({
            title: 'Eliminar ' + item.title + '?',
            text: "Se eliminará del sistema",
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

                userService.deleteMovie(item.idMovie).then(

                    Swal.fire({
                        title: 'Pelicula Eliminada',
                        text: 'Ha sido eliminada del sistema',
                        icon: 'success',
                        background: '#0f0f0f',
                        color: 'white',
                        confirmButtonColor: '#1059ff'
                    }).then((ok) => {
                        if (ok.isConfirmed) {
                            window.location.reload();
                        }
                    })


                );

            }
        })
    }

    return (
        <div>
            <Link to={link}>
                <div className="movie-card" style={{ backgroundImage: `url(${bg})` }}>
                </div>
                <h3>{item.title}</h3>
            </Link>
            <div className="admin-btns">
                {
                    <button onClick={setActiveModal} className="edit"><BiPencil className="edit-i" /> Editar</button>

                }
                {
                    <button onClick={deleteMovie} className="delete"><BiTrash className="delete-i" /> Eliminar</button>
                }
            </div>
            <Modal active={activeModal}>
                <ModalContent onClose={setActiveModal}>
                    <h2>Editar Pelicula</h2>
                    <EditForm item={item} />
                </ModalContent>
            </Modal>

        </div>


    );
};


const MovieForm = () => (

    <Formik initialValues={{ title: "", genre: "", format: "", duration: "", image: "", ticketValue: "", synopsis: "", schedule: [], billboard: "" }}
        onSubmit={async values => {
            const arraySchedules = values.schedule.map((x) => parseInt(x));
            
            userService.createMovie(values.title, values.genre, values.synopsis, values.format, values.duration, values.image, values.billboard, values.ticketValue, arraySchedules).then(
                ()=>{
                    Swal.fire({
                        title: 'Pelicula Registrada',
                        text: 'Ha sido agregada al sistema',
                        icon: 'success',
                        background: '#0f0f0f',
                        color: 'white',
                        confirmButtonColor: '#1059ff'
                    }).then((ok) => {
                        if (ok.isConfirmed) {
                            window.location.reload();
                        }
                    })
                }
            )

        }}
        validationSchema={Yup.object().shape({
            title: Yup.string()
                .required("Titulo es obligatorio"),
            genre: Yup.string()
                .required("Género es obligatorio"),
            format: Yup.string()
                .required("Formato es obligatorio"),
            duration: Yup.string()
                .required("duración es obligatorio"),
            image: Yup.string()
                .required("Link imagen es obligatorio"),
            ticketValue: Yup.string()
                .required("precio es obligatorio")
                .matches(/^[0-9]+$/, "Sólo números"),
            synopsis: Yup.string()
                .required("Sinopsis es obligatorio"),
            billboard: Yup.string()
                .required("Cartelera es obligatorio")
        })}
    >
        {props => {

            const { values, touched, errors, dirty, isSubmitting, handleChange, handleBlur, handleSubmit, handleReset } = props;

            return (
                <form className="movieForm" onSubmit={handleSubmit}>
                    <div className="title-genre">
                        <div className="pair">
                            <label htmlFor="title">Titulo</label>
                            <input id="title" placeholder="ingrese titulo" type="text" value={values.title} onChange={handleChange} onBlur={handleBlur} className={errors.title && touched.title ? "text-input error" : "text-input"} />
                            {errors.title && touched.title && (<div className="input-feedback">{errors.title}</div>)}


                        </div>
                        <div className="pair">
                            <label htmlFor="genre">Género</label>
                            <input id="genre" placeholder="ingrese Género" type="text" value={values.genre} onChange={handleChange} onBlur={handleBlur} className={errors.genre && touched.genre ? "text-input error" : "text-input"} />
                            {errors.genre && touched.genre && (<div className="input-feedback">{errors.genre}</div>)}

                        </div>


                    </div>
                    <div className="format-duration">
                        <div className="pair">
                            <label htmlFor="format">Formato</label>
                            <select id="format" required={true} type="text" value={values.format} onChange={handleChange} onBlur={handleBlur} className={errors.format && touched.format ? "text-input error" : "text-input"}>
                                <option value="" defaultValue disabled label="Selecciona" />
                                <option value="2D" label="2D" />
                                <option value="3D" label="3D" />
                            </select>
                            {errors.format && touched.format && (<div className="input-feedback">{errors.format}</div>)}

                        </div>
                        <div className="pair">
                            <label htmlFor="duration">Duración</label>
                            <input id="duration" placeholder="Ingrese duración" type="text" value={values.duration} onChange={handleChange} onBlur={handleBlur} className={errors.duration && touched.duration ? "text-input error" : "text-input"} />
                            {errors.duration && touched.duration && (<div className="input-feedback">{errors.duration}</div>)}
                        </div>
                    </div>
                    <div className="poster-ticket">
                        <div className="pair">
                            <label htmlFor="image">Póster</label>
                            <input id="image" placeholder="ingrese un Link" type="text" value={values.image} onChange={handleChange} onBlur={handleBlur} className={errors.image && touched.image ? "text-input error" : "text-input"} />
                            {errors.image && touched.image && (<div className="input-feedback">{errors.image}</div>)}
                        </div>
                        <div className="pair">
                            <label htmlFor="ticketValue">Precio Boleta</label>
                            <input id="ticketValue" placeholder="ingrese el precio" type="text" value={values.ticketValue} onChange={handleChange} onBlur={handleBlur} className={errors.ticketValue && touched.ticketValue ? "text-input error" : "text-input"} />
                            {errors.ticketValue && touched.ticketValue && (<div className="input-feedback">{errors.ticketValue}</div>)}
                        </div>
                    </div>



                    <label htmlFor="synopsis">Sinopsis</label>
                    <textarea id="synopsis" placeholder="ingrese texto" type="text" value={values.synopsis} onChange={handleChange} onBlur={handleBlur} className={errors.synopsis && touched.synopsis ? "text-input error" : "text-input"} />
                    {errors.synopsis && touched.synopsis && (<div className="input-feedback">{errors.synopsis}</div>)}

                    <label htmlFor="schedules">Horarios</label>

                    <div className="schedule-check">

                        <div className="schedule-check" role="group" aria-labelledby="checkbox-group">
                            <label><Field type="checkbox" name="schedule" value="1" />12:00 pm</label>
                            <label><Field type="checkbox" name="schedule" value="2" />03:00 pm</label>
                            <label><Field type="checkbox" name="schedule" value="3" />06:00 pm</label>
                            <label><Field type="checkbox" name="schedule" value="4" />09:00 pm</label>
                        </div>
                        <div className="billboardC">
                            <label htmlFor="billboard">En cartelera</label>
                            <select id="billboard" required={true} type="text" value={values.billboard} onChange={handleChange} onBlur={handleBlur} className={errors.billboard && touched.billboard ? "text-input error" : "text-input"}>
                                <option value="" defaultValue disabled label="Selecciona" />
                                <option value={true} label="Si" />
                                <option value={false} label="No" />
                            </select>
                            {errors.billboard && touched.billboard && (<div className="input-feedback">{errors.billboard}</div>)}

                        </div>

                    </div>


                    <div className="loginBtnCont">
                        <button className="loginBtn" type="submit" disabled={!dirty || isSubmitting}>Aceptar</button>
                    </div>
                </form>
            );
        }}
    </Formik>
);


const EditForm = (props) => {

    const item = props.item;
    const schedules = item.schedules.map((x) => x.idSchedule.toString());

    return (


        <Formik initialValues={{ title: item.title , genre: item.gender, format: item.format, duration: item.duration, image: item.image, ticketValue: item.ticketValue, synopsis: item.synopsis, schedule: schedules, billboard: item.billboard }}
            onSubmit={async values => {

                const arraySchedules = values.schedule.map((x) => parseInt(x));

                userService.updateMovie(item.idMovie,values.title, values.genre, values.synopsis, values.format, values.duration, values.image, values.billboard, values.ticketValue, arraySchedules).then(
                    ()=>{
                        Swal.fire({
                            title: 'Pelicula Editada',
                            text: 'Se han guardado los cambios',
                            icon: 'success',
                            background: '#0f0f0f',
                            color: 'white',
                            confirmButtonColor: '#1059ff'
                        }).then((ok) => {
                            if (ok.isConfirmed) {
                                window.location.reload();
                            }
                        })
                    }
                )
                
            }}
            validationSchema={Yup.object().shape({
                title: Yup.string()
                    .required("Titulo es obligatorio"),
                genre: Yup.string()
                    .required("Género es obligatorio"),
                format: Yup.string()
                    .required("Formato es obligatorio"),
                duration: Yup.string()
                    .required("duración es obligatorio"),
                image: Yup.string()
                    .required("Link imagen es obligatorio"),
                ticketValue: Yup.string()
                    .required("precio es obligatorio")
                    .matches(/^[0-9]+$/, "Sólo números"),
                synopsis: Yup.string()
                    .required("Sinopsis es obligatorio"),
                billboard: Yup.string()
                    .required("Cartelera es obligatorio")


            })}
        >
            {props => {

                const { values, touched, errors, dirty, isSubmitting, handleChange, handleBlur, handleSubmit, handleReset } = props;

                return (
                    <form className="movieForm" onSubmit={handleSubmit}>
                        <div className="title-genre">
                            <div className="pair">
                                <label htmlFor="title">Titulo</label>
                                <input id="title" placeholder="ingrese titulo" type="text" value={values.title} onChange={handleChange} onBlur={handleBlur} className={errors.title && touched.title ? "text-input error" : "text-input"} />
                                {errors.title && touched.title && (<div className="input-feedback">{errors.title}</div>)}


                            </div>
                            <div className="pair">
                                <label htmlFor="genre">Género</label>
                                <input id="genre" placeholder="ingrese Género" type="text" value={values.genre} onChange={handleChange} onBlur={handleBlur} className={errors.genre && touched.genre ? "text-input error" : "text-input"} />
                                {errors.genre && touched.genre && (<div className="input-feedback">{errors.genre}</div>)}

                            </div>


                        </div>
                        <div className="format-duration">
                            <div className="pair">
                                <label htmlFor="format">Formato</label>
                                <select id="format" required={true} type="text" value={values.format} onChange={handleChange} onBlur={handleBlur} className={errors.format && touched.format ? "text-input error" : "text-input"}>
                                    <option value="" defaultValue disabled label="Selecciona" />
                                    <option value="2D" label="2D" />
                                    <option value="3D" label="3D" />
                                </select>
                                {errors.format && touched.format && (<div className="input-feedback">{errors.format}</div>)}

                            </div>
                            <div className="pair">
                                <label htmlFor="duration">Duración</label>
                                <input id="duration" placeholder="Ingrese duración" type="text" value={values.duration} onChange={handleChange} onBlur={handleBlur} className={errors.duration && touched.duration ? "text-input error" : "text-input"} />
                                {errors.duration && touched.duration && (<div className="input-feedback">{errors.duration}</div>)}
                            </div>
                        </div>
                        <div className="poster-ticket">
                            <div className="pair">
                                <label htmlFor="image">Póster</label>
                                <input id="image" placeholder="ingrese un Link" type="text" value={values.image} onChange={handleChange} onBlur={handleBlur} className={errors.image && touched.image ? "text-input error" : "text-input"} />
                                {errors.image && touched.image && (<div className="input-feedback">{errors.image}</div>)}
                            </div>
                            <div className="pair">
                                <label htmlFor="ticketValue">Precio Boleta</label>
                                <input id="ticketValue" placeholder="ingrese el precio" type="text" value={values.ticketValue} onChange={handleChange} onBlur={handleBlur} className={errors.ticketValue && touched.ticketValue ? "text-input error" : "text-input"} />
                                {errors.ticketValue && touched.ticketValue && (<div className="input-feedback">{errors.ticketValue}</div>)}
                            </div>
                        </div>



                        <label htmlFor="synopsis">Sinopsis</label>
                        <textarea id="synopsis" placeholder="ingrese texto" type="text" value={values.synopsis} onChange={handleChange} onBlur={handleBlur} className={errors.synopsis && touched.synopsis ? "text-input error" : "text-input"} />
                        {errors.synopsis && touched.synopsis && (<div className="input-feedback">{errors.synopsis}</div>)}

                        <label htmlFor="schedules">Horarios</label>

                        <div className="schedule-check">

                            <div className="schedule-check" role="group" aria-labelledby="checkbox-group">
                                <label><Field type="checkbox" name="schedule" value="1" />12:00 pm</label>
                                <label><Field type="checkbox" name="schedule" value="2" />03:00 pm</label>
                                <label><Field type="checkbox" name="schedule" value="3" />06:00 pm</label>
                                <label><Field type="checkbox" name="schedule" value="4" />09:00 pm</label>
                            </div>
                            <div className="billboardC">
                                <label htmlFor="billboard">En cartelera</label>
                                <select id="billboard" required={true} type="text" value={values.billboard} onChange={handleChange} onBlur={handleBlur} className={errors.billboard && touched.billboard ? "text-input error" : "text-input"}>
                                    <option value="" defaultValue disabled label="Selecciona" />
                                    <option value={true} label="Si" />
                                    <option value={false} label="No" />
                                </select>
                                {errors.billboard && touched.billboard && (<div className="input-feedback">{errors.billboard}</div>)}
                            </div>
                        </div>
                        <div className="loginBtnCont">
                            <button className="loginBtn" type="submit" disabled={!dirty || isSubmitting}>Aceptar</button>
                        </div>
                    </form>
                );
            }}


        </Formik>
    )
};








export default MovieAdmin;