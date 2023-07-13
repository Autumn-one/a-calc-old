# a-calc
A convenient library for accurate calculation and formatting of numbers, which can solve the following problems:

* Size: uncompressed size 56KB. Gzip compression size 18KB
* Make the number calculation of javascript accurate
* Other third-party libraries have poor coding experience and inconvenient formatting
* Scientific notation of possible output of numerical calculation
* Format digits, output digits in thousandths, format digits directly into percentages, keep signs of digits, output fractions directly, etc.
* Calculation or formatting of numbers with units, e.g.: `0.1% + 2%`
* Calculation in scientific notation, for example: `-2e3 + 6`
* Support four rounding rules: rounding to the end, rounding to one, rounding to five, rounding to six (a more accurate method)

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
const {calc, fmt} = require("a-calc/cjs") // Note that this is written to explicitly specify the use of the cjs version which makes sense, some packaging tools will do a conversion of the syntax, directly write a-calc does not work (nuxt.js is), then replace it with a-calc/cjs try
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

## Usage

```js
calc("0.1 + 0.2") // 0.3

// A little more complicated calculation
calc("0.1 + 0.2 * 0.3 / 0.4 * (0.5 + 0.6)") // 0.265

// Calculation of scientific notation
calc("-2e2 + 3e+2") // 100
```

## About Spaces

Spaces are non-essential in the absence of ambiguity, and can even correctly parse the following writing `calc("-2e+2+3e+2")` which is difficult for the human eye to parse, but this is too low clarity, please do your best to write clearer code instead of shit! <span style="color: red;">Always include spaces in your formula, which is more beautiful and clear, just like the example I wrote！！！</span>

By the way, an ambiguous equation `calc("50%%2", {_unit: true})` This ambiguity obviously occurs when calculating with units, since the parser doesn't know whether your units are `%` or `%%` so you have to use spaces to give a clear meaning, the correct way to write it would be `calc("50% % 2", {_unit: true}) `

In short, always add space!

## Fill variables and calculate (important)

**The calculated value is accurate and there is no scientific counting method**

```js
let a = 0.000001
let b = 888.789
calc("a + b", {a,b}) // 0.000001 + 888.789 = 888.789001

calc("a * (b + c) % d + 7.123", [
    {a: 1, b: 2},
    {c: 3, d: 4}
]) // 8.123

// A little more complicated
calc("1 + o.a / arr[0].d",{
    o: { a: 2 },
    arr: [{ d: 8 }]
}) // 1.25

calc("a + b - c",[
    {a: 1},
    {b: 2, c: 3}
])
```

## Calculation with unit

> The reality is not always ideal, maybe we have to calculate two percentage numbers, fortunately a-calc supports these operations now, but please note that the units will be taken from the first number carrying the unit, and the subsequent units will be ignored

```js
// It is important to note that this is required and not enabled by default, because calculations with units do some extra work, which is faster than calculations with numbers alone
calc("1 + 2%", {_unit: true}) // 3%

calc("1.123$$$ + 2.88% | + =6", {_unit: true}) // +4.003000$$$
```

After `1.0.6`, calculations with units can have more parameters, `_unit` can take values like `boolean | "on" | "off" | "auto" | "space"` The parameters look like a lot, but they are similar to the previous usage, `true "on" "auto"` has the same effect, it means that it automatically recognizes the number after the The biggest difference is that the `"space"` value means that only spaces are used as unit separators. For example, if your units happen to be `+-`, which would be recognized as an operator in normal mode, you can use the `"space"` mode, but then spaces are required, and you would write it like this: `calc ("2+- * 3")` The final result is: `6+-`

## Calculate and format

Formatting supports the following features: limit decimal places, Keep Plus and minus signs, percentage output, scientific notation output, and kilobyte output, and they can be combined, but there are individual combinations that are not valid, try This yourself. There are too many combinations to list one by one.

**Formatted list：**

- `>|>=|<|<=|=Numeric` means restrict the number of decimal places, for example: `<=2` the number of decimal places is less than or equal to 2 `>3` the number of decimal places must be greater than 3, this is equivalent to `>=4`
- `,` The output is a string of digits in the thousandths
- `/` Output as fraction
- `+` Output positive numbers with `+` sign
- `%` Output a percentage number that can be used in combination with restricted decimals
- `!e` The output is scientific notation and e can be capitalized
- `!n` The output is a number, not a numeric string, and N can be uppercase, but if you set percentiles, fractions, or percentages, disk formatting and so on, this option does not take effect

