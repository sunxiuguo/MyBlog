// 题目描述
// 我们可以用2*1的小矩形横着或者竖着去覆盖更大的矩形。请问用n个2*1的小矩形无重叠地覆盖一个2*n的大矩形，总共有多少种方法？

// 斐波那契数列

function rectCover(number) {
    // write code here
    if (number <= 2) {
        return number;
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