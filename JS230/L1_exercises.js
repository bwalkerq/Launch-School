'use strict'
let html = import('L1 exercises.html')

let document = html.childNodes


// function walk(node, callback) {
//   callback(node);
//   for (let index = 0; index < node.childNodes.length; index += 1) {
//     walk(node.childNodes[index], callback);
//   }
// }

console.log(document)
// Add the class stanza to each paragraph except the first.
let stanzas = []

walk(document, (node => {
  if (node instanceof HTMLParagraphElement) {
    stanzas.push(node);
  }
}));

stanzas.map( (el, i) => {
  if (i !== 0) {
    el.classList.add('stanza');
  }
})



function walk(node, callback) {
  callback(node);
  for (let index = 0; index < node.childNodes.length; index += 1) {
    walk(node.childNodes[index], callback);
  }
}

let images = [];
walk(document, (node => {
  if (node instanceof HTMLImageElement) images.push(node);
}))

let pngs = images.filter(image => {
  return image.currentSrc.match(/png$/)
})

console.log(images.length)
console.log(pngs.length)

// their solution:
/*
let images = [];
walk(document, node => {
  if (node.nodeName === 'IMG') {
    images.push(node);
  }
});

console.log(images.length);                      // 48 total images

let pngCount = images.filter(img => img.getAttribute('src').match(/png$/)).length;

// they used #getAttribute('src') to access where the image is coming from.
I used image.currentSrc, but I only used that because I poked around in the actual
code to see where png would show up. Maybe if I had done the CSS course more, I'd be quicker with
this stuff...


console.log(pngCount);                           // 23 images in png format
 */

walk(document, (node => {
  if (node instanceof HTMLAnchorElement) {
    node.style.color = 'red'
  }
}))

//their solution:
walk(document, node => {
  if (node.nodeName === 'A') {
    node.style.color = 'red';
  }
});

// their use of nodeName makes sense, because it's more brief. But since my IDE
//autocomplete the names of HTML elements, I'm using that for now.

function findAllParagraphs(doc) {
  let parags = []

  walk(doc, (node => {
    if (node instanceof HTMLParagraphElement) {
      parags.push(node);
    }
  }))

  return parags;
}

function setClassToArticleText(arrayOfParagraphs) {
  arrayOfParagraphs.map(node => {
    node.classList.add('article-text');
  })
}

setClassToArticleText(findAllParagraphs(document))

//that was one solution to adding "article-text" class to all the p elements
// here's the given

// function getElementsByTagName(tagName) {
//   let matches = [];
//
//   walk(document.body, (node => {
//     if (node.nodeName.toLowerCase() === tagName) {
//       matches.push(node);
//     }
//   }))
//
//   return matches;
// }

// getElementsByTagName('p').forEach(paragraph => {
//   paragraph.classList.add('article-text');
// });

/* I like that this one has a generic function for getting all the elements of a
node type.

forEach works for the transformation of the elements because the array is referencing
objects, so even though the array is not mutated, each object is.
 */

let paragraphs = document.getElementsByTagName("p");

for (let i = 0; i < paragraphs.length; i++) {
  paragraphs[i].classList.add('article-text')
}

let intros = document.getElementsByClassName('intro')
for (let i = 0; i < intros.length; i++) {
  let paragraphs = intros[i].getElementsByTagName('p')

  for (let j = 0; j < paragraphs.length; j++) {
    paragraphs[j].classList.add('article-text')
  }
}

// A13 Finding Nodes and Traversing Elements

let h2s = document.getElementsByTagName('h2')

for (let i = 0; i < h2s.length; i++) {
  console.log(h2s[i].textContent)
  console.log(h2s[i].textContent.split(' ').length)
}
// their solution
h2s = document.querySelectorAll('h2');
let h2Array = Array.prototype.slice.call(h2s);
h2Array.map(element => element.textContent.split(' ').length);



let target = document.getElementById('toc');
target = document.querySelector("#toc");
target = document.querySelectorAll(".toc")[0];

