/**
 * @file i18n
 * @author svon.me@gmail.com
 */

import * as cookie from "./cookie";
import { LanguageType } from "../type";
import { template } from "@js-lion/template";
import safeGet from "@fengqiaogang/safe-get";
import safeSet from "@fengqiaogang/safe-set";

// 将字符转小写
const toLower = function(value: string = ""): string {
  return value.toLowerCase();
}
// 将字符转大写
const toUpper = function(value: string = ""): string {
  return value.toUpperCase();
}

// 首字符大写, 其余字符保持不变
const upperFirst = function(value: string): string {
  return value.replace(/^(\w)/, ($1: string) => toUpper($1));
}

export default class I18n {
  public values: object = {};
  constructor(language?: string) {
    this.setLanguage(language);
  }
  hasLanguage(language?: string) {
    if (language && safeGet(this.values, language)) {
      return true;
    }
    return false;
  }
  getLanguage () {
    return cookie.get();
  }
  setLanguage (language?: string) {
    if (language) {
      cookie.set(language);
      return true;
    }
    return false;
  }
  append(langValue: object) {
    const app = (data: object, path: string[] = []) => {
      for (const key of Object.keys(data)) {
        const value = safeGet<any>(data, key);
        if (value && typeof value === "object") {
          app(value, [...path, key]);
        } else {
          safeSet(this.values, [...path, key], value);
        }
      }
    }
    app(langValue);
  }
  template (tpl: string, value?: object | string): string {
    if (value && typeof value === "string") {
      return template(tpl, function() {
        return value;
      })
    }
    if (value && typeof value === "object") {
      return template(tpl, value);
    }
    return template(tpl, {});
  }
  part (value: string = "", index?: number | object, data?: object) {
    if (typeof index === "object") {
      data = index as object;
      index = 0;
    }
    index = Number(index);
    if (isNaN(index)) {
      index = 0;
    }
    if (index < 0) {
      index = 0;
    }
    const array: string[] = String(value || "").split("|").map((text) => text.trim());
    if (index >= array.length) {
      index = array.length - 1;
    }
    const text = array[index];
    return this.template(text, data);
  }
  // 用于输入框占位提示语
  placeholder(tpl: string, value?: object | string): string {
    const text = this.template(tpl, value);
    const str = toLower(text);
    return upperFirst(str);
  }
  rule(tpl: string, value?: object | string) {
    const text = this.placeholder(tpl, value);
    if (this.getLanguage() === LanguageType.cn) {
      return `${text}！`;
    }
    return `${text}!`;
  }
  get(key: string | string[]) {
    return safeGet(this.values, [this.getLanguage()].concat(key as any));
  }
}