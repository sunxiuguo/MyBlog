// 题目描述
// 输入某二叉树的前序遍历和中序遍历的结果，请重建出该二叉树。
// 假设输入的前序遍历和中序遍历的结果中都不含重复的数字。
// 例如输入前序遍历序列{1,2,4,7,3,5,6,8}和中序遍历序列{4,7,2,1,5,3,8,6}，则重建二叉树并返回。

/* 先序遍历第一个位置肯定是根节点node，
 
  中序遍历的根节点位置在中间p，在p左边的肯定是node的左子树的中序数组，p右边的肯定是node的右子树的中序数组
 
  另一方面，先序遍历的第二个位置到p，也是node左子树的先序子数组，剩下p右边的就是node的右子树的先序子数组
 
  把四个数组找出来，分左右递归调用即可
 
*/


/* function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
} */
function reConstructBinaryTree(pre, vin) {
    // write code here
    if(pre.length==0||vin.length==0){
        return null;
    };
    let rootIndex = vin.indexOf(pre[0]);
    
    return {
        val: pre[0],
        left: reConstructBinaryTree(pre.slice(1, rootIndex + 1), vin.slice(0, rootIndex)),
        right: reConstructBinaryTree(pre.slice(rootIndex + 1), vin.slice(rootIndex + 1)),
    }
}
