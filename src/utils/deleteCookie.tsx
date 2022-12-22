import { ICookieSettings } from "../interfaces/ICookieSettings";

export const deleteCookie = (options: ICookieSettings) => {
  let cookies = document.cookie.split(";");
  if (cookies.length) {
    cookies = cookies.map((cook) => cook.trim());
  }
  for (var i = 0; i < cookies.length; i++) {
    const cookie = cookies[i];
    if (typeof cookie === "string") {
      if (options.analytics === true) {
        deleteAnalyticsCookies(cookie);
      }
      if (options.functional === true) {
        deleteFunctionalCookies(cookie);
      }
    }
  }
};

const deleteAnalyticsCookies = (cookie: string) => {
  if (
    cookie.search(/^_ga_\w+/) === 0 ||
    cookie.search(/^_ga_\w+/) === 0 ||
    cookie.search(/^_ga=\w+/) === 0 ||
    cookie.search(/^_gat_gtag_UA_\w+/) === 0 ||
    cookie.search(/^_gid=\w+/) === 0
  ) {
    document.cookie = cookie + ";max-age=0";
  }
  console.log("deleteAnalyticsCookies.cookie", cookie);
};

const deleteFunctionalCookies = (cookie: string) => {
  if (
    cookie.toUpperCase().search(/^_GRECAPTCHA/) === 0 ||
    cookie.toUpperCase().search(/^_GRECAPTCHA\w+/) === 0
  ) {
    document.cookie = cookie + ";max-age=0";
  }
  console.log("deleteFunctionalCookies.cookie", cookie);
};
