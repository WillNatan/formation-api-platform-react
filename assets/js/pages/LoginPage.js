import React, { useState, useContext } from "react";
import AuthApi from "../services/AuthApi";
import AuthContext from "../contexts/AuthContext";
import Field from "../components/forms/Field";

const LoginPage = ({ history }) => {
  const { setIsAuth } = useContext(AuthContext);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = ({ currentTarget }) => {
    const { value, name } = currentTarget;

    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await AuthApi.authenticate(credentials);
      setErrorMessage("");
      setIsAuth(true);
      history.replace("/customers");
    } catch (error) {
      setErrorMessage(
        "Aucun compte ne possède cette adresse email ou alors les informations ne correspondent pas"
      );
    }
  };

  return (
    <>
      <h1>Connexion à l'application</h1>
      <form onSubmit={handleSubmit}>
        <Field
          label="Adresse Email"
          name="username"
          value={credentials.username}
          type="email"
          onChange={handleChange}
          placeholder="Adresse email de connexion"
          errorMessage={errorMessage}
        />
        <Field
          label="Mot de passe"
          name="password"
          value={credentials.password}
          type="password"
          onChange={handleChange}
          placeholder="Mot de passe"
          errorMessage=""
        />
        <div className="form-group">
          <button type="submit" className="btn btn-success">
            Je me connecte
          </button>
        </div>
      </form>
    </>
  );
};

export default LoginPage;
