// 给定一个排序数组和一个目标值，在数组中找到目标值，并返回其索引。如果目标值不存在于数组中，返回它将会被按顺序插入的位置。

// 你可以假设数组中无重复元素。

// 示例 1:
// 输入: [1,3,5,6], 5
// 输出: 2

// 示例 2:
// 输入: [1,3,5,6], 2
// 输出: 1


// 示例 3:
// 输入: [1,3,5,6], 7
// 输出: 4

// 示例 4:
// 输入: [1,3,5,6], 0
// 输出: 0


/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function(nums, target) {
    let index = 0;
    for (let i = 0; i < nums.length; i++) {
        if (target > nums[i]) {
            index++;
        } else {
            return index;
        }
    }
    return nums.length;
};

/**
 * 二分查找
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert1 = function(nums, target) {
    const length = nums.length;

    if (length === 0) {
        return 0;
    }

    if (target > nums[length - 1]) {
        return length;
    }

    let left = 0;
    let right = length - 1;

    while (left < right) {
        let mid = (left + right) >> 1;
        if (nums[mid] < target) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    return left;
};

const a = [1,3,5,6];
console.log(searchInsert1(a, 6));