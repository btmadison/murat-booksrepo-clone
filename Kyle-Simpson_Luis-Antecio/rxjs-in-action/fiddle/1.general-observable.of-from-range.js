const Rx = require('rxjs/Rx');

// producer / Observable: any data, mouse clicks, keyboard inputs, HTTP requests (upstream)
// stream / pipeline: a stream of data, the business logic
// consumer / Observer: subscribes to the stream / pipeline (downstream)

// producer / Observable is lifted into the stream context with Rx.Observable.of(..)
// Rx.Observable.of(Observable) -> stream / pipeline -> .subscribe(consumerFunc/Observer)

/*
  Rx.Observable.of(data-source) //  Rx.Observable.of(..) wraps the data source / Observable within a stream
    .operator(..) // the stream / pipeline is a sequence of operators chained by the dot operator
    .operator(..) 
    .operator(..)
    .subscribe(consumer) // the consumer function / Observer processes the output
*/

Rx.Observable.of(42).subscribe( // Rx.Observable.of(Observable) <arbitrary pipeline>
  val => { // consumer function / Observer
    console.log(val);
  }
);
// note: an Observable wrapper around a single synchronous value is overkill


Rx.Observable.of(1, 2, 3, 4, 5).subscribe( // Rx.Observable.of(Observable) <arbitrary pipeline>
  val => { // consumer function / Observer
    console.log(val);
  }
);
// note: an Observable wrapper around a multiple synchronous value is overkill


// if using arrays, use from
Rx.Observable.from([1, 2, 3, 4, 5]).subscribe( // Rx.Observable.of(Observable) <arbitrary pipeline>
  val => { // consumer function / Observer
    console.log(val);
  }
);


// RxJS has the forEach observable method as well, with the exact same semantics as subscribe:
Rx.Observable.from([6, 7, 8, 9, 10]).forEach(console.log);


Rx.Observable.from([1, 2, 3, 4, 5]) // Rx.Observable.of(Observable)
  .filter(num => (num % 2) === 0)  // stream / pipeline                
  .map(num => num * num)
  .subscribe(
    val => { // consumer function / Observer
      console.log(val);
    }
  );


Rx.Observable.range(1, 3).subscribe(
  x => console.log(`Next: ${x}`),
  err => console.log(`Error: ${err}`),
  () => console.log('Completed')
)

// KEY: RxJs can treat any data just like static data in these examples, as if time didn't exist


const isEven = x => x % 2 === 0
const square = x => x * x
const add = (a, b) => a + b;

Rx.Observable.range(1, 10) // Observable
  .filter(isEven) // within the stream / pipeline, the data is immutable. Business logic is safe.
  .map(square)
  .reduce(add)
  .subscribe( // the stream is idle until a consumer subscribes to it
  val => {   // side effects are only at consumer / Observer, which is great
    console.log(val)
  }
)



/* when to use RxJs
although you’re able to convert anything your heart desires into Observables, it doesn’t always mean that you should.
In particular, processes that are strictly synchronous and iterative or will only ever deal with a single value do not need to be “Rx-ified”

               single value                     multi-value
sync       char, number..(overkill)       string, array...(overkill)

async       promise (can do)           DOM events, replaces event emitters: clicks, key presses... (great)
*/

// wrapping promisees: 2.2 example


// wrapping event emitters

// event emitters have hooks or callbacks to which closures can be passed; in this way it’s very much like the Promise. 
// But an event emitter doesn’t stop after a single event; instead, it can continue to invoke the registered callbacks for each event that arrives, creating a practically infinite stream of events. 
// The emitter will fulfill both of your criteria for handling multi-value, asynchronous events. But it’s not without its share of problems.
//  Though simple to use, event emitters don’t scale well for larger systems, because their simplicity leads to a lack of expressiveness. 
// The semantics for unsubscribing and disposing of them can be cumbersome, and there’s no native support for error handling.
//  These deficits can make it difficult to compose and synchronize complex tasks where multiple events from different parts of the system can be in flight simultaneously. 
// Rather, you can use RxJS to wrap event emitters, with all their benefits and versatility.

/*
// DOM example

const link = document.querySelector('#google'); // query DOM for html element

const clickStream = Rx.Observable.fromEvent(link, 'click') // create an observable around click events on this link
  .map(event => event.currentTarget.getAttribute('href')) // extract the event's href attribute
  .subscribe(console.log); //-> http://www.google.com


// Node example

// instead of listening for the add event
addEmitter.on('add', (a, b) => {
  console.log(a + b); //-> Prints 5
});

// you can subscribe to it
Rx.Observable.fromEvent(addEmitter, 'add', (a, b) => ({a: a, b: b}))
   .map(input -> input.a + input.b)
   .subscribe(console.log); //-> 5

addEmitter.emit('add', 2, 3);

*/
