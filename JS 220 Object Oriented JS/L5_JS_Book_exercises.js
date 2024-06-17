let apple = {
  name: 'Apple',
  color: 'Red',

  isRipe: function() {
    return `This ${this.name} is ripe.`;
  },

  describe: function() {
    return `This ${this.name} is ${this.color}.`;
  },
};

let banana = {
  name: 'Banana',
  color: 'Yellow',

  isRipe: function() {
    return `This ${this.name} is ripe.`;
  },

  describe: function() {
    return `This ${this.name} is ${this.color}.`;
  },
};

let blackberry = {
  name: 'Blackberry',
  color: 'Black',

  isRipe: function() {
    return `This ${this.name} is ripe.`;
  },

  describe: function() {
    return `This ${this.name} is ${this.color}.`;
  },
};

function makeFruit(name, color) {
  return {
    name,
    color,
    isRipe() {
      return `This ${this.name} is ripe.`;
    },
    describe() {
      return `This ${this.name} is ${this.color}.`;
    },
  };
}

function makePhone(brand, model, releaseYear) {
  return {
    brand,
    model,
    releaseYear,
    checkBattery() {
      console.log('your battery is lit');
    },
    displayInfo() {
      return `${releaseYear} ${brand} ${model}`;
    },
  };
}
let fancy = makePhone('Apple', 'iphone12', '2020');
let layman = makePhone('Samsung', 'Galazy s21', '2021');
// console.log(fancy, layman)

function createInstrument(name, type) {
  return {
    name,
    type,
    play() {
      console.log(`We are playing a tune on this ${name}.`)
    },
    showType() {
      console.log(`This ${name} is a ${type} instrument.`)
    },
  }
}

let violin = createInstrument('violin', 'string');
violin.play();     // We are playing a tune on this violin
violin.showType(); // This violin is a string instrument

let flute = createInstrument('flute', 'wind');
flute.play();      // We are playing a tune on this flute
flute.showType();  // This flute is a wind instrument

let drum = createInstrument('drum', 'percussion');
drum.play();       // We are playing a tune on this drum
drum.showType();   // This drum is a percussion instrument



















































