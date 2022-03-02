/*
* 格式化计算式到队列
* */

function expr2que (expr) {
    
    let atomArr = []; // 原子列表

    let tempStr = ''; // 临时存储数字的字符串
    let symbolStr = '+-*/%()'; // 遇到这样的标识表示临时存储字符串应该进入队列了
    let fIndex = expr.search(/\S/); // 储存第一个非空白字符的位置

    for ( let i = 0, len = expr.length; i < len; i++ ) {
        let cur = expr[i];
        // 如果碰到符号连着符号的情况,例如某个负数前面就是括号, 某个负数前面有一加号 开头就是数字的
        if ( i === fIndex && '+-'.includes(cur) ) { // 处理第一个是负数的情况
            tempStr += cur;
            continue;
        }

        if ( cur === ' ' || symbolStr.includes(cur) ) {
            if ( '+-'.includes(cur) && '(+-*/%'.includes(atomArr[atomArr.length - 1]) ) {
                tempStr += cur;
                continue;
            }

            if ( tempStr !== '' ) {
                atomArr.push(tempStr);
                tempStr = '';
            }
            if ( cur !== ' ' ) {
                atomArr.push(cur);
            }
        } else {
            tempStr += cur; // 如果不是那些特殊表示字符则不断向临时存储字符串添加字符
        }
    }

    if ( tempStr !== '' ) {
        atomArr.push(tempStr);
        tempStr = null;
    }


    return atomArr;

}

export default expr2que


