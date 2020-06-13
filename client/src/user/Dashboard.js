import React from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth/index";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const {
    user: { _id, name, email, role, history },
  } = isAuthenticated();

  const userLinks = () => {
    return (
      <div className="card">
        <h4 className="card-header"></h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link className="nav-link" to="/cart">
              Корзина
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const userInfo = () => {
    return (
      <div className="card mb-5">
        <h3 className="card-header">Информация о пользователе</h3>
        <ul className="list-group">
          <li className="list-group-item">{name}</li>
          <li className="list-group-item">{email}</li>
          <li className="list-group-item">
            {role === 1 ? "Администратор" : "Зарегистрированый пользователь"}
          </li>
        </ul>
      </div>
    );
  };

  const showInput = (key, value) => (
    <div className="input-group mb-2 mr-sm-2">
      <div className="input-group-prepend">
        <div className="input-group-text">{key}</div>
      </div>
      <input type="text" value={value} className="form-control" readOnly />
    </div>
  );

  const purchaseHistory = () => {
    return (
      <div className="card mb-5">
        <h3 className="card-header">История покупок</h3>
        <ul className="list-group">
          <li className="list-group-item">
            {history.map((product, index) => (
              <div
                className="mb-4"
                key={index}
                style={{
                  padding: "20px",
                  border: "1px solid indigo",
                }}
              >
                {showInput("Название", product.name)}
                {showInput("Цена", product.amount + " BYN")}
              </div>
            ))}{" "}
          </li>
          {console.log(
            history.map((order) => {
              console.log(order);
            }),
            history
          )}
        </ul>
      </div>
    );
  };

  return (
    <Layout
      title="Кабинет пользователя"
      description={`Добрый день, ${name}!`}
      className="container-fluid"
    >
      <div className="row">
        <div className="col-3">{userLinks()}</div>
        <div className="col-9">
          {userInfo()}
          {purchaseHistory()}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
