'use strict'

// A11 Loading JSON via XHR
// let request = new XMLHttpRequest();
// request.open('GET', 'https://api.github.com/repos/rails/rails');
// request.responseType = 'json';
//
// request.addEventListener('load', ev => {
//   let data = request.data;
//   console.log(request.status, data.open_issues);
// });
//
// request.addEventListener('error', ev => {
//   console.log("The request could not be completed!")
// });

// request.send()


// A12 Sending JSON via XHR
/*
Serialize the data into valid JSON.
Send the request using XMLHttpRequest with a Content-Type: application/json; charset=utf-8 header.
Handle the response.
 */

// request = new XMLHttpRequest();
// request.open('POST', 'url')
// request.setRequestHeader('Content-Type', 'application/json; charset=utf-8')
//
// let data = {this:'that', something:'those'};
// let json = JSON.stringify(data);
//
// request.send(json);



/*
let request = new XMLHttpRequest();
request.open('POST', 'https://lsjs230-book-catalog.herokuapp.com/books');

request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

let data = { title: 'Eloquent JavaScript', author: 'Marijn Haverbeke' };
let json = JSON.stringify(data);

request.send(json);

// Write out the raw text of the HTTP request the last example above will send to the server.

POST /books HTTP/1.1
host: lsjs230-book-catalog.herokuapp.com
Content-Type: application/json; charset=utf-8
Accept: */                                                        /*
{ 'title': 'Eloquent JavaScript', 'author': 'Marijn Haverbeke' }
 */

// surprisingly hard to do this.
/*
generic:
method_type /path_ HTTP/1.1
host: host_name
Content-Type: type_if_specified
Accept: asterisk/asterisk
{json object key value pairs but note that the keys are strings now as well}

 */

const create_a_product = new XMLHttpRequest();
create_a_product.open('POST', 'https://ls-230-web-store-demo.herokuapp.com/v1/products');
create_a_product.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
create_a_product.setRequestHeader('Authorization', 'token AUTH_TOKEN');

let create_a_product_data = {
  name: 'adderall',
  sku: 'adhd+++',
  price: 1,
}
let create_json = JSON.stringify(create_a_product_data);
create_a_product.send(create_json);


// A better version that makes a function for
function createProduct(productObject) {
  let json = JSON.stringify(productObject);
  let request = new XMLHttpRequest();

  request.open("POST", "https://ls-230-web-store-demo.herokuapp.com/v1/products");
  create_a_product.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
  create_a_product.setRequestHeader('Authorization', 'token AUTH_TOKEN');

  request.addEventListener('load', () => {
    console.log(`This product was added: ${request.responseText}`);
  });

  request.send(json);
}

createProduct({
  name: 'adderall',
  sku: 'adhd+++',
  price: 1,
});



































