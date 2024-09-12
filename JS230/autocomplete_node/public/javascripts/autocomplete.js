import debounce from "./debounce";

// const Autocomplete_old = {
  // wrapInput: function() {
  //   let wrapper = document.createElement('div');
  //   wrapper.classList.add('autocomplete-wrapper');
  //   this.input.parentNode.appendChild(wrapper);
  //   wrapper.appendChild(this.input);
  // },
  //
  // createUI: function() {
  //   let listUI = document.createElement('ul');
  //   listUI.classList.add('autocomplete-ui');
  //   this.input.parentNode.appendChild(listUI);
  //   this.listUI = listUI;
  //
  //   let overlay = document.createElement('div');
  //   overlay.classList.add('autocomplete-overlay');
  //   overlay.style.width = `${this.input.clientWidth}px`;
  //
  //   this.input.parentNode.appendChild(overlay);
  //   this.overlay = overlay;
  // },
  //
  // bindEvents: function () {
  //   this.input.addEventListener('input', this.valueChanged);
  //   this.input.addEventListener('keydown', this.handleKeydown.bind(this));
  //   this.listUI.addEventListener('mousedown', this.handleMousedown.bind(this));
  // },
  //
  // handleMousedown(event) {
  //   this.input.value = event.target.textContent
  //   this.reset();
  // },
  //
  // handleKeydown(event) {
  //   switch(event.key) {
  //     case 'ArrowDown':
  //       event.preventDefault();
  //       if (this.selectedIndex === null || this.selectedIndex === this.matches.length - 1) {
  //         this.selectedIndex = 0;
  //       } else {
  //         this.selectedIndex += 1;
  //       }
  //       this.bestMatchIndex = null;
  //       this.draw();
  //       break;
  //     case 'ArrowUp':
  //       event.preventDefault();
  //       if (this.selectedIndex === null || this.selectedIndex === 0) {
  //         this.selectedIndex = this.matches.length - 1;
  //       } else {
  //         this.selectedIndex -= 1;
  //       }
  //       this.bestMatchIndex = null;
  //       this.draw();
  //       break;
  //     case 'Tab':
  //       if (this.bestMatchIndex !== null && this.matches.length !== 0) {
  //         this.input.value = this.matches[this.bestMatchIndex].name;
  //         event.preventDefault();
  //       }
  //       this.reset();
  //       break;
  //     case 'Enter':
  //       this.reset();
  //       break;
  //     case 'Escape': // escape
  //       this.input.value = this.previousValue;
  //       this.reset();
  //       break;
  //   }
  // },
  //
  // valueChanged() {
  //   let value = this.input.value;
  //   this.previousValue = value;
  //
  //   if (value.length > 0) {
  //     this.fetchMatches(value, matches => {
  //       this.visible = true;
  //       this.matches = matches;
  //       this.bestMatchIndex = 0;
  //       this.selectedIndex = null;
  //       this.draw();
  //     });
  //   } else {
  //     this.reset();
  //   }
  // },
  //
  // fetchMatches: function(query, callback) {
  //   let request = new XMLHttpRequest();
  //
  //   request.addEventListener('load', () => {
  //     callback(request.response);
  //   });
  //
  //   request.open('GET', `${this.url}${encodeURIComponent(query)}`);
  //   request.responseType = 'json';
  //   request.send();
  // },
  //
  // draw: function() {
  //   while (this.listUI.lastChild) {
  //     this.listUI.removeChild(this.listUI.lastChild);
  //   }
  //
  //   if (!this.visible) {
  //     this.overlay.textContent = '';
  //     return;
  //   }
  //
  //   if (this.bestMatchIndex !== null && this.matches.length !== 0) {
  //     let selected = this.matches[this.bestMatchIndex];
  //     this.overlay.textContent = this.generateOverlayContent(this.input.value, selected);
  //   } else {
  //     this.overlay.textContent = '';
  //   }
  //
  //   this.matches.forEach((match, index) => {
  //     let li = document.createElement('li');
  //     li.classList.add('autocomplete-ui-choice');
  //
  //     if (index === this.selectedIndex) {
  //       li.classList.add('selected');
  //       this.input.value = match.name;
  //     }
  //
  //     li.textContent = match.name;
  //     this.listUI.appendChild(li);
  //   });
  // },
  //
  // generateOverlayContent: function(value, match) {
  //   let end = match.name.substr(value.length);
  //   return value + end;
  // },
  //
  // reset() {
  //   this.visible = false;
  //   this.matches = [];
  //   this.bestMatchIndex = null;
  //   this.selectedIndex = null;
  //   this.previousValue = null;
  //
  //   this.draw();
  // },

