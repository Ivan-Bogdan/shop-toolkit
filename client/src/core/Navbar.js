import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth/index";
import { itemTotal } from "./helpers";

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "rgb(236, 165, 165)" };
  } else {
    return { color: "#fff" };
  }
};

const Navbar = ({ history }) => (
  <div>
    <ul className="nav nav-tabs navbar-color">
      <li className="nav-item">
        <Link className="nav-link" style={isActive(history, "/")} to="/">
          {" "}
          Главная
        </Link>
      </li>
      <li className="nav-item">
        <Link
          className="nav-link"
          style={isActive(history, "/shop")}
          to="/shop"
        >
          {" "}
          Магазин
        </Link>
      </li>
      <li className="nav-item">
        <Link
          className="nav-link"
          style={isActive(history, "/cart")}
          to="/cart"
        >
          Корзина{" "}
          <sup>
            <small className="cart-badge">{itemTotal()}</small>
          </sup>
        </Link>
      </li>
      <li className="nav-item">
        <Link
          className="nav-link"
          style={isActive(history, "/reference")}
          to="/reference"
        >
          {" "}
          Справка
        </Link>
      </li>

      {isAuthenticated() && isAuthenticated().user.role === 0 && (
        <>
          <li className="nav-item">
            <Link
              className="nav-link"
              style={isActive(history, "/user/dashboard")}
              to="/user/dashboard"
            >
              Кабинет
            </Link>
          </li>
        </>
      )}

      {isAuthenticated() && isAuthenticated().user.role === 1 && (
        <li className="nav-item">
          <Link
            className="nav-link"
            style={isActive(history, "/admin/dashboard")}
            to="/admin/dashboard"
          >
            Admin
          </Link>
        </li>
      )}

      {!isAuthenticated() && (
        <div className="navbar-right">
          <li className="nav-item">
            <Link
              className="nav-link"
              style={isActive(history, "/signin")}
              to="/signin"
            >
              {" "}
              Войти
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              style={isActive(history, "/signup")}
              to="/signup"
            >
              {" "}
              Регистрация
            </Link>
          </li>
        </div>
      )}

      {isAuthenticated() && (
        <li className=" navbar-right">
          <span
            className="nav-link"
            style={{ cursor: "pointer", color: "#fff" }}
            onClick={() =>
              signout(() => {
                history.push("/");
              })
            }
          >
            {" "}
            Выйти
          </span>
        </li>
      )}
    </ul>
  </div>
);

export default withRouter(Navbar);
