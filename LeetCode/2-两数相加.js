// 给出两个 非空 的链表用来表示两个非负的整数。其中，它们各自的位数是按照 逆序 的方式存储的，并且它们的每个节点只能存储 一位 数字。

// 如果，我们将这两个数相加起来，则会返回一个新的链表来表示它们的和。

// 您可以假设除了数字 0 之外，这两个数都不会以 0 开头。

// 示例：

// 输入：(2 -> 4 -> 3) + (5 -> 6 -> 4)
// 输出：7 -> 0 -> 8
// 原因：342 + 465 = 807


// 思路：
// 因为链表中的数字是按照逆序存储, 两个链表数字的相加就相当于从最低位开始相加, 当前节点的和为 x+y+进位的值。

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

var addTwoNumbers1 = function(l1, l2) {
    let dummyHead = new ListNode(0);
    let p = l1, q = l2, curr = dummyHead;
    let carry = 0; // 进位
    while (p || q) {
		// x = 7, y = 8
		// sum = 15
		// carry = 1
		// curr.next的值为15%10 = 5（也可以是15-10=5，都一样，取个位数）
        let x = p ? parseInt(p.val) : 0;
        let y = q ? parseInt(q.val) : 0;
        let sum = parseInt(carry + x + y);
        carry = parseInt(sum / 10);
        curr.next = new ListNode(sum % 10);
        curr = curr.next;
        
        if (p) p = p.next;
        if (q) q = q.next;
    }
    if (carry > 0) {
        curr.next = new ListNode(carry);
    }
    return dummyHead.next;
    
};

/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
    let resultList = new ListNode(0);
    let tempNode = resultList;
    let decade = 0;
    while (l1 || l2) {
      if (l1) {
        tempNode.val += l1.val;
        l1 = l1.next;
      }
      if (l2) {
        tempNode.val += l2.val;
        l2 = l2.next;
      }
      tempNode.val += decade;
      decade = 0;
      if (tempNode.val >= 10) {
        tempNode.val -= 10;
        decade = 1;
      }
      if (l1 !== null || l2 !== null) {
        tempNode.next = new ListNode(0);
        tempNode = tempNode.next;
      }
    }
    if (decade === 1) {
      tempNode.next = new ListNode(1);
    }
    return resultList;
};
