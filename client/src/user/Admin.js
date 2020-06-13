import React from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth/index";
import { Link } from "react-router-dom";

const Admin = () => {
  const {
    user: { name, email, role },
  } = isAuthenticated();

  const adminLinks = () => {
    return (
      <div className="card">
        <h4 className="card-header">Admin</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link className="nav-link" to="/create/category">
              Добавить категорию
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link" to="/create/product">
              Добавить методичку
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link" to="/products/list">
              Редактировать пособия
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link" to="/admin/orders">
              Список заказов
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const adminInfo = () => {
    return (
      <div className="card mb-5">
        <h3 className="card-header">Информация</h3>
        <ul className="list-group">
          <li className="list-group-item">{name}</li>
          <li className="list-group-item">{email}</li>
          <li className="list-group-item">
            {role === 1 ? "Admin" : "Registered User"}
          </li>
        </ul>
      </div>
    );
  };

  return (
    <Layout title="Админ-панель" description className="container-fluid">
      <div className="row">
        <div className="col-3">{adminLinks()}</div>
        <div className="col-9"> {adminInfo()} </div>
      </div>
    </Layout>
  );
};

export default Admin;
