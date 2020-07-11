import React, { useEffect, useState } from "react";
import Pagination from "../components/Pagination";
import Axios from "axios";
import moment from "moment";
import InvoicesApi from "../services/InvoicesApi";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import TableLoader from "../components/loaders/TableLoader";

const STATUS_CLASSES = {
  PAID: "success",
  SENT: "primary",
  CANCELLED: "danger",
};

const STATUS_LABELS = {
  PAID: "payée",
  SENT: "envoyée",
  CANCELLED: "Annulée",
};

const InvoicesPage = (props) => {
  const [invoices, setInvoices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchInvoices = async () => {
    try {
      const data = await InvoicesApi.findAll();

      setInvoices(data);
      setLoading(false);
    } catch (error) {
      console.log(error.response);
      toast.error("Une erreur est survenue lors du chargement des factures !");
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = ({ currentTarget }) => {
    setSearch(currentTarget.value);
    setCurrentPage(1);
  };

  const handleDelete = async (id) => {
    const originalInvoices = [...invoices];

    setInvoices(invoices.filter((invoice) => invoice.id !== id));

    try {
      await InvoicesApi.delete(id);
      toast.success("La facture a bien été suprimée !");
    } catch (error) {
      setInvoices(originalInvoices);
      toast.error("Une erreur est survenue !");
    }
  };

  const itemsPerPage = 5;

  const filteredInvoices = invoices.filter(
    (i) =>
      i.customer.firstname.toLowerCase().includes(search.toLowerCase()) ||
      i.customer.lastname.toLowerCase().includes(search.toLowerCase()) ||
      i.amount.toString().toLowerCase().startsWith(search.toLowerCase()) ||
      STATUS_LABELS[i.status].toLowerCase().includes(search.toLowerCase())
  );

  const paginatedInvoices = Pagination.getData(
    filteredInvoices,
    currentPage,
    itemsPerPage
  );
  const formatDate = (str) => moment(str).format("DD-MM-YYYY");

  return (
    <>
      <>
        <div className="mb-2 d-flex justify-content-between align-items-center">
          <h1>Liste des factures</h1>
          <Link className="btn btn-primary" to="/invoices/new">
            Créer une facture
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
            <p>N°</p>
          </div>
          <div className="col">
            <p className="th">Client</p>
          </div>
          <div className="col text-center">
            <p className="th">Date</p>
          </div>
          <div className="col text-center">
            <p className="th">Montant</p>
          </div>
          <div className="col text-center">
            <p className="th">Statut</p>
          </div>
          <div className="col ">
            <p className="th"></p>
          </div>
        </div>
        {!loading &&
          paginatedInvoices.map((invoice) => (
            <div className="row infos no-gutters mt-3" key={invoice.id}>
              <div className="col">
                <span>{invoice.chrono}</span>
              </div>
              <div className="col">
                <span>
                  {invoice.customer.firstname} {invoice.customer.lastname}
                </span>
              </div>
              <div className="col text-center">
                <span>{formatDate(invoice.sentAt)}</span>
              </div>
              <div className="col text-center">
                <span>{invoice.amount.toLocaleString()} €</span>
              </div>
              <div className="col d-flex align-items-center justify-content-center">
                <span
                  className={"badge badge-" + STATUS_CLASSES[invoice.status]}
                >
                  {STATUS_LABELS[invoice.status]}
                </span>
              </div>
              <div className="col d-flex align-items-center flex-column">
                <Link
                  to={"/invoices/" + invoice.id}
                  className="btn btn-sm w-100 btn-primary"
                >
                  <i className="fa fa-edit"></i>
                </Link>
                <button
                  className="btn btn-sm btn-danger w-100 mt-1"
                  onClick={() => handleDelete(invoice.id)}
                >
                  <i className="fa fa-trash"></i>
                </button>
              </div>
            </div>
          ))}
        {loading && <TableLoader />}
        <Pagination
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          length={filteredInvoices.length}
          onPageChanged={handlePageChange}
        />
      </>
    </>
  );
};

export default InvoicesPage;
