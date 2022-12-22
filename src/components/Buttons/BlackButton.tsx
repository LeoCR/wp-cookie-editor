import { Button, styled, ButtonProps } from "@mui/material";

export const BlackButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: "#FFFFFF",
  backgroundColor: "#000000",
  "&:hover": {
    backgroundColor: "#000000",
  },
}));
