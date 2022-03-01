import numbro from 'numbro';
import expr2que from './expr2que';
import fmt from './fmt';
import science from './science';
import parseArgs from './parse_args';
import { isOperator } from './utils';
import infix2Postfix from './infix2postfix';

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


// 格式化对象
interface FormatParam {
    thousandSeparated?: boolean; // 控制千分位
    mantissa?: number; // 控制具体尾数
    mantissa_type?: string; // 位数控制标识
}

function parseFmtArgs (fmtStr): FormatParam {
    // 根据格式化字符串导出一个对象
    let argObj = {
        thousandSeparated: null,
        mantissa: null,
        mantissa_type: null,
    };

    // 说明存在格式化字符串, 开始正则匹配
    let matchArr = fmtStr.match(/(<=|>=|=)\s*(\d+)/);
    if ( matchArr ) {
        argObj.mantissa_type = matchArr[1];
        argObj.mantissa = Number(matchArr[2]);
    }

    if ( fmtStr.lastIndexOf(',') !== -1 ) {
        argObj.thousandSeparated = true;
    }


    return argObj;
}

function fmtNumbro (numb, fmtStr): string {
    // 根据 fmtArgs 格式化一个 numbro 对象, 并返回最终结果
    let result = "" // 最后的返回结果

    let fmtObj = parseFmtArgs(fmtStr);
    const {
        thousandSeparated,
        mantissa,
        mantissa_type,
    } = fmtObj;

    let fmtParam: any = {} // 直接传给numbro的参数
    if(thousandSeparated) fmtParam.thousandSeparated = thousandSeparated

    if ( mantissa_type ) { // 如果设置了位数相关就处理一下
        switch ( mantissa_type ) {
            case '=':
                fmtParam.mantissa = mantissa;
                result = numb.format(fmtParam);
                break;
            case '<=':
                fmtParam.mantissa = mantissa;
                fmtParam.trimMantissa = true;
                result = numb.format(fmtParam);
                break;
            case '>=':
                let resStr = numb.value();
                let resArr = resStr.toString().split('.');
                if ( resArr.length === 1 || resArr[1].length < mantissa ) {
                    fmtParam.mantissa = mantissa;
                    result = numb.format(fmtParam);
                } else {
                    result = numb.format(fmtParam);
                }
                break;
            default:
                throw new Error('尾数符号错误!');
        }
    }


    return result;
}

function calc (...args) {
    // 最终返回的字符串计算的方法
    let result = ''; // 计算的结果

    let argsObj = parseArgs(args); // 格式化后的参数, 只有表达式和格式化字符串

    let exprArr = expr2que(argsObj.expr);
    if ( exprArr.length === 1 ) { // 只有一个参数的时候直接进行格式化
        return fmtNumbro(numbro(exprArr[0]),argsObj.fmt);
    }


    let resNumbro = evalPostfix(exprArr);

    // 根据 mantissa 和 mantissa_type 去处理尾数 根据 thousand 判断是否支持千分位

    if ( argsObj.fmt ) { // 如果有格式化字符串那么需要进行格式化字符串的处理
        result = fmtNumbro(resNumbro, argsObj.fmt);

    } else {
        result = resNumbro.value();
    }

    return result;
};

export {
    calc,
    expr2que,
    fmt,
};
