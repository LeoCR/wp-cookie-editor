import React from "react";
import { useTranslation } from "react-i18next";
import { CookiesDialogs } from "./components/Dialog/Dialog";
import { IUserSttings } from "./interfaces/IUserSettings";
import "./App.css";
import { Typography } from "@mui/material";
import { useCookies } from "./hooks/useCookies";

const App = () => {
  const { cookiesSelected, SetCookies, GetCookies } = useCookies();
  const cookiesSaved = GetCookies();
  const [isCookieEditorOpen, setIsCookieEditorOpen] =
    React.useState<boolean>(false);
  const [userSettings, setUserSettings] =
    React.useState<IUserSttings>(cookiesSaved);

  const { t } = useTranslation("common");
  const [siteOwner, setSiteOwner] = React.useState<string | undefined>(
    "Leonardo Aranibar"
  );
  React.useEffect(() => {
    const wrapper = document.querySelector(".wp-cookie-policy-settings")!;
    if (wrapper) {
      const newSiteOwner = wrapper.getAttribute("data-site-owner")?.toString();
      if (newSiteOwner) {
        setSiteOwner(newSiteOwner);
      }
    }
    /* let userSettingsSaved = cookiesSelected;
    if (userSettingsSaved) {
      if (Object.keys(userSettingsSaved as Object).length === 3) {
        setUserSettings(userSettingsSaved as IUserSttings);
      }
    }
    SetCookies(userSettingsSaved as IUserSttings); */
    return () => {
      setIsCookieEditorOpen(false);
      setSiteOwner("Leonardo Aranibar");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const privacyPolicyURL = t("cookies_policy.privacy_policy_url");
  console.log("userSettings", userSettings);
  return (
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
            }}
            className={"okBtn"}
          >
            {t("cookies_policy.accept")}
          </span>
        </Typography>
      </div>
    </>
  );
};

export default App;
