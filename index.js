/**
 * Linked list built using
 * http://www.i-programmer.info/programming/javascript/5328-javascript-data-structures-the-linked-list.html?start=1
 */
class LinkedList {
  /**
   * Book keeping. Keep a reference to the start
   * and end nodes.
   */
  constructor() {
    this.start = null
    this.end = null;
  }
  /**
   * Returning an object that represents a node.
   */
  create_node(data) {
    return {
      data: typeof data !== "undefined" ? data : null,
      next: null
    }
  }
  /**
   * If we're a new linked list, we need to create a new node
   * and assign it as the starting node. The new node is the
   * start and end of the list.
   * If we're adding a node to a non-empty list, we need to add
   * that node to the end's next pointer. Now the end is should be
   * a reference to the new node.
   */
  add_node(data) {
    if (this.start === null) { // We're a new Linked List
      // The start node is a newly created node
      this.start = this.create_node(data);
      // The end is a reference to the start
      this.end = this.start;
    } else { // We need to update the end
      // The last node's (end) will point to a newly created node
      this.end.next = this.create_node(data);
      // The new end will be the node we just created
      this.end = this.end.next;
    }
    return this;
  }
  /**
   * Create a new node using provided data. Set the new
   * node's next pointer to what WAS the starting node.
   * Then set the new node as the starting node.
   */
  insert_as_first(data) {
    // Create a node that will become the head.
    let first_node = this.create_node(data);
    // Set the next "pointer" of the first node to the start.
    // Start will become the second node
    first_node.next = this.start;
    // Finally, set the start node to the first_node.
    this.start = first_node;
    return this;
  }
  /**
   * Delete node works by keeping track of the previous
   * node and the current node while iterating through
   * the list. When it comes upon the node to delete,
   * it orphans the current node we're looking at by setting
   * previous.next = current.next
   * A -> B -> C becomes A -> C
   */
  delete_node(data) {
    let current = this.start;
    let previous = this.start;
    while (current !== null) {
      if (current.data === data) { // We found the node to delete
        // Case where we're deleting the first node
        if (current === this.start) {
          this.start = current.next;
          return this;
        }
        // Case where we're deleting the last node
        if (current === this.end) {
          // The end becomes the previous node; leaving the true end
          // to become an orphan that gets garbage collected
          this.end = previous;
        }
        // Creating the orphan (deleting). previous next pointer
        // will look at the current's next pointer, thereby
        // making an orphan out of the "current" node.
        previous.next = current.next;
        return this;
      }
      // Book keeping. We're about to iterate once more
      // previous needs to be the current node we're looking at
      // and current needs to become the next node we want to look at
      previous = current;
      current = current.next;
    }
    return this;
  }
  toConsole() {
    console.log(JSON.stringify(this, null, 2));
  }
}
module.exports = {
  LinkedList: LinkedList,
  BinaryTree: undefined
}
// let linkedList = new LinkedList();
// console.log('Adding 10 nodes...')
// for (var i = 0; i < 10; i++) {
//   linkedList.add_node(i);
// }
// linkedList.toConsole();
// console.log('Deleting a node');
// linkedList.delete_node(5)
//   .toConsole();
// console.log(JSON.stringify(linkedList, null, 2))
