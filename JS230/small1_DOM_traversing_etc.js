// #1 remembered that any html markup has the html, head, and body nodes, always

// #2
/*
1.21 no 17
2.4
3.1
4.4
5.1
6.2
7.1
8.3
9.2
10.1

learning: I got used to putting whitespace text nodes on either side of element
nodes, but sometimes those whitespace text nodes are combined between, say, child
elements of the main div parent.

Also in some cases, there is a whitespace text node at the start of an element
but not the end.
 */
// FE
// let mainDiv = document.getElementById(1);
// mainDiv.childNodes.length

// function countNodes(node) {
//   let count = 0;
//   Array.prototype.slice.call(node.childNodes).forEach(child => {
//     count += countNodes(child);
//   })
//   return count;
// }

function countNodes(node) {
  if (!node.childNodes?.length) {
    return 0
  } else {
    let sum = node.childNodes.length;
      for (const each_node of node.childNodes) {
        sum += countNodes(each_node);
      }
    return sum;
  }
}

function directAndIndirectChildren(id) {
  let parent = document.getElementById(id);
  let directChildren = parent.childNodes.length;

  // let indirectChildren = countNodes(parent);
  let indirectChildren = countNodes(parent) - directChildren;

  return [directChildren, indirectChildren];
}

// console.log(directAndIndirectChildren(1));
// console.log(directAndIndirectChildren(4));



// #3
function domTreeTracer(id) {
  let element = document.getElementById(id);
  // return domTraverser(element).reverse();
  return whileTraverser(element);
}

function whileTraverser(element) {
  let result = [];
  while (element.id !== '1') {
    result.push(siblingNamesArray(element))
    element = element.parentElement;
  }
  result.push(siblingNamesArray(element));
  return result;
}

function domTraverser(element) {
  if (element.id === '1') {
    return [siblingNamesArray(element)]
  } else {
    let result = domTraverser(element.parentElement)
    result.push(siblingNamesArray(element));
    return result;
  }
}

function siblingNamesArray(node) {
  let siblings = node.parentElement.children;
  return Array.prototype.slice.call(siblings).map(child => child.nodeName);
}

// window.onload = () => {
//   console.log(domTreeTracer(2));
//   console.log(domTreeTracer(22));
// }

// > domTreeTracer(1);
// = [["ARTICLE"]]
//   > domTreeTracer(2);
// = [["HEADER", "MAIN", "FOOTER"], ["ARTICLE"]]
//   > domTreeTracer(22);
// = [["A"], ["STRONG"], ["SPAN", "SPAN"], ["P", "P"], ["SECTION", "SECTION"], ["HEADER", "MAIN", "FOOTER"], ["ARTICLE"]]


function sliceTree(topID, bottomID) {
  let fullElementTree = [];
  let node = document.getElementById(bottomID);
  // start at the bottom of the tree

  if (!node) return undefined;  // case where the bottomID element doesn't exist

  while (node) {
    fullElementTree.push(node);  // populate the tree array
    if (node.id === String(topID)) break;  // when we get to the topID, break
    node = node.parentElement;  // otherwise, move on up the tree
  }

  if (!node) return undefined; // if we never got to the topID element and broke
  // out, we get all the way to the top of the DOM (the <html> tab) and its
  // parent is `null`. This catches the no-valid-path case.

  return fullElementTree.reverse().map(el => el.tagName);
}

// window.onload = () => {
//   console.log(sliceTree(1, 4));  // ["ARTICLE", "HEADER", "SPAN", "A"]
//   console.log(sliceTree(1, 76) === undefined);  // undefined
//   console.log(sliceTree(2, 5) === undefined);  // undefined
//   console.log(sliceTree(5, 4) === undefined);  // undefined
//   console.log(sliceTree(1, 23));  // ["ARTICLE", "FOOTER"]
//   console.log(sliceTree(1, 22));  // ["ARTICLE", "MAIN", "SECTION", "P", "SPAN", "STRONG", "A"]
//   console.log(sliceTree(11, 19));  // ["SECTION", "P", "SPAN", "STRONG", "A"]
// }

// Color
function walk(node, callback) {
  callback(node);
  for (let index = 0; index < node.childNodes.length; index += 1) {
    walk(node.childNodes[index], callback);
  }
}

function walkLevels(node, callback, level) {
  callback(node, level);
  // level += 1;
  for (let i = 0; i < node.children.length; i++) {
    walkLevels(node.children[i], callback, level + 1);
  }
}

function colorGeneration(targetLevel) {
  walkLevels(document.body, (node, level) => {
    if (targetLevel === level) {
      // node.classList.add('generation-color');
      node.setAttribute('class', 'generation-color')
    }
  }, 0);

  return undefined;
}

// window.onload = () => {
//   console.log(colorGeneration(4));
// }

// Karis Tobias' solution:
function coloring(gen, parent=document.body, indent=0) {
  if (indent === gen && parent.id) parent.classList.toggle('generation-color');
  [...parent.children].forEach(child => coloring(gen, child, indent + 1));
}
/* [...spread syntax] for the children is pretty smooth.

 */






























