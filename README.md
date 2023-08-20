# @ue/i18n

国际化多语言工具

## 初始化
[代码结构](./doc/init.md)

## 获取文案

```
import i18n from "src/utils/i18n";

i18n.common.button.submit; // Submit
i18n.common.button.hello;  // hello {label}
...
```

## 方法

### append
添加语言文案
```
import i18n from "src/utils/i18n";
const languages: object = {};
i18n.append(languages);
```

### getLanguage
查询当前语言
```
import i18n from "src/utils/i18n";
const language: string = i18n.getLanguage();
```

### setLanguage
切换语言
<br/>
切换语言后, 页面已显示的文案不会自动切换, 建议刷新页面
```
import i18n from "src/utils/i18n";
i18n.setLanguage("language");
```

### template
模板替换, **常用于公共文案, 进行简单的变量替换得到一个新的文案**
```
import i18n from "src/utils/i18n";
const text = i18n.template(i18n.common.hello, { label: "world" });
// hello world

const text = i18n.template("姓名: {name}, 年龄: {age}", { name: "张三", age: 20 });
// 姓名: 张三, 年龄: 20
```

### placeholder
同 template 一样, 在此基础上进行大小写转换, 除首字母外的字符转换为小写, 首字母大写
<br/>
**常用于输入框占位符提示**
```
import i18n from "src/utils/i18n";
const text = i18n.placeholder(i18n.common.placeholder.input, { label: "name" });
// Please input name
```

如果需要替换的模板只有一个变量时可用
```
const text = i18n.placeholder(i18n.common.placeholder.input, "name");
// Please input name
```

### rule
同 placeholder 一样, 在此基础上会在末尾添加一个感叹号, 中文时添加中文格式感叹号, 其余语言默认添加英文格式感叹号
<br/>
**常用于表单错误提示语**
```
import i18n from "src/utils/i18n";
const text = i18n.rule(i18n.common.placeholder.input, { label: "name" });
// Please input name!
```

如果需要替换的模板只有一个变量时可用
```
const text = i18n.rule(i18n.common.placeholder.input, "name");
// Please input name!
```

### part
常用在需要区分单数与复数时
<br/>
中文情况
```
import i18n from "src/utils/i18n";
const template = "{count}个苹果";
const text = i18n.part(template, 0, { count: 0 }); // 0个苹果
const text = i18n.part(template, 1, { count: 1 }); // 1个苹果
const text = i18n.part(template, 2, { count: 2 }); // 2个苹果
const text = i18n.part(template, 3, { count: 3 }); // 3个苹果
const text = i18n.part(template, 4, { count: 4 }); // 4个苹果
```
英文情况
```
import i18n from "src/utils/i18n";
const template = "Zero apples | 1 apple | {count} apples";
const text = i18n.part(template, 0, { count: 0 }); // Zero apples
const text = i18n.part(template, 1, { count: 1 }); // 1 apple
const text = i18n.part(template, 2, { count: 2 }); // 2 apples
const text = i18n.part(template, 3, { count: 3 }); // 3 apples
const text = i18n.part(template, 4, { count: 4 }); // 4 apples
```
