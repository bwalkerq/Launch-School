const _ = function(element) {
  const u = {
    first() {
      return element[0];
    },

    last() {
      return element[element.length - 1];
    },

    without(...targets) {
      let arr = [...targets];
      return element.filter(elem => {
        return !(arr.includes(elem));
      })
    },

    lastIndexOf(target) {
      return ((element.length - 1) - element.reverse().indexOf(target))
    },

    sample(length) {
      let copy = element.slice();
      if (length === undefined) {
        return element[Math.floor(Math.random() * copy.length)];
      }

      let result = [];
      for (let i = 0; i < length; i++) {
        let randNum = Math.floor(Math.random() * copy.length);
        result.push(copy.splice(randNum, 1))
      }
      return result.flat();
    },

    hasAllGivenProperties(obj, propObj) {
      return Object.keys(propObj).every(prop => {
        return obj[prop] === propObj[prop];
      })
    },

    findWhere(propObj) {
      for (let i = 0; i < element.length; i++) {
        if (this.hasAllGivenProperties(element[i], propObj)) {
          return element[i]
        }
      }
    },

    where(propObj) {
      return element.filter(obj => {
        return this.hasAllGivenProperties(obj, propObj)
      })
    },


  };

  (['isElement']).forEach(method => {
    u[method] = function() { _[method].call(u, element); };
  })
  /*
  we'll set the method on the utility object to a new function that's going to call
  the method off of the underscore object directly. So we're going to pass in the current
  u lib object as the context, and the element as the argument.
   */

  return u;
};

_.range = function(a, b) {  // a represents the end if one arg supplied; the start if two supplied
  if (b === undefined) {
    [a,b] = [0, a]
  }
  let arr = []
  for (let i= a; i < b; i++) {
    arr.push(i)
  }
  return arr;
};

_.isElement = function(obj) {
  return obj && obj.nodeType === 1;
};



let dict = [{ foo: "bar", idx: 0 }, { foo: "baz", idx: 1 }, { foo: "bar", idx: 2 }];
console.log(
  // _(dict).findWhere({ foo: "bar" }).idx === 0,
  _(dict).where({ foo: "bar" }),
)






















































