import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/index";
import { emptyCart } from "./helpers";
import { getBraintreeClientToken, proccessPayment, createOrder } from "./index";
import DropIn from "braintree-web-drop-in-react";

const Checkout = ({ products }) => {
  const [data, setData] = useState({
    success: false,
    loading: false,
    clientToken: null,
    error: "",
    instance: {},
    address: "",
  });

  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  const getToken = (userId, token) => {
    getBraintreeClientToken(userId, token).then((data) => {
      if (data.error) {
        setData({ ...data, error: data.error });
      } else {
        setData({ clientToken: data.clientToken });
      }
    });
  };

  useEffect(() => {
    getToken(userId, token);
  }, []);

  const handleAddress = (event) => {
    setData({ ...data, address: event.target.value });
  };

  const getTotal = () => {
    return products.reduce((acc, nextValue) => {
      return parseFloat((acc + nextValue.count * nextValue.price).toFixed(1));
    }, 0);
  };

  const showCheckout = () => {
    return isAuthenticated() ? (
      <div> {showDropIn()}} </div>
    ) : (
      <Link to="/signin">
        <button className="btn btn-primary">Войти</button>
      </Link>
    );
  };

  const google = () => {

    return products.map((product) => {
      window.open(product.download);
    }, 0);
  };

  const byuProducts = () => {
    setData({ loading: true });
    let nonce;
    let getNonce = data.instance
      .requestPaymentMethod()
      .then((data) => {
        nonce = data.nonce;
        const paymentData = {
          paymentMethodNonce: nonce,
          amount: getTotal(products),
        };
        proccessPayment(userId, token, paymentData)
          .then((response) => {
            const orderData = {
              products: products,
              transaction_id: response.transaction.id,
              amount: response.transaction.amount,
            };
            createOrder(userId, token, orderData)
              .then((response) => {
                emptyCart(() => {
                  console.log("payment success and empty cart");
                  setData({ loading: false, success: true });
                });
              })
              .catch((error) => {
                console.log(error);
                setData({ loading: false });
              });
          })
          .catch((error) => {
            console.log(error);
            setData({ loading: false });
          });
      })
      .catch((error) => {
        setData({ ...data, error: error.message });
      });
  };

  const showError = (error) => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showDownload = (success) => (
    <Link to="/">
        <button
      className="alert alert-info"
      onClick = {google.bind(this)}
      style={{ display: success ? "" : "none" }}
    >
      скачать
    </button>
      </Link>
    
  );

  const showSuccess = (success) => (
    <div
      className="alert alert-info"
      style={{ display: success ? "" : "none" }}
    >
      Платеж прошел успешно!
    </div>
  );

  const showLoading = (loading) =>
    loading && <h2 className="text-danger">Загрузка...</h2>;

  const showDropIn = () => (
    <div onBlur={() => setData({ ...data, error: "" })}>
      {data.clientToken !== null && products.length > 0 ? (
        <div>
          <DropIn
            options={{
              authorization: data.clientToken,
            }}
            onInstance={(instance) => (data.instance = instance)}
          />
          <button
            onClick={byuProducts.bind(this)}
            className="btn btn-success btn-block"
          >
            Pay
          </button>
        </div>
      ) : null}
    </div>
  );

  return (
    <div>
      <h2>Итого: {getTotal()} BYN </h2>
      {showLoading(data.loading)}
      {showSuccess(data.success)}
      {showDownload(data.success)}
      {showError(data.error)}
      {showCheckout()}
    </div>
  );
};

export default Checkout;
