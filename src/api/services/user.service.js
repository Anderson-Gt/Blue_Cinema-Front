import axiosClient from "../axiosClient";
import authHeader from "./auth-header";
import jwtDecode from "jwt-decode";

const userService = {
    getEmailCurrentUser: () =>{
        return jwtDecode(JSON.parse(localStorage.getItem("user")).token).sub;
        
    },
    getRolesCurrentUser: () =>{
        return jwtDecode(JSON.parse(localStorage.getItem("user")).token).roles;
    },
    getMoviesList: () => {
        const url = 'movies/all' ;
        return axiosClient.get(url,{headers: authHeader()});
    },

    getMoviesOnBillboard: () => {
        const url = 'movies/billboard' ;
        return axiosClient.get(url,{headers: authHeader()});
    },

    getMovieDetail: (id) => {
        const url = 'movies/'+id;
        return axiosClient.get(url, {headers: authHeader()});
    },
    getUserName: () => {
        const url = 'reserves/name';
        return axiosClient.get(url,{headers: authHeader(), params: {email: userService.getEmailCurrentUser()}});
    },
    getUserReserves: () => {
        const url = 'reserves/usermail';
        return axiosClient.get(url,{headers: authHeader(), params: {email: userService.getEmailCurrentUser()}});
    },
    getReservedChairs: (idSchedule, idMovie) => {
        const url = 'reserves/chairs'
        return axiosClient.get(url, {headers: authHeader(), params: {idSchedule: idSchedule, idMovie: idMovie}});
    } ,
    getSchedule: (idSchedule) => {
        const url = 'reserves/schedule';
        return axiosClient.get(url, {headers: authHeader(), params: {idSchedule: idSchedule}});
    },
    
    deleteReserve: (idReserve) => {
        const url = 'reserves/delete/'+idReserve;
        return axiosClient.delete(url, {headers: authHeader()});
    }
}

export default userService;