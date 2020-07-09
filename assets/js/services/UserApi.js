const { default: Axios } = require("axios");

function create(user){
    return Axios.post(
        "http://localhost:8000/api/users",
        user
      );
}

export default {
    create
}