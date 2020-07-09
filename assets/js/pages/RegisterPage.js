import React, { useState } from "react";
import Field from "../components/forms/Field";
import { Link } from "react-router-dom";
import UserApi from "../services/UserApi";
import { toast } from "react-toastify";

const RegisterPage = ({ history }) => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const apiErrors = {};
    if (user.password !== user.passwordConfirm) {
      apiErrors.passwordConfirm =
        "Votre confirmation de mot de passe n'est pas conforme avec le mot de passe original";
      setErrors(apiErrors);
      toast.error("Une erreur est survenue ! Vérifiez le formulaire !");
      return;
    }

    try {
      const response = await UserApi.create();
      setErrors({});
      //FLash succès
      toast.success(
        "Vous êtes désormais inscrit, vous pouvez vous connecter !"
      );
      history.replace("/login");
    } catch (error) {
      const { violations } = error.response.data;
      if (violations) {
        violations.map((violation) => {
          apiErrors[violation.propertyPath] = violation.message;
        });
        setErrors(apiErrors);
        toast.error("Une erreur est survenue ! Vérifiez le formulaire !");
      }

      //flash erreur
      toast.error("Une erreur est survenue ! Vérifiez le formulaire !");
    }
  };
  return (
    <>
      <h1>Page d'inscription</h1>
      <form onSubmit={handleSubmit}>
        <Field
          name="firstName"
          label="Prénom"
          placeholder="Votre prénom"
          errorMessage={errors.firstName}
          value={user.firstName}
          onChange={handleChange}
        />
        <Field
          name="lastName"
          label="Nom de famille"
          placeholder="Votre nom de famille"
          errorMessage={errors.lastName}
          value={user.lastName}
          onChange={handleChange}
        />
        <Field
          name="email"
          label="Email"
          placeholder="Votre email"
          errorMessage={errors.email}
          value={user.email}
          onChange={handleChange}
        />
        <Field
          name="password"
          type="password"
          label="Mot de passe"
          placeholder="Votre mot de passe ultra sécurisé"
          errorMessage={errors.password}
          value={user.password}
          onChange={handleChange}
        />
        <Field
          name="passwordConfirm"
          type="password"
          label="Confirmation de mot de passe"
          placeholder="Confirmer votre mot de passe"
          errorMessage={errors.passwordConfirm}
          value={user.passwordConfirm}
          onChange={handleChange}
        />

        <div className="form-group">
          <button className="btn btn-success" type="submit">
            Confirmation
          </button>
          <Link to="/login" className="btn btn-link">
            J'ai déjà un compte
          </Link>
        </div>
      </form>
    </>
  );
};

export default RegisterPage;
