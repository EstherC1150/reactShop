import React from "react";
import { Box } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// 배너 이미지는 실제 프로덕션에서는 서버에서 관리하는 것이 좋습니다.
// 현재는 테스트용으로 하드코딩되어 있지만, API를 통해 받아오는 것이 바람직합니다.
const bannerImages = [
  {
    id: 1,
    url: "/image/banner/banner01.jpg",
  },
  {
    id: 2,
    url: "/image/banner/banner02.jpg",
  },
  {
    id: 3,
    url: "/image/banner/banner03.png",
  },
];

interface ArrowProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

function SampleNextArrow(props: ArrowProps) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "none", // 기본적으로 숨김
        position: "absolute",
        top: "50%",
        right: "10px",
        transform: "translateY(-50%)",
        cursor: "pointer",
        transition: "display 0.3s ease-in-out", // 부드러운 전환 효과 추가
      }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props: ArrowProps) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "none", // 기본적으로 숨김
        position: "absolute",
        top: "50%",
        left: "10px",
        transform: "translateY(-50%)",
        zIndex: 2,
        cursor: "pointer",
        transition: "display 0.3s ease-in-out", // 부드러운 전환 효과 추가
      }}
      onClick={onClick}
    />
  );
}

const Banner = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <div
      className="slider-container"
      style={{ position: "relative" }}
      onMouseEnter={(e) => {
        const arrows = e.currentTarget.querySelectorAll(".slick-arrow");
        arrows.forEach((arrow) => {
          (arrow as HTMLElement).style.display = "block";
          (arrow as HTMLElement).style.transition = "opacity 0.3s ease-in-out"; // 부드러운 전환 효과 추가
          (arrow as HTMLElement).style.opacity = "1";
        });
      }}
      onMouseLeave={(e) => {
        const arrows = e.currentTarget.querySelectorAll(".slick-arrow");
        arrows.forEach((arrow) => {
          (arrow as HTMLElement).style.transition = "opacity 0.3s ease-in-out"; // 부드러운 전환 효과 추가
          (arrow as HTMLElement).style.opacity = "0";
          setTimeout(() => {
            (arrow as HTMLElement).style.display = "none";
          }, 300); // 전환 효과가 끝난 후 display를 none으로 설정
        });
      }}
    >
      <Slider {...settings}>
        {bannerImages.map((image) => (
          <div key={image.id}>
            <Box sx={{ position: "relative", height: "400px" }}>
              <img
                src={image.url}
                alt={image.url}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  bottom: 40,
                  left: 40,
                  color: "white",
                  textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
                }}
              >
                {/* <Typography variant="h4">{image.title}</Typography>
                <Typography variant="subtitle1">{image.subtitle}</Typography>
                <Typography variant="body2">{image.period}</Typography> */}
              </Box>
            </Box>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Banner;
