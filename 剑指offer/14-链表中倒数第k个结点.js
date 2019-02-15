// 题目描述
// 输入一个链表，输出该链表中倒数第k个结点。

/*function ListNode(x){
    this.val = x;
    this.next = null;
}*/

/**
 * 定义两个指针first和second，first先移动到正数第k个结点。
 * 然后first和second同时向后移动, 直到first到达末尾。
 * 此时的second指向的就是倒数第k个结点。
 * 相当于second和first之间是一把长度为k的刻度尺, first到达末尾, second就到达倒数k
 * @param {any} head 
 * @param {any} k 
 * @returns 
 */
function FindKthToTail(head, k) {
    // write code here
    if(!head || k<=0){
        return null;
    }
    let first = head;
    let second = head;

    for (let i = 1; i < k; i ++) {
        if (first.next) {
            first = first.next;
        } else {
            return null;
        }
    }

    while (first.next) {
        first = first.next;
        second = second.next;
    }
    return second;
}

function FindKthToTail(head, k) {
    // write code here
    if(!head || k<=0){
        return null;
    }
    let first = head;
    let second = head;
    let index = 0;

    while (first) {
        if (index >= k) {
            // 当first移动到第k个结点后, second才开始移动
            second = second.next;
        }
        first = first.next;
        index ++;
    }
    return index < k ? null : second;
}