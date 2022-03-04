import { parseArgs } from './parse_args';
import numbro from 'numbro';
import { fmtNumbro } from './fmt_numbro';
import { scienceToStr } from './science';

function fmt (...args) {
    let argObj = parseArgs(args);
    let { expr, fmt: fmtStr } = argObj;

    // 对表达式进行trim 操作
    expr = expr.trim();

    let exprNumbro = numbro(expr);

    return scienceToStr(fmtNumbro(exprNumbro, fmtStr));
}

export { fmt };
