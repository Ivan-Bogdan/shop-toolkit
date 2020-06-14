import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { Link } from "react-router-dom";
import { read } from "../core/index";
import { isAuthenticated } from "../auth/index";
import {getCategories, updateProduct } from "./index";

const UpdateProduct = (props) => {
  const [product, setProduct] = useState({});
  const { user, token } = isAuthenticated();
  const [values, setValues] = useState({
    name: product.name,
    description: product.description,
    price: product.price,
    //categories: [],
    // category: product.category,
    quantity: product.quantity,
    download: product.download,
    photo: product.photo,
    loading: false,
    error: "",
    updatedProduct: "",
    redirectToProfile: false,
    formData: new FormData(),
  });

  const {
    name,
    description,
    price,
   // categories,
    //category,
    quantity,
    download,
    photo,
    loading,
    error,
    updatedProduct,
    redirectToProfile,
    formData,
  } = values;

  const init = () => {
    getCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, categories: data, formData: new FormData() });
      }
    });
  };

  const loadSingleProduct = (productId) => {
    read(productId).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setProduct(data);
        setValues({ ...values, ...data });
      }
    });
  };

  useEffect(() => {
    const productId = props.match.params.productId;
    loadSingleProduct(productId);
    init();
  }, [props]);

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });

    updateProduct(user._id, product._id, token, formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: "",
          description: "",
          photo: "",
          price: "",
          quantity: "",
          download: null,
          loading: false,
          updatedProduct: data.name,
        });
      }
    });
  };

  const newPostForm = () => (
    <form className="mb-3" onSubmit={handleSubmit}>
      <h4>Добавить фото</h4>
      <div className="form-group">
        <label className="btn btn-secondary">
          <input
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image/*"
          />
        </label>
      </div>

      <div className="form-group">
        <label className="text-muted">Название</label>
        <input
          onChange={handleChange("name")}
          type="text"
          className="form-control"
          value={name}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Описание</label>
        <textarea
          onChange={handleChange("description")}
          className="form-control"
          value={description}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Цена</label>
        <input
          onChange={handleChange("price")}
          type="number"
          className="form-control"
          value={price}
        />
      </div>

      {/* <div className="form-group">
        <label className="text-muted">Категория</label>
        <select onChange={handleChange("category")} className="form-control">
          <option>--></option>
          {categories &&
            categories.map((category, i) => (
              <option key={i} value={category._id}>
                {" "}
                {category.name}{" "}
              </option>
            ))}
        </select>
      </div> */}

      <div className="form-group">
        <label className="text-muted">ссылка на пособие</label>
        <input
          onChange={handleChange("download")}
          type="text"
          className="form-control"
          value={download}
        />
      </div>
      <button className="btn btn-outline-primary" to="/">
        Изменить
      </button>
      
    </form>
  );

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {" "}
      {error}{" "}
    </div>
  );

  const showSuccess = () => (
    <div
      className="alert alert-info"
      style={{ display: updatedProduct ? "" : "none" }}
    >
      {" "}
      <h2>{`${updatedProduct}`} изменено</h2>{" "}
    </div>
  );

  const showLoading = () =>
    loading && (
      <div className="alert alert-success">
        <h2>Загрузка...</h2>{" "}
      </div>
    );

  return (
    <Layout title="Изменение методическое пособие" description>
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {showLoading()}
          {showSuccess()}
          {showError()}
          {newPostForm()}
          {console.log(values)}
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
