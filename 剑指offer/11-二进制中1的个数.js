// 题目描述
// 输入一个整数，输出该数二进制表示中1的个数。其中负数用补码表示。


/**
 * n-1其实就是把最后面的1以及后面的所有数字取反, 比如1100减去1就是1011
 * n-1 & n即为 1011 & 1100 = 1000
 * 所以说只要有一个1 就可以进行一次n-1 & n的操作
 * @param {*} n 
 */
function NumberOf1(n) {
    // write code here
    let count = 0;
    while (n != 0) {
        count++;
        n = (n - 1) & n;
    }
    return count;
}

/**
 * 不断的右移, 判断最后一位是否为1
 * 
 * @param {any} n 
 * @returns 
 */
function NumberOf1(n) {
    // write code here
    let count = 0;
    while (n != 0) {
        count += n & 1; // 判断最后一位 比如 n = 1100;  n & 1 = 1100 & 0001 = 0, count = 1
        n = n >> 1; // 按位右移, 即 1100 >> 0110
    }
    return count;
}