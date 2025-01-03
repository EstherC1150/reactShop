import { Box, Typography } from "@mui/material";
import FilterSidebar from "../common/FilterSidebar";

interface CategoryLayoutProps {
  totalItems: number;
  children: React.ReactNode;
}

const CategoryLayout = ({ totalItems, children }: CategoryLayoutProps) => {
  return (
    <Box
      sx={{
        width: 1050,
        maxWidth: "100%",
        margin: "50px auto",
        display: "flex",
      }}
    >
      <FilterSidebar />
      <Box
        sx={{
          flex: 1,
          marginLeft: "20px",
        }}
      >
        <Typography sx={{ marginBottom: "20px" }}>총 {totalItems}건</Typography>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default CategoryLayout;
