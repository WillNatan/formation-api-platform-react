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
      setLoading(false)
    } catch (error) {
      console.log(error.response);
      toast.error("Une erreur est survenue lors du chargement des factures !")
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
      toast.success("La facture a bien été suprimée !")
    } catch (error) {
      setInvoices(originalInvoices);
      toast.error("Une erreur est survenue !")
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
  const formatDate = (str) => moment(str).format("DD/MM/YYYY");

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
      <table className="table table-hover">
        <thead>
          <tr>
            <th>N°</th>
            <th>Client</th>
            <th className="text-center">Date</th>
            <th className="text-center">Montant</th>
            <th className="text-center">Statut</th>
            <th></th>
          </tr>
        </thead>
        {!loading &&
        <tbody>
          {paginatedInvoices.map((invoice) => (
            <tr key={invoice.id}>
              <td>{invoice.chrono}</td>
              <td>
                <Link to={"/customers/"+invoice.customer.id}>{invoice.customer.firstname} {invoice.customer.lastname}</Link>
              </td>
              <td className="text-center">{formatDate(invoice.sentAt)}</td>
              <td className="text-center">
                {invoice.amount.toLocaleString()} €
              </td>
              <td className="text-center">
                <span
                  className={"badge badge-" + STATUS_CLASSES[invoice.status]}
                >
                  {STATUS_LABELS[invoice.status]}
                </span>
              </td>
              <td>
                <Link to={"/invoices/"+invoice.id} className="btn btn-sm w-100 btn-primary"><i className="fa fa-edit"></i></Link>
                <button
                  className="btn btn-sm btn-danger w-100 mt-1"
                  onClick={() => handleDelete(invoice.id)}
                >
                  <i className="fa fa-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
}
      </table>
      {loading && <TableLoader/>}
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
