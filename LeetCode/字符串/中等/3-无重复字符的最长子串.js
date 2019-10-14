// 给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度。

// 示例 1:

// 输入: "abcabcbb"
// 输出: 3 
// 解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
// 示例 2:

// 输入: "bbbbb"
// 输出: 1
// 解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。
// 示例 3:

// 输入: "pwwkew"
// 输出: 3
// 解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
//      请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。

/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    let max = 0;
    let arr = [];
    for (let i = 0, l = s.length; i < l; i++) {
        let char = s[i];
        let index = arr.indexOf(char);
        if (index !== -1) {
            // 如果arr中存在char, 删除arr中char以及char之前的所有元素
            arr.splice(0, index + 1);
        }
        arr.push(char);
        if (arr.length > max) {
            // max记录已存在的最长子串
            max = arr.length;
        }
    }
    return max;
    
};

// 滑动窗口是数组/字符串问题中常用的抽象概念。 
// 窗口通常是在数组/字符串中由开始和结束索引定义的一系列元素的集合，即 [i, j)[i,j)（左闭，右开）。
// 而滑动窗口是可以将两个边界向某一方向“滑动”的窗口。
// 例如，我们将 [i, j)[i,j) 向右滑动 11 个元素，则它将变为 [i+1, j+1)[i+1,j+1)（左闭，右开）。

// 回到我们的问题，我们使用 HashSet 将字符存储在当前窗口 [i, j)[i,j)（最初 j = ij=i）中。 
// 然后我们向右侧滑动索引 jj，如果它不在 HashSet 中，我们会继续滑动 jj。直到 s[j] 已经存在于 HashSet 中。
// 此时，我们找到的没有重复字符的最长子字符串将会以索引 ii 开头。如果我们对所有的 ii 这样做，就可以得到答案。
var lengthOfLongestSubstring = function(s) {
    let length = s.length;
    let result = 0, i = 0, j = 0;
    let set =  new Set();
    
    while (i < length && j < length) {
        if (!set.has(s[j])) {
            set.add(s[j]);
            j++;
            result = Math.max(result, j - i);
        } else {
            set.delete(s[i]);
            i++;
        }
    }
    return result;
};