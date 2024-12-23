import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
} from "@mui/material";

interface ItemCardProps {
  imageUrl: string;
  title: string;
  description: string;
  originalPrice: number;
  discountedPrice: number;
  discountRate: number;
}

function ItemCard({
  imageUrl,
  title,
  description,
  originalPrice,
  discountedPrice,
  discountRate,
}: ItemCardProps) {
  return (
    <Card sx={{ maxWidth: 300, margin: 2 }}>
      <Box display="flex">
        <CardMedia component="img" height="320" image={imageUrl} alt={title} />
      </Box>
      <Button variant="contained" color="primary" fullWidth>
        담기
      </Button>
      <CardContent>
        <Typography variant="h6" component="div" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {description}
        </Typography>
        <Typography
          variant="body2"
          color="text.disabled"
          sx={{ textDecoration: "line-through" }}
        >
          {originalPrice.toLocaleString()}원
        </Typography>
        <Box display="flex" alignItems="center">
          <Typography variant="body1" color="#ff5917" fontWeight="bold">
            {discountRate}%
          </Typography>
          <Typography variant="h6" color="text.primary" fontWeight="bold">
            {discountedPrice.toLocaleString()}원
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

export default ItemCard;
