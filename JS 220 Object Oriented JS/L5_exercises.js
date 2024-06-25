// let invoice = {
//   phone: 3000,
//   internet: 6500,
// };
// let payment = {
//   phone: 1300,
//   internet: 5500,
// };
// let invoiceTotal = invoice.phone + invoice.internet;
// let paymentTotal = payment.phone + payment.internet;
// let remainingDue = invoiceTotal - paymentTotal;
//
// console.log(paymentTotal);         // => 6800
// console.log(remainingDue);         // => 2700

// function createInvoice(services) {
//   let phone = 3000;
//   let internet = 5500;
//
//   if (services) {
//     Object.keys(services).forEach(key => {
//       if (key === 'phone') {
//         phone = services.phone;
//       } else if (key === 'internet') {
//         internet = services.internet;
//       }
//     });
//   }
//
//   return {
//     phone: phone,
//     internet: internet,
//
//     total() {
//       return phone + internet;
//     }
//   }
// }

function createInvoice1(services = {}) {
  let invoice = {
    phone: services.phone || 3000,
    internet: services.internet || 5500,
  }

  invoice.total = function () {
    return this.phone + this.internet;
  };

  return invoice;
}

/* My solution above this one was so convoluded. This solution:
* - sets a default empty object to avoid reading properties of null
* - uses the same || operators to assign values that I tried to implement
* - doesn't nest the method inside the object, but instead assigns it outside
*   the object literal... */

// function invoiceTotal(invoices) {
//   let total = 0;
//   let i;
//
//   for (i = 0; i < invoices.length; i += 1) {
//     total += invoices[i].total();
//   }
//
//   return total;
// }

// let invoices = [];
// invoices.push(createInvoice());
// invoices.push(createInvoice({
//   internet: 6500,
// }));
//
// invoices.push(createInvoice({
//   phone: 2000,
// }));
//
// invoices.push(createInvoice({
//   phone: 1000,
//   internet: 4500,
// }));

// console.log(invoiceTotal(invoices));             // => 31000

function createPayment1(services = {}) {
  return {
    phone: services.phone || 0,
    internet: services.internet || 0,
    amount: services.amount,
    total() {
      if (this.amount) {
        return this.amount;
      } else {
        return this.internet + this.phone;
      }
    }
  }
}

// function paymentTotal(payments) {
//   let total = 0;
//   let i;
//
//   for (i = 0; i < payments.length; i += 1) {
//     total += payments[i].total();
//   }
//
//   return total;
// }

// let payments = [];
// payments.push(createPayment());
// payments.push(createPayment({
//   internet: 6500,
// }));
//
// payments.push(createPayment({
//   phone: 2000,
// }));
//
// payments.push(createPayment({
//   phone: 1000,
//   internet: 4500,
// }));
//
// payments.push(createPayment({
//   amount: 10000,
// }));
//
// // console.log(paymentTotal(payments));      // => 24000

function createInvoice(services = {}) {
  return {
    phone: services.phone || 3000,
    internet: services.internet || 5500,
    payments: [],

    total() {
      return this.phone + this.internet;
    },

    addPayment(payment) {
      this.payments.push(payment);
    },

    addPayments(array) {
      array.forEach(x => this.addPayment(x));
    },

    amountDue() {
      let totalPayments = this.payments.reduce((accum, payment) => {
        return accum += payment.total();
      }, 0)

      return this.total() - totalPayments;
    },
  };
}

function createPayment(services = {}) {
  return {
    phone: services.phone || 0,
    internet: services.internet || 0,
    amount: services.amount,
    total() {
      if (this.amount) {
        return this.amount;
      } else {
        return this.internet + this.phone;
      }
    }
  }
}

let invoice = createInvoice({
  phone: 1200,
  internet: 4000,
});

let payment1 = createPayment({
  amount: 2000,
});

let payment2 = createPayment({
  phone: 1000,
  internet: 1200,
});

let payment3 = createPayment({
  phone: 1000,
});

invoice.addPayment(payment1);
invoice.addPayments([payment2, payment3]);
console.log(invoice.payments)
console.log(invoice.amountDue());       // this should return 0







































