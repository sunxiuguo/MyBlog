// 题目描述
// 输入一棵二叉搜索树，将该二叉搜索树转换成一个排序的双向链表。要求不能创建任何新的结点，只能调整树中结点指针的指向。


/* function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
} */

// 中序遍历, 把遇到的结点合并到链表中, 指好左右指针即可

// 双向链表的左边头结点和右边头结点
let leftHead, rightHead;
function Convert(pRootOfTree) {
    // write code here
    if (!pRootOfTree) {
        return null;
    }
    // 第一次运行时, 最左边叶子结点成为链表第一个结点
    Convert(pRootOfTree.left);
    if (!rightHead) {
        leftHead = rightHead = pRootOfTree;
    } else {
        // 把根节点插入到双向链表右边, rightHead向后移动
        rightHead.right = pRootOfTree;
        pRootOfTree.left = rightHead;
        rightHead = pRootOfTree;
    }
    // 右边叶子结点也插入到双向链表
    Convert(pRootOfTree.right);
    return leftHead;
}