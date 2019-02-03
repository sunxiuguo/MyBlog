// 题目描述:
// 在一个二维数组中（每个一维数组的长度相同），
// 每一行都按照从左到右递增的顺序排序，
// 每一列都按照从上到下递增的顺序排序。
// 请完成一个函数，输入这样的一个二维数组和一个整数，判断数组中是否含有该整数。

function Find(target, array){
    // write code here
    let rowLength = array[0].length;
    let colLength = array.length;
    if (array[colLength-1][rowLength-1] < target) {
        return false;
    }
    if (target < array[0][0]) {
        return false;
    }
    for (let row of array) {
        for (let number of row) {
            if (number === target) {
                return true;
            }
        }
    }
    return false;
}