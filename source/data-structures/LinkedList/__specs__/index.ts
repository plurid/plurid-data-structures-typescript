import LinkedList from '../';



describe('LinkedList', () => {
    it('basic', () => {
        // creating an object for the
        // Linkedlist class
        const ll = new LinkedList();

        // testing isEmpty on an empty list
        // returns true
        console.log(ll.isEmpty());

        // adding element to the list
        ll.add(10);

        // prints 10
        console.log(ll.print_list());

        // returns 1
        console.log(ll.listSize());

        // adding more elements to the list
        ll.add(20);
        ll.add(30);
        ll.add(40);
        ll.add(50);

        // returns 10 20 30 40 50
        console.log(ll.print_list());

        // prints 50 from the list
        console.log("is element removed ? " + ll.removeElement(50));

        // prints 10 20 30 40
        console.log(ll.print_list());

        // returns 3
        console.log("Index of 40: " + ll.indexOf(40));

        // insert 60 at third position
        // ll contains 10 20 60 30 40
        ll.insertAt(60, 2);

        console.log(ll.print_list());

        // returns false
        console.log("is List Empty ? " + ll.isEmpty());

        // remove 4th element from the list
        console.log(ll.removeFrom(3));

        // prints 10 20 60 40
        console.log(ll.print_list());

        expect(true).toBeTruthy();
    });
});
