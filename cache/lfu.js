class Node{
    constructor(key,value){
        this.key = key;
        this.value = value;
        this.next = null;
        this.prev = null;
        this.count = 1;
    }
}
class DLL{
    constructor(){
        this.head = new Node(-1,-1);
        this.tail = new Node(-1,-1);
        this.size = 0;
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }

    putNodeAfterHead(node){
        let nextNode = this.head.next;
        node.next = nextNode;
        node.prev = this.head;
        this.head.next = node;
        nextNode.prev = node;
        this.size++;
    }
    deleteNode(node){
        let nextNode = node.next;
        let prevNode = node.prev;
        prevNode.next = nextNode;
        nextNode.prev = prevNode;
        this.size--;
    }
}

class LFUCache{
    constructor(capacity){
        this.capacity = capacity;
        this.nodeKeyMap = new Map();
        this.freqMap = new Map();
        this.minFreq = 0;
        this.currSize = 0;
    }
    updateFrequency(node){
        let list = this.freqMap.get(node.count)
        list.deleteNode(node);

        if(node.count == this.minFreq && this.freqMap.get(node.count).size == 0){
            this.minFreq ++;
        }
        let newDLL = new DLL();
        if(this.freqMap.get(node.count+1)){
            newDLL = this.freqMap.get(node.count+1);
        }
        node.count+=1;
        newDLL.putNodeAfterHead(node);
        this.nodeKeyMap.set(node.key,node);
        this.freqMap.set(node.count,newDLL);
    }
    put(key,value){
        if(this.nodeKeyMap.has(key)){
            let node = this.nodeKeyMap.get(key);
            node.value = value;
            this.updateFrequency(node);
            return;
        }
        if(this.capacity == this.currSize){
            let list = this.freqMap.get(this.minFreq)
            let nodeToRemove = list.tail.prev;
            list.deleteNode(nodeToRemove)
            this.nodeKeyMap.delete(nodeToRemove.key);
            this.currSize--;
        }
        this.currSize++;
        this.minFreq = 1 ;
        let list = new DLL();
        if(this.freqMap.get(this.minFreq)){
          list = this.freqMap.get(this.minFreq)
        }
        let newNode = new Node(key,value)
        list.putNodeAfterHead(newNode);
        this.nodeKeyMap.set(key,newNode);
        this.freqMap.set(this.minFreq,list);
    }
    get(key){
        if(!this.nodeKeyMap.get(key)) return -1;
        let node = this.nodeKeyMap.get(key);
        let val = node.value;
        this.updateFrequency(node);
        return val;
    }
}

// LFU Cache
const cache = new LFUCache(2);

// Queries
cache.put(1, 1);
cache.put(2, 2);
console.log(cache.get(1) + " ");
cache.put(3, 3);
console.log(cache.get(2) + " ");
console.log(cache.get(3) + " ");
cache.put(4, 4);
console.log(cache.get(1) + " ");
console.log(cache.get(3) + " ");
console.log(cache.get(4) + " ");