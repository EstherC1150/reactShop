import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Stack,
  Divider,
  IconButton,
} from "@mui/material";
import { getItemDetail } from "../../apis/item";
import { Item } from "../../types/item.types";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const ItemDetail = () => {
  const { itemKey } = useParams();
  const [itemData, setItemData] = useState<Item | null>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (itemKey) {
      getItemDetail(Number(itemKey))
        .then((data) => {
          console.log("받아온 데이터:", data);
          setItemData(data);
        })
        .catch((error) => {
          console.error("데이터 로딩 중 에러:", error);
        });
    }
  }, [itemKey]);

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  if (!itemData) return <div>Loading...</div>;

  return (
    <Box sx={{ maxWidth: "1050px", margin: "80px auto", p: 4 }}>
      <Box sx={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
        <Box sx={{ flex: "1 1 300px" }}>
          <img
            src={itemData.imageUrl}
            alt={itemData.name}
            style={{
              width: "100%",
              maxWidth: "400px",
              borderRadius: "8px",
            }}
          />
        </Box>
        <Box
          sx={{ flex: "1 1 300px", display: "flex", flexDirection: "column" }}
        >
          <Stack spacing={3} sx={{ flex: 1 }}>
            <Typography
              variant="h4"
              sx={{ fontWeight: "bold", color: "#252525" }}
            >
              {itemData.name}
            </Typography>
            <Divider />
            <Typography variant="body1" color="text.secondary">
              {itemData.content}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Typography
                variant="h5"
                sx={{ color: "#FF6B00", fontWeight: "bold" }}
              >
                {itemData.sale?.toLocaleString()}원
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ textDecoration: "line-through" }}
              >
                {itemData.price?.toLocaleString()}원
              </Typography>
            </Box>
          </Stack>
          <Box sx={{ mt: "auto", pt: 3 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                border: "1px solid #E0E0E0",
                padding: "12px 16px",
                borderRadius: "8px",
                justifyContent: "space-between",
                mb: 2,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Typography variant="body1">수량:</Typography>
                <IconButton
                  onClick={() => handleQuantityChange(-1)}
                  size="small"
                >
                  <RemoveIcon />
                </IconButton>
                <Typography>{quantity}</Typography>
                <IconButton
                  onClick={() => handleQuantityChange(1)}
                  size="small"
                >
                  <AddIcon />
                </IconButton>
              </Box>
              <Typography
                variant="h6"
                sx={{ color: "#252525", fontWeight: "600" }}
              >
                {((itemData.sale || 0) * quantity).toLocaleString()}원
              </Typography>
            </Box>
            <Button
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              sx={{
                height: "48px",
                backgroundColor: "#161616",
                "&:hover": {
                  backgroundColor: "#474747",
                },
              }}
            >
              구매하기
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ItemDetail;
