class Node {
  constructor(key, val) {
    this.key = key;
    this.val = val;
    this.next = null;
    this.prev = null;
  }
}

class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.head = new Node(-1, -1);
    this.tail = new Node(-1, -1);

    this.nodeKeyMap = new Map();

    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  putNodeAfterHead(node) {
    let temp = this.head.next;
    this.head.next = node;
    node.next = temp;
    node.prev = this.head;
    temp.prev = node;
  }

  deleteNode(node) {
    let nextNode = node.next;
    let prevNode = node.prev;
    prevNode.next = nextNode;
    nextNode.prev = prevNode;
  }
  put(key, value) {
    if (this.nodeKeyMap.has(key)) {
      let node = this.nodeKeyMap.get(key);
      node.val = value;
      this.deleteNode(node)
      this.putNodeAfterHead(node);
      return;
    }
    if (this.capacity == this.nodeKeyMap.size) {
      let lastNode = this.tail.prev;
      this.nodeKeyMap.delete(lastNode.key);
      this.deleteNode(lastNode);
    }
    let newNode = new Node(key, value);
    this.nodeKeyMap.set(key, newNode);
    this.putNodeAfterHead(newNode);
  }
  get(key) {
    let node = this.nodeKeyMap.get(key);
    if (node == null) return -1;
    let val = node.val;
    this.deleteNode(node);
    this.putNodeAfterHead(node);
    return val;
  }
}

// LRU Cache
const cache = new LRUCache(2);

// Queries
cache.put(1, 1);
cache.put(2, 2);
console.log(cache.get(1) + " ");
cache.put(3, 3);
console.log(cache.get(2) + " ");
cache.put(4, 4);
console.log(cache.get(1) + " ");
console.log(cache.get(3) + " ");
console.log(cache.get(4) + " ");
