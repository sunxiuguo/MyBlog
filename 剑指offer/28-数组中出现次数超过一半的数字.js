// 题目描述
// 数组中有一个数字出现的次数超过数组长度的一半，请找出这个数字。
// 例如输入一个长度为9的数组{1,2,3,2,2,2,5,4,2}。由于数字2在数组中出现了5次，超过数组长度的一半，因此输出2。如果不存在则输出0。



// 如果有符合条件的数字，则它出现的次数比其他所有数字出现的次数和还要多。
// 在遍历数组时保存两个值：一是数组中一个数字，一是次数。
// 遍历下一个数字时，若它与之前保存的数字相同，则次数加1，否则次数减1；若次数为0，则保存下一个数字，并将次数置为1。
// 遍历结束后，所保存的数字即为所求。然后再判断它是否符合条件即可
function MoreThanHalfNum_Solution(numbers) {
    // write code here
    let length = numbers.length;
    let num = numbers[0];
    let count = 1;
    for (let i = 1; i < length; i++) {
        if (count === 0) {
            num = numbers[i];
            count = 1;
        }
        if (num === numbers[i]) {
            count ++;
        } else {
            count --;
        }
    }
    count = 0;
    for (let i = 0; i< length; i++) {
        if (numbers[i] === num) count++
    }
    if (count > length /2) {
        return num
    } else {
        return 0
    }
}


// 数组排序后，如果符合条件的数存在，则一定是数组中间那个数。（比如：1，2，2，2，3；或2，2，2，3，4；或2，3，4，4，4等等）
// 这种方法虽然容易理解，但由于涉及到快排sort，其时间复杂度为O(NlogN)并非最优；
function MoreThanHalfNum_Solution(numbers) {
    // write code here
    let length = numbers.length;
    let sortNumbers = numbers.sort();
    let num = numbers[Math.floor(length/2)]
    let count = 0;
    for (let i = 0; i< length; i++) {
        if (numbers[i] === num) count++
    }
    if (count > length /2) {
        return num
    } else {
        return 0
    }
}



function MoreThanHalfNum_Solution(numbers) {
    // write code here
    let length = numbers.length;
    while (numbers.length > 0) {
        let num = numbers.pop();
        let count = 1;
        for (let i = 0; i < numbers.length; i++) {
            if (numbers[i] === num) {
                count++
            }
        }
        if (count > length/2) {
            return num;
        }
    }
    return 0;
}

