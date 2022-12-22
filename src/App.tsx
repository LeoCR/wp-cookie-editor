import React from "react";
import { useTranslation } from "react-i18next";
import { Typography } from "@mui/material";
import { IUserSttings } from "./interfaces/IUserSettings";
import { useCookies } from "./hooks/useCookies";
import { DeleteCookies } from "./utils/DeleteCookies";
import { CalculateDateDiferrence } from "./utils/CalculateDateDifference";
import { CookiesDialogs } from "./components/Dialog/Dialog";
import "./App.css";

const App = () => {
  const { GetCookies } = useCookies();
  const cookiesSaved = GetCookies();
  const [isCookieEditorOpen, setIsCookieEditorOpen] =
    React.useState<boolean>(false);
  const [userSettings, setUserSettings] =
    React.useState<IUserSttings>(cookiesSaved);

  const { t } = useTranslation("common");
  const [siteOwner, setSiteOwner] = React.useState<string | undefined>(
    "Leonardo Aranibar"
  );
  const [monthsAfterApproval, setMonthsAfterApproval] =
    React.useState<luxon.DurationObjectUnits>({
      months: 0,
    });
  React.useEffect(() => {
    const wrapper = document.querySelector(".wp-cookie-policy-settings")!;
    if (wrapper) {
      const newSiteOwner = wrapper.getAttribute("data-site-owner")?.toString();
      if (newSiteOwner) {
        setSiteOwner(newSiteOwner);
      }
    }
    if (userSettings) {
      if (Object.keys(userSettings.settings).length) {
        DeleteCookies(userSettings.settings);
      }
      if (typeof userSettings.dateOfApproval === "string") {
        setMonthsAfterApproval(
          CalculateDateDiferrence(userSettings.dateOfApproval)
        );
      }
    }
    const cookiesEditorLink = document.querySelector(
      ".wp-cookies-editor-link"
    )!;
    cookiesEditorLink.addEventListener("click", toggleModal);
    return () => {
      setIsCookieEditorOpen(false);
      setSiteOwner("Leonardo Aranibar");
      cookiesEditorLink.removeEventListener("click", toggleModal);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const toggleModal = () => {
    setIsCookieEditorOpen((prev) => !prev);
  };

  const privacyPolicyURL = t("cookies_policy.privacy_policy_url");

  return (monthsAfterApproval &&
    monthsAfterApproval.months &&
    monthsAfterApproval.months >= 6) ||
    userSettings.status === 0 ? (
    <>
      <CookiesDialogs
        userSettingsSaved={userSettings as Object}
        open={isCookieEditorOpen}
        setOpenDialog={setIsCookieEditorOpen}
        t={t}
      />
      <div className="wp-cookie-msg-container">
        <Typography className="wp-txt-cookie-msg">
          {t("cookies_policy.message", { siteOwner })}
          {t("cookies_policy.privacy_policy_msg")}{" "}
          <a
            href={privacyPolicyURL}
            target={"_blank"}
            rel="noreferrer"
            className="btn"
          >
            {t("cookies_policy.privacy_policy")}{" "}
          </a>{" "}
          {t("cookies_policy.or_use")}{" "}
          <span
            onClick={() => {
              setIsCookieEditorOpen(true);
            }}
            className="btn"
          >
            {t("cookies_policy.editor")}
          </span>
          <span
            onClick={() => {
              setIsCookieEditorOpen(false);
              setUserSettings((prev) => {
                const newState = {
                  ...prev,
                  status: 1,
                  dateOfApproval: new Date().toISOString(),
                };
                localStorage.setItem(
                  "wp_cookies_editor",
                  JSON.stringify(newState)
                );
                return {
                  ...(newState as IUserSttings),
                };
              });
              setMonthsAfterApproval(
                CalculateDateDiferrence(new Date().toISOString())
              );
            }}
            className={"okBtn"}
          >
            {t("cookies_policy.accept")}
          </span>
        </Typography>
      </div>
    </>
  ) : (
    <>
      <CookiesDialogs
        userSettingsSaved={userSettings as Object}
        open={isCookieEditorOpen}
        setOpenDialog={setIsCookieEditorOpen}
        t={t}
      />
    </>
  );
};

export default App;
