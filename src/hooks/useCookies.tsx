import React from "react";
import {
  GetCookiesSelected,
  SetCookiesSelected,
} from "../utils/GetCookiesSelected";
import { IUserSttings } from "../interfaces/IUserSettings";

export const useCookies = () => {
  const [cookiesSelected, setCookiesSelectedState] =
    React.useState<IUserSttings>({
      status: 0,
      dateOfApproval: null,
      settings: {
        analytics: true,
        functionals: true,
      },
    });
  React.useEffect(() => {
    const cookiesSaved = GetCookiesSelected();
    if (Object.keys(cookiesSaved).length) {
      setCookiesSelectedState(cookiesSaved);
    }
  }, []);

  const GetCookies = (): IUserSttings => {
    const cookiesSaved = GetCookiesSelected();
    return cookiesSaved;
  };
  const SetCookies = (newSettings: IUserSttings) => {
    setCookiesSelectedState(newSettings);
    SetCookiesSelected(newSettings);
  };
  return {
    cookiesSelected,
    GetCookies,
    SetCookies,
  };
};
