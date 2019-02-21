// 题目描述
// 输入一个复杂链表（每个节点中有节点值，以及两个指针，一个指向下一个节点，另一个特殊指针指向任意一个节点），
// 返回结果为复制后复杂链表的head。（注意，输出结果中请不要返回参数中的节点引用，否则判题程序会直接返回空）


/*
*解题思路：
*1、遍历链表，复制每个结点，如复制结点A得到A1，将结点A1插到结点A后面；
*2、重新遍历链表，复制老结点的随机指针给新结点，如A1.random = A.random.next;
*3、拆分链表，将链表拆分为原链表和复制后的链表
*/

/*function RandomListNode(x){
    this.label = x;
    this.next = null;
    this.random = null;
}*/
function Clone(pHead) {
    // write code here
    if (!pHead) {
        return null;
    }

    let currentNode = pHead;
    // 1. 复制每个节点，如复制结点A得到A1, 将结点A1插入到结点A后面
    while (currentNode) {
        let cloneNodeLabel = new RandomListNode(currentNode.label);
        let nextNode = currentNode.next;
        
        currentNode.next = cloneNodeLabel;
        cloneNodeLabel.next = nextNode;
        currentNode = nextNode;
    }
    
    currentNode = pHead;
    // 2. 重新遍历链表，复制老结点的random指针给新结点，如A1.random = A.random.next (因为第一步，把复制的节点都插入到了原结点后面)
    while (currentNode) {
        currentNode.next.random = currentNode.random ? currentNode.random.next : null;
        currentNode = currentNode.next.next;
    }

    // 3. 拆分链表，将链表拆分为原链表和复制后的链表
    currentNode = pHead;
    let pCloneHead = currentNode.next;
    while (currentNode) {
        let cloneNode = currentNode.next;
        currentNode.next = cloneNode.next;
        cloneNode.next = cloneNode.next  ? cloneNode.next.next : null;
        currentNode = currentNode.next;
    }
    
    return pCloneHead;
}