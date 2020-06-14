import { API } from "../config";

export const addItems = (item, next) => {
  let cart = [];
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    cart.push({
      ...item,
      count: 1,
    });

    cart = Array.from(new Set(cart.map((product) => product._id))).map((id) => {
      return cart.find((product) => product._id === id);
    });
    localStorage.setItem("cart", JSON.stringify(cart));
    next();
  }
};

export const itemTotal = () => {
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      return JSON.parse(localStorage.getItem("cart")).length;
    }
  }
  return 0;
};

export const getCart = () => {
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      return JSON.parse(localStorage.getItem("cart"));
    }
  }
  return [];
};

export const updateItem = (productId, count) => {
  let cart = [];
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    cart.map((product, i) => {
      if (product._id === productId) {
        cart[i].count = count;
      }
    });
    localStorage.setItem("cart", JSON.stringify(cart));
  }
};

export const removeItem = (productId) => {
  let cart = [];
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    cart.map((product, i) => {
      if (product._id === productId) {
        cart.splice(i, 1);
      }
    });
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  return cart;
};

export const deleteProduct = (userId,productID, token) => {
  return fetch(`${API}/product/${productID}/${userId}`, {
      method: 'DELETE',
      headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
      }
  })
      .then(response => {
          return response.json()
      })
      .catch(err => {
          console.log(err)
      })
}; 

export const prices = [
  {
    _id: 0,
    name: "Все",
    array: [],
  },
  {
    _id: 1,
    name: "от 1 до 2 BYN",
    array: [1, 2],
  },
  {
    _id: 2,
    name: "от 2 до 3 BYN",
    array: [2, 3],
  },
  {
    _id: 3,
    name: "от 3 до 4 BYN",
    array: [3, 4],
  },
];

export const emptyCart = (next) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("cart");
    next();
  }
};
