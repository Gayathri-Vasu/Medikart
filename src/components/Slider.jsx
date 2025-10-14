import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { Container } from "react-bootstrap"
import SlideCard from "./SliderCard/SlideCard"
import { SliderData } from "../utils/products"
import React from 'react';

const SliderHome = () => {
  const settings = {
    nav: false,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 1000, // ✅ Faster transition every 1.5 sec
  speed: 700,
  }
  return (
      <section className='homeSlide'>
        <Container>
          <Slider {...settings}>
          {SliderData.map((value, index) => {
            return (
              <SlideCard key={index} title={value.title} cover={value.cover} desc={value.desc} />
            )
          })}
        </Slider>
        </Container>
      </section>
  )
}

export default SliderHome
