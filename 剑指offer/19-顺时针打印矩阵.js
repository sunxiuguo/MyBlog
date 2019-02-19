// 题目描述
// 输入一个矩阵，按照从外向里以顺时针的顺序依次打印出每一个数字，
// 例如，如果输入如下4 X 4矩阵： 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 
// 则依次打印出数字1,2,3,4,8,12,16,15,14,13,9,5,6,7,11,10.


// 用左上和右下的坐标定位出一次要旋转打印的数据，一次旋转打印结束后，往对角分别前进和后退一个单位。

function printMatrix(matrix) {
    // write code here
    let row = matrix.length;
    let col = matrix[0].length;
    
    let res = [];
    
    if (row === 0 || col === 0) {
        return res;
    }
    
    let left = 0, top = 0, right = col - 1, bottom = row -1;
    while (left <= right && top <= bottom) {
        // 左 → 右
        for (let i = left; i <= right; i++) {
            res.push(matrix[top][i]);
        }
        // 上 → 下
        for (let i = top + 1; i <= bottom; i++) {
            res.push(matrix[i][right]);
        }
        // 右 → 左
        // 需要判断top bottom , 防止单行的情况
        if (top !== bottom) {
            for (let i = right - 1; i >= left; i--) {
                res.push(matrix[bottom][i]);
            }
        }
        // 下 → 上
        // 需要判断left right , 防止单列的情况
        if (right !== left) {
           for (let i = bottom - 1; i > top; i--) {
                res.push(matrix[i][left]);
           } 
        }
        left++;
        top++;
        right--;
        bottom--;
    }
    return res;
}