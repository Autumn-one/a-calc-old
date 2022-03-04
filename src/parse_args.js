function parseArgs (args) {
    // 处理传进来的参数, 输出统一格式的参数
    let result = {
        expr: '',
        fmt: '',
    };

    // 先定义一个最终的拼接字符串, 这个字符串经过一些判断计算得到
    let calcStr = '';
    let arg1 = args[0];


    if ( args.length === 1 && typeof arg1 === 'string' ) {
        calcStr = arg1;
    } else if(args.length === 1 && typeof arg1 === 'number'){
        calcStr = arg1.toString()
    }else if ( args.length === 1 && Array.isArray(arg1) ) {
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


    let calcArr = calcStr.split('|');
    if ( calcArr.length === 1 ) {
        result.expr = calcArr[0];
    } else {
        result.expr = calcArr[0];
        result.fmt = calcArr[1];
    }


    return result;

}

export { parseArgs };
