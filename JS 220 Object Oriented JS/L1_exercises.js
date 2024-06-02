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
console.log(invoices.totalPaid());
console.log(invoices.totalDue());

console.log(invoices);
