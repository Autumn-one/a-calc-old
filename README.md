# a-calc

**📖 Full Documentation: [https://a-calc.vercel.app/](https://a-calc.vercel.app/)**

[![npm version](https://img.shields.io/npm/v/a-calc.svg)](https://www.npmjs.com/package/a-calc) [![npm downloads](https://img.shields.io/npm/dw/a-calc)](https://www.npmjs.com/package/a-calc)

A powerful and easy-to-use JavaScript library for precision arithmetic and number formatting.

## Features

- **Precision Arithmetic** — Solves JavaScript floating-point issues (`0.1 + 0.2 = 0.3`)
- **Rich Formatting** — Thousands separators, percentages, fractions, scientific notation, compact format
- **Unit Arithmetic** — Calculate with units attached to numbers
- **Chain API** — Fluent chainable arithmetic (`cadd(1,2).mul(3)()`)
- **Aggregation** — `calc_sum`, `calc_avg`, `calc_max`, `calc_min`, `calc_count`
- **Multiple Compute Modes** — Decimal (default), BigInt, WASM
- **High Performance** — Fastest among similar libraries
- **TypeScript** — Full type support with smart inference

## Install

```bash
npm install a-calc
```

## Quick Start

```javascript
import { calc, fmt, cadd } from "a-calc";

// Precision arithmetic
calc("0.1 + 0.2");                        // "0.3"
calc("0.1 + 0.2 * 0.3 / 0.4 * (0.5 + 0.6)"); // "0.265"

// Variables
calc("a + b", { a: 1, b: 2 });            // "3"
calc("price * qty | =2", { price: 9.9, qty: 3 }); // "29.70"

// Formatting
calc("1234567 | ,");                       // "1,234,567"
calc("1234567 | =2,");                     // "1,234,567.00"
calc("1234567 | !c");                      // "1.23M"

// Direct formatting (v3.0)
fmt(1234567, "=2,");                       // "1,234,567.00"
fmt(1234567, "!c");                        // "1.23M"

// Chain API (v3.0)
cadd(100, 200, 300)();                     // "600"
cadd(100, 200).mul(2)("=2,");             // "600.00"

// Aggregation (v3.0)
import { calc_sum, calc_avg, calc_max, calc_min } from "a-calc";
calc_sum("price", [{ price: 10 }, { price: 20 }]);  // "30"
calc_avg("score", [{ score: 80 }, { score: 90 }]);  // "85"
```

## Core API

### calc(expr, options?)

Evaluate expression with optional variables and formatting.

```javascript
calc("a * b + c", { a: 1, b: 2, c: 3 });  // "5"
calc("100 + 200 | ,");                     // "300"
calc("0.1% + 0.2%", { _unit: true });      // "0.3%"
calc("a > 10 ? a * 0.9 : a", { a: 15 });   // "13.5"
```

### fmt(value, format?)

Format a number directly (v3.0 new API).

```javascript
fmt(1234567, ",");       // "1,234,567"
fmt(0.1234, "=2");       // "0.12"
fmt(1234567, "!c:wan");  // "123.45万"
```

### Formatting Reference

| Token | Description | Example |
|-------|-------------|---------|
| `=N` | Fixed N decimals | `=2` → "1.00" |
| `<=N` | At most N decimals | `<=2` → "1.1" |
| `>=N` | At least N decimals | `>=2` → "1.00" |
| `,` | Thousands separator | "1,000" |
| `+` | Show positive sign | "+1" |
| `%%` | Percentage | "50%" |
| `//` | Fraction | "1/2" |
| `!e` | Scientific notation | "1e+3" |
| `!n` | Output as number | returns `number` |
| `!c` | Compact format | "1.23M" |
| `!c:preset` | Compact preset | `!c:wan` → "1.23万" |
| `!t:preset` | Thousands preset | `!t:eu` → "1.234,50" |
| `!i:N` | Integer zero-padding | `!i:3` → "005" |
| `~-` | Truncate (default) | |
| `~5` | Round half up | |
| `~6` | Banker's rounding | |
| `~+` | Round up | |

### Chain API (v3.0)

```javascript
import { cadd, csub, cmul, cdiv } from "a-calc";

cadd(1, 2, 3)();                // "6"
cadd(10).sub(3).mul(2)();       // "14"
cadd(1000, 2000)("=2,");       // "3,000.00"
```

### Standalone Arithmetic (v3.0)

```javascript
import { add, sub, mul, div } from "a-calc";

add(0.1, 0.2);    // 0.3 (number)
mul(3, 4, 5);      // 60 (number)

// String output with r-prefix
import { radd, rmul } from "a-calc";
radd("0.1", "0.2"); // "0.3" (string)
```

### Configuration (v3.0)

```javascript
import { set_config, reset_config } from "a-calc";

set_config({ _error: 0 });           // Error returns 0 instead of "-"
set_config({ _fmt: "=2," });         // Global default format
set_config({ _compact_default: "wan" }); // Default compact preset
reset_config();                       // Reset all
```

## Performance

| Library | 50,000 ops | 500,000 ops |
|---------|-----------|------------|
| **a-calc** | 423ms | 3650ms |
| mathjs@13.0.2 | 610ms | 5724ms |
| math-expression-evaluator | 701ms | 6764ms |
| mathjs@12.4.3 | 3791ms | 36948ms |

## Documentation

For complete API reference, advanced features (unit conversion, compute modes, format groups, etc.), visit:

**📖 [https://a-calc.vercel.app/](https://a-calc.vercel.app/)**

## License

[MIT](./LICENSE)
