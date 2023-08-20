
import I18n from "./i18n";
import safeGet from "@fengqiaogang/safe-get";

const toJSON = function(value: string = "{}"): object {
  // eval(`(${value})`)
  const text = value.replace(/(\s*[a-z0-9]+\s?:)/ig, function($1: string, $2: string) {
    const key = $2.trim().replace(":", "").replace(/\s+/g, "");
    return ` "${key}": `;
  });
  try {
    const data = JSON.parse(text);
    return data;
  } catch (error) {
    return {};
  }
}

const template = function (i18n: I18n, code: string): string {
  code = code.replace(/^[a-z]+\(|\);?$/ig, "");
  const index = code.indexOf(",");
  let key = code.slice(0, index).trim();
  const data = code.slice(index + 1).trim();
  if (/^i18n/i.test(key)) {
    key = key.replace(/^i18n\./i, "");
  }
  const text = safeGet<string>(self, key);
  if (text) {
    try {
      return i18n.template(text, toJSON(data));
    } catch (error) {
      // todo
    }
  }
  return "";
};

const part = function (i18n: I18n, code: string): string {
  code = code.replace(/^[a-z]+\(|\);?$/ig, "");
  let key = code.slice(0, code.indexOf(",") + 1);
  const temp = code.slice(key.length);
  let index = temp.slice(0, temp.indexOf(","));
  let data: string;
  if (index && /^\d+$/g.test(index.trim())) {
    data = temp.slice(index.length + 1);
  } else {
    index = "0";
    data = temp;
  }
  key = key.replace(/,/g, "").trim();
  index = index.replace(/,/g, "").trim();
  data = data.trim();
  if (/^i18n/i.test(key)) {
    key = key.replace(/^i18n\./i, "");
  }
  const text = safeGet<string>(self, key);
  if (text) {
    try {
      if (/^\d+$/.test(index)) {
        return i18n.part(text, Number(index), toJSON(data));
      }
      return i18n.part(text, 0, toJSON(data));
    } catch (error) {
      // todo
    }
  }
  return "";
};

const i18nGet = function(i18n: I18n) {
  let self: I18n;
  const app = function(data: any) {
    const get: any = function(target: any, prop: string) {
      let value;
      if (target instanceof I18n) {
        if (safeGet(target, prop)) {
          return safeGet(target, prop);
        }
        const lang = i18n.getLanguage();
        const data = safeGet(i18n.values, lang);
        value = safeGet(data, prop);
      } else {
        value = safeGet(target, prop);
      }
      if (value == null) {
        return value;
      }
      if (typeof value === "number") {
        return value;
      }
      if (typeof value === "string" && value.length === 0) {
        return value;
      }
      if (value && typeof value === "string") {
        value = value.trim();
        if (/^template\(/.test(value)) {
          return template(i18n, value.trim());
        }
        if (/^part\(/.test(value)) {
          return part(i18n, value.trim());
        }
        return value;
      }
      if (value && typeof value === "object") {
        return app(value);
      }
    };
    return new Proxy(data, { get });
  }
  self = app(i18n);
  return self;
};

export default i18nGet;