import { Box, IconButton, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

// 배너 이미지는 실제 프로덕션에서는 서버에서 관리하는 것이 좋습니다.
// 현재는 테스트용으로 하드코딩되어 있지만, API를 통해 받아오는 것이 바람직합니다.
const bannerImages = [
  {
    id: 1,
    url: "/image/testimg.jpg", // public 경로는 자동으로 인식되므로 제거
    title: "뷰티 설 선물 특선",
    subtitle: "설 한정 기획세트부터 테마별 인기상품까지",
    period: "01.06 - 01.29",
  },
  {
    id: 2,
    url: "/image/testimg2.jpg",
    title: "봄맞이 스킨케어 특가",
    subtitle: "봄철 피부관리를 위한 추천 상품",
    period: "02.01 - 02.28",
  },
  {
    id: 3,
    url: "/image/testimg3.jpeg",
    title: "신상품 출시 기념 할인",
    subtitle: "새로운 제품을 특별한 가격으로",
    period: "02.15 - 03.15",
  },
];

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handlePrevClick = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? bannerImages.length - 1 : prev - 1
    );
  };

  const handleNextClick = () => {
    setCurrentSlide((prev) =>
      prev === bannerImages.length - 1 ? 0 : prev + 1
    );
  };

  // 자동 슬라이드 기능 추가
  useEffect(() => {
    const timer = setInterval(() => {
      handleNextClick();
    }, 5000); // 5초마다 다음 슬라이드로 이동

    return () => clearInterval(timer);
  }, [currentSlide]);

  // 무한 슬라이드를 위한 배열 생성
  const extendedImages = [...bannerImages, ...bannerImages, ...bannerImages];

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "400px",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: `${bannerImages.length * 300}%`,
          transform: `translateX(-${
            (currentSlide + bannerImages.length) * (100 / extendedImages.length)
          }%)`,
          transition: "transform 0.5s ease-in-out",
        }}
      >
        {extendedImages.map((image, index) => (
          <Box
            key={`${image.id}-${index}`}
            sx={{
              position: "relative",
              width: `${100 / extendedImages.length}%`,
              height: "400px",
            }}
          >
            <img
              src={image.url}
              alt={image.title}
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
              <Typography variant="h4">{image.title}</Typography>
              <Typography variant="subtitle1">{image.subtitle}</Typography>
              <Typography variant="body2">{image.period}</Typography>
            </Box>
          </Box>
        ))}
      </Box>
      <IconButton
        onClick={handlePrevClick}
        sx={{
          position: "absolute",
          left: 20,
          top: "50%",
          transform: "translateY(-50%)",
          bgcolor: "rgba(255,255,255,0.5)",
          "&:hover": { bgcolor: "rgba(255,255,255,0.8)" },
          zIndex: 1,
        }}
      >
        <ArrowBackIosNewIcon />
      </IconButton>
      <IconButton
        onClick={handleNextClick}
        sx={{
          position: "absolute",
          right: 20,
          top: "50%",
          transform: "translateY(-50%)",
          bgcolor: "rgba(255,255,255,0.5)",
          "&:hover": { bgcolor: "rgba(255,255,255,0.8)" },
          zIndex: 1,
        }}
      >
        <ArrowForwardIosIcon />
      </IconButton>
    </Box>
  );
};

export default Banner;
