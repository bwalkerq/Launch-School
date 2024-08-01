// #1
/*
I got this wrong because I am used to Webstorm modifying the html when I open it
in a browser; I assumed it manipulated the DOM rather than the HTML itself, so
I thought, when I viewed what I now know is the html, I thought I was looking at
the modified DOM from Webstorm.

A (chose this, incorrect)
The DOM is the text you see when you view the source of a web page.

B
The HTML you write is the DOM. They are one and the same.

C (chose this, correct)
The DOM is an in-memory object representation of an HTML document.

D
None of the other choices are correct.


 */


function walk(node, callback) {
  callback(node);
  for (let index = 0; index < node.childNodes.length; index += 1) {
    walk(node.childNodes[index], callback);
  }
}

// window.onload = () => {
//
//   let text1 = document.querySelector('div').firstChild.nodeValue;
//   let text2 = document.querySelector('div').textContent;
//
//   console.log([text1, text2])
//   console.log(text1);
//   console.log( text2);
//   console.log(text1 == text2);
  // let count = 0
  // walk(document.body, node => {
  //   count += 1;
  //   console.log(count)
  //   console.log(node)
  // })


// #10
/* I got correct, but I had to ask GPT why;
the issue here is that two elements will end up having the same id, since we
cloned one with a deep clone. that's a no no.
 */
window.onload = () => {
  let addIntroInfo = document.querySelector('.intro').cloneNode(true);
  let addIntroInfoLink = addIntroInfo.querySelector('a');

  addIntroInfo.firstChild.nodeValue = 'We also have previous newsletters.';
  addIntroInfoLink.textContent = 'Check them out here.';
  addIntroInfoLink.href = 'newsletters.html';
  console.log(addIntroInfoLink)

  document.body.insertBefore(addIntroInfo, document.querySelector('.form'));
}







