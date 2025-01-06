import { Box, Typography } from "@mui/material";

interface EmptyResultsProps {
  triggerSearch: boolean;
  searchKeyword: string;
}

const EmptyResults = ({ triggerSearch, searchKeyword }: EmptyResultsProps) => (
  <Box
    sx={{
      width: "100%",
      textAlign: "center",
      py: 4,
      color: "text.secondary",
    }}
  >
    <Typography variant="h6">
      {triggerSearch && searchKeyword
        ? "검색 결과가 없습니다."
        : "상품을 불러오는 중입니다..."}
    </Typography>
  </Box>
);

export default EmptyResults;
