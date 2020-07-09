import axios from 'axios';

function findAll()
{
    return axios
    .get("http://127.0.0.1:8000/api/clients")
    .then((response) => response.data["hydra:member"])
}

function deleteCustomer(id)
{
    axios
      .delete("http://127.0.0.1:8000/api/clients/" + id)
}


function find(id) {
    return axios.get(
        "http://localhost:8000/api/clients/" + id
      ).then((response) => response.data);
}

function update(id, customer){
    return axios.put(
        "http://localhost:8000/api/clients/" + id,
        customer
      );
}

function create(customer) {
    return axios.post(
        "http://localhost:8000/api/clients",
        customer
      );
}

export default {
    findAll,
    find,
    update,
    create,
    delete: deleteCustomer
}