```js
// Operational decimal places
calc("0.1 + 0.2 | =2") // 0.30
calc("0.11111 + 0.11111 | <=4") // 0.2222
calc("0.11 + 0.11 | <=4") // 0.22
calc("0.1 + 0.2 | >= 5") // 0.30000
calc("0.0000001+ 0.0000001 | >= 5") // 0.0000002

// Keep the sign
calc("1 + 1 | +") // +2

// thousands
calc("10000000 + 100000000 | ,") // 110,000,000

// Fraction
calc("0.025 + 0.2 | /") // 9/40

// Percentage
calc("1 + 1 | %") // 200%

// Scientific notation, notice that this e can also be capitalized
calc("1 + 1 | !e") // 2e+0

// Specifies both the decimal and the thousandth digits and leaves the sign plus or minus
calc("10000000 + 100000000 | +,=10") // +110,000,000.0000000000
```

## Four rounding rules

The rounding rule is added to the part of the format string, whose symbols are respectively:

- `~-` Tail off, default rounding rule
- `~+` Enter One
- `~5` Rounding
- `~6` This rounding rule is more accurate than rounding. The rule is different when the last digit of the rounding rule is 5. It looks at the position after 5, and if the last digit is not 0, it goes to 1, if the following number is 0, then you will see if the number before 5 is even, if it is not enter, not enter

```js
calc("0.11 + 0.22 | =1 ~+") // 0.4 Keep one digit and enter one
calc("0.55 | =1 ~5") // 0.6
calc("0.65 | =1 ~6") // 0.6
```

This newly added rounding rule seems to make the formatted part longer, but this is not the case. Generally, the rounding rule of an item is fixed, so the formatting of the rounding rule part should be encapsulated in the default formatting parameters. In actual use, there is no need to write this part at all. Refer to the "Default Format" description below

## Format only

```js
calc("0.1 | =2") // 0.10
fmt("0.1 | =2") // 0.10
// Calc has the functionality of fmt, but fmt has better semantics

fmt("1000000 | ,") // 1,000,000
```

## Configure version number printing and library update detection

You can turn the console on or off to print the version number of the current library, or you can turn the console on or off to prompt if there is a new version update.

```typescript
import { calc_util } from "a-calc"
calc_util.print_version(); // Print version in console
calc_util.check_update(); // Enable the update detection function, if there are updates will be alerted in the console
```

## Advanced skills

**Error Handling**

> Usually using calc directly requires the input formula to be completely correct. By default a-calc will not help you deal with the error of the formula. This can be filtered by yourself, but we may not want to do this in the project, so we need an extra advanced API to silently capture and give an appropriate return value when the input formula is wrong

```js
calc("1 + 2sd + d",{
    _fill_data: {d: 3}, // From here, the data source object is assigned to _fill_data, which can also be an array of objects. When fetching data, it is successively searched from the array items, and the first one is immediately stopped
    _error: "-", // Returns - as an alternative value if the equation is wrong
})

// The above writing can be simplified
calc("1 + 2sd + d", {
    d: 8,
    _error: "-"
}) // This simplification is simply for convenience
```

**Default formatting**

> Default formatting can be used to optimize the development experience in real projects

```js
calc("111111 + 11111 | ,",{_fmt: "=2"}) // 122,222.00 Obviously , and =2 are combined, and the formatted string in the expression has higher priority
```

## How to re-encapsulate in the project?

The core ` calc ` function may not be extremely convenient in a real project, so ` a-calc ` provides a built-in secondary encapsulation function ` calc_wrap ` after version `1.2.10`, which is essentially an extension of ` calc `, so it has all the functions of the former, just more flexible writing and powerful type derivation.

Note that this may not be the only correct way to encapsulate. I just provide this function. There is no dogma here. You should be flexible in your own scenarios.

I suggest that if you decide to introduce ` calc_wrap ` into your project, you can rename it to ` calc ` so that you can write a few fewer characters. The following shows some flexible writing and powerful type derivation.

