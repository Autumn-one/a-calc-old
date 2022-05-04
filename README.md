# a-calc
A string of four operations of the library, can solve the js digital calculation accuracy of scientific notation and formatting problems, support for thousands of decimal point formatting output operations

(一个字符串四则运算的库, 可以解决js数字计算精度 科学记数法和格式化的问题, 支持千分位小数点格式化输出等操作)

> Supported operators (支持的运算符) :  + - * / %
>

## Install(安装)

```
npm install a-calc
```

## Import(引入)

**commonjs**

```js
const {calc, fmt} = require("a-calc")
```

**es module**

```js
import {calc, fmt} from "a-calc"
```

**browser**

```html
<script src="node_modules/a-calc/browser/index.js"></script>
<script>
const {calc, fmt} = a_calc
</script>
```

## Calculate(计算)

```js
calc("0.1 + 0.2") // 0.3
calc`0.1 + 0.2` // 0.3
// 以上方式等价

// 复杂一点的计算
calc("0.1 + 0.2 * 0.3 / 0.4 * (0.5 + 0.6)") // 0.265
```

**Fill and calculate(填充变量并计算)**

```js
let a = 0.000001
let b = 888.789
calc("a + b", {a,b}) // 0.000001 + 888.789 = 888.789001
```

## Calculate & Format (计算并格式化)

```js
// 操作小数位数
calc("0.1 + 0.2 | =2") // 0.30
calc("0.11111 + 0.11111 | <=4") // 0.2222
calc("0.11 + 0.11 | <=4") // 0.22
calc("0.1 + 0.2 | >= 5") // 0.30000
calc("0.0000001+ 0.0000001 | >= 5") // 0.0000002

// 千分位
calc("10000000 + 100000000 | ,") // 110,000,000

// 同时指定小数位和千分位
calc("10000000 + 100000000 | =10 ,") // 110,000,000.0000000000
```



## Only Format(只格式化)

```js
calc("0.1 | =2") // 0.10
fmt("0.1 | =2") // 0.10
// calc 具备 fmt 的功能, 但是fmt具备更好的语义

fmt("1000000 | ,") // 1,000,000
```



## Attention(注意)

- Do not wrap parentheses around single numbers (不要对单个数字包裹括号)

## Video Tutorial(视频教程)

待定

## Issue To(问题提交)

If you have any questions, pstlease send email to 718879459@qq.com as soon as possible to give me feedback

(如果遇到了什么问题, 请第一时间向我发送反馈邮件, 718879459@qq.com 对于bug我会第一时间修复他)



