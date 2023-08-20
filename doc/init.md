目录结构

```
src
  langs
    en
      common.ts
      index.ts
    index.ts
  utils
    i18n.ts
```

src/langs/en/common.ts
```
export default {
  hello: "hello {label}",
  placeholder: {
    input: "Please input {label}"
  },
  button: {
    submit: "Submit"
  }
};
```

src/langs/en/index.ts
```
export { default as common } from "./common";
```

src/langs/index.ts
```
import * as EN from "./en/index";
import { LanguageType } from "@js-lion/i18n";

export const Langs = {
  [LanguageType.en]: EN,
};
```

src/utils/i18n.ts
```
import { I18n } from "@js-lion/i18n";
import { Langs } from "src/langs/index";

const i18n = I18n<typeof Langs[LanguageType.en]>(LanguageType.en, Langs);
export default i18n;
```