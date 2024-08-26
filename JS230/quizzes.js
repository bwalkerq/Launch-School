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
// window.onload = () => {
//   let addIntroInfo = document.querySelector('.intro').cloneNode(true);
//   let addIntroInfoLink = addIntroInfo.querySelector('a');
//
//   addIntroInfo.firstChild.nodeValue = 'We also have previous newsletters.';
//   addIntroInfoLink.textContent = 'Check them out here.';
//   addIntroInfoLink.href = 'newsletters.html';
//   console.log(addIntroInfoLink)
//
//   document.body.insertBefore(addIntroInfo, document.querySelector('.form'));
// }


/* Quiz 2
11/13

#10
correctly chose B, incorrectly chose C also.
given:
let p = new Promise((resolve, reject) => {
  let value = Math.random();
  if (value < 0.75) {
    resolve(value);
  } else {
    reject(value);
  }
});
Which of the following code snippets can be used to handle this Promise when
it settles? Select all the snippets that are correct:

C:
async function showResult(p) {
  try {
    console.log(`In range: ${p}`)
  } catch (error) {
    console.log(`Out of range: ${error}`);
  }
}

showResult(p);

I skimmed this, knowing that there's an alternate version that handles promises
with `async` in front of functions, and chose this because `try...catch` felt
familiar.

first of all, `p` in this choice is treated as a value, but it's actually a
promise object.
Second, there's no await. I think the following is due to the lack of use of await.
"the catch block will never be executed since JavaScript won't recognize the
 rejected promise until after all the code has been run."


#11
...
Promise.all([download1, download2, download3])
       .then(messages => messages.forEach(message => console.log(message)));

overlooked that in the promise API, Promise.all() is passed an argument
representing an *array of fulfilled promises*. I chose an answer that represented the idea
that we *do* know that all the promises fulfill (correct), and we *don't* know the order in
which they will fulfill (correct, but this led to my error). Since `all`
executes when all have fulfilled, and takes an argument of the fulfilled promise
objects, the order in which they are processed is the order of the array.

 */
















































