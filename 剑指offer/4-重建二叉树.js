// 题目描述
// 输入某二叉树的前序遍历和中序遍历的结果，请重建出该二叉树。
// 假设输入的前序遍历和中序遍历的结果中都不含重复的数字。
// 例如输入前序遍历序列{1,2,4,7,3,5,6,8}和中序遍历序列{4,7,2,1,5,3,8,6}，则重建二叉树并返回。

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
