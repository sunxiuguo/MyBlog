// 题目描述
// 一只青蛙一次可以跳上1级台阶，也可以跳上2级……它也可以跳上n级。求该青蛙跳上一个n级的台阶总共有多少种跳法。

// 最后一个台阶是青蛙到达的位子， 必须存在
// 其他 (n-1) 块木板可以任意选择是否存在，则每个木板有存在和不存在两种选择，(n-1) 块木板 
// 因此有 2^(n-1) 种跳法

function jumpFloorII(number) {
    // write code here
    return Math.pow(2, number - 1);
}


// f(n) = f(n-1) + f(n-2) + f(n-3) + ... + f(1) + f(0)
// f(n-1) = f(n-2) + f(n-3) + ... + f(1) + f(0)
// f(n) = f(n-1) + f(n-1) = 2f(n-1)

function jumpFloorII(number) {
    // write code here
    if (number === 0) {
        return 0;
    }
    if (number === 1) {
        return 1;
    }
    return 2 * jumpFloorII(number-1);
}