// 题目描述
// 从上往下打印出二叉树的每个节点，同层节点从左至右打印。

// 其实就是层序遍历, 借助一个队列来实现

/* function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
} */
function PrintFromTopToBottom(root) {
    // write code here
    let queue = []; // 声明一个队列, 存放节点
    let result = []; // 存放值
    if (!root) {
        return result;
    }
    queue.push(root);
    while (queue.length > 0) {
        let node = queue.shift();
        if (node.left) {
            queue.push(node.left);
        }
        if (node.right) {
            queue.push(node.right);
        }
        result.push(node.val);
    }
    return result;
}