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


// Node Swap

function nodeSwapIncomplete(first, second) {
  let firstEl = document.getElementById(first);
  let secondEl = document.getElementById(second);
  let siblings = [...firstEl.parentElement.children];

  if (!siblings.includes(secondEl)) {
    return undefined;
  }

  let [firstIdx, secondIdx] = [siblings.indexOf(firstEl), siblings.indexOf(secondEl)];
  [siblings[firstIdx], siblings[secondIdx]] = [siblings[secondIdx], siblings[firstIdx]];

  for (const sibling of siblings) {
    firstEl.parentElement.appendChild(sibling);
  }

  return true;
}
/*
dangit, Their test cases were all scenarios in which the swapped elements were
direct siblings. Unfortunately, my solution only works for siblings, but their
solution, which uses cloning, works for  non-sibling valid cases.
 */

function nodeSwapCloningSolution(node1Id, node2Id) {
  const node1 = document.getElementById(node1Id);
  const node2 = document.getElementById(node2Id);

  if (!isInvalidSwap(node1, node2)) {
    const node1Clone = node1.cloneNode(true);
    const node2Clone = node2.cloneNode(true);
    const node1Parent = node1.parentNode;
    const node2Parent = node2.parentNode;

    node1Parent.replaceChild(node2Clone, node1);
    node2Parent.replaceChild(node1Clone, node2);
    return true;
  }
}

function isInvalidSwap(node1, node2) {
  return ((!node1 || !node2) ||
    node1.contains(node2) || node2.contains(node1));
}

function elementIncludedInTree(target, parent) {
    return !!walk(parent, node => {
      if (node === target) {
        return true;
      }
    });
}

function nodeSwap(first, second) {
  let firstEl = document.getElementById(first);
  let secondEl = document.getElementById(second);

  if (!firstEl || !secondEl || elementIncludedInTree(firstEl, secondEl) ||
    elementIncludedInTree(secondEl, firstEl)) {
    return undefined;
  }

  let tempNode = document.createElement("p")
  firstEl.parentElement.replaceChild(tempNode, firstEl);
  secondEl.parentElement.replaceChild(firstEl, secondEl);
  tempNode.parentElement.replaceChild(secondEl, tempNode);

  return true;
}


// window.onload = () => {
  // nodeSwap(9,7);
  // console.log(nodeSwap(1,3));
  // console.log(nodeSwap(1,10))
  // console.log(nodeSwap(2,9)) // non-siblings
// }

function nodesToArr(node = document.body) {
  return [node.tagName, [...node.children].map(nodesToArr)];
}

window.onload = () => {
  console.log(nodesToArr());
}

























