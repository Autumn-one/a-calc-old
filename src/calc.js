import numbro from 'numbro';
import { expr2que } from './expr2que';
import { fmt } from './fmt';
import { scienceToStr } from './science';
import { parseArgs } from './parse_args';
import { isOperator } from './utils';
import { infix2postfix } from './infix2postfix';
import { fmtNumbro } from './fmt_numbro';

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

    if ( outputStack.length !== 1 ) {
        throw 'unvalid expression';
    } else {
        return outputStack[0];
    }
}


function calc (...args) {
    // 最终返回的字符串计算的方法
    let result = ''; // 计算的结果

    let argsObj = parseArgs(args); // 格式化后的参数, 只有表达式和格式化字符串

    let exprArr = expr2que(argsObj.expr);
    if ( exprArr.length === 1 ) { // 只有一个参数的时候直接进行格式化
        return fmtNumbro(numbro(exprArr[0]), argsObj.fmt);
    }

    let resNumbro = evalPostfix(infix2postfix(exprArr));

    // 根据 mantissa 和 mantissa_type 去处理尾数 根据 thousand 判断是否支持千分位

    if ( argsObj.fmt ) { // 如果有格式化字符串那么需要进行格式化字符串的处理
        result = fmtNumbro(resNumbro, argsObj.fmt);

    } else {
        result = resNumbro.value();
    }

    return scienceToStr(result);
};

export {
    calc,
    expr2que,
    fmt,
};
