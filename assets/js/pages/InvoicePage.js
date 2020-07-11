import React, { useState, useEffect } from "react";
import Field from "../components/forms/Field";
import Select from "../components/forms/Select";
import { Link } from "react-router-dom";
import CustomersApi from "../services/CustomersApi";
import InvoicesApi from "../services/InvoicesApi";
import { toast } from "react-toastify";
import FormContentLoader from "../components/loaders/FormContentLoader";

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
  const [loading, setLoading] = useState(true);
  const [customers, setCustomers] = useState([]);
  const [editing, setEditing] = useState(false);
  const fetchCustomers = async () => {
    try {
      const data = await CustomersApi.findAll();
      setCustomers(data);
      setLoading(false);
      if (!invoice.customer) setInvoice({ ...invoice, customer: data[0].id });
    } catch (error) {
      history.replace("/invoices");
      //Flash erreur
      toast.error("Une erreur est survenue lors du chargement");
    }
  };

  const fetchInvoice = async (id) => {
    try {
      const { amount, status, customer } = await InvoicesApi.find(id);
      setInvoice({ amount, status, customer: customer.id });
      setLoading(false);
    } catch (error) {
      toast.error("Une erreur est survenue lors du chargement");
      //Flash notification erreur
      history.replace("/invoices");
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
        const response = await InvoicesApi.update(id, invoice);
        toast.success("La facture a bien été modifiée");
      } else {
        const data = await InvoicesApi.create(invoice);
        toast.success("La facture a bien été créée");
        history.replace("/invoices");
      }
    } catch ({ response }) {
      const { violations } = response.data;
      if (violations) {
        const apiErrors = {};
        violations.map(
          ({ propertyPath, message }) => (apiErrors[propertyPath] = message)
        );
        setErrors(apiErrors);

        toast.error("Une erreur est survenue, vérifiez le formulaire !");
      }
    }
  };
  return (
    <>
      {(editing && <h1>Modification d'une facture</h1>) || (
        <h1>Creation d'une facture</h1>
      )}
      {loading && <FormContentLoader />}
      {!loading && <form onSubmit={handleSubmit}>
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
          <div className="row">
            <div className="col-12 col-md-6 text-center">
            <button type="submit" className="btn btn-success w-100">
            Enregistrer
          </button>
            </div>
            <div className="col-12 col-md-6 text-center">
            <Link to="/invoices" className="btn btn-link w-100">
            Retour à la liste des factures
          </Link>
            </div>
          </div>
        </div>
      </form>
}
    </>
  );
};

export default InvoicePage;
