import { LanguageType } from "../type";

const name = "i18n-Language";

let cache: string;
let language: string = LanguageType.auto;

export const get = function(): string {
  const value = document.cookie;
  if (!cache || cache !== value) {
    cache = value;
    const reg = new RegExp(`${name}=(\\S+)`, "i");
    const [, type = ""] = value.match(reg) || [];
    if (type) {
      const v = type.trimEnd().replace(/\;?$/i, "");
      const t = v.trim().toLocaleLowerCase();
      switch(t) {
        case LanguageType.cn:
          language = LanguageType.cn;
          break;
        case LanguageType.en:
          language = LanguageType.en;
          break;
        default:
          language = LanguageType.auto;
          break;
      }
    }
  }
  return language;
}

export const set = function(value?: string): void {
  if (value) {
    if (String(get()) === String(value)) {
      return;
    }
    const expires = new Date(Date.now() + 365 * 864e5);
    const data = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; path=/; expires=${expires.toUTCString()};`;
    document.cookie = data;
  }
}

