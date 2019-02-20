// 题目描述
// 输入一个整数数组，判断该数组是不是某二叉搜索树的后序遍历的结果。
// 如果是则输出Yes,否则输出No。假设输入的数组的任意两个数字都互不相同。

// 每一个节点的前面所有的节点严格分为两部分，全小于它的左子树和全大于它的右子树，
// 遍历的时候只要有一个大于它了说明进入右子树，此时再出现小于它的值说明就是错的排序树。
function VerifySquenceOfBST(sequence) {
    // write code here
    if(sequence.length == 0) return false;
    for(let i = 0; i < sequence.length; i++){
        // sequence[i]当做根节点
        let sign = false; // 标识是否进入右子树
        for(let j = 0; j < i; j++){
            // 遍历当前节点i之前的所有节点
            if(sequence[j] > sequence[i]){
                // 进入右子树
                sign = true;
            }
            else if(sign) return false; // 这个else说明sequence[j] < sequence[i]，进入右子树后，应该所有节点都大于根节点。如果又出现了比根节点小的,就说明序列错误
        }
    }
    return true;
}