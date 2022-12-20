export const deleteCookie = (analytics: boolean) => {
  if (analytics === true) {
    let cookies = document.cookie.split(";");
    if (cookies.length) {
      cookies = cookies.map((cook) => cook.trim());
    }
    for (var i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      if (typeof cookie === "string") {
        deleteAnalyticsCookies(cookie);
      }
    }
  }
};

const deleteAnalyticsCookies = (cookie: string) => {
  if (cookie.search(/^_ga_\w+/) === 0 || cookie.search(/^_ga_/) === 0) {
    document.cookie = cookie + ";max-age=0";
    console.log("deleteAnalyticsCookies.cookie", cookie);
  }
  if (cookie.search(/^_ga=\w+/) === 0) {
    document.cookie = cookie + ";max-age=0";
    console.log("deleteAnalyticsCookies.cookie", cookie);
  }
};
