import React, { useState, useContext } from "react";
import AuthApi from "../services/AuthApi";
import AuthContext from "../contexts/AuthContext";

const LoginPage = ({ history }) => {

  const {setIsAuth} = useContext(AuthContext);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = ({currentTarget}) => {
      const {value, name} = currentTarget;

    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  

  const handleSubmit = async event => {
      event.preventDefault();
      
      try {
        await AuthApi.authenticate(credentials);
        setErrorMessage("");
        setIsAuth(true);
        history.replace("/customers");
      } catch(error) {
          setErrorMessage("Aucun compte ne possède cette adresse email ou alors les informations ne correspondent pas")
      }
      
  }



  return (
    <>
      <h1>Connexion à l'application</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="_username">Adresse Email</label>
          <input
            type="email"
            className={"form-control"+ (errorMessage && " is-invalid")}
            value={credentials.username}
            onChange={handleChange}
            placeholder="Adresse email de connexion"
            name="username"
            id="_username"
          />
          <label htmlFor="_password">Mot de passe</label>
          <input
            type="password"
            className="form-control"
            onChange={handleChange}
            value={credentials.password}
            placeholder="Mot de passe"
            name="password"
            id="_password"
          />
          {errorMessage && <p className="invalid-feedback">{errorMessage}</p>}
        </div>
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
