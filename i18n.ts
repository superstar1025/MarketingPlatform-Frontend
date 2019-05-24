import i18n from "i18next";
import detector from "i18next-browser-languagedetector";
import { reactI18nextModule } from "react-i18next";

import authorizationEN from "./locales/en/authorization.json";
import dashboardEN from "./locales/en/dashboard.json";
import formValidationEN from "./locales/en/formValidation.json";
import navigationEN from "./locales/en/navigation.json";
import catalogEN from "./locales/en/catalog.json";
import ordersEN from "./locales/en/orders.json";
import imageTitlesEN from "./locales/en/imageTitles.json";
import walletEN from "./locales/en/wallet.json";

// TODO: figure out how to type this w/out .init callback error below
const resources = {
  en: {
    authorization: authorizationEN,
    dashboard: dashboardEN,
    catalog: catalogEN,
    orders: ordersEN,
    formValidation: formValidationEN,
    imageTitles: imageTitlesEN,
    navigation: navigationEN,
    wallet: walletEN
  }
};

i18n
  .use(detector)
  .use(reactI18nextModule) // passes i18n down to react-i18next
  .init({
    detection: {
      order: [
        "navigator",
        "querystring",
        "cookie",
        "localStorage",
        "htmlTag",
        "path",
        "subdomain"
      ]
    },
    fallbackLng: "en",
    interpolation: {
      escapeValue: false // react already safes from xss
    },
    resources
  });

export default i18n;
