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

window.onload = () => {
  console.log(domTreeTracer(2));
  console.log(domTreeTracer(22));
}

// > domTreeTracer(1);
// = [["ARTICLE"]]
//   > domTreeTracer(2);
// = [["HEADER", "MAIN", "FOOTER"], ["ARTICLE"]]
//   > domTreeTracer(22);
// = [["A"], ["STRONG"], ["SPAN", "SPAN"], ["P", "P"], ["SECTION", "SECTION"], ["HEADER", "MAIN", "FOOTER"], ["ARTICLE"]]





















































