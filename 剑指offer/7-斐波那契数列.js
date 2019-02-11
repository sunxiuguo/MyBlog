// 题目描述
// 大家都知道斐波那契数列，现在要求输入一个整数n，请你输出斐波那契数列的第n项（从0开始，第0项为0）。
// n<=39

// 迭代法
function Fibonacci(n) {
    // write code here
    if (n <= 0) {
        return 0;
    }
    if (n === 1 || n=== 2) {
        return 1;
    }
    let fn1 = 1;
    let fn2 = 1;
    // let fn;
    
    while (n-- > 2) {
        fn1 = fn1 + fn2;
        fn2 = fn1 - fn2;
        // fn = fn1 + fn2;
        // fn1 = fn2;
        // fn2 = fn;
    }
    return fn1;
    // return fn;
}

// 递归法
function Fibonacci(n) {
    // write code here
    if (n <= 0) {
        return 0;
    }
    if (n === 1 || n=== 2) {
        return 1;
    }
    
    return Fibonacci(n-1) + Fibonacci(n-2);
}