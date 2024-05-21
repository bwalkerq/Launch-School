/*
Given an object of chapters, Create a function that returns which chapter is nearest to the page you're on. If two chapters are equidistant, return the chapter with the higher page number.

p:
input:
  an object
    of chapters with keys as strings
      name of chapter
    and value as numbers
      page number
  an integer: the page you're on

output:
  the name of the chapter (string) key from the object

the page number will always be less than the highest page number in the object

e:
done below, 3 cases

nearestChapter({
  "Chapter 1" : -5,
  "Chapter 2" : 5,
  "Chapter 3" : big
}, 15) ➞ "Chapter 2"

d:
object
array of the values

a:
distances
take the values from the object, map them represent the distance fromt he current page number

copy the values, take the absolute value of each
find the min, store the min

find and store the index of the min in the distances

go back to the object, get the chapters, and return the chapter (key) with the index of the min

*/
function nearestChapter(obj, currentPage) {
  let distances = Object.values(obj).map(page => {
    return page - currentPage;
  });

  let abs = distances.map(Math.abs)
  let min = Math.min(...abs)

  let minIdx = distances.indexOf(min)
  if (minIdx === -1) {
    minIdx = distances.indexOf(-min)
  }

  return Object.keys(obj)[minIdx]
}

/*
for in loops for objects
be familiar with objects, entries, fromEntries,,

give a higher level algo, dial it down
test stuff in the plan on the console

*/

let book = {
  "Chapter 1" : 1,
  "Chapter 2" : 15,
  "Chapter 3" : 37
}


for (let chapter in book) {
  book[chapter] = 10 - book[chapter];
  console.log(chapter,
  book[chapter]
  );
}

// console.log(
// nearestChapter({
//   "Chapter 1" : 1,
//   "Chapter 2" : 15,
//   "Chapter 3" : 37
// }, 11) === "Chapter 2")
// // closer to the upside
// console.log(
//   nearestChapter({
//     "Chapter 1" : 1,
//     "Chapter 2" : 15,
//     "Chapter 3" : 37
//   }, 20)  === "Chapter 2");
//   // closer on the downside
// console.log(
// nearestChapter({
//   "Chapter 1" : 10,
//   "Chapter 2" : 20,
//   "Chapter 3" : 37
// }, 15) ===  "Chapter 2");
// //equidistant, returns the higher

// console.log(nearestChapter({
//   "Chapter 1" : 1,
//   "Chapter 2" : 15,
//   "Chapter 3" : 37
// }, 10) === "Chapter 2")
//
// console.log(nearestChapter({
//   "New Beginnings" : 1,
//   "Strange Developments" : 62,
//   "The End?" : 194,
//   "The True Ending" : 460
// }, 200) === "The End?")
//
// console.log(nearestChapter({
//   "Chapter 1a" : 1,
//   "Chapter 1b" : 5
// }, 3) === "Chapter 1b")
//
// console.log(nearestChapter({
//   "Chapter 1a" : 1,
//   "Chapter 1b" : 5,
//   "Chapter 1c" : 50,
//   "Chapter 1d" : 100
// }, 75) === "Chapter 1d")
//
// console.log(nearestChapter({
//   "Chapter 1a" : 1,
//   "Chapter 1b" : 5,
//   "Chapter 1c" : 50,
//   "Chapter 1d" : 100,
//   "Chapter 1e" : 200
// }, 150) === "Chapter 1e")
//
// console.log(nearestChapter({
//   "Chapter 1a" : 1,
//   "Chapter 1b" : 5,
//   "Chapter 1c" : 50,
//   "Chapter 1d" : 100,
//   "Chapter 1e" : 200
// }, 74) === "Chapter 1c")
//
// console.log(nearestChapter({
//   "Chapter 1a" : 1,
//   "Chapter 1b" : 5,
//   "Chapter 1c" : 50,
//   "Chapter 1d" : 100,
//   "Chapter 1e" : 200,
//   "Chapter 1f" : 400
// }, 300) === "Chapter 1f")
//
// console.log(nearestChapter({
//   "Chapter Four": 46,
//   "Chapter Five": 54
// }, 50) === "Chapter Five")
