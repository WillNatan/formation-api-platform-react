import React, { useEffect, useState } from "react";
import Pagination from "../components/Pagination";
import Axios from "axios";
import moment from 'moment';
import InvoicesApi from "../services/InvoicesApi";


const STATUS_CLASSES = {
    PAID: "success",
    SENT: "primary",
    CANCELLED: "danger"
}

const STATUS_LABELS = {
    PAID: "payée",
    SENT: "envoyée",
    CANCELLED: "Annulée"
}

const InvoicesPage = (props) => {
    const [invoices, setInvoices] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");

    const fetchInvoices = async () => {
        try{
            const data = await InvoicesApi.findAll()

        setInvoices(data);
        } catch(error) {
            console.log(error.response)
        }
        
    }

    useEffect(()=> {
        fetchInvoices();
    }, [])


    const handlePageChange = (page) => {
      setCurrentPage(page);
    };
  
    const handleSearch = ({currentTarget}) => {
      setSearch(currentTarget.value);
      setCurrentPage(1);
    };

    const handleDelete = async id => {
      const originalInvoices = [...invoices];

      setInvoices(invoices.filter((invoice) => invoice.id !== id));

      try {
        await InvoicesApi.delete(id)
       } catch(error) {
         setInvoices(originalInvoices);
       }
    }
  
    const itemsPerPage = 5;

    const filteredInvoices =
    invoices.filter(i =>
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
    const formatDate = (str) => moment(str).format('DD/MM/YYYY');

  return (
    <>
      <h1>Liste des factures</h1>
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
            <th>Numéro de facture</th>
            <th>Client</th>
            <th className="text-center">Date d'envoi de la facture</th>
            <th className="text-center">Statut</th>
            <th className="text-center">Montant</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {paginatedInvoices.map(invoice=> 
            <tr key={invoice.id}>
            <td>{invoice.chrono}</td>
          <td>{invoice.customer.firstname} {invoice.customer.lastname}</td>
          <td className="text-center">{formatDate(invoice.sentAt)}</td>
            <td className="text-center">{invoice.amount.toLocaleString()} €</td>
            <td className="text-center">
          <span className={"badge badge-" +STATUS_CLASSES[invoice.status]}>{STATUS_LABELS[invoice.status]}</span>
            </td>
            <td>
              <button className="btn btn-sm btn-primary mr-1">Editer</button>
              <button className="btn btn-sm btn-danger" onClick={() => handleDelete(invoice.id)}>Supprimer</button>
            </td>
          </tr>
            )}
        </tbody>
      </table>
      <Pagination
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          length={filteredInvoices.length}
          onPageChanged={handlePageChange}
        />
    </>
  );
};

export default InvoicesPage;
