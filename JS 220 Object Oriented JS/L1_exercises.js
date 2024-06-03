// Assignment 5
let invoices = {
  unpaid: [],
}

invoices.add = function(name, amount) {
  this.unpaid.push({
    name,
    amount,
  })
}

// invoices.add('Hardware store', 5612);

invoices.totalDue = function() {
  return this.unpaid.reduce((acc, v) => acc + v.amount, 0);
}

invoices.add('Due North Development',	250);
invoices.add('Moonbeam Interactive', 187.50);
invoices.add('Slough Digital', 300);

invoices.paid = [];
invoices.payInvoice = function(name) {
  let updatedUnpaid = [];
  this.unpaid.forEach(invoice => {
    if (invoice.name === name) {
      this.paid.push(invoice);
    } else {
      updatedUnpaid.push(invoice)
    }
  });
  this.unpaid = updatedUnpaid;
}

invoices.totalPaid = function () {
  return this.paid.reduce((acc, v) => acc + v.amount, 0);
}

invoices.payInvoice('Due North Development');
invoices.payInvoice('Slough Digital');
// console.log(invoices.totalPaid());
// console.log(invoices.totalDue());
//
// console.log(invoices);

function makeCar(accelerationRate, brakeRate) {
  return {
    speed: 0,
    accelerationRate,
    brakeRate,
    accelerate() {
      this.speed += this.accelerationRate;
    },
    brake() {
      if (this.speed >= brakeRate) {
       this.speed -= brakeRate;
      } else {
        this.speed = 0;
      }
    }
  };
}

let sedan = makeCar(8,6);
// sedan.accelerate();
// console.log(sedan.speed);
// sedan.brake();
// console.log(sedan.speed);
// sedan.brake();
// console.log(sedan.speed);

let coup = makeCar(12,10);
coup.accelerate();
// console.log(coup.speed);

let hatchback = makeCar(9, 7);

function makeCountry(name, continent, visited = false) {
  return {
    name,
    continent,
    visited,
    getDescription() {
      let visitText = this.visited ? 'I have visited ' : "I haven't visited ";
      return this.name + ' is located in ' + this.continent + '. ' + visitText + this.name + '.';
    },
    visitCountry() {
      this.visited = true;
    },
  }
}

let chile = makeCountry('The Republic of Chile', 'South America');
let canada = makeCountry('Canada', 'North America');
let southAfrica = makeCountry('The Republic of South Africa', 'Africa');

// console.log(chile);       // "The Republic of Chile is located in South America."
// console.log(canada.getDescription());      // "Canada is located in North America."
// console.log(southAfrica.getDescription()); // "The Republic of South Africa is located in Africa."
// southAfrica.visitCountry();
// console.log(southAfrica.getDescription());

function toolMaker(id, name, stock, price){
  return {
    id,
    name,
    stock,
    price,
    describe() {
      console.log(`
      Name: ${this.name}
      ID:${this.id}
      Price:${this.stock}
      Stock:${this.price}`)
    },
    setPrice(newPrice) {
      if (newPrice <= 0) {
        console.log('invalid price');
      } else {
        this.price = newPrice;
      }
    },
  };
}

let scissors = toolMaker(0, 'Scissors', 8, 10);
let drill = toolMaker(1, 'Cordless Drill', 15, 45);
scissors.describe()
drill.setPrice(90)
console.log(scissors, drill)
let plunger = toolMaker(2, 'Plunger', 12, 120)
let tools = [scissors, drill, plunger];
console.log(tools)

