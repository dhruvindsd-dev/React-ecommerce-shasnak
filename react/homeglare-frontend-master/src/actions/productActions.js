import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_SAVE_REQUEST,
  PRODUCT_SAVE_SUCCESS,
  PRODUCT_SAVE_FAIL,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_REVIEW_SAVE_REQUEST,
  PRODUCT_REVIEW_SAVE_FAIL,
  PRODUCT_REVIEW_SAVE_SUCCESS,
} from "../constants/productConstants";

import axios from "axios";
import Axios from "axios";
const FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS";
const listProducts = (
  category = "",
  searchKeyword = "",
  sortOrder = ""
) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });
    const { data } = await axios.get(
      "http://159.65.153.124/api/products?category=" +
        category +
        "&searchKeyword=" +
        searchKeyword +
        "&sortOrder=" +
        sortOrder
    );
    console.log(data);
    dispatch(fetchProductsSuccess(data.data));
  } catch (error) {
    dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
  }
};

const fetchProductsSuccess = (products) => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: products,
});

const saveProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_SAVE_REQUEST, payload: product });
    const {
      userSignin: { userInfo },
    } = getState();
    if (!product._id) {
      const { data } = await Axios.post("/api/products", product, {
        headers: {
          Authorization: "Bearer " + userInfo.token,
        },
      });
      dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data });
    } else {
      const { data } = await Axios.put(
        "http://159.65.153.124/api/products/" + product._id,
        product,
        {
          headers: {
            Authorization: "Bearer " + userInfo.token,
          },
        }
      );
      dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data });
    }
  } catch (error) {
    dispatch({ type: PRODUCT_SAVE_FAIL, payload: error.message });
  }
};

const detailsProduct = (productId) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId });
    const { data } = await axios.get(
      "http://159.65.153.124/api/products/details/" + productId
    );
    console.log(data);
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({ type: PRODUCT_DETAILS_FAIL, payload: error.message });
  }
};

const deleteProdcut = (productId) => async (dispatch, getState) => {
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    dispatch({ type: PRODUCT_DELETE_REQUEST, payload: productId });
    const { data } = await axios.delete(
      "http://159.65.153.124/api/products/" + productId,
      {
        headers: {
          Authorization: "Bearer " + userInfo.token,
        },
      }
    );
    console.log(data);
    dispatch({
      type: PRODUCT_DELETE_SUCCESS,
      payload: data.data,
      success: true,
    });
  } catch (error) {
    dispatch({ type: PRODUCT_DELETE_FAIL, payload: error.message });
  }
};

const saveProductReview = (productId, review) => async (dispatch, getState) => {
  try {
    const {
      userSignin: {
        userInfo: { token },
      },
    } = getState();
    dispatch({ type: PRODUCT_REVIEW_SAVE_REQUEST, payload: review });
    const { data } = await axios.post(
      `http://159.65.153.124/api/products/${productId}/reviews`,
      review,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    dispatch({ type: PRODUCT_REVIEW_SAVE_SUCCESS, payload: data });
  } catch (error) {
    // report error
    dispatch({ type: PRODUCT_REVIEW_SAVE_FAIL, payload: error.message });
  }
};
// fetch products
const fetchProducts = (products) => {
  return (dispatch) => {
    dispatch(fetchProductsSuccess(products));
  };
};

export {
  listProducts,
  detailsProduct,
  fetchProducts,
  saveProduct,
  deleteProdcut,
  saveProductReview,
  FETCH_PRODUCTS_SUCCESS,
};
