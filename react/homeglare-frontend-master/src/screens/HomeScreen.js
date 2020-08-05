import React, { useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect, useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import MetaTags from "react-meta-tags";
import LayoutOne from "../layouts/LayoutOne";
import BannerThirtyEight from "../wrappers/banner/BannerThirtyEight";
import TabProductTwentyTwo from "../wrappers/product/TabProductTwentyTwo";
import CountDownEight from "../wrappers/countdown/CountDownEight";
import ProductSliderSix from "../wrappers/product/ProductSliderSix";
import BrandLogoSliderFive from "../wrappers/brand-logo/BrandLogoSliderFive";
import BannerThirtySeven from "../wrappers/banner/BannerThirtySeven";
import HeroSliderThirtySix from "../wrappers/hero-slider/HeroSliderThirtySix";

function HomeScreen(props) {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const category = props.match.params.id ? props.match.params.id : "";
  const productData = useSelector((state) => state.productData);
  const { products, loading, error } = productData;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listProducts(category));

    return () => {};
  }, [category]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(listProducts(category, searchKeyword, sortOrder));
  };
  const sortHandler = (e) => {
    setSortOrder(e.target.value);
    dispatch(listProducts(category, searchKeyword, sortOrder));
  };
  // console.log('try', productData)
  return (
    <>
      <Fragment>
        <MetaTags>
          <title>Homeglare - Homepage | Buy anything you want</title>
          <meta
            name="description"
            content="A perfect place to find anything you need"
          />
        </MetaTags>
        <LayoutOne headerTop="visible">
          {/* hero slider */}
          <HeroSliderThirtySix />
          {/* banner */}
          <BannerThirtyEight spaceBottomClass="pb-70" spaceTopClass="pt-100" />
          {/* tab product */}
          <TabProductTwentyTwo spaceBottomClass="pb-60" category="fashion" />
          {/* deal counter */}
          <CountDownEight
            spaceTopClass="pt-100"
            spaceBottomClass="pb-100"
            dateTime="November 13, 2020 12:12:00"
            backgroundImage="/assets/img/bg/deal-bg.jpg"
          />
          {/* product slider */}
          {category && <h2>{category}</h2>}

          {/* <ul className="filter">
        <li>
          <form onSubmit={submitHandler}>
            <input
              name="searchKeyword"
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>
        </li>
        <li>
          Sort By{" "}
          <select name="sortOrder" onChange={sortHandler}>
            <option value="">Newest</option>
            <option value="lowest">Lowest</option>
            <option value="highest">Highest</option>
          </select>
        </li>
      </ul> */}
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div>{error}</div>
          ) : (
            <ProductSliderSix
              products={products}
              category="fashion"
              spaceBottomClass="pb-100"
              spaceTopClass="pt-100"
            />
            //
          )}
          {/* banner */}
          <BannerThirtySeven spaceBottomClass="pb-85" />
          {/* brand logo */}
          <BrandLogoSliderFive spaceBottomClass="pb-100" />
        </LayoutOne>
      </Fragment>
    </>
  );
}


HomeScreen.propTypes = {
  product: PropTypes.array,
};

const mapStateToProps = (state, ownProps) => {
  const itemId = ownProps.match.params.id;
  // console.log(state);
  return {
    product : state.productList.products
  //   product: state.productList.products
  //     single => single.id === itemId
  //   )[0]
  };
};

export default connect(mapStateToProps)(HomeScreen);

// export default HomeScreen;
