import polyglotI18nProvider from "ra-i18n-polyglot";

import fa from "../languages/persian";
import en from "../languages/english";

const messages: { [key: string]: any } = {
  fa: fa,
  en: en,
};

export const i18nProvider = polyglotI18nProvider(
  (locale) => messages[locale],
  "fa"
);
