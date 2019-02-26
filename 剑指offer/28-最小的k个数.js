// 题目描述
// 输入n个整数，找出其中最小的K个数。例如输入4,5,1,6,2,7,3,8这8个数字，则最小的4个数字是1,2,3,4,。

// 快排
function GetLeastNumbers_Solution(input, k) {
    // write code here
    if (k > input.length) {
        return [];
    }
    let sort = quickSort(input);
    return sort.slice(0,k);
    
}
function quickSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }
    let base = arr.splice(0, 1)[0];
    let left = [];
    let right = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < base) {
            left.push(arr[i]);
        }
        if (arr[i] > base) {
            right.push(arr[i]);
        }
    }
    return quickSort(left).concat([base], quickSort(right))
}

// let result = GetLeastNumbers_Solution([4,5,1,6,2,7,3,8], 4)
// console.log(result)
// 冒泡
function bubbleSort(input, k) {
    if (input.length <= 1) {
        return input;
    }
    let result = [];
    for (let i = 0; i < k; i++) {
        for (let j = 0; j < input.length - i - 1; j++) {
            if (input[j] < input[j+1]) {
                [input[j], input[j+1]] = [input[j+1], input[j]];
            }
        }
        result.push(input[input.length - i - 1])
    }
    return result
}

let result1 = bubbleSort([4,5,1,6,2,7,3,8], 4)
console.log(result1)