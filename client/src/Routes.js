import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Signup from "./user//Signup";
import Signin from "./user/Signin";
import Home from "./core/Home";
import PrivateRoute from "./auth/PrivateRoute";
import AdminRoute from "./auth/AdminRoute";
import Dashboard from "./user/Dashboard";
import Admin from "./user/Admin";
import AddCategory from "./admin/AddCategory";
import AddProduct from "./admin/AddProduct";
import Shop from "./core/Shop";
import Product from "./core/Product";
import Cart from "./core/Cart";
import Orders from "./admin/Orders";
import Reference from "./core/Reference";
import UpdateProduct from "./admin/UpdateProduct";
const Routes = () => {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/shop" exact component={Shop} />
          <Route path="/signin" exact component={Signin} />
          <Route path="/signup" exact component={Signup} />
          <PrivateRoute path="/user/dashboard" exact component={Dashboard} />
          <AdminRoute path="/admin/dashboard" exact component={Admin} />|
          <AdminRoute path="/create/category" exact component={AddCategory} />
          <AdminRoute path="/create/product" exact component={AddProduct} />
          <AdminRoute path="/update/product/:productId" exact component={UpdateProduct} />
          <AdminRoute path="/admin/orders" exact component={Orders} />
          <Route path="/product/:productId" exact component={Product} />
          <Route path="/cart" exact component={Cart} />
          <Route path="/reference" exact component={Reference} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default Routes;
