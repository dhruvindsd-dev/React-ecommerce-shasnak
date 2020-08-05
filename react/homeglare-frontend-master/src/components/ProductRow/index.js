import React from "react";
import ProductCard from "../ProductCard/ProductCard";
import "./style.css";
/**
 * @author
 * @function ProductRow
 **/

const ProductRow = ({ title, products }) => {
  return (
    <>
      <div className="product-row">
        <h2>{title}</h2>
      </div>
      <div className="products container">
        <div className="row">
          {products.map((product) => (
            <div className="col-md-3 col-lg-3" key={product._id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductRow;
