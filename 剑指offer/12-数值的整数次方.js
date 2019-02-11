// 题目描述
// 给定一个double类型的浮点数base和int类型的整数exponent。求base的exponent次方。


// 快速幂算法

function Power(base, exponent) {
    // write code here
    let result = 1;
    let current = base;
    let ex;
    
    if (exponent > 0) {
        ex = exponent;
    } else if (exponent < 0) {
        if (base === 0) {
            // 负数的n次方相当于1/n，当n为0时无意义
            throw Error('0的负数次方无意义')
        }
        ex = -exponent;
    } else if (exponent === 0) {
        return 1
    }
    
    while (ex !== 0) {
        if ((ex & 1) === 1) {
            // 当ex & 1为1的时候, 说明幂数乘到最后了, 将该位代表的乘数累乘到最终结果
            result = result * current;
        }
        current = current * current; // 因为要右移, 所以乘数每次都是平方
        ex = ex >> 1; // 右移一位相当于除以2
    }
    return exponent >=0 ? result : (1 / result);
}

// 常规累乘

function Power(base, exponent) {
    // write code here
    let result = 1;
    let ex;
    
    if (exponent > 0) {
        ex = exponent;
    } else if (exponent < 0) {
        if (base === 0) {
            throw Error('0的负数次方无意义')
        }
        ex = -exponent;
    } else if (exponent === 0) {
        return 1
    }
    
    for (let i = 0; i < ex; i++) {
        result = result * base;
    }
    return exponent >=0 ? result : (1/result);
}