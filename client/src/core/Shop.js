import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { getCategories, getFilteredProducts } from "./index";
import Checkbox from "./Checkbox";
import { prices } from "./helpers";
import RadioBox from "./RadioBox";
import Card from "./Card";
import SearchbyAuthor from "./SearchbyAuthor";

const Shop = () => {
  const [clientFilters, setClientFilters] = useState({
    filters: { category: [], price: [] },
  });
  const [categories, setCategories] = useState([]);

  const [error, setError] = useState(false);
  const [limit] = useState(6);
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(0);
  const [filteredResults, setFilteredResults] = useState([]);

  const init = () => {
    getCategories().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setCategories(data);
      }
    });
  };
  //act2
  const loadFilteredResults = (newFilterFromState) => {
    getFilteredProducts(skip, limit, newFilterFromState) 
      .then((data) => {
        //act 7
        if (data.error) {
          setError(data.error);
        } else {
          setFilteredResults(data.data);
          setSize(data.size);
          setSkip(0);
        }
      });
  };

  const loadMoreProducts = () => {
    let toSkip = skip + limit;
    getFilteredProducts(toSkip, limit, clientFilters.filteres).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setFilteredResults([...filteredResults, ...data.data]);
        setSize(data.size);
        setSkip(toSkip);
      }
    });
  };

  const loadMoreButton = () => {
    return (
      size > 0 &&
      size >= limit && (
        <button onClick={loadMoreProducts} className="btn btn-warning mb-5">
          Загрузить ещё
        </button>
      )
    );
  };

  useEffect(() => {
    init();
    loadFilteredResults(skip, limit, clientFilters.filters);
  }, []);
  //act 1
  const handleFilters = (filters, filterBy) => {
    const newFilters = { ...clientFilters }; 
    newFilters.filters[filterBy] = filters; 
    if (filterBy === "price") {
      let priceValues = handlePrice(filters); 
      newFilters.filters[filterBy] = priceValues; 
    }
    loadFilteredResults(clientFilters.filters); 
    setClientFilters(newFilters); 
  };

  const handlePrice = (value) => {
    const data = prices; 
    let array = [];

    for (let key in data) {
      if (data[key]._id === parseInt(value)) {
        array = data[key].array;
      }
    }
    return array;
  };

 

  return (
    <Layout title="Магазин" description="">
      <div className="row">
        <div className="col-3">
          <h4>Найти по категории</h4>
          <ul>
            <Checkbox
              categories={categories}
              handleFilters={(filters) => handleFilters(filters, "category")}
            />
          </ul>

          <h4>Фильтрация по цене</h4>
          <div>
            <RadioBox
              prices={prices}
              handleFilters={(filters) => handleFilters(filters, "price")}
            />
          </div>
        </div>

        <div className="col-9">
        <SearchbyAuthor/>
          <h2 className="mb-4">Методические пособия</h2>
          <div className="row">
            {filteredResults.map((
              product,
              i
            ) => (
              <div key={i} className="col-4 mb-3">
                <Card product={product} />
              </div>
            ))}
          </div>
          <hr />
          {loadMoreButton()}
        </div>
      </div>
    </Layout>
  );
};
export default Shop;