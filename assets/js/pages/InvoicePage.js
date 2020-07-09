import React, { useState, useEffect } from "react";
import Field from "../components/forms/Field";
import Select from "../components/forms/Select";
import { Link } from "react-router-dom";
import CustomersApi from "../services/CustomersApi";
import InvoicesApi from "../services/InvoicesApi";

const InvoicePage = ({ history, match }) => {
  const { id = "new" } = match.params;
  const [invoice, setInvoice] = useState({
    amount: "",
    customer: "",
    status: "SENT",
  });

  const [errors, setErrors] = useState({
    amount: "",
    customer: "",
    status: "",
  });

  const [customers, setCustomers] = useState([]);
  const [editing, setEditing] = useState(false);
  const fetchCustomers = async () => {
    try {
      const data = await CustomersApi.findAll();
      setCustomers(data);
      if (!invoice.customer) setInvoice({ ...invoice, customer: data[0].id });
    } catch (error) {
      console.log(error.response);
      history.replace("/invoices")
      //Flash erreur
    }
  };

  const fetchInvoice = async (id) => {
    try {
      const { amount, status, customer } = await InvoicesApi.find(id)
      setInvoice({ amount, status, customer: customer.id });
    } catch (error) {
      console.log(error.response);
      //Flash notification erreur
      history.replace("/invoices")
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  useEffect(() => {
    if (id !== "new") {
      setEditing(true);
      fetchInvoice(id);
    }
  }, [id]);

  const handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    setInvoice({ ...invoice, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (editing) {
        const response = await InvoicesApi.update(id, invoice)

        // Flash edit success
      } else {
        const data = await InvoicesApi.create(inv)
        history.replace("/invoices");
      }
    } catch ({ response }) {
      console.log(response);
      const { violations } = response.data;
      if (violations) {
        const apiErrors = {};
        violations.map(
          ({ propertyPath, message }) => (apiErrors[propertyPath] = message)
        );
        setErrors(apiErrors);

        //Notif erreurs
      }
    }
  };
  return (
    <>
      {(editing && <h1>Modification d'une facture</h1>) || (
        <h1>Creation d'une facture</h1>
      )}
      <form onSubmit={handleSubmit}>
        <Field
          name="amount"
          type="number"
          placeholder="Montant de la facture"
          label="Montant"
          onChange={handleChange}
          value={invoice.amount}
          errorMessage={errors.amount}
        ></Field>
        <Select
          name="customer"
          value={invoice.customer}
          errorMessage={errors.customer}
          label="Client"
          onChange={handleChange}
        >
          {customers.map((customer) => (
            <option value={customer.id} key={customer.id}>
              {customer.firstname} {customer.lastname}
            </option>
          ))}
        </Select>
        <Select
          name="status"
          label="Statut"
          value={invoice.status}
          errorMessage={errors.status}
          onChange={handleChange}
        >
          <option value="SENT">Envoyée</option>
          <option value="PAID">Payée</option>
          <option value="CANCELLED">Annulée</option>
        </Select>

        <div className="form-group">
          <button type="submit" className="btn btn-success">
            Enregistrer
          </button>
          <Link to="/invoices" className="btn btn-link">
            Retour à la liste des factures
          </Link>
        </div>
      </form>
    </>
  );
};

export default InvoicePage;
