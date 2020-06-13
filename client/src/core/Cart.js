import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "./Layout";
import { getCart } from "./helpers";
import Card from "./Card";
import Checkout from "./Checkout";

const Cart = () => {
  const [items, setItems] = useState([]);
  const [run, setRun] = useState(false);

  useEffect(() => {
    setItems(getCart());
  }, [run]);

  const showItems = (items) => {
    return (
      <div>
        <h2> В корзине {`${items.length}`} товар</h2>
        <hr />
        {items.map((product, i) =>
          <Card
            key={i}
            product={product}
            showAddToCartButton={false}
            cartUpdate={true}
            showRemoveProductButton={true}
            setRun={setRun}
            run={run}
          />
        )}
      </div>
    );
  };



  const noItemMessage = () => (
    <h2>
      Пустая корзина <br/> <Link to="/shop">Продолжить покупки </Link>
    </h2>
  );

  return (
    <Layout title="Корзина" description="" className="container-fluid">
      <>
        <div className="row">
          <div className="col-6">
            {items.length > 0 ? showItems(items) : noItemMessage()}
          </div>

          <div className="col-6">
            <h2 className="mb-4">Сумма покупок</h2>
            <hr />
            <Checkout products={items} />
          </div>
        </div>
      </>
    </Layout>
  );
};
export default Cart;
