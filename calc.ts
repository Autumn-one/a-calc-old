import numbro from 'numbro';

// 字符串计算
function isOperator (value) {
    // 判断一个数字是否是操作符
    let operatorString = '+-*/%()';
    return operatorString.indexOf(value) > -1;
}

function getPrioraty (value) {
    // 将一个运算符转换成优先级数值
    switch ( value ) {
        case '+':
        case '-':
            return 1;
        case '*':
        case '/':
        case '%':
            return 2;
        default:
            return 0; // 括号为
    }
}

function prioraty (o1, o2) {
    // 判断 o1 优先级是否小于等于 o2 优先级
    return getPrioraty(o1) <= getPrioraty(o2);
}

function infix2Postfix (exp) {
    // 中缀表示法转后缀表示法
    let exprArr = []; // 表达式列表
    let symbolQue = []; // 符号队列
    let outputQue = []; // 结果队列

    let tempStr = ''; // 临时存储数字的字符串
    let symbolStr = '+-*/%()'; // 遇到这样的标识表示临时存储字符串应该进入队列了
    for ( let i = 0, len = exp.length; i < len; i++ ) {
        let cur = exp[i];
        if ( cur == ' ' || symbolStr.indexOf(cur) !== -1 ) {
            if ( tempStr !== '' ) {
                exprArr.push(tempStr);

                tempStr = '';
            }
            if ( cur !== ' ' ) {
                exprArr.push(cur);
            }
        } else {
            tempStr += cur; // 如果不是那些特殊表示字符则不断向临时存储字符串添加字符
        }
    }

    if ( tempStr !== '' ) {
        exprArr.push(tempStr);
        tempStr = '';
    }

    while ( exprArr.length > 0 ) {
        let cur = exprArr.shift(); // 输入队列从头部取出一个

        if ( isOperator(cur) ) {
            if ( cur == '(' ) {
                symbolQue.push(cur);
            } else if ( cur == ')' ) {
                let po = symbolQue.pop();
                while ( po != '(' && symbolQue.length > 0 ) {
                    outputQue.push(po);
                    po = symbolQue.pop();
                }
                if ( po != '(' ) { // 如果找不到左括号说明括号匹配有问题
                    throw 'error: unmatched ()';
                }
            } else {
                // 循环判断当前的运算符如果优先级比输出队列底部小或等就将输出队列的最后运算符放到结果队列

                while ( prioraty(cur, symbolQue[symbolQue.length - 1]) && symbolQue.length > 0 ) {
                    outputQue.push(symbolQue.pop());
                }
                // 将当前运算符放到输出队列
                symbolQue.push(cur);
            }
        } else {
            outputQue.push(cur);
        }
    }

    if ( symbolQue.length > 0 ) {
        if ( symbolQue[symbolQue.length - 1] == ')' || symbolQue[symbolQue.length - 1] == '(' ) {
            throw 'error: unmatched ()';
        }
        while ( symbolQue.length > 0 ) {
            // 如果没有括号 最后把剩余在输出队列的内容添加到结果队列
            outputQue.push(symbolQue.pop());
        }
    }
    return outputQue;

}

function evalPostfix (exprArr) {
    // 根据中缀表示法计算结果
    let outputStack = [];
    while ( exprArr.length > 0 ) {
        let cur = exprArr.shift();

        if ( !isOperator(cur) ) {
            outputStack.push(cur);
        } else {
            if ( outputStack.length < 2 ) {
                throw 'unvalid stack length';
            }
            let sec = outputStack.pop();
            let fir = outputStack.pop();
            if ( typeof sec === 'string' ) {
                sec = numbro(sec);
            }

            if ( typeof fir === 'string' ) {
                fir = numbro(fir);
            }

            switch ( cur ) {
                case '+':
                    outputStack.push(fir.add(sec));
                    break;
                case '-':
                    outputStack.push(fir.subtract(sec));
                    break;
                case '*':
                    outputStack.push(fir.multiply(sec));
                    break;
                case '/':
                    outputStack.push(fir.divide(sec));
                    break;
                case '%':
                    outputStack.push(
                        numbro(
                            Number(fir.value()) %
                            Number(sec.value()),
                        ),
                    );
                    break;
            }


        }
    }

    if ( outputStack.length != 1 ) {
        throw 'unvalid expression';
    } else {
        return outputStack[0];
    }
}


