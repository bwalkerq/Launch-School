'use strict'
// randomizer

function callback1() {
  console.log('callback1');
}

function callback2() {
  console.log('callback2');
}

function callback3() {
  console.log('callback3');
}

function randomizer(...callbacks) {
  if (callbacks.length < 1) return;

  let secondsElapsed = 0;
  const secondsEnd = 2 * callbacks.length;

  let timer = setInterval(() => {
    secondsElapsed++;
    console.log(secondsElapsed);

    if (secondsElapsed >= secondsEnd) {
      clearInterval(timer);
    }
  }, 1000);

  [...callbacks].forEach(callback => {
    const time = Math.floor(Math.random() * secondsEnd * 1000);
    setTimeout(() => callback(), time);
  })
}

// randomizer(callback1, callback2, callback3);

// Output:
// 1
// 2
// "callback2"
// 3
// "callback3"
// 4
// 5
// "callback1"
// 6


// reverse engineer
window.onload = () => {

  document.querySelector('html').addEventListener('click', (event) => {
    const container = document.querySelector('#container');

    if (!container.contains(event.target)) {
     container.style = 'display: none';
    }
  });
}
  /*
  I learned that using `if (event.target !== container)` is not as useful as
  using `contains`, a method to be called on node to see if another node is
  contained within that node (i.e. is the node itself, or one of its descendants)
   */

// Bold Element + Custom

// function makeBold(element, cb) {
//   element.style.fontWeight = 'bold';
//   if (cb && typeof cb === 'function') {
//     cb(element);
//   }
// }
//
// window.onload = () => {
//
//   let sectionElement = document.querySelector('section');
//   makeBold(sectionElement, function (elem) {
//     elem.classList.add('highlight');
//   });
//
//   console.log(sectionElement.classList.contains('highlight'));
// // = true
//   console.log(sectionElement.style.fontWeight);
// // = "bold"
// }

// FE - make a `customEvent` that listens to something being bolded?

// const bolded = new CustomEvent(bolded, )
//
//  nah... this is their solution, and I never would have figured this out on my own
function makeBold(element) {
  element.style.fontWeight = 'bold';
  const event = new CustomEvent('bolded');

  element.dispatchEvent(event);
}

// window.onload = () => {
//   const sectionElement = document.querySelector('section');
//
//   sectionElement.addEventListener('bolded', (event) => {
//     alert(event.target.tagName);
//     event.target.classList.add('highlight');
//   });
//
//   makeBold(sectionElement);
// }
/*
I could see this being helpful if you had to make a bunch of stuff bold over time
via user interactions, and each time those bolded things had to have something
else accompany them.
I haven't even heard of dispatchEvent, lol. It's cool that you can dispatch a custom
event to let the program know that something just happened, and the event listener
will fire, so you don't have to keep writing in code to handle the cases...
I don't really get this, but it *feels* like something that would be powerful.
 */


// Buggy Code
// This problem confused event.stopPropagation with event.preventDefault


// Context Menus
// window.onload = () => {
//   const main = document.querySelector('main');
//   main.addEventListener("contextmenu", ev => {
//     ev.preventDefault();
//     alert(main.nodeName);
//   });
//
//   const sub = document.querySelector('#sub');
//   sub.addEventListener("contextmenu", ev => {
//     ev.stopPropagation();
//     ev.preventDefault();
//     alert(sub.id)
//   })
// }

// Selection Filters
// initial attempt on my own
// window.onload = () => {
//   const classifications = document.querySelector('#animal-classifications');
//   const animals = document.querySelector('#animals');
//
//   classifications.addEventListener('change', () => {
//     let chosen = classifications.options[classifications.selectedIndex];
//     console.log(chosen, chosen.value)
//     for (const option of animals.options) {
//       if (  option.getAttribute('x-name-classification')  .includes(chosen.value)) {
//       // console.log(typeof option.getAttribute('x-name-classification'))
//         console.log(option)
//       }
//     }
//
//   })
// }

// 2nd attempt with Phillip 9/18

// Pedac
// grab each select element
// add a "select" listener for each
  // listener should change option values in OTHER select element based on the current selected element
  // according to option table which we can hold in a hash or w/e
  // do option elements need to get added/deleted, or can we just make them invisible?
  // we can add the hidden property to make the option hidden

window.onload = () => {
  const classifications = document.querySelector('#animal-classifications');

  classifications.addEventListener("change", (event) => {
    console.log('hi');
    let options = [...classifications.getElementsByTagName('option')];
    options[1].hidden = true;
  });

  const animals = document.querySelector('#animals');


}


/*
ok holy crap, I have no idea how I was supposed to know how to identify an
option that was selected from a dropdown. The rest of the CSS class? I don't
think so...
So, the dropdown element, called select, apparently gives an array of its
options with select.options.
select.selectedIndex returns the index value of the option that is selected.
 */

// Delegate Event Function
// function delegateEvent(parentElement, selector, eventType, callback) {
//   if (!parentElement) return undefined;
//   const targetElements = parentElement.querySelectorAll(selector);
//   if (!targetElements) return undefined;
//
//   for (const targetElement of targetElements) {
//     targetElement.addEventListener(eventType, callback)
//   }
//   return true;
// }
/* my function does not work "retroactively"; it assigns handlers to the descendant
elements that exist on load, but their solution below works for any elements that
are added after the fact, by closure. Maybe a downside of their solution is that
each event has to re-retrieve all the DOM elements via querySelectAll
 */

function delegateEvent(parentElement, selector, eventType, callback) {
  if (parentElement && parentElement instanceof Element) {
    return !parentElement.addEventListener(eventType, ev => {
      const validTargets = Array.prototype.slice.call(parentElement.querySelectorAll(selector));
      if (validTargets.includes(ev.target)) {
        callback(ev);  // ? I don't understand what this is doing...
      }
    });
  }
}
/* well, apparently their solution has a void return value...
also, the second if-clause is lost on me. Their notes say "Line [191] ensures that
`callback` only executes the target element is one of the valid targets."

 */

window.onload = () => {
  // Possible elements for use with the scenarios
  const element1 = document.querySelector('table');
    // no element here.
  const element2 = document.querySelector('main h1');
  console.log(element2)
    // captures the h1 within main
  const element3 = document.querySelector('main');
    // captures the entire main

  // Possible callback for use with the scenarios
  const callback = ({target, currentTarget}) => {
    alert(`Target: ${target.tagName}\nCurrent Target: ${currentTarget.tagName}`);
  };

  // Scenario 1:
  // console.log(delegateEvent(element1, 'p', 'click', callback) === undefined);
  // Scenario 2:
  // console.log(delegateEvent(element2, 'p', 'click', callback) === true);
  // Scenario 3:
  // delegateEvent(element2, 'h1', 'click', callback);
  // Scenario 4:
  // delegateEvent(element3, 'h1', 'click', callback);
  // Scenario 5:
  delegateEvent(element3, 'aside p', 'click', callback);

  // delegateEvent(element2, 'p', 'click', callback);
  // const newP = document.createElement('P');
  // const newContent = document.createTextNode('New Paragraph');
  // newP.appendChild(newContent);
  //
  // element2.appendChild(newP);
}


















