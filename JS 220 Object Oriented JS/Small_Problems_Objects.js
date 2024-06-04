function createGreeter(name) {
  return {
    name,
    morning: 'Good Morning',
    afternoon: 'Good Afternoon',
    evening: 'Good Evening',
    greet(timeOfDay) {
      let msg = '';
      switch (timeOfDay) {
        case 'morning':
          msg += `${this.morning} ${name}`;
          break;
        case 'afternoon':
          msg += `${this.afternoon} ${name}`;
          break;
        case 'evening':
          msg += `${this.evening} ${name}`;
          break;
      }

      console.log(msg);
    },
  };
}
const helloVictor = createGreeter('Victor');
helloVictor.greet('morning');

/* I understood (without encountering the content from future lessons about JS
closures and garbage collected) that `name` in the switch case refers to the
argument `name`, rather than the property `name`, since there's no `this`.
 */

const item = {
  name: 'Foo',
  description: 'Fusce consequat dui est, semper.',
  price: 50,
  quantity: 100,
  discount(percent) {
    const discount = this.price * percent / 100;
    // this.price -= discount;

    // return this.price;
    return this.price - discount;
  },
};

item.discount(20)   // should return 40
// = 40
item.discount(50)   // should return 25
// = 20
item.discount(25)   // should return 37.5
// = 15
/*this was easy, too.*/


/*Testing Object Equality*/
function objectsEqual(first, second) {
  return (keysMatch(first,second) && valuesMatch(first,second))
  function keysMatch(a,b) {
    const aKeys = Object.keys(a).sort();
    const bKeys = Object.keys(b).sort();
    return aKeys.every((value, index) => value === bKeys[index]);
  }

  function valuesMatch(a,b) {
    const aKeys = Object.keys(a).sort();
    return aKeys.every(key => a[key] === b[key]);
  }
}

console.log(objectsEqual({a: 'foo'}, {a: 'foo'}));                      // true
console.log(objectsEqual({a: 'foo', b: 'bar'}, {a: 'foo'}));            // false
console.log(objectsEqual({a: 'foo', b: 'bar'}, {b: "bar", a: 'foo'}));  // true
console.log(objectsEqual({}, {}));                                      // true
console.log(objectsEqual({a: 'foo', b: undefined}, {a: 'foo', c: 1}));  // false
/*This last one got me. My solution does the same as the given, but mine
* does the unconventional (I haven't seen it anywhere else) way by turning the
* whole keys array to a string and comparing those...
* I can't think of an instance when this would not work...oh wait. dang. if one
* had a key '1' and the other 1...
* I have to rewrite my solution
*
* it makes sense that I haven't seen that pattern anywhere else. This updated
* solution is the same as the given, because it is bombproof.
*
* It's verbose, but at the same time, it's the only way to catch all the potential
* edge cases
* */

