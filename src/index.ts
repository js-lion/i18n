/**
 * @file I18n
 * @author svon.me@gmail.com
 */

import I18nGet from "./lib/get";
import Language from "./lib/i18n";
export { LanguageType } from "./type";

export { Language }

export const I18n = function<T = Language>(language?: string, languageValues?: object): T & Language {
  const i18n = new Language(language);
  if (languageValues) {
    i18n.append(languageValues);
  }
  return I18nGet(i18n) as any;
};

