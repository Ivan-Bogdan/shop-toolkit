import React, { useState } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth/index";
import { Link } from "react-router-dom";
import { createCategory } from "./index";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAuthenticated();

  const handleChange = (e) => {
    setError("");
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    createCategory(user._id, token, { name }).then((data) => {
      if (data.error) {
        setError(true);
      } else {
        setError("");
        setSuccess(true);
      }
    });
  };

  const newCategory = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="text-muted">Категория</label>
        <input
          type="text"
          className="form-control"
          onChange={handleChange}
          value={name}
          autoFocus
          required
        />
      </div>
      <button className="btn btn-outline-primary ">Добавить</button>
    </form>
  );

  const showSuccess = () => {
    if (success) {
      return <h3 className="text-success">Категория {name} добавлена </h3>;
    }
  };
  const showError = () => {
    if (error) {
      return <h3 className="text-danger">{name} уже существет </h3>;
    }
  };

  const goBack = () => (
    <div className="mt-5">
      <Link to="/admin/dashboard" className="text-warning">
        {" "}
        Вернуться в кабинет{" "}
      </Link>
    </div>
  );

  return (
    <Layout title="Добавить новую категорию" description>
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {showError()}
          {showSuccess()}
          {newCategory()}
          {goBack()}
        </div>
      </div>
    </Layout>
  );
};

export default AddCategory;
