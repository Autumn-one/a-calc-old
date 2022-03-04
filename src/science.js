// 处理科学记数法的问题
function scienceToStr (numStr) {
    // 判断是否是科学记数法, 如果是就处理不是就直接返回原来的值
    if(typeof numStr !== 'number'){
        numStr = numStr.toString()
    }
    if ( !numStr.includes('e') ) {
        return numStr;
    }

    let pattern = numStr.match(/^(-?[\d.]+)e([+-])(\d+)$/);
    if ( pattern === null ) {
        throw new Error(`科学计数法模式匹配出错: ${ numStr }`);
    }
    let base_str = pattern[1];
    let direction = pattern[2];
    let count = pattern[3]; // 这不是最终的count, 最终的count需要这个值减去 diff_count

    let symbol = ''; // 是否有负号
    if ( base_str.includes('-') ) {
        symbol = '-';
        base_str = base_str.replace('-', '');
    }

    let dotIndex = base_str.indexOf('.'); // 查找点的位置
    let diff_count = 0;


    if ( dotIndex !== -1 ) {
        let numArr = base_str.split('.');
        if ( direction === '+' ) {
            diff_count = numArr[1].length;
        } else {
            diff_count = numArr[0].length;
        }
        base_str = numArr.join('');
    }else if(direction === "-"){
        diff_count = 1
    }

    let final_count = count - diff_count;

    let final_num = "" // 最终返回的数字
    if(direction === "-"){
        final_num = "0." + "0".repeat(final_count) + base_str
    }else{
        final_num = base_str + "0".repeat(final_count)
    }
    return symbol + final_num

}

export { scienceToStr };