let links = document.querySelectorAll('.toc a')
let linksArray = Array.prototype.slice.call(links)
linksArray.forEach((anchor, i) => {
  if ( i % 2 === 1 ) {
    anchor.style.color = 'green';
  }
})

let nodes = document.querySelectorAll('div .thumbcaption');
let texts = [];
for (let i = 0; i < nodes.length; i++) {
  texts.push(nodes[i].textContent.trim())
}
console.log(texts)
// the first time(?) that I got the answer to a practice problem fully correct?
// Happy birthday to me.


// Classification problem, my solution
let obj = {};
let keys = ['Kingdom', 'Phylum', 'Class', 'Order', 'Family', 'Genus', 'Species'];
let rows = document.querySelectorAll('.infobox tr')

for (const row of rows) {
  for (const key of keys) {
    if (row.firstElementChild.textContent.includes(key)) {
      obj[key] = row.firstElementChild.nextElementSibling.textContent
    }
  }
}
console.log(obj)

// Their solution:
// let keys = ['Kingdom', 'Phylum', 'Class', 'Order', 'Family', 'Genus', 'Species'];
let classification = {};
let tds = document.querySelectorAll('.infobox td');
/* got all the td's (table data) rather than the rows
so they're going to always do it data element by data element, whereas I
focused on rows and getting the next element from that row. I suppose this is
the same level of complex, but it made more sense to me visually to partition in
rows.
 */
let cell;
let link;

for (let index = 0; index < tds.length; index += 1) {
  cell = tds[index];  // iterate through all the td's

  keys.forEach(key => {
    if (cell.textContent.indexOf(key) !== -1) { // wow, blowing my mind bc I
      // forgot that indexOf can be used on strings. checks if each key is
      // located within the string of the text content returned from each td.
      link = cell.nextElementSibling.firstElementChild;  // if so, load `link`
      // with the next element's first element (note that I just took the next
      // element's text content because the only text content in the whole thing
      // was the name of the taxonomic rank, but I imagine their way is less
      // error-prone.
      classification[key] = link.textContent;
    }
  });
}

console.log(classification);


// A14 create/modify DOM nodes
let paragraph = document.createElement('p');
paragraph.textContent = 'great workout today, ratih';
document.body.appendChild(paragraph);


// A16
// Use JavaScript to set a class of 'heading' to the heading (the h1 element).
let heading = document.querySelector('h1');
heading.classList.add('heading');
// OR
document.getElementById('h1').setAttribute('class', 'heading');
// this probably better because mine could get the wrong h1 if a different one is first

let uls;
uls = document.querySelectorAll("ul");;
for (const ul of uls) {
  ul.setAttribute('class', 'bulleted');
}
/* again, mine is too general. they are looking at the DOM, seeing id of the
 thing we're trying to modify, using that to 'get'
 */
document.getElementById('list').setAttribute('class', 'bulleted');

document.getElementById('toggle').onclick = (e) => {
  e.preventDefault();
  let notice;
  notice = document.getElementById('notice');
  if (notice.getAttribute('class') === 'hidden') {
    notice.setAttribute('class', 'visible');
  } else {
    notice.setAttribute('class', 'hidden');
  }
};

document.getElementById('notice').onclick = (e) => {
  e.preventDefault();
  // e.currentTarget.classList.add('hidden');  NB: adding hidden to the class
  // list, such that the class is now 'visible hidden', causes `hidden` to
  // override `visible`, and the element is hidden.
  e.currentTarget.setAttribute('class', 'hidden');
}

document.getElementById('multiplication').textContent = String(13 * 13);

document.getElementsByTagName('body').setAttribute('id', 'styled');
// This does NOT work because getElem... returns a (live) collection, so I need
// to access the first element, rather than adding a property to the collection.
document.getElementsByTagName('body')[0].setAttribute('id', 'styled');
// but a better way is:
document.body.id = 'styled';






















