import React, { useEffect, useState } from "react";
import Pagination from "../components/Pagination";
import CustomersAPI from "../services/CustomersApi";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import TableLoader from "../components/loaders/TableLoader";

const CustomersPage = (props) => {
  const [customers, setCustomers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchCustomers = async () => {
    try {
      const data = await CustomersAPI.findAll();
      setCustomers(data);
      setLoading(false)
    } catch (error) {
      console.log(error.response);
      toast.error("Une erreur est survenue lors du chargement des clients")
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleDelete = async (id) => {
    const originalCustomers = [...customers];
    //Optimiste

    setCustomers(customers.filter((customer) => customer.id !== id));

    //Pessimiste
    try {
      await CustomersAPI.delete(id);
      toast.success("Le client a bien été supprimé !")
    } catch (error) {
      setCustomers(originalCustomers);
      toast.success("Une erreur est survenue lors de la suppression du client")
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = ({ currentTarget }) => {
    setSearch(currentTarget.value);
    setCurrentPage(1);
  };

  const itemsPerPage = 5;

  const filteredCustomers = customers.filter(
    (c) =>
      c.firstname.toLowerCase().includes(search.toLowerCase()) ||
      c.lastname.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.company.toLowerCase().includes(search.toLowerCase())
  );

  const paginatedCustomers = Pagination.getData(
    filteredCustomers,
    currentPage,
    itemsPerPage
  );

  return (
    <>
      <div className="mb-2 d-flex justify-content-between align-items-center">
        <h1>Liste des Clients</h1>
        <Link className="btn btn-primary" to="/customers/new">
          Créer un client
        </Link>
      </div>

      <div className="form-group">
        <input
          type="text"
          onChange={handleSearch}
          className="form-control"
          placeholder="Rechercher"
        />
      </div>


      <div className="row infos no-gutters">
          <div className="col">
            <p>Client</p>
          </div>
          <div className="col d-none d-md-block">
            <p className="th">Email</p>
          </div>
          <div className="col text-center">
            <p className="th">Entreprise</p>
          </div>
          <div className="col text-center d-none d-md-block">
            <p className="th">Factures</p>
          </div>
          <div className="col ">
            <p className="th">Montant total</p>
          </div>
          <div className="col ">
            <p className="th"></p>
          </div>
        </div>
        {!loading && paginatedCustomers.map((customer) => (
        <div className="row infos no-gutters mt-3" key={customer.id}>
              <div className="col">
              <Link to={"/customers/" + customer.id}>
                  {customer.firstname} {customer.lastname}
                </Link>
              </div>
              <div className="col d-none d-md-block">
                <span>{customer.email}</span>
              </div>
              <div className="col text-center ">
                <span>{customer.company}</span>
              </div>
              <div className="col text-center d-none d-md-block">
                <span>{customer.invoices.length}</span>
              </div>
              <div className="col">
                <span>{customer.totalAmount.toLocaleString()} €</span>
              </div>
              <div className="col d-flex justify-content-center flex-column">
              <Link
                  to={"/customers/" + customer.id}
                  className="btn w-100 btn-sm btn-primary"
                >
                  <i className="fa fa-edit"></i>
                </Link>
                <button
                  onClick={() => handleDelete(customer.id)}
                  disabled={customer.invoices.length > 0}
                  className="btn btn-sm btn-danger mt-1 w-100"
                >
                  <i className="fa fa-trash"></i>
                </button>
              </div>
            
            </div>
        )
        )
}
      {loading && <TableLoader/>}
      {itemsPerPage < filteredCustomers.length && (
        <Pagination
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          length={filteredCustomers.length}
          onPageChanged={handlePageChange}
        />
      )}
    </>
  );
};

export default CustomersPage;
