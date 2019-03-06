// 题目描述
// 输入一颗二叉树的根节点和一个整数，打印出二叉树中结点值的和为输入整数的所有路径。
// 路径定义为从树的根结点开始往下一直到叶结点所经过的结点形成一条路径。
// (注意: 在返回值的list中，数组长度大的数组靠前)


/* function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
} */

function FindPath(root, expectNumber) {
    // write code here
    let result = [];
    let list = [];
    if (root) {
        dfs(root, expectNumber,result, list);
    }
    return result;
}

function dfs(root, expectNumber, result, list) {
    list.push(root.val);
    if (!root.left && !root.right && expectNumber === root.val) {
        result.push([...list]);
    }
    if (root.left) {
        dfs(root.left, expectNumber - root.val, result, list);
    }
    if (root.right) {
        dfs(root.right, expectNumber - root.val, result, list);
    }
    // 回退到父节点继续查找
    list.pop();
}