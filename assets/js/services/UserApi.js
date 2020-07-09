import { USERS_API } from "../config";

const { default: Axios } = require("axios");

function create(user){
    return Axios.post(
        USERS_API,
        user
      );
}

export default {
    create
}