import { NextBtn, PrevBtn, SliderItem, Wrapper } from "./LayoutBanner.styles";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function LayoutBanner() {
  const settings = {
    dots: true,
    // infinite: true,
    autoplay:true,
    autoplaySpeed: 5000,
    speed: 500,
    pauseOnHover: false,
    arrows: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <PrevBtn/>,
    nextArrow: <NextBtn/>

  };

  return (
    <Wrapper>
      <Slider {...settings}>
        <div>
          <SliderItem src="/images/layout/img_banner01@3x.png" />
        </div>
        <div>
          <SliderItem src="/images/layout/img_banner2_pc@3x.png" />
        </div>
        <div>
          <SliderItem src="/images/layout/img_banner3_pc@3x.png" />
        </div>
      </Slider>
    </Wrapper>
  );
}