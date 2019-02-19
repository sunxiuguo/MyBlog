// 题目描述
// 定义栈的数据结构，请在该类型中实现一个能够得到栈中所含最小元素的min函数（时间复杂度应为O（1））。


// 用一个栈data保存数据，用另外一个栈min保存依次入栈最小的数
// 比如，data中依次入栈，5,  4,  3, 8,     10,    11,    12,    1
//       则min依次入栈，5,  4,  3，不入栈, 不入栈, 不入栈, 不入栈, 1
 
// 每次入栈的时候，如果入栈的元素比min中的栈顶元素小或等于则入栈，否则不如栈。

let stack = [];
let minStack = [];
let tmp;

function push(node) {
    // write code here
    if (tmp) {
        if (node <= tmp) {
            tmp = node;
            minStack.push(node);
        }
        stack.push(node);
    } else {
        tmp = node;
        minStack.push(node);
        stack.push(node);
    }
}
function pop() {
    // write code here
    let min = minStack.pop();
    let number = stack.pop();
    if (min !== number) {
        minStack.push(min);
    }
}
function top() {
    // write code here
    let length = stack.length;
    return stack[length-1];
}
function min() {
    // write code here
    let length = minStack.length;
    return minStack[length-1];
}