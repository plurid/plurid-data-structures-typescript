export class LinkedListNode<T> {
    public element: T;
    public previous: LinkedListNode<T> | null;
    public next: LinkedListNode<T> | null;

    constructor(
        element: T,
    ) {
        this.element = element;
        this.previous = null;
        this.next = null;
    }
}



class LinkedList<T> {
    public head: LinkedListNode<T> | null;
    public size: number;

    constructor() {
        this.head = null;
        this.size = 0;
    }

    /**
     * Adds an `element` at the end of list.
     * @param element
     */
    add(
        element: T,
    ) {
        // creates a new node
        const node = new LinkedListNode(element);

        // if list is Empty add the
        // element and make it head
        if (this.head == null) {
            this.head = node;
        } else {
            let currentNode = this.head;

            // iterate to the end of the
            // list
            while (currentNode.next) {
                currentNode = currentNode.next;
            }

            // add node
            currentNode.next = node;
        }
        this.size++;
    }

    /**
     * Insert `element` at the position `index` of the list.
     *
     * @param element
     * @param index
     */
    insertAt(
        element: T,
        index: number,
    ) {
        if (index > 0 && index > this.size) {
            return false;
        }  else {
            // creates a new node
            const node = new LinkedListNode(element);
            let previous;
            let current: any = this.head;

            // add the element to the
            // first index
            if (index == 0) {
                node.next = current;
                this.head = node;
            } else {
                current = this.head;
                var it = 0;

                // iterate over the list to find
                // the position to insert
                while (it < index) {
                    it++;
                    previous = current;
                    current = current.next;
                }

                // adding an element
                node.next = current;
                previous.next = node;
            }
            this.size++;

            return;
        }
    }

    /**
     * Removes an `element` from the specified location.
     * @param index
     */
    removeFrom(
        index: number,
    ) {
        if (index > 0 && index > this.size) {
            return -1;
        } else {
            let it = 0;
            let current: any = this.head;
            let previous = current;

            // deleting first element
            if (index === 0) {
                this.head = current.next;
            } else {
                // iterate over the list to the
                // position to removce an element
                while (it < index) {
                    it++;
                    previous = current;
                    current = current.next;
                }

                // remove the element
                previous.next = current.next;
            }
            this.size--;

            // return the remove element
            return current.element;
        }
    }

    /**
     * Removes a given `element` from the list.
     * @param element
     */
    removeElement(
        element: T,
    ) {
        let current = this.head;
        let previous = null;

        // iterate over the list
        while (current !== null) {
            // comparing element with current
            // element if found then remove the
            // and return true
            if (current.element === element) {
                if (previous === null) {
                    this.head = current.next;
                } else {
                    previous.next = current.next;
                }
                this.size--;
                return current.element;
            }
            previous = current;
            current = current.next;
        }
        return -1;
    }

    /**
     * Finds the index of `element`.
     *
     * @param element
     */
    indexOf(
        element: T,
    ) {
        let count = 0;
        let current = this.head;

        // iterae over the list
        while (current !== null) {
            // compare each element of the list
            // with given element
            if (current.element === element) {
                return count;
            }

            count++;
            current = current.next;
        }

        // not found
        return -1;
    }

    /**
     * Checks the list for empty.
     */
    isEmpty() {
        return this.size == 0;
    }

    /**
     * Gives the size of the list.
     */
    listSize() {
        return this.size;
    }

    /**
     * Prints the list items.
     */
    print_list() {
        let current = this.head;
        let list = [];
        while (current) {
            list.push(current.element);
            current = current.next;
        }
        return list;
    }
}


export default LinkedList;
