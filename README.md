# a-calc
![Static Badge](https://img.shields.io/badge/a--calc-1.3.11-green?style=flat&link=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fa-calc) ![Static Badge](https://img.shields.io/badge/Javascript-5A5A5A?style=flat&logo=javascript&link=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fa-calc) ![Static Badge](https://img.shields.io/badge/Typescript-5A5A5A?style=flat&logo=typescript&logoColor=F7DF1E&link=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fa-calc)

A library for performing four operations on numeric strings originating from actual business can solve the following problems:

* Size: Uncompressed volume is 56KB. Gzip compressed volume is 18KB.
* The precision problem of JS numerical computation.
* The coding experience with other third-party libraries is poor and formatting is not convenient enough.
* Number calculations may output in scientific notation
* Numeric formatting, thousand-separator output, direct formatting into percentage, retaining positive or negative signs, direct fraction output, etc.
* Calculation or formatting of numbers with units, e.g. `0.1% + 2%`
* Calculation using scientific notation, e.g. `-2e3 + 6`
* Supports four kinds of rounding rules: truncating, incrementing, rounding, and rounding to even (a more precise method).

> Supported operators :  + - * / % ** 

**Language：** English | [简体中文](https://github.com/Autumn-one/a-calc-old/blob/main/README_ZH.md)

## Installation

```
npm install a-calc
```

## Import

**commonjs**

```js
const {calc, fmt} = require("a-calc")
// or
const {calc, fmt} = require("a-calc/cjs") // Note that this syntax specifically uses the cjs version. Some bundlers will transform the syntax. If writing a-calc directly doesn't work, try changing it to a-calc/cjs.
```

**es module**

```js
import {calc, fmt} from "a-calc"
// or
const {calc, fmt} from "a-calc/es"
```

**browser**

```html
<script src="node_modules/a-calc/browser/index.js"></script>
<script>
const {calc, fmt} = a_calc
</script>
```

## Four arithmetic operations (supports scientific notation)

```js
calc("0.1 + 0.2") // 0.3

// More complex calculation
calc("0.1 + 0.2 * 0.3 / 0.4 * (0.5 + 0.6)") // 0.265

// Calculation in scientific notation
calc("-2e2 + 3e+2") // 100
```

## About the space

Spaces are not necessary in cases where there is no ambiguity, and it can even correctly parse the hard-to-read-by-human formula `calc("-2e+2+3e+2")`. However, this makes the clarity too low. Please try your best to write clearer code instead of shit! <span style="color: red;">Always include spaces in your calculation, which makes it more beautiful and clear, just like the examples I wrote!!!</span>

By the way, here's an ambiguous formula `calc("50%%2", {_unit: true})`. This ambiguity obviously occurs in calculations with units. Since the parser doesn't know if your unit is `%` or `%%`, you should use a space to give a clear meaning. The correct way to write is `calc("50% % 2", {_unit: true})`.

In short, always add spaces!

## Fill in variables and calculate (important)

**The calculated value is precise and scientific notation will not appear.**

```js
let a = 0.000001
let b = 888.789
calc("a + b", {a,b}) // 0.000001 + 888.789 = 888.789001

calc("a * (b + c) % d + 7.123", [
    {a: 1, b: 2},
    {c: 3, d: 4}
]) // 8.123

// A bit more complex
calc("1 + o.a / arr[0].d",{
    o: { a: 2 },
    arr: [{ d: 8 }]
}) // 1.25

calc("a + b - c",[
    {a: 1},
    {b: 2, c: 3}
])
```

## Calculation with units

> The actual situation is not always ideal, maybe we have to calculate two percentage numbers. Fortunately, a-calc now supports these operations, but please note that the unit will be taken from the first number carrying a unit, and the units later will be ignored.

```js
// Please note that _unit is required and not enabled by default. This is because calculations with units will perform some additional operations, and in contrast, pure numerical calculations are faster.
calc("1 + 2%", {_unit: true}) // 3%

calc("1.123$$$ + 2.88% | + =6", {_unit: true}) // +4.003000$$$
```

After version 1.0.6, calculations with units can have more parameters. The value of `_unit` can be `boolean | "on" | "off" | "auto" | "space"`. The parameters seem to be a lot but actually are similar to the previous usage. The effects of `true "on" "auto"` are the same, which means to automatically recognize the unit after the number. `false "off"` means to turn off the unit calculation. The biggest difference is the "space" value, which only treats the space as a unit separator. For example, if your unit happens to be +-, it will be recognized as an operator in normal mode, so you can use the "space" mode. But in this case, the space is necessary. You should write like this: `calc("2+- * 3")`. The final result is: `6+-`.

In actual development, you may hope that the final result does not automatically carry units. In versions after 1.3.6, you can remove units from the result through the formatting parameter `!u`, or you can directly output the number with `!n`.

## Calculate and format

Formatting supports the following functions: limiting the number of decimal places, preserving positive and negative signs, outputting as a percentage, outputting in scientific notation, outputting, and they can be combined. However, there are some situations where combinations do not work. You can try it yourself, there are too many combination situations, and I won't list them all.

**Formatting list：**

- `>or>=or<or<=or=number` means to limit the number of decimal places, for example: `<=2` means the number of decimal places should be less than or equal to 2 `>3` means the number of decimal places must be greater than 3, this is equivalent to `>=4`
- `,` Output as a thousandth place numeric string
- `/` Output as a fraction
- `+` The output positive numbers are marked with a `+` sign
- `%` Output percentage numbers, which can be combined with the option to limit the number of decimals.
- `!e` Output in scientific notation, e can be capitalized
- `!n` Output as a number, not a numeric string, n can be capitalized. After version 1.3.6, this has the highest priority, and any other formatting parameters cannot affect this parameter.
- `!u` Remove units from the result

```js
// Operate the decimal places
calc("0.1 + 0.2 | =2") // 0.30
calc("0.11111 + 0.11111 | <=4") // 0.2222
calc("0.11 + 0.11 | <=4") // 0.22
calc("0.1 + 0.2 | >= 5") // 0.30000
calc("0.0000001+ 0.0000001 | >= 5") // 0.0000002

// Preserve positive and negative signs
calc("1 + 1 | +") // +2

// Thousandth place
calc("10000000 + 100000000 | ,") // 110,000,000

// Fraction
calc("0.025 + 0.2 | /") // 9/40

// Percentage
calc("1 + 1 | %") // 200%

// Scientific notation, note that this e can also be capitalized
calc("1 + 1 | !e") // 2e+0

// Simultaneously specify decimals and thousandth place while preserving the positive and negative signs
calc("10000000 + 100000000 | +,=10") // +110,000,000.0000000000
```

## Four kinds of rounding rules

The rounding rules are added to the part of the formatting string, and their symbols are:

- `~-` Truncation, the default rounding rule
- `~+` Increment
- `~5` Rounding
- `~6` Round to Even, this rounding rule is more accurate than the normal rounding. The rule is different when the number after the rounding is 5. It will check the position after 5. If the number after 5 is not 0, it will increment. If the number after 5 is 0, it will check whether the number before 5 is even or not. If it is even, it will not increment. If it is not even, it will increment.

```js
calc("0.11 + 0.22 | =1 ~+") // 0.4 Keep one place and increment it
calc("0.55 | =1 ~5") // 0.6
calc("0.65 | =1 ~6") // 0.6
```

This newly added rounding rule seems to make the formatting part longer, but the actual situation is not like this. Generally, the rounding rule of a project is fixed, so the formatting part of the rounding rule should be encapsulated in the default formatting parameters. When it is actually used, there is no need to write this part of the content at all. Refer to the following `default formatting` instructions.

## Only format

```js
calc("0.1 | =2") // 0.10
fmt("0.1 | =2") // 0.10
// calc has the function of fmt, but fmt has better semantics

fmt("1000000 | ,") // 1,000,000
```

## Configure version number printing and library update detection

You can turn on or off the console printing of the current library version number, and you can also turn on or off console prompts for whether there is a new version update.

```typescript
import { calc_util } from "a-calc"
calc_util.print_version(); // Print the version in the console
calc_util.check_update(); // Enable the update detection function. If there are updates, it will remind you in the console.
```

## Advanced techniques

**Error handling**

> Typically, using calc directly requires that the input calculation formula is completely correct, and by default a-calc will not help you handle errors in the formula. This can be filtered out by oneself, but in the project, we might not want to do this, so we need an additional advanced API to silently capture and give an appropriate return value when the input formula is incorrect.

```js
calc("1 + 2sd + d",{
    _fill_data: {d: 3}, // From here, the data source object needs to be assigned to _fill_data. This object can also be an array of objects. At this time, when obtaining data, it is searched item by item from the array, and it stops immediately when the first one is found.
    _error: "-", // When the calculation formula is wrong, it returns - as an alternative value.
})

// The above writing can be simplified a bit.
calc("1 + 2sd + d", {
    d: 8,
    _error: "-"
}) // This simplification is purely for convenience.
```

**Default formatting**

> In actual projects, you can optimize the development experience through default formatting.

```js
calc("111111 + 11111 | ,",{_fmt: "=2"}) // 122,222.00 Obviously , and =2 are combined, and the format string in the expression has a higher priority.
```

## How to encapsulate for the second time in the project?

In actual projects, the core calc function may not be extremely convenient. Therefore, `a-calc` provides a built-in function `calc_wrap` for secondary encapsulation after version 1.2.10. Essentially, it is an extension of calc, so it has all the former's capabilities but with more flexible writing methods and powerful type inference.

Please note that this may not be the only correct way to encapsulate. I just provided this feature. There is no dogma here. You should adapt flexibly to your own scenarios.

I suggest that if you decide to bring calc_wrap into the project, you can rename it as calc to save a few characters. The following will show some flexible writing methods and powerful type inference.

```typescript
// Note that here we rename calc_wrap as calc, because if you need to use the calc_wrap function, the core calc function is basically not needed, so if this good name is idle, it should be used.
import { calc_wrap as calc } from "a-calc";

const state = {
    a: 1,
    b: 2,
    c: 3
};

// When the passed parameter is a calculation formula without a variable name, it will directly return the calculation result.
calc( "(1 + 2) * 3" ); // Return type: string

// When the passed parameter is a suspected calculation formula containing a variable name and there is no second data source parameter, a function waiting for a data source to be passed will be returned. Yes, this function is achieved through static type deduction.
calc( "(a + b) * c" ); // Return type: ( data: any ) => string
calc( "(a + b) * c" )( state ); // Return type: string

// Maybe you want to inject the state first and then enter the expression. This is also possible.
calc( state ); // Return type: ( expr: string | number ) => string
calc( state )( "(a + b) * c" ); // Return type: string

// The original usage is naturally also supported.
calc( "a + b + c", state ); // Return type: string

// You can still mix configuration and data sources together, which is very convenient.
calc( "a + b + c" )( { ...state, _error: 0 } ); // Return type: string | 0
```

### Not recommended writing

`a-calc` can use the template string syntax, but I found that the readability of this writing method is very poor in practice. Unless you really have a sufficiently reasonable reason, it is not recommended to use the template string syntax.

```typescript
calc(`${a} + ${b}`) // This way of writing is not recommended.
calc("a + b", {a,b}) // Recommended writing, because it is clearer.
```



## Version changes

* 1.3.9 Solved the problem of failed rounding due to the part of the injection variable in formatting being 0 (Problem reporter: MangMax)
* 1.3.8 Solved the packaging failure problem caused by the upgrade of vite5.x (Problem reporter: 武建鹏）
* 1.3.6
    - The priority of the `!n` formatting parameter has been adjusted to the highest, and no other formatting parameters can affect it.
    - Added `!u` formatting parameter, which can remove the unit part from the result.
    - Type hint enhancement
* 1.3.4
    - Fixed the bug of rounding error between rounding off and rounding to nearest even number (bug provider: nanarino)
* 1.3.0
    - BREAKING CHANGE: Adjust the invocation method of printing version and checking update function
    - Refine Type Hints
    - Add more unit tests.
* 1.2.30
    - The previous version printed version numbers by default, now it is configurable and disabled by default
    - It provides an update detection function. Once enabled, the console will give a hint if there is a new version.
* 1.2.10
    - Remove the Vue integration example. The library itself is not bound to any specific frontend framework, in order to avoid misunderstandings, delete the corresponding integration code.
    - Add the functionality of `calc_wrap`, which is a secondary wrapper for the core function `calc` and can be used directly.
* 1.2.6
    - Adjust the integrated code of vue3. Since the component instances of vue3 are different in the development environment and the production environment, the production environment cannot obtain the state, but the development environment can.
* 1.2.0
    - A minor disruptive update, where the previous `-e` and `-n` have been changed to `!e` and `!n`, respectively.
    - Document Update
* 1.1.0
    - Small breaking change, the previous `\e` scientific counting output is now `-e`, others did not change
    - Added `-n` to output the number type
    - The limitation on decimal places is supported by the `<` and `>` symbols.
    - Fixed several rounding formatting issues.
    - The unit tests have increased to 107.
* 1.0.25
    - Update the document to simplify the integration of a-calc into Vue3.
* 1.0.23
    - Update the document and rewrite the recommended way to integrate a-calc into Vue3.
* 1.0.22
    - Optimize decimal rounding logic.
* 1.0.21
    - Refine the exported type definitions.
* 1.0.19
    - Fix the issue where errors may not be captured when _error is an empty string.
* 1.0.14
    - Fix the issue of `**` operator precedence error.
    - Fix the issue of extra zeros not being removed when formatting with `<=`.
* 1.0.12
    - Document adding library volume description
    - Fix the issue where adding the _error parameter when the expression is empty still causes an error, and include corresponding unit tests.
* 1.0.10
    - Update document
* 1.0.6
    * Destructive change: all exposed camelCase naming has been converted to snake_case, for example, `_fillData` is now `_fill_data`, as snake_case naming is clearer.
    * The internal code has been greatly simplified, the parser has been almost completely rewritten, resulting in a more stable user experience.
    * The original design was for the calc function to have all the functionalities of fmt. However, in versions prior to 1.0.6, although they adhered to this design, calc and fmt were implemented separately. Now fmt is simply an alias for calc.
    * Support the new operator **.
    * Support for the new formatting character % allows numbers to be output as percentages.
    * Support for the new formatting character `\e`, which can format numbers in scientific notation.
    - Fixed the issue where illegal formatting strings could cause an infinite loop.
    - Resolved the problem of 1/0 resulting in Infinity.
    - Added several unit tests.
    - More detailed type hints.
    - Updated documentation, added example code for integrating with Vue3.
* 0.0.80
    * Introducing four rounding rules: truncation, rounding up to the nearest integer, round half up, and round half down.
    - Enhanced detection of more boundary cases.
    - The fmt function allows omitting the format string. This feature enables you to use fmt to remove trailing zeros after the decimal point.
* 0.0.79 
    * Update document
* 0.0.78
    * Support calculation in scientific notation
    * Comprehensive unit testing
    * Detection of more boundary cases
* 0.0.72
    * Support writing single numerical values with units, for example `calc("1 yuan", {_unit: true})` or `fmt("1 yuan | =2",{_unit: true})`
    * Supplement documentation

## Attention

- Do not enclose individual numbers in parentheses.

## Video tutorial

To be determined

## Issue submission

When providing feedback, please include error examples and as much information about the issue as possible. Avoid submitting overly abstract or general statements as feedback! A new version addressing the problem will typically be released within one working day.



