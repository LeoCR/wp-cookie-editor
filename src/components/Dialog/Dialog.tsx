import { DialogContent, DialogActions } from "@mui/material";
import { BootstrapDialogTitle } from "./BootstrapDialogTitle";
import { ICookiesDialogsProps } from "../../interfaces/ICookiesDialogsProps";
import { AccordionCookies } from "../AccordionCookies";
import { BlackButton } from "../Buttons/BlackButton";
import { BootstrapDialog } from "./BootstrapDialog";
import { YellowButton } from "../Buttons/YellowButton";
import { useCookies } from "../../hooks/useCookies";
import { DeleteCookies } from "../../utils/DeleteCookies";
import { SetCookiesSelected } from "../../utils/GetCookiesSelected";

export const CookiesDialogs = ({
  open,
  setOpenDialog,
  t,
}: ICookiesDialogsProps) => {
  const { GetCookies } = useCookies();

  const onReject = () => {
    DeleteCookies({
      analytics: false,
      functionals: false,
    });
    SetCookiesSelected({
      settings: {
        analytics: false,
        functionals: false,
      },
    });
    setOpenDialog(false);
  };
  const onAccept = () => {
    const cookiesSelected = GetCookies();
    DeleteCookies(cookiesSelected.settings);
    setOpenDialog(false);
  };

  return (
    <>
      <BootstrapDialog
        onClose={() => {
          setOpenDialog(false);
        }}
        aria-labelledby="wp-cookies-policies-dialog"
        open={open}
      >
        <BootstrapDialogTitle
          id="wp-cookies-policies-dialog"
          onClose={() => {
            setOpenDialog(false);
          }}
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
          <YellowButton onClick={onReject}>
            {t("cookies_policy.reject")}
          </YellowButton>
        </DialogActions>
      </BootstrapDialog>
    </>
  );
};
