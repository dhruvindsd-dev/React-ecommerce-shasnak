import React from "react";
import { Link } from "react-router-dom";
import Rating from "../Rating";
import "./styles.css";

/**
 * @author
 * @function ProductCard
 **/
const addToCart = () => {};
const addToWishlist = () => {};
const ProductCard = ({ product }) => {
  return (
    <div className="single-product">
      <div className="product-img">
        <a href="/product-detail/foldable-silicone-oil-funnel">
          <img
            src="http://homeglare.com/images/media/2020/04/eLDVb19201.jpg"
            alt="product"
            className="img-response"
          />
        </a>
      </div>
      <div className="product-content product-content-padding">
        <input type="hidden" id="stock422" value="in" />
        <h5 className="pname">
          <a href="/product-detail/foldable-silicone-oil-funnel">
            Foldable silicone oil funnel
          </a>
        </h5>
        <h6 className="sku_name">
          SKU - <span className="skun">HG10001267</span>
        </h6>
        <div className="price-addtocart">
          <div className="product-price">
            <span>₹98</span>
          </div>
        </div>
      </div>
      <div className="product-action-2">
        <a
          data-toggle="modal"
          data-target="#exampleModal"
          title="Quick View"
          data-myid="422"
        >
          <i className="la la-search"></i>
        </a>
        <a title="Add To Cart" onClick={addToCart(422, "normal", "moq")}>
          <i className="la la-cart-plus"></i>
        </a>
        <a title="Wishlist" onClick={addToWishlist(422)}>
          <i className="la la-heart-o"></i>
        </a>
      </div>
    </div>
  );
};

export default ProductCard;
