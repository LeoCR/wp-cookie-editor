import React from "react";
import {
  Button,
  Dialog,
  Switch,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {BootstrapDialogTitle} from './BootstrapDialogTitle'
import { deleteCookie } from "../utils/deleteCookie";

const label = { inputProps: { "aria-label": "Switch demo" } };

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(1),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));


interface ICookiesDialogsProps{
  open:boolean
}
export const CookiesDialogs = ({ open }:ICookiesDialogsProps) => {
  const [openDialig, setOpenDialog] = React.useState(open);
  const [cookiesSelected,setCookiesSelected] =React.useState({
    analytics:true
  })

  React.useEffect(() => {
    if(open||open===false){
      setOpenDialog(open) 
    }
    return () => {
      setOpenDialog(false)
    };
  }, [open])

  const handleClose = () => {
    setOpenDialog(false);
  };

  const onChangeAnalytics=(event: React.ChangeEvent<HTMLInputElement>)=>{
    console.log('event',event)
    if(event.target.checked===false){
      deleteCookie(!event.target.checked);
      console.log('!event.target.checked',!event.target.checked)
    }
    setCookiesSelected({
      analytics:event.target.checked
    });
   
  }

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="wp-cookies-policies-dialog"
        open={openDialig}
      >
        <BootstrapDialogTitle
          id="wp-cookies-policies-dialog"
          onClose={handleClose}
        >
          Cookies editor
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <h3>
            Cookies Analíticas <Switch {...label} checked={cookiesSelected.analytics} onChange={onChangeAnalytics}/>
          </h3>
          <p>
            Se utilizan para elaborar perfiles de navegación y poder conocer las
            preferencias de los usuarios del mismo con el fin de mejorar la
            oferta de productos y servicios como por ejemplo cuál es el producto
            de más aceptación.
          </p>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" autoFocus onClick={handleClose}>
            Save
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
};
