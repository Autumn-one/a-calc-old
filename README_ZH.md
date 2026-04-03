# a-calc

**📖 完整文档：[https://a-calc.vercel.app/](https://a-calc.vercel.app/)**

[![npm version](https://img.shields.io/npm/v/a-calc.svg)](https://www.npmjs.com/package/a-calc) [![npm downloads](https://img.shields.io/npm/dw/a-calc)](https://www.npmjs.com/package/a-calc)

强大易用的 JavaScript 精度计算与格式化库。

## 特性

- **精确计算** — 解决 JavaScript 浮点数精度问题（`0.1 + 0.2 = 0.3`）
- **丰富格式化** — 千分位、百分比、分数、科学计数法、紧凑格式
- **单位计算** — 支持带单位的数字运算
- **链式 API** — 流畅的链式运算（`cadd(1,2).mul(3)()`）
- **聚合函数** — `calc_sum`、`calc_avg`、`calc_max`、`calc_min`、`calc_count`
- **多计算模式** — Decimal（默认）、BigInt、WASM
- **高性能** — 同类库中最快
- **TypeScript** — 完整类型支持与智能推导

## 安装

```bash
npm install a-calc
```

## 引入

```javascript
// ES Module
import { calc, fmt, cadd } from "a-calc";

// CommonJS
const { calc, fmt, cadd } = require("a-calc");
```

## 快速开始

```javascript
// 精确计算
calc("0.1 + 0.2");                        // "0.3"
calc("0.1 + 0.2 * 0.3 / 0.4 * (0.5 + 0.6)"); // "0.265"

// 变量计算
calc("a + b", { a: 1, b: 2 });            // "3"
calc("price * qty | =2", { price: 9.9, qty: 3 }); // "29.70"

// 格式化
calc("1234567 | ,");                       // "1,234,567"
calc("1234567 | =2,");                     // "1,234,567.00"
calc("1234567 | !c");                      // "1.23M"

// 直接格式化（v3.0 新 API）
fmt(1234567, "=2,");                       // "1,234,567.00"
fmt(1234567, "!c");                        // "1.23M"

// 链式 API（v3.0）
cadd(100, 200, 300)();                     // "600"
cadd(100, 200).mul(2)("=2,");             // "600.00"

// 聚合函数（v3.0）
import { calc_sum, calc_avg, calc_max, calc_min } from "a-calc";
calc_sum("price", [{ price: 10 }, { price: 20 }]);  // "30"
calc_avg("score", [{ score: 80 }, { score: 90 }]);  // "85"
```

## 核心 API

### calc(expr, options?)

计算表达式，支持变量和格式化。

```javascript
calc("a * b + c", { a: 1, b: 2, c: 3 });  // "5"
calc("100 + 200 | ,");                     // "300"
calc("0.1% + 0.2%", { _unit: true });      // "0.3%"
calc("a > 10 ? a * 0.9 : a", { a: 15 });   // "13.5"
```

### fmt(value, format?)

直接格式化数字（v3.0 新 API）。

```javascript
fmt(1234567, ",");       // "1,234,567"
fmt(0.1234, "=2");       // "0.12"
fmt(1234567, "!c:wan");  // "123.45万"
```

### 格式化参数

| 参数 | 说明 | 示例 |
|------|------|------|
| `=N` | 固定 N 位小数 | `=2` → "1.00" |
| `<=N` | 最多 N 位小数 | `<=2` → "1.1" |
| `>=N` | 最少 N 位小数 | `>=2` → "1.00" |
| `,` | 千分位 | "1,000" |
| `+` | 显示正号 | "+1" |
| `%%` | 百分比 | "50%" |
| `//` | 分数 | "1/2" |
| `!e` | 科学计数法 | "1e+3" |
| `!n` | 输出数字类型 | 返回 `number` |
| `!c` | 紧凑格式 | "1.23M" |
| `!c:preset` | 紧凑预设 | `!c:wan` → "1.23万" |
| `!t:preset` | 千分位预设 | `!t:eu` → "1.234,50" |
| `!i:N` | 整数补零 | `!i:3` → "005" |
| `~-` | 截断（默认） | |
| `~5` | 四舍五入 | |
| `~6` | 银行家舍入 | |
| `~+` | 向上取整 | |

### 链式 API（v3.0）

```javascript
import { cadd, csub, cmul, cdiv } from "a-calc";

cadd(1, 2, 3)();                // "6"
cadd(10).sub(3).mul(2)();       // "14"
cadd(1000, 2000)("=2,");       // "3,000.00"
```

### 独立运算函数（v3.0）

```javascript
import { add, sub, mul, div } from "a-calc";

add(0.1, 0.2);    // 0.3（返回 number）
mul(3, 4, 5);      // 60（返回 number）

// 字符串输出用 r 前缀
import { radd, rmul } from "a-calc";
radd("0.1", "0.2"); // "0.3"（返回 string）
```

### 配置系统（v3.0）

```javascript
import { set_config, reset_config } from "a-calc";

set_config({ _error: 0 });           // 错误返回 0 而非 "-"
set_config({ _fmt: "=2," });         // 全局默认格式化
set_config({ _compact_default: "wan" }); // 默认紧凑预设
reset_config();                       // 重置所有配置
```

### 错误处理

```javascript
calc("1 + invalid", { _error: "-" }); // 计算出错返回 "-"
calc("a + b", { a: 1, _error: 0 });   // 缺少 b，返回 0
```

## 性能对比

| 库 | 50,000 次 | 500,000 次 |
|---|---|---|
| **a-calc** | 423ms | 3650ms |
| mathjs@13.0.2 | 610ms | 5724ms |
| math-expression-evaluator | 701ms | 6764ms |
| mathjs@12.4.3 | 3791ms | 36948ms |

## 完整文档

更多高级功能（单位转换、计算模式、格式化分组、千分位/紧凑预设配置等），请访问：

**📖 [https://a-calc.vercel.app/](https://a-calc.vercel.app/)**

## 许可证

[MIT](./LICENSE)
