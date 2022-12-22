import { Button, styled, ButtonProps } from "@mui/material";

export const YellowButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: "#FFFFFF",
  backgroundColor: "#fd9134",
  "&:hover": {
    backgroundColor: "#fd9134",
  },
}));
