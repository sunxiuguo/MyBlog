// 题目描述
// 输入两个单调递增的链表，输出两个链表合成后的链表，当然我们需要合成后的链表满足单调不减规则。

/*function ListNode(x){
    this.val = x;
    this.next = null;
}*/


// 初始化为（pHead1为1, pHead2为2）
//     1 -> 3 -> 5 -> 7
//     2 -> 4 -> 6 -> 8
// 第一次执行 拿出1, 结果链表变为 1 -> （下一次递归结果）
// 此时pHead1为3，pHead2为2
//     3 -> 5 -> 7
//     2 -> 4 -> 6 -> 8
// 第三次执行, 拿出2, 结果链表变为 1 -> 2 -> (下一次递归结果)
// 此时pHead1为3，pHead2为4
//     3 -> 5 -> 7
//     4 -> 6 -> 8

function Merge(pHead1, pHead2) {
    // write code here
    if (!pHead1) {
        return pHead2;
    }
    if (!pHead2) {
        return pHead1;
    }
    if (pHead1.val <= pHead2.val) {
        pHead1.next = Merge(pHead1.next,pHead2);
        return pHead1;
    }
    if (pHead2.val <= pHead1.val) {
        pHead2.next = Merge(pHead2.next,pHead1);
        return pHead2;
    }
}