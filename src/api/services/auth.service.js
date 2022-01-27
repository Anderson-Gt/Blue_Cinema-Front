import axios from "axios";
//import apiConfig from "../apiConfig";
const url = "http://localhost:8080/api/users/"

const authService = {

    login: (email, password) => {
        return axios.post(url + "login", {
            email,
            password
        })
        .then((response) =>{
            if(response.data.token){
                localStorage.setItem("user", JSON.stringify(response.data));
            }
            return response.data;
        });
    },

    logout: () => {
        localStorage.removeItem("user");
    },

    getCurrentUser: () => {
        return JSON.parse(localStorage.getItem("user"));
    }    
}

export default authService;

