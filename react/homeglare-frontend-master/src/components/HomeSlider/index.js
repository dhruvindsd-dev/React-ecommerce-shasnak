import React from "react";
import Swiper from "react-id-swiper";
import heroSliderData from "./hero-slider-thirty-six.json";
import HeroSliderThirtySixSingle from "./HeroSliderThirtySixSingle.js";

const HomeSlider = () => {
  const params = {
    effect: "fade",
    loop: true,
    speed: 1000,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    watchSlidesVisibility: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    renderPrevButton: () => (
      <button className="swiper-button-prev ht-swiper-button-nav">
        <i className="pe-7s-angle-left" />
      </button>
    ),
    renderNextButton: () => (
      <button className="swiper-button-next ht-swiper-button-nav">
        <i className="pe-7s-angle-right" />
      </button>
    ),
  };

  return (
    <div className="slider-active nav-style-1">
      <Swiper {...params}>
        {heroSliderData &&
          heroSliderData.map((single, key) => {
            return (
              <HeroSliderThirtySixSingle
                sliderClassName="swiper-slide"
                data={single}
                key={key}
              />
            );
          })}
      </Swiper>
    </div>
  );
};

export default HomeSlider;
