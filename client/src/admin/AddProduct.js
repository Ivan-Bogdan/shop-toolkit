import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth/index";
import { createProduct, getCategories } from "./index";

const AddProduct = () => {
  const { user, token } = isAuthenticated();
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    categories: [],
    category: "",
    quantity: "",
    download: null,
    photo: "",
    loading: false,
    error: "",
    createdProduct: "",
    redirectToProfile: false,
    formData: "",
  });

  const {
    name,
    description,
    price,
    categories,
    category,
    quantity,
    download,
    photo,
    loading,
    error,
    createdProduct,
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

  useEffect(() => {
    init();
  }, []);

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });

    createProduct(user._id, token, formData).then((data) => {
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
          createdProduct: data.name,
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

      <div className="form-group">
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
      </div>

      {/* <div className="form-group">
        <label className="text-muted">Количество</label>
        <input
          onChange={handleChange("quantity")}
          type="number"
          className="form-control"
          value={quantity}
        />
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
        Добавить
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
      style={{ display: createdProduct ? "" : "none" }}
    >
      {" "}
      <h2>{`${createdProduct}`} создано</h2>{" "}
    </div>
  );

  const showLoading = () =>
    loading && (
      <div className="alert alert-success">
        <h2>Загрузка...</h2>{" "}
      </div>
    );

  return (
    <Layout title="Добавить методическое пособие" description>
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {showLoading()}
          {showSuccess()}
          {showError()}
          {newPostForm()}
        </div>
      </div>
    </Layout>
  );
};

export default AddProduct;
