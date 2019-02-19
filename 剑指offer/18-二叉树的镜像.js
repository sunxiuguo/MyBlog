// 题目描述
// 操作给定的二叉树，将其变换为源二叉树的镜像。
// 输入描述:
// 二叉树的镜像定义：源二叉树 
//     	    8
//     	   /  \
//     	  6   10
//     	 / \  / \
//     	5  7 9 11
//     	镜像二叉树
//     	    8
//     	   /  \
//     	  10   6
//     	 / \  / \
//     	11 9 7  5

/* function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
} */

// 其实就是递归交换左右节点
function Mirror(root) {
    // write code here
    if (root) {
        let left = root.left;
        root.left = root.right;
        root.right = left;
        
        if (root.left) {
            Mirror(root.left);
        }
        if (root.right) {
            Mirror(root.right);
        }
    }
}