import expr2que from "./expr2que"
import { isOperator, prioraty } from './utils';

function infix2postfix (expQue) {
    // 中缀表示法转后缀表示法
    let symbolQue = []; // 符号队列
    let outputQue = []; // 结果队列

    let exprArr = expQue; // 表达式列表

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


export default infix2postfix