```typescript
// Note that calc_wrap is renamed calc here, because if you need to use the calc_wrap function, you basically don't need the core calc function, so if you have this idle name, you should use it
import { calc_wrap as calc } from "a-calc";

const state = {
    a: 1,
    b: 2,
    c: 3
};

// When the parameter passed in is a formula without variable name, the calculation result will be returned directly
calc( "(1 + 2) * 3" ); // Return type: string

// When the incoming argument is a formula that is suspected to contain a variable name and there is no second data source argument, it returns a function waiting for the incoming data source. Yes, this function is done by statically typed derivation
calc( "(a + b) * c" ); // Return type: ( data: any ) => string
calc( "(a + b) * c" )( state ); // Return type: string

// Maybe you want to inject state first and then enter an expression, which is also ok
calc( state ); // Return type: ( expr: string | number ) => string
calc( state )( "(a + b) * c" ); // Return type: string

// The original usage is naturally supported
calc( "a + b + c", state ); // Return type: string

// You can still mix the configuration with the data source, which is very convenient
calc( "a + b + c" )( { ...state, _error: 0 } ); // Return type: string | 0
```

### Disrecommended writing

`a-calc` can be written using template strings, but I've found in practice that the readability of this writing is terrible, and it's not recommended unless you really have a valid enough reason to use template strings.

```typescript
calc(`${a} + ${b}`) // This writing style is not recommended
calc("a + b", {a,b}) // Recommended writing style because it is clearer
```



## Version change

* 1.3.0
    - Disruptive changes: Adjust how the version number printing function and the detection update function are called
    - Perfect type hint
    - Add more unit tests
* 1.2.30
    - Previous versions would have controlled the print version number by default, now it is configurable and turned off by default
    - Provides the function of detecting updates, after opening if there is a new version of this will give a prompt in the console
* 1.2.10
    - Remove the vue integration example, the library itself is not bound to a front-end framework, to avoid misunderstanding, remove the corresponding integration code.
    - Add `calc_wrap` function, which is the second wrapping of the core function `calc` and can be used directly.
* 1.2.6
    - Adjust the vue3 integration code, because the vue3 component instances differ between the development environment and the production environment, the production environment cannot get the state, but the development environment can.
* 1.2.0
    - Very minor breaking update, the former `-e` and `-n` become `!e` and `!n` respectively
    - Document update
* 1.1.0
    - Very minor loop-breaking update, the previous `\e` scientific notation output is now `-e`, the rest is unchanged
    - Added `-n` output number type
    - Support `<` and `>` symbols for decimal place restrictions
    - Fixed several rounding formatting issues
    - Increased the number of unit tests to 107
* 1.0.25
    - Documentation update to simplify writing a-calc integration to vue3
* 1.0.23
  - Updated documentation to rewrite the recommended way to integrate a-calc into vue3
* 1.0.22
  - Optimize fractional rounding logic
* 1.0.21
  - Improve export type definition
* 1.0.19
  - Fix the problem that _error may not catch errors when it is an empty string.
* 1.0.14
  - Fix ** operator priority error.
  - Fix for `<=` formatting that may have extra zeros not removed.
* 1.0.12
  - Document add library volume description
  - Fix the problem that the _error parameter is still abnormal when the expression is null, and add the corresponding unit test.
* 1.0.10
  - Update documentation
* 1.0.6
  * Destructive change: all exposed small humps are now snake naming, e.g. `_fillData` is now `_fill_data`, because the snake naming is clearer.
  * The internal code has been greatly simplified and the parser has been almost completely rewritten to bring a more stable experience
  * The original design was that the calc function had all the functionality of fmt, but while versions prior to 1.0.6 conformed to this design, calc and fmt were implemented separately, and now fmt is just an alias for calc.
  * Support for the new operator **
  * Support for new formatting characters % Can output numbers as percentages
  * Support for the new formatting character `\e`, which can format numbers into scientific notation
  * Fix a problem that may cause a dead loop when formatting an illegal string
  * Fix the problem that 1/0 is Infinity.
  * Add several unit tests
  * More detailed type hints
  * Update documentation to add sample code for vue3 integration
* 0.0.80
  * Bring 4 types of rounding rules, which are: rounding to the end, rounding to one, rounding to five, rounding to six
  * More boundary case detection
  * fmt allows not passing in formatted strings, a feature that allows you to use fmt to remove extra zeros after the decimal point
* 0.0.79
  * Update documentation
* 0.0.78
  * Support for scientific notation calculations
  * Full unit tests
  * More boundary case detection
* 0.0.72
  * Support for writing single values with units, e.g. `calc("$1", {_unit: true})` or `fmt("$1 | =2",{_unit: true})`
  * Additional documentation

## Attention

- Do not wrap parentheses around a single number

## Question submission

(If you encounter any problems, please be the first to send me feedback email, 718879459@qq.com for bugs I will be the first to fix him)