//   init() {
//     this.input = document.querySelector('input');
//     this.url = '/countries?matching=';
//
//     this.listUI = null;
//     this.overlay = null;
//
//     this.visible = false;
//     this.matches = [];
//
//     this.wrapInput();
//     this.createUI();
//
//     this.valueChanged = debounce(this.valueChanged.bind(this), 300);
//
//     this.bindEvents();
//     this.reset();
//   },
//
// };

//Note that the class-based version of this does not work, neither with my code
// nor their completed code copied here.

class Autocomplete {
  constructor (input, url) {
    this.input = input;
    this.url = url;

    this.listUI = null;
    this.overlay = null;
    this.visible = false;
    this.matches = [];
    this.selectedIndex = null;
    this.previousValue = null;
    this.bestMatchIndex = null;

    this.wrapInput();
    this.createUI();
    this.valueChanged = debounce(this.valueChanged.bind(this), 300);
    this.bindEvents();
  }

  bindEvents() {
    this.input.addEventListener('input', this.valueChanged);
    this.input.addEventListener('keydown', this.handleKeydown.bind(this));
    this.listUI.addEventListener('mousedown', this.handleMousedown.bind(this));
  }

  wrapInput() {
    let wrapper = document.createElement('div');
    wrapper.classList.add('autocomplete-wrapper');
    this.input.parentNode.appendChild(wrapper);
    wrapper.appendChild(this.input);
  }

  createUI() {
    let listUI = document.createElement('ul');
    listUI.classList.add('autocomplete-ui');
    this.input.parentNode.appendChild(listUI);
    this.listUI = listUI;

    let overlay = document.createElement('div');
    overlay.classList.add('autocomplete-overlay');
    overlay.style.width = `${this.input.clientWidth}px`;

    this.input.parentNode.appendChild(overlay);
    this.overlay = overlay;
  }

  handleMousedown(event) {
    this.input.value = event.target.textContent
    this.reset();
  }

  handleKeydown(event) {
    switch(event.key) {
      case 'ArrowDown':
        event.preventDefault();
        if (this.selectedIndex === null || this.selectedIndex === this.matches.length - 1) {
          this.selectedIndex = 0;
        } else {
          this.selectedIndex += 1;
        }
        this.bestMatchIndex = null;
        this.draw();
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (this.selectedIndex === null || this.selectedIndex === 0) {
          this.selectedIndex = this.matches.length - 1;
        } else {
          this.selectedIndex -= 1;
        }
        this.bestMatchIndex = null;
        this.draw();
        break;
      case 'Tab':
        if (this.bestMatchIndex !== null && this.matches.length !== 0) {
          this.input.value = this.matches[this.bestMatchIndex].name;
          event.preventDefault();
        }
        this.reset();
        break;
      case 'Enter':
        this.reset();
        break;
      case 'Escape': // escape
        this.input.value = this.previousValue;
        this.reset();
        break;
    }
  }

  valueChanged() {
    let value = this.input.value;
    this.previousValue = value;

    if (value.length > 0) {
      this.fetchMatches(value, matches => {
        this.visible = true;
        this.matches = matches;
        this.bestMatchIndex = 0;
        this.selectedIndex = null;
        this.draw();
      });
    } else {
      this.reset();
    }
  }

  fetchMatches(query, callback) {
    let request = new XMLHttpRequest();

    request.addEventListener('load', () => {
      callback(request.response);
    });

    request.open('GET', `${this.url}${encodeURIComponent(query)}`);
    request.responseType = 'json';
    request.send();
  }

  draw() {
    while (this.listUI.lastChild) {
      this.listUI.removeChild(this.listUI.lastChild);
    }

    if (!this.visible) {
      this.overlay.textContent = '';
      return;
    }

    if (this.bestMatchIndex !== null && this.matches.length !== 0) {
      let selected = this.matches[this.bestMatchIndex];
      this.overlay.textContent = this.generateOverlayContent(this.input.value, selected);
    } else {
      this.overlay.textContent = '';
    }

    this.matches.forEach((match, index) => {
      let li = document.createElement('li');
      li.classList.add('autocomplete-ui-choice');

      if (index === this.selectedIndex) {
        li.classList.add('selected');
        this.input.value = match.name;
      }

      li.textContent = match.name;
      this.listUI.appendChild(li);
    });
  }

  generateOverlayContent(value, match) {
    let end = match.name.substr(value.length);
    return value + end;
  }

  reset() {
    this.visible = false;
    this.matches = [];
    this.selectedIndex = null;
    this.previousValue = null;
    this.bestMatchIndex = null;
    this.draw();
  }
}


document.addEventListener('DOMContentLoaded', () => {
  let input;
  let auto;
  input = document.querySelector('input');
  auto = new Autocomplete('/countries?matching=', input);
});



















