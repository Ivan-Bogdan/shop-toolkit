import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth/index";
import { listOrder, getStatusValues } from "./index";
import moment from "moment";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [statusValues, setStatus] = useState([]);
  const arr = orders.reverse();

  const { user, token } = isAuthenticated();

  const loadOrders = () => {
    listOrder(user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setOrders(data);
      }
    });
  };

  const loadStatusValues = () => {
    getStatusValues(user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setStatus(data);
      }
    });
  };

  useEffect(() => {
    loadOrders();
    loadStatusValues();
  }, []);

  const showOrdersLength = () => {
    if (orders.length > 0) {
      return (
        <h1 className="text-danger display-2">
          Количество заказов: {orders.length}
          <br></br>
          Сумма заказов:{" "}
          {parseInt(
            orders.reduce((a, b) => ({ amount: a.amount + b.amount })).amount
          ) + " BYN"}
        </h1>
      );
    } else {
      return <h1 className="text-danger"> Нет заказов</h1>;
    }
  };

  const handleStatusChange = (event, orderId) => {
    console.log("update order status");
  };

  const showInput = (key, value) => (
    <div className="input-group mb-2 mr-sm-2">
      <div className="input-group-prepend">
        <div className="input-group-text">{key}</div>
      </div>
      <input type="text" value={value} className="form-control" readOnly />
    </div>
  );

  const showStatus = (order) => (
    <div className="form-group">
      <h3 className="mark mb-4">Статус: {order.status}</h3>
    </div>
  );

  return (
    <Layout title="Заказы" description>
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {showOrdersLength()}
          {arr.map((order, index) => {
            return (
              <div className="mt-5" key={index}>
                <ul className="list-group mb-2">
                  <li className="list-group-item">
                    <span className="bg-primary"> Заказ ID {order._id}</span>
                  </li>
                  <li className="list-group-item">
                    {showStatus(order)}
                  </li>
                  <li className="list-group-item">
                    Транзкция ID: {order.transaction_id}
                  </li>
                  <li className="list-group-item">
                    Стоимость: {order.amount} BYN
                  </li>
                  <li className="list-group-item">
                    Выполнил: {order.user.name}
                  </li>
                  <li className="list-group-item">
                    Оплачен: {moment(order.createdAt).fromNow()}
                  </li>
                </ul>
                <h3 className="mt-4 mb-4 font-italic">
                  Количество продуктов в заказе: {order.products.length}
                </h3>

                {order.products.map((product, index) => (
                  <div
                    className="mb-4"
                    key={index}
                    style={{
                      padding: "20px",
                      border: "1px solid indigo",
                    }}
                  >
                    {showInput("Название", product.name)}
                    {showInput("Цена", product.price)}
                    {showInput("Количество", product.count)}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
