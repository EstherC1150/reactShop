import React from "react";
import { CardMedia, CardContent, Typography, Button, Box } from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useNavigate } from "react-router-dom";

interface ItemCardProps {
  itemKey: number;
  imageUrl: string;
  name: string;
  description: string;
  originalPrice: number;
  discountedPrice: number;
  discountRate: number;
}

function ItemCard({
  imageUrl,
  name,
  description,
  originalPrice,
  discountedPrice,
  discountRate,
  itemKey,
}: ItemCardProps) {
  const navigate = useNavigate();

  const handleCardClick = (itemKey: number) => {
    console.log("아이템 클릭:", itemKey);
    console.log("이동할 경로:", `/item/${itemKey}`);
    console.log("상품 정보:", {
      상품명: name,
      설명: description,
      원가: originalPrice,
      할인가: discountedPrice,
      할인율: discountRate,
    });
    navigate(`/item/${itemKey}`);
  };

  const handleCartClick = (e: React.MouseEvent, itemKey: number) => {
    e.stopPropagation();
    if (itemKey === undefined) {
      console.error("아이템 키가 정의되지 않았습니다");
      return;
    }
    // 장바구니 담기 로직 구현
    console.log("장바구니 담기:", itemKey);
  };

  return (
    <Box
      sx={{
        width: "calc((100% - 40px) / 3)", // 3개로 균등 배치
        cursor: "pointer",
        marginBottom: "20px",
      }}
      onClick={() => handleCardClick(itemKey)}
    >
      <Box
        display="flex"
        sx={{
          marginBottom: "8px",
          overflow: "hidden", // 이미지가 확대될 때 넘치는 부분 숨김
          borderRadius: "6px", // 이미지와 동일한 border-radius 적용
        }}
      >
        <CardMedia
          component="img"
          height="320"
          image={imageUrl}
          alt={name}
          sx={{
            borderRadius: "6px",
            transition: "transform 0.3s ease-in-out", // 부드러운 확대 효과를 위한 transition
            "&:hover": {
              transform: "scale(1.05)", // hover 시 5% 확대
            },
          }}
        />
      </Box>
      <Button
        variant="contained"
        fullWidth
        onClick={(e) => handleCartClick(e, itemKey)}
        sx={{
          backgroundColor: "#ffffff",
          boxShadow: "none",
          border: "1px solid #d7d7d7",
          color: "rgb(66,66,66)",
          "&:hover": {
            boxShadow: "0 1px 5px rgba(0, 0, 0, 0.159)",
          },
        }}
      >
        <ShoppingCartOutlinedIcon sx={{ marginRight: "8px" }} />
        담기
      </Button>
      <CardContent
        className="MuiCardContent-root"
        sx={{
          padding: "16px 0",
          "&.MuiCardContent-root:last-child": {
            paddingBottom: 0,
          },
        }}
      >
        <Typography
          variant="h6"
          component="div"
          gutterBottom
          sx={{
            fontSize: "16px", // 폰트 크기 조정
            display: "-webkit-box",
            overflow: "hidden",
            textOverflow: "ellipsis", // 초과된 텍스트에 "..." 추가
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2, // 최대 2줄로 제한
            color: "rgb(66, 66, 66)",
            lineHeight: "24px",
            maxHeight: "58px",
          }}
        >
          {name}
        </Typography>
        <Typography
          gutterBottom
          sx={{
            fontSize: "12px",
            color: "rgb(153,153,153)",
            lineHeight: "18px",
          }}
        >
          {description}
        </Typography>
        <Typography
          variant="body2"
          color="text.disabled"
          sx={{ textDecoration: "line-through", fontSize: "14px" }}
        >
          {originalPrice.toLocaleString()}원
        </Typography>
        <Box display="flex" alignItems="center">
          <Typography
            variant="body1"
            color="rgb(250,98,47)"
            fontWeight="bold"
            sx={{ fontSize: "16px", marginRight: "5px" }}
          >
            {discountRate}%
          </Typography>
          <Typography
            variant="h6"
            color="text.primary"
            fontWeight="bold"
            sx={{ fontSize: "16px" }}
          >
            {discountedPrice.toLocaleString()}원
          </Typography>
        </Box>
      </CardContent>
    </Box>
  );
}

export default ItemCard;
