class Node{
    constructor(key,val){
        this.key = key;
        this.val = val;
        this.next = null;
        this.prev = null;
    }
}

class LRUCache{
    constructor(capacity){
        this.capacity = capacity;
        this.head = new Node(-1,-1);
        this.tail = new Node(-1,-1);
        this.nodeMapKey = new Map();
        
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }
    
    putNodeAfterHead(node){
        let nextNode = this.head.next;
        node.next = nextNode;
        node.prev = this.head;
        this.head.next = node;
        nextNode.prev = node;
    }
    deleteNode(node){
        let nextNode = node.next;
        let prevNode = node.prev;
        prevNode.next = nextNode;
        nextNode.prev = prevNode;
    }
    put(key,value){
        if(this.nodeMapKey.has(key)){
            let node = this.nodeMapKey.get(key);
            node.val = value;
            this.deleteNode(node);
            this.putNodeAfterHead(node);
        }
        if(this.capacity == this.nodeMapKey.size){
            let node = this.tail.prev;
            this.nodeMapKey.delete(node.key)
            this.deleteNode(node)
        }
        let newNode = new Node(key,value);
        this.nodeMapKey.set(key,newNode);
        this.putNodeAfterHead(newNode);
    }
    get(key){
        if(!this.nodeMapKey.has(key)) return -1;
        let node = this.nodeMapKey.get(key);
        let val = node.val;
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
