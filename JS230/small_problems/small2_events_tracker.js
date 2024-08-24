'use strict'

const tracker = (() => {
  const events = [];
  return {
    list() {
      return events.slice();
    },
    elements() {
      return this.list().map(ev => ev.target);
    },
    add(event) {
      events.push(event);
    },
    clear() {
      events.length = 0;
      return events.length;
    },
  };
})();

function track(callback) {
  return (event) => {
    // how do we access the event from the thing that's being clicked
    // the Event object is passed to the listener from the browser; when tracker
    // returns its anonymous function, that function will receive the Event object.
    if (!tracker.list().includes(event)) {
      tracker.add(event);
    }

    callback(event);
  };
}

window.onload = () => {

  const divRed = document.querySelector('#red');
  const divBlue = document.querySelector('#blue');
  const divOrange = document.querySelector('#orange');
  const divGreen = document.querySelector('#green');

  divRed.addEventListener('click', track(event => {
    document.body.style.background = 'red';
    console.log('red')
  }));

  divBlue.addEventListener('click', track(event => {
    event.stopPropagation();
    document.body.style.background = 'blue';
  }));

  divOrange.addEventListener('click', track(event => {
    document.body.style.background = 'orange';
  }));

  divGreen.addEventListener('click', track(event => {
    document.body.style.background = 'green';
  }));
}
/*
> tracker.list().length
  = 4
> tracker.elements()
  = [div#blue, div#red, div#orange, div#green]
> tracker.elements()[0] === document.querySelector('#blue')
  = true
> tracker.elements()[3] === document.querySelector('#green')
  = true
> tracker.list()[0]
  = click { target: div#blue, buttons: 0, clientX: 195, clientY: 190, layerX: 195, layerY: 190 }
// The event listed in `tracker` can differ by browser (Chrome - PointerEvent, Firefox - click)
> tracker.clear()
  = 0
> tracker.list()
  = []
> tracker.list()[0] = 'abc'
> tracker.list().length
  = 0
 */