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
    getUserReserves: () => {
        const url = 'reserves/usermail';
        return axiosClient.get(url,{headers: authHeader(), params: {email: userService.getEmailCurrentUser()}});
    },
    getReservedChairs: () => {
        const url = 'reserves/chairs'
        return axiosClient.get(url, {headers: authHeader()});
    }  
}

export default userService;