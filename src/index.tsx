import React from "react";
import ReactDOM from "react-dom/client";
import common_en from "./translations/en/common_en.json";
import common_es from "./translations/es/common_es.json";
import { I18nextProvider } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import i18next from "i18next";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

i18next.use(LanguageDetector).init({
  interpolation: { escapeValue: false },
  lng: "es", // language to use
  resources: {
    es: {
      common: common_es,
    },
    en: {
      common: common_en,
    },
  },
});

const root = ReactDOM.createRoot(
  document.querySelector(".wp-cookie-policy-settings") as HTMLElement
);
root.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18next}>
      <App />
    </I18nextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
