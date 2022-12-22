import React from "react";
import {
  Switch,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { DeleteCookies } from "../utils/DeleteCookies";
import { IAccordionProps } from "../interfaces/IAccordionProps";
import { useCookies } from "../hooks/useCookies";
const label = { inputProps: { "aria-label": "Switch demo" } };

export const AccordionCookies = ({ t }: IAccordionProps) => {
  const { cookiesSelected, SetCookies } = useCookies();

  const onChangeCookie = (event: React.ChangeEvent<HTMLInputElement>) => {
    const key = event.target.name;
    if (event.target.checked === false) {
      DeleteCookies({
        [key]: !event.target.checked,
      });
    }
    SetCookies({
      ...cookiesSelected,
      settings: {
        ...cookiesSelected.settings,
        [key]: event.target.checked,
      },
    });
  };
  return (
    <>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography component={"h4"}>
            <span className="cookie_title">
              Cookies {t("cookies_policy.essentials")}
            </span>
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
            <span className="cookie_title">
              Cookies {t("cookies_policy.functionals")}
            </span>
            <Switch
              {...label}
              name="functionals"
              checked={
                cookiesSelected &&
                cookiesSelected.settings &&
                Object.keys(cookiesSelected.settings).length > 1 &&
                cookiesSelected.settings.functionals === true
                  ? true
                  : false
              }
              onChange={onChangeCookie}
            />
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{t("cookies_policy.functionals_content")}</Typography>
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
            <span className="cookie_title">
              Cookies {t("cookies_policy.analytics")}
            </span>
            <Switch
              {...label}
              name="analytics"
              checked={
                cookiesSelected &&
                cookiesSelected.settings &&
                Object.keys(cookiesSelected.settings).length > 1 &&
                cookiesSelected.settings.analytics === true
                  ? true
                  : false
              }
              onChange={onChangeCookie}
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
