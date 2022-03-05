let {calc,fmt} = require("../dist/calc.js")

// console.log(calc`-0.1 + -0.2 * 0.3`)

// console.log(calc("0.000000000000010000 * 2 | ,"))
// 0.00000000000001
// console.log(fmt("1111111.123456 | =2,"))

// console.log(calc("0.0000001 + 0.0000001 | >= 5"))

// console.log(calc("10000000 + 100000000 | =10 ,"))

console.log(calc("100 % 11 * 3"))
console.log(100 % 11 * 3)
