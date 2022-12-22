import { IUserSttings } from "../interfaces/IUserSettings";

export const GetCookiesSelected = (): IUserSttings => {
  const userSettings = JSON.parse(
    localStorage.getItem("wp_cookies_editor") as string
  ) as IUserSttings;
  return userSettings && Object.keys(userSettings).length >= 1
    ? userSettings
    : {
        status: 0,
        dateOfApproval: null,
        settings: {
          analytics: true,
          functionals: true,
        },
      };
};
export const SetCookiesSelected = (userSttings: IUserSttings) => {
  localStorage.setItem("wp_cookies_editor", JSON.stringify(userSttings));
};
