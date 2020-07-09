import axios from "axios";
import jwtDecode from "jwt-decode";
import { LOGIN_API } from "../config";

function authenticate(credentials) {
  return axios
    .post(LOGIN_API, credentials)
    .then((response) => response.data.token)
    .then((token) => {
      window.localStorage.setItem("authToken", token);
      setAxiosToken(token);
    });
}

function logout() {
  window.localStorage.removeItem("authToken");
  delete axios.defaults.headers["Authorization"];
}

function setAxiosToken(token) {
  axios.defaults.headers["Authorization"] = "Bearer " + token;
}

function isAuth() {
  //voir si on a un token
  const token = window.localStorage.getItem("authToken");
  //si token encore valide

  if (token) {
    const { exp: expiration } = jwtDecode(token);
    if (expiration * 1000 > new Date().getTime()) {
      return true;
    }
    return false;
  }
  return false;

  //donner le token
}

function setup() {
  //voir si on a un token
  const token = window.localStorage.getItem("authToken");
  //si token encore valide

  const jwtData =
    token &&
    jwtDecode(token).exp * 1000 > new Date().getTime() &&
    setAxiosToken(token);

  //donner le token
}

export default {
  authenticate,
  logout,
  setup,
  isAuth
};
