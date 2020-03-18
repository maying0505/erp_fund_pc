//数字千位分隔符格式化
function formatNumber(value,maxNum = 100000000) {
    value += '';    
    if (Number(value) > maxNum) {
        value = maxNum
    }
    const list = value.split('.');
    const prefix = list[0].charAt(0) === '-' ? '-' : '';
    let num = prefix ? list[0].slice(1) : list[0];
    let result = '';
    while (num.length > 3) {
        result = `,${num.slice(-3)}${result}`;
        num = num.slice(0, num.length - 3);
    }
    if (num) {
        result = num + result;
    }
    if (list[1] && list[1].length > 2) {
        list[1] = list[1].substring(0, 2)
    }
    if (value.substr(value.length - 1, 1) === '.') {
        return `${prefix}${result}${list[1] ? `.${list[1]}` : ''}.`;
    }
    return `${prefix}${result}${list[1] ? `.${list[1]}` : ''}`;
}

//数字去掉千位分隔符
function delcommafy(num) {
    num = num + ''
    if ((num + "").trim() === "") {
        return "";
    }
    var x = num.split(',');
    return x.join("");
}

//数字大写格式化
function convertCurrency(money,maxNum = 100000000) {
    money = money + '';
    //汉字的数字  
    var cnNums = new Array('零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖');
    //基本单位  
    var cnIntRadice = new Array('', '拾', '佰', '仟');
    //对应整数部分扩展单位  
    var cnIntUnits = new Array('', '万', '亿', '兆');
    //对应小数部分单位  
    var cnDecUnits = new Array('角', '分', '毫', '厘');
    //整数金额时后面跟的字符  
    var cnInteger = '整';
    //整型完以后的单位  
    var cnIntLast = '元';
    //金额整数部分  
    var integerNum;
    //处理最大数字
    var maxNumM = maxNum + 0.01;
    //金额小数部分  
    var decimalNum;
    //输出的中文金额字符串  
    var chineseStr = '';
    //分离金额后用的数组，预定义  
    var parts;
    if (money === '') { return ''; }
    money = parseFloat(money);
    if (money >= maxNumM) {
        //超出最大处理数字  
        return '';
    }
    if (money === 0) {
        chineseStr = cnNums[0] + cnIntLast + cnInteger;
        return chineseStr;
    }
    //转换为字符串  
    money = money.toString();
    if (money.indexOf('.') === -1) {
        integerNum = money;
        decimalNum = '';
    } else {
        parts = money.split('.');
        integerNum = parts[0];
        decimalNum = parts[1].substr(0, 2);
    }
    //获取整型部分转换  
    if (parseInt(integerNum, 10) > 0) {
        var zeroCount = 0;
        var IntLen = integerNum.length;
        for (var i = 0; i < IntLen; i++) {
            var n = integerNum.substr(i, 1);
            var p = IntLen - i - 1;
            var q = p / 4;
            var m = p % 4;
            if (n === '0') {
                zeroCount++;
            } else {
                if (zeroCount > 0) {
                    chineseStr += cnNums[0];
                }
                //归零  
                zeroCount = 0;
                chineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
            }
            if (m === 0 && zeroCount < 4) {
                chineseStr += cnIntUnits[q];
            }
        }
        chineseStr += cnIntLast;
    }
    //小数部分  
    if (decimalNum !== '') {
        let decLen = decimalNum.length;
        for (let i = 0; i < decLen; i++) {
            let n = decimalNum.substr(i, 1);
            if (n !== '0') {
                chineseStr += cnNums[Number(n)] + cnDecUnits[i];
            }
        }
    }
    if (chineseStr === '') {
        chineseStr += cnNums[0] + cnIntLast + cnInteger;
    } else if (decimalNum === '') {
        chineseStr += cnInteger;
    }
    return chineseStr;
}
export { convertCurrency, formatNumber, delcommafy }