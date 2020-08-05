import Axios from "axios";
import Cookie from "js-cookie";
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING,
  CART_SAVE_PAYMENT,
} from "../constants/cartConstants";
const ADD_TO_CART = "ADD_TO_CART";
const DECREASE_QUANTITY = "DECREASE_QUANTITY";
const DELETE_FROM_CART = "DELETE_FROM_CART";
const DELETE_ALL_FROM_CART = "DELETE_ALL_FROM_CART";

//add to cart
const addToCart = (
  item,
  addToast,
  quantityCount,
  selectedProductColor,
  selectedProductSize
) => {
  return async (dispatch) => {
    var url = "http://159.65.153.124/api/products/details/" + item
    const { data } = await Axios.get(url);
    console.log(data)
    if (addToast) {
      addToast("Added To Cart", { appearance: "success", autoDismiss: true });
    }
    console.log('new' , item)
    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        ...item,
        quantity: quantityCount,
        selectedProductColor: selectedProductColor
          ? selectedProductColor
          : item.selectedProductColor
          ? item.selectedProductColor
          : null,
        selectedProductSize: selectedProductSize
          ? selectedProductSize
          : item.selectedProductSize
          ? item.selectedProductSize
          : null,
      },
    });
  };
};
//decrease from cart
const decreaseQuantity = (item, addToast) => {
  return (dispatch) => {
    if (addToast) {
      addToast("Item Decremented From Cart", {
        appearance: "warning",
        autoDismiss: true,
      });
    }
    dispatch({ type: DECREASE_QUANTITY, payload: item });
  };
};
//delete from cart
const deleteFromCart = (item, addToast) => {
  return (dispatch) => {
    if (addToast) {
      addToast("Removed From Cart", { appearance: "error", autoDismiss: true });
    }
    dispatch({ type: DELETE_FROM_CART, payload: item });
  };
};
//delete all from cart
const deleteAllFromCart = (addToast) => {
  return (dispatch) => {
    if (addToast) {
      addToast("Removed All From Cart", {
        appearance: "error",
        autoDismiss: true,
      });
    }
    dispatch({ type: DELETE_ALL_FROM_CART });
  };
};

// get stock of cart item
const cartItemStock = (item, color, size) => {
  console.log(item)
  if (item.stock) {
    return item.stock;
  } else {
    return item.variation
      .filter((single) => single.color === color)[0]
      .size.filter((single) => single.name === size)[0].stock;
  }
};

const addToCart1 = (productId, qty) => async (dispatch, getState) => {
  try {
    const { data } = await Axios.get(
      "http://159.65.153.124/api/products/details/" + productId
    );
    // data = data.data
    console.log(data.data);
    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        product: data.data.id,
        name: data.data.product_name,
        image: data.data.product_image,
        price: data.data.vprice,
        countInStock: data.data.stock,
        qty,
      },
    });
    const {
      cart: { cartItems },
    } = getState();
    Cookie.set("cartItems", JSON.stringify(cartItems));
  } catch (error) {}
};
const removeFromCart = (productId) => (dispatch, getState) => {
  dispatch({ type: CART_REMOVE_ITEM, payload: productId });

  const {
    cart: { cartItems },
  } = getState();
  Cookie.set("cartItems", JSON.stringify(cartItems));
};
const saveShipping = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_SHIPPING, payload: data });
};
const savePayment = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_PAYMENT, payload: data });
};
export {
  addToCart,
  ADD_TO_CART,
  DECREASE_QUANTITY,
  DELETE_ALL_FROM_CART,
  DELETE_FROM_CART,
  cartItemStock,
  removeFromCart,
  saveShipping,
  savePayment,
  decreaseQuantity,
  deleteFromCart,
  deleteAllFromCart,
};
