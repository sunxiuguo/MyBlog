// 题目描述:
// 给出一个数字和一个数组，要求实现函数：
// 找出数组中与数字最相近的值

function findNext(num, arr) {

    const sort = arr.sort((a, b) => {
        return Math.abs(a - num) - Math.abs(b - num);
    });

    return sort[0];
}
    
let result  = findNext(-1,[-1,0,2,12])

console.log(result)