// 题目描述
// 一只青蛙一次可以跳上1级台阶，也可以跳上2级。求该青蛙跳上一个n级的台阶总共有多少种跳法（先后次序不同算不同的结果）。

// f(n)台阶只能由f(n-1)和f(n-2)台阶跳上, 所以f(n) = f(n-1) + f(n-2)

function jumpFloor(number) {
    // write code here
    if (number === 0 ) {
        return 0;
    }
    if (number === 1) {
        return 1;
    }
    if (number === 2) {
        return 2;
    }
    let fn1 = 1;
    let fn2 = 2;
    let fn = 0;
    while (number-- > 2) {
        fn = fn1 + fn2;
        fn1 = fn2;
        fn2 = fn;
    }
    return fn;
}