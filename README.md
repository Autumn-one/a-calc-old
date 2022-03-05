# a-calc
A string of four operations of the library, can solve the js digital calculation accuracy of scientific notation and formatting problems, support for thousands of decimal point formatting output operations

(一个字符串四则运算的库, 可以解决js数字计算精度 科学记数法和格式化的问题, 支持千分位小数点格式化输出等操作)

> 支持的运算符: + - * / %

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
import a_calc from "a-calc"

const {calc, fmt} = a_calc
```

**browser**

```html
<script src="node_modules/numbro/dist/numbro.js"></script>
<script src="node_modules/a-calc/dist/calc.js"></script>
<script>
const {calc, fmt} = a_calc
</script>
```

## Calculate(计算)

```js
calc("0.1 + 0.2") // 0.3
calc`0.1 + 0.2` // 0.3
// 以上方式等价

calc("0.1 + 0.2 * 0.3 / 0.4 * (0.5 + 0.6)") // 0.265
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

https://www.bilibili.com/video/BV17R4y1G7DS?from=search&seid=11611588186602414425&spm_id_from=333.337.0.0

