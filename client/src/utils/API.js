import axios from "axios";

export default {

    createUser: (username, email, password) => {
        return axios.post("/api/users", {
            username, email, password
        })
    },

    checkUser: (username, password) => {
        return axios.post("/api/auth", {username, password}) 
    },
}