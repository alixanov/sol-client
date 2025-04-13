import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
import { Navigation, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// Sample banner data (replace with your actual data)
const SliderData = [
  {
    img: "https://cdn.inc42.com/wp-content/uploads/2022/03/lanchpad-feature.png",
    title: "Special SOL Offer",
    description: "Get 20% off on all cartoon treats!"
  },
  {
    img: "/api/placeholder/900/300",
    title: "New Arrivals",
    description: "Check out our latest cartoon-themed products"
  },
  {
    img: "/api/placeholder/900/300",
    title: "Limited Time Deal",
    description: "Buy one get one free on selected items"
  }
];

// Styled components
const BannerContainer = styled(Box)(({ theme }) => ({
  marginBottom: '40px',
  marginTop: '30px',
  '& .swiper': {
    borderRadius: 24,
    overflow: 'hidden',
    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.06)',
    border: '3px solid #FFD700',
  },
  '& .image-container': {
    position: 'relative',
    width: '100%',
    height: '300px',
    [theme.breakpoints.down('sm')]: {
      height: '180px',
    },
  },
  '& .slider-image': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  '& .banner-content': {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
    padding: '24px',
    color: '#FFFFFF',
    [theme.breakpoints.down('sm')]: {
      padding: '16px',
    },
  },
  '& .custom-prev, & .custom-next': {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 10,
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(255, 255, 255, 0.8)',
    borderRadius: '50%',
    cursor: 'pointer',
    fontSize: '24px',
    color: '#000',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)',
    '&:hover': {
      background: '#FFFFFF',
    },
    [theme.breakpoints.down('sm')]: {
      width: '30px',
      height: '30px',
      fontSize: '18px',
    },
  },
  '& .custom-prev': {
    left: '15px',
  },
  '& .custom-next': {
    right: '15px',
  },
}));

const BannerTitle = styled(Typography)(({ theme }) => ({
  fontFamily: "'Bubblegum Sans', cursive",
  fontSize: '28px',
  marginBottom: '8px',
  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
  [theme.breakpoints.down('sm')]: {
    fontSize: '20px',
    marginBottom: '4px',
  },
}));

const BannerDescription = styled(Typography)(({ theme }) => ({
  fontFamily: "'Poppins', sans-serif",
  fontSize: '16px',
  textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)',
  [theme.breakpoints.down('sm')]: {
    fontSize: '14px',
  },
}));

const BannerSlider = () => {
  return (
    <BannerContainer>
      <Swiper
        modules={[Navigation, Autoplay]}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        speed={1000}
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
        breakpoints={{
          640: {
            slidesPerView: 1,
          },
          1024: {
            slidesPerView: 1,
          },
        }}
        className="banner-swiper"
      >
        {SliderData.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="image-container">
              <img
                src={slide.img}
                alt={`Banner ${index + 1}`}
                className="slider-image"
              />
              <div className="banner-content">
                <BannerTitle>{slide.title}</BannerTitle>
                <BannerDescription>{slide.description}</BannerDescription>
              </div>
            </div>
          </SwiperSlide>
        ))}
        <div className="custom-prev">‹</div>
        <div className="custom-next">›</div>
      </Swiper>
    </BannerContainer>
  );
};

export default BannerSlider;