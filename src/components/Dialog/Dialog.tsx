import { DialogContent, DialogActions } from "@mui/material";
import { BootstrapDialogTitle } from "./BootstrapDialogTitle";
import { ICookiesDialogsProps } from "../../interfaces/ICookiesDialogsProps";
import { AccordionCookies } from "../AccordionCookies";
import { BlackButton } from "../Buttons/BlackButton";
import { BootstrapDialog } from "./BootstrapDialog";
import { YellowButton } from "../Buttons/YellowButton";
import { useCookies } from "../../hooks/useCookies";
import { DeleteCookies } from "../../utils/DeleteCookies";

export const CookiesDialogs = ({
  open,
  setOpenDialog,
  t,
}: ICookiesDialogsProps) => {
  const { GetCookies } = useCookies();

  const handleClose = () => {
    setOpenDialog(false);
  };
  const onAccept = () => {
    const cookiesSelected = GetCookies();
    DeleteCookies(cookiesSelected.settings);
    handleClose();
  };

  return (
    <>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="wp-cookies-policies-dialog"
        open={open}
      >
        <BootstrapDialogTitle
          id="wp-cookies-policies-dialog"
          onClose={handleClose}
        >
          {t("cookies_policy.title")}
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <AccordionCookies t={t} />
        </DialogContent>
        <DialogActions>
          <BlackButton onClick={onAccept}>
            {t("cookies_policy.accept")}
          </BlackButton>
          <YellowButton onClick={handleClose}>
            {t("cookies_policy.reject")}
          </YellowButton>
        </DialogActions>
      </BootstrapDialog>
    </>
  );
};
