import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import ShowImage from "./Image";
import "../style.css";

import { isAuthenticated } from "../../src/auth/index";

import { addItems, updateItem, removeItem, deleteProduct } from "./helpers";
import moment from "moment";
import "moment/locale/ru";
moment.locale("ru");

const Card = ({
  product,
  showViewProductButton = true,
  showAddToCartButton = true,
  cartUpdate = false,
  showRemoveProductButton = false,
  setRun = (f) => f,
  run = undefined,
}) => {
  const [redirect, setRedirect] = useState(false);
  const { user, token } = isAuthenticated();
  const [setCount] = useState(product.count);

  const showViewButton = (showViewProductButton) => {
    return (
      showViewProductButton && (
        <Link to={`/product/${product._id}`}>
          <button className="btn btn-outline-primary mt-2 mb-2">
            Посмотреть
          </button>
        </Link>
      )
    );
  };

  const showUpdateButton = (showViewProductButton) => {
    return (
      showViewProductButton && (
        <Link to={`update/product/${product._id}`}>
          <button className="btn btn-outline-primary mt-2 mb-2">
            Изменить
          </button>
        </Link>
      )
    );
  };

  const showDeleteButton = (showViewProductButton) => {
    return (
      showViewProductButton && (
        <Link to={`/`}>
          <button
            onClick={() => {
              deleteProduct(user._id, product._id, token);
            }}
            className="btn btn-outline-warning mt-2 mb-2 ml-2"
          >
            Удалить
          </button>
        </Link>
      )
    );
  };

  const addToCart = () => {
    addItems(product, () => {
      setRedirect(true);
    });
  };

  const shouldRedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const showAddToCart = (showAddToCartButton) => {
    return (
      showAddToCartButton && (
        <button
          onClick={addToCart}
          className="btn btn-outline-warning mt-2 mb-2 ml-2"
        >
          Добавить в корзину
        </button>
      )
    );
  };

  const showRemoveButton = (showRemoveProductButton) => {
    return (
      showRemoveProductButton && (
        <button
          onClick={() => {
            removeItem(product._id);
            setRun(!run);
          }}
          className="btn btn-outline-danger mt-2 mb-2"
        >
          Удалить из корзины
        </button>
      )
    );
  };

  const showStock = (quantity) => {
    return quantity > 0 ? (
      <span className="badge badge-primary badge-pill">В наличии</span>
    ) : (
      <span className="badge badge-danger badge-pill">Нет в наличии</span>
    );
  };

  return (
    <div className="card">
      <div className="card-header name">{product.name}</div>
      <div className="card-body">
        {shouldRedirect(redirect)}
        <div className="textimage">
          <ShowImage item={product} url="product" />{" "}
        </div>
        <p className="lead mt-2">{product.description.substring(0, 150)}</p>
        <p className="black-10 text-danger">{product.price} BYN</p>
        <p className="black-9">
          Категория: {product.category && product.category.name}
        </p>
        <p className="black-8">
          {" "}
          Добавлено {moment(product.createdAt).fromNow()}
        </p>

        {showStock(product.quantity)}

        <br />
        {showViewButton(showViewProductButton)}
        {showAddToCart(showAddToCartButton)}
        {showRemoveButton(showRemoveProductButton)}
        {isAuthenticated() &&
          isAuthenticated().user.role === 1 &&
          showUpdateButton(showViewProductButton)}
        {isAuthenticated() &&
          isAuthenticated().user.role === 1 &&
          showDeleteButton(showViewProductButton)}
      </div>
    </div>
  );
};

export default Card;
