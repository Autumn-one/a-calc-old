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


export {
    getPrioraty,
    isOperator,
    prioraty
};
