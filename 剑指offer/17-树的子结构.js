// 题目描述
// 输入两棵二叉树A，B，判断B是不是A的子结构。（ps：我们约定空树不是任意一个树的子结构

/* function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
} */
function HasSubtree(pRoot1, pRoot2) {
    // write code here
    let result = false;
    // 如果任一树为空树, 则返回false
    if (!pRoot1 || !pRoot2) {
        return result;
    }
    // 如果找到了A树中对应B树根节点的点, 则以此为起点判断是否包含B树
    if (pRoot1.val === pRoot2.val) {
        result = isContainTree(pRoot1, pRoot2);
    }
    // 如果没有找到对应的点, 则去A树的左子树中继续查找
    if (!result) {
        result = HasSubtree(pRoot1.left, pRoot2);
    }
    // 如果没有找到对应的点, 则去A树的右子树中继续查找
    if (!result) {
        result = HasSubtree(pRoot1.right, pRoot2);
    }
    return result;
}

function isContainTree(node1, node2) {
    // 如果B树遍历完了, 全都符合, 则说明A树包含B树
    if (!node2) {
        return true;
    }
    // 如果B树没遍历完, A树却遍历完了, 则说明A树不包含B树
    if (!node1) {
        return false;
    }
    // 如果有一个节点对不上, 返回false
    if (node1.val !== node2.val) {
        return false;
    }
    // 如果根节点对应的上, 就分别去左右子树继续匹配
    return isContainTree(node1.left, node2.left) && isContainTree(node1.right, node2.right);
}