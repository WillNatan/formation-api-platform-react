import React, { useState, useContext } from "react";
import ReactDOM from "react-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import {
  HashRouter,
  Switch,
  Route,
  withRouter,
  Redirect,
} from "react-router-dom";
import CustomersPage from "./pages/CustomersPage";
import CustomersPageWithPagination from "./pages/CustomersPageWithPagination";
import InvoicesPage from "./pages/InvoicesPage";
import LoginPage from "./pages/LoginPage";
import AuthApi from "./services/AuthApi";
import AuthContext from "./contexts/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import CustomerPage from "./pages/CustomerPage";
import InvoicePage from "./pages/InvoicePage";
import RegisterPage from "./pages/RegisterPage";

require("../css/app.css");

AuthApi.setup();

const NavbarWithRouter = withRouter(Navbar);

const App = () => {
  const [isAuth, setIsAuth] = useState(AuthApi.isAuth());

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        setIsAuth,
      }}
    >
      <HashRouter>
        <NavbarWithRouter />
        <main className="container pt-5">
          <Switch>
            <PrivateRoute path="/customers/:id" component={CustomerPage} />
            <Route path="/register" component={RegisterPage} />
            <PrivateRoute path="/invoices/:id" component={InvoicePage} />
            <PrivateRoute path="/customers" component={CustomersPage} />
            <Route path="/login" component={LoginPage} />
            <PrivateRoute path="/invoices" component={InvoicesPage} />
            <Route path="/" component={HomePage} />
          </Switch>
        </main>
      </HashRouter>
    </AuthContext.Provider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
