import React from "react";
import {
  Switch,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { deleteCookie } from "../utils/deleteCookie";
import { IAccordionProps } from "../interfaces/IAccordionProps";
import { useCookies } from "../hooks/useCookies";
const label = { inputProps: { "aria-label": "Switch demo" } };

export const AccordionCookies = ({ t }: IAccordionProps) => {
  const { cookiesSelected, SetCookies } = useCookies();

  const onChangeAnalytics = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked === false) {
      deleteCookie({
        analytics: !event.target.checked,
      });
      console.log("!event.target.checked", !event.target.checked);
    }
    console.log("event.target.checked", event.target.checked);
    SetCookies({
      ...cookiesSelected,
      settings: {
        ...cookiesSelected.settings,
        analytics: event.target.checked,
      },
    });
  };
  console.log("cookiesSelected", cookiesSelected);
  return (
    <>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography component={"h4"}>
            Cookies {t("cookies_policy.essentials")}
            <Switch {...label} checked={true} disabled />
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{t("cookies_policy.essentials_content")}</Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
          style={{ margin: "0 !important" }}
        >
          <Typography component={"h4"}>
            Cookies {t("cookies_policy.analytics")}
            <Switch
              {...label}
              checked={
                cookiesSelected &&
                cookiesSelected.settings &&
                Object.keys(cookiesSelected.settings).length > 1 &&
                cookiesSelected.settings.analytics === true
                  ? true
                  : false
              }
              onChange={onChangeAnalytics}
            />
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{t("cookies_policy.analytics_content")}</Typography>
        </AccordionDetails>
      </Accordion>
    </>
  );
};
