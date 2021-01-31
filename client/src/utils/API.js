import axios from "axios";

export default {

    createUser: (username, email, password) => {
        return axios.post("/api/users", {
            username, email, password
        })
    }
}