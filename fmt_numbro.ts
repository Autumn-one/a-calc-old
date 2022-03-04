// 格式化对象
interface FormatParam {
    thousandSeparated?: boolean; // 控制千分位
    mantissa?: number; // 控制具体尾数
    mantissa_type?: string; // 位数控制标识
}

function parseFmtStr (fmtStr): FormatParam {
    // 根据格式化字符串导出一个对象 {thousandSeparated: null,mantissa: null,mantissa_type: null  }
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
    let result = ''; // 最后的返回结果

    let fmtObj = parseFmtStr(fmtStr);
    const {
        thousandSeparated,
        mantissa,
        mantissa_type,
    } = fmtObj;

    let fmtParam: any = {}; // 直接传给numbro的参数
    if ( thousandSeparated ) fmtParam.thousandSeparated = thousandSeparated;

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
    } else {
        result = numb.format(fmtParam);
    }


    return result;
}

export {
    fmtNumbro
}
