import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState } from "react";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { connect, useDispatch, useSelector } from "react-redux";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import RelatedProductSlider from "../../wrappers/product/RelatedProductSlider";
import ProductDescriptionTab from "../../wrappers/product/ProductDescriptionTab";
import ProductImageDescription from "../../wrappers/product/ProductImageDescription";
import {
  detailsProduct,
  saveProductReview,
} from "../../actions/productActions";
import { PRODUCT_REVIEW_SAVE_RESET } from "../../constants/productConstants";

const Product = (props) => {
  const location = props.location;
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const productDetails = useSelector((state) => state.productDetails);
  const { product, loading, error } = productDetails;
  const productReviewSave = useSelector((state) => state.productReviewSave);
  const { success: productSaveSuccess } = productReviewSave;
  const dispatch = useDispatch();
  useEffect(() => {
    if (productSaveSuccess) {
      alert("Review submitted successfully.");
      setRating(0);
      setComment("");
      dispatch({ type: PRODUCT_REVIEW_SAVE_RESET });
    }
    dispatch(detailsProduct(props.match.params.id));
    return () => {
      //
    };
  }, [productSaveSuccess]);
  const { pathname } = location;

  return (
    <Fragment>
      <MetaTags>
        <title>Homeglare | Product Details</title>
        <meta
          name="description"
          content="Product page of flone react minimalist eCommerce template."
        />
      </MetaTags>

      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Shop Product
      </BreadcrumbsItem>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error} </div>
      ) : (
        <LayoutOne headerTop="visible">
          {/* breadcrumb */}
          <Breadcrumb />

          {/* product description with image */}
          <ProductImageDescription
            spaceTopClass="pt-100"
            spaceBottomClass="pb-100"
            product={product}
          />

          {/* product description tab */}
          <ProductDescriptionTab
            spaceBottomClass="pb-90"
            productFullDesc={product.fullDescription}
          />

          {/* related product slider */}
          <RelatedProductSlider
            spaceBottomClass="pb-95"
            category={"product.product_category[0]"}
          />
        </LayoutOne>
      )}
    </Fragment>
  );
};

Product.propTypes = {
  location: PropTypes.object,
  product: PropTypes.object,
};

const mapStateToProps = (state, ownProps) => {
  const itemId = ownProps.match.params.id;
  console.log(state.productDetails);
  return {
    product : state.productDetails
  //   product: state.productList.products.filter(
  //     single => single.id === itemId
  //   )[0]
  };
};

export default connect(mapStateToProps)(Product);