function parserArgs (args) {
    /*
     根据参数产出格式化后的参数, 返回值如下
     {result: "产出的字符串", mantissa: 5, mantissa_type: "<=", thousand: false}
     mantissa表示返回的尾数是几个 mantissa_type 表示尾数是 >= <= 或者 =
     thousand 是否产出千分位好的值
     */

    let resultObj = {
        result: '',
        mantissa: null,
        mantissa_type: null,
        thousand: false,
    };

    // 先定义一个最终的拼接字符串, 这个字符串经过一些判断计算得到
    let calcStr = '';
    let arg1 = args[0];


    if ( args.length === 1 && typeof arg1 === 'string' ) {
        calcStr = arg1;
    } else if ( args.length === 1 && Array.isArray(arg1) ) {
        calcStr = arg1[0];
    } else if ( args.length > 1 ) {
        let strArr = args.shift();
        while ( strArr.length < 1 && args.length < 1 ) {
            let str1 = strArr.shift();
            if ( str1 === undefined ) {
                str1 = '';
            }
            let str2 = args.shift();
            if ( str2 === undefined ) {
                str2 = '';
            } else if ( typeof str2 === 'number' ) {
                str2 = str2.toString();
            }

            calcStr = calcStr + str1 + str2;

        }
    }

    // 判断是否有逗号
    let calcArr = calcStr.split('|');
    if ( calcArr.length > 1 ) {
        // 说明存在格式化字符串, 开始正则匹配
        let patternStr = calcArr[1]; // 取出模式字符串
        let matchArr = patternStr.match(/(<=|>=|=)\s*(\d+)/);
        if ( matchArr ) {
            resultObj.mantissa_type = matchArr[1];
            resultObj.mantissa = Number(matchArr[2]);
        }

        if ( patternStr.lastIndexOf(',') !== -1 ) {
            resultObj.thousand = true;
        }
        resultObj.result = calcArr[0];
    } else {

        resultObj.result = calcStr;
    }


    return resultObj;

}

function calcStr (str) {
    // 根据字符串计算值并输出一个numbro 对象
    let calcQue = infix2Postfix(str); // 将计算式转换成后缀表示法

    return evalPostfix(calcQue);

}

export function calc (...args) {
    // 最终返回的字符串计算的方法
    let calcResult = ''; // 计算的结果

    let { result, mantissa, mantissa_type, thousand } = parserArgs(args);

    let resNumbro = calcStr(result);

    // 根据 mantissa 和 mantissa_type 去处理尾数 根据 thousand 判断是否支持千分位


    interface FormatParam {
        thousandSeparated?: boolean,
        mantissa?: number,
        trimMantissa?: boolean
    }

    let formatParam: FormatParam = { // 用于格式化的参数
        thousandSeparated: thousand,
    };
    if ( mantissa_type ) { // 如果设置了位数相关就处理一下
        switch ( mantissa_type ) {
            case '=':
                formatParam.mantissa = mantissa;
                calcResult = resNumbro.format(formatParam);
                break;
            case '<=':
                formatParam.mantissa = mantissa;
                formatParam.trimMantissa = true;
                calcResult = resNumbro.format(formatParam);
                break;
            case '>=':
                let resStr = resNumbro.value();
                let resArr = resStr.toString().split('.');
                if ( resArr.length === 1 || resArr[1].length < mantissa ) {
                    formatParam.mantissa = mantissa;
                    calcResult = resNumbro.format(formatParam);
                } else {
                    calcResult = resNumbro.format(formatParam);
                }
                break;
            default:
                throw new Error('尾数符号错误!');
        }
    } else {
        calcResult = resNumbro.format(formatParam);
    }

    return calcResult; // 返回最终的计算结果
};
