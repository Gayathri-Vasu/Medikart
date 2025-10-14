import React from 'react';
import { Fragment } from "react";
import Wrapper from "../components/wrapper/Wrapper";
import Section from "../components/Section";
import { products, discoutProducts } from "../utils/products";
import SliderHome from "../components/Slider";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";

const Home = () => {
  // ✅ Filter "New Arrivals" - last 5 added products
  const newArrivalData = products.slice(-5); 

  // ✅ Filter "Best Sales" - products marked as best sellers
  const bestSales = products.filter((item) => item.bestSeller === true);

  useWindowScrollToTop();

  return (
    <Fragment>
      <SliderHome />
      <Wrapper />
      <Section
        title="Products"
        bgColor="#f6f9fc"
        productItems={discoutProducts}
      />
      <Section
        title="New Arrivals"
        bgColor="white"
        productItems={newArrivalData}
      />
     
    </Fragment>
  );
};

export default Home;
