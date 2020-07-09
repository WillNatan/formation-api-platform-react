import { USERS_API } from "../config";

import Axios from "axios";

function create(user){
    return Axios.post(
        USERS_API,
        user
      );
}

export default {
    create
}