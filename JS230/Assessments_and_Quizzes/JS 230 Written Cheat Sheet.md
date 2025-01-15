
---
# Document Object Model (DOM)
## The DOM

Modern web browser are host environments which provide objects and functions accessible by browser APIs, which can be interacted with via JavaScript but which are not an official part of the language. This includes the BOM (Browser Object Model) which includes the actual window, various sensors, and other aspects of the browser application and the DOM (Document Object Model).

The DOM is an API for interacting with HTML (and SVG and XML) web documents. A web browser parses a web document and loads the DOM as a memory-based representation of that document, which is used to render web pages to screen and to allow for object-oriented interaction between programming languages (primarily Javascript) and the document. The DOM constructs its representation of an HTML document as a hierarchical tree of node objects, with each node representing a part of the document and the top or root node being the `document` node itself.

It is primarily the DOM, accessed and manipulated with events and asynchronous Javascript, which allows for the interactive web applications we commonly encounter and use on today's modern web. Rather than the static HTML files of the past, we can programmatically manipulate the DOM, altering the structure, content, and style of a web page on the fly.

## DOM Nodes

Nodes are object representations of points in the DOM tree. The root or top node of the DOM is the `document` node which is, fittingly,  has a node type of `DOCUMENT_NODE`. Every document also contains, at minimum, three other root element nodes: the `html` node, the `head` node, and the `body` node. These are objects which correspond to their same-named HTML tags of an HTML document. Even if an HTML document is blank (possible because of the fundamental permissiveness of HTML), the browser will insert these and create their representative objects.

The DOM `Node` API provides a number of properties and instance methods node objects which inherit from it, and it also itself inherits from the `EventTarget` interface.

Aside from the Document node, there are a number of types of nodes (accessible via their `nodeType` property), however the most prevalent node types for the concerns of this course are Element and Text nodes.

It should be noted that the DOM `Node` interface provided by browsers is an abstract class, meaning that nodes are always a member of a subclass (such as `Document` or `Element`) and it is not possible for a node to not be.
##### Element Nodes

Element Nodes typically correspond to HTML tags found in the original HTML document or created and inserted later by the browser or some code. Element nodes inherit from the `Node` and `EventTarget` interfaces but also from the `Element` class, and in the case of HTML elements, the `HTMLElement` interface. All of these interfaces provide properties and methods which can be used to access and manipulate Element nodes and their relationship to the DOM.
##### Text Nodes

Text Nodes correspond to text found in a web document, both the actual text such as words and numbers, but also whitespace such as space and newlines. Text nodes which contain only whitespace are sometimes colloquially referred to as whitespace text nodes or empty text nodes, and usually are created when the browser parses a manually written HTML document from the whitespace between HTML element tags. They typically do not occur in HTML generated programmatically.

Because Text Nodes are often "empty" or not visible, they can sometimes be forgotten, leading to bugs with code that traverses or manipulates the DOM.

## Node Properties

Nodes have properties which can be used to ascertain information about the node, manipulate the node, and traverse the DOM tree via a nodes children, parents, or siblings.
##### `nodeName`

[Node: nodeName property - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeName)

The `nodeName` property is a read-only property which returns a string representation of the nodes name. HTML element nodes will be an uppercase version of their corresponding HTML tag (ie: `<p>` => `'P'`), while text nodes will have the nodeName value of `'#text'`. Element nodes also have a `tagName` property with the same value.

##### `nodeType`

[Node: nodeType property - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType)

The `nodeType` property is a read-only property which returns an integer representation of a nodes type. Element nodes have a `nodeType` value of `1`, Text nodes have a `nodeType` value of `3`.

##### `nodeValue`

[Node: nodeValue property - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeValue)

The `nodeValue` property is a property which can access or set the value of a node. Element nodes have a `null` value and Text nodes have a value of their text content.

##### `textContent`

[Node: textContent property - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent)

The `textContent` property is a property which can access or set the text content within an element node and any of its children. The return value is all the text content of an element and its descendant nodes as a single string, including whitespace.

##### `innerHTML`

[Element: innerHTML property - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML)

The `innerHTML` property is a property which can access or set the HTML markup within an element node, including its descendants. When used to set the property, `innerHTML` replaces all of an element's descendants with new nodes created by parsing the HTML passed to it as a string.

#### Element Specific Properties

Some properties are class dependent and only available to certain element nodes of certain Element subclasses such as the `href` property of an `HTMLAnchorElement` and the `value` property of `HTMLInputElement` and `HTMLSelectElement` .

#### Determining Node Type

There are several ways to determine what type of node one is working with:

- The `Object.getPrototypeOf()` static method can be passed a DOM node argument and will return the prototype of that node.

```js
Object.getPrototypeOf(p)
// HTMLParagraphElement {Symbol(Symbol.toStringTag): 'HTMLParagraphElement', onmouseenter: undefined, onmouseleave: undefined, constructor: ƒ}

Object.getPrototypeOf(t)
// Text {Symbol(Symbol.toStringTag): 'Text', splitText: ƒ, constructor: ƒ}
```

- `toString()` method can be invoked on a DOM node and typically (not with `Anchor` elements) returns the node type

```js
p.toString()    // '[object HTMLParagraphElement]'
t.toString()    // '[object Text]'

document.querySelector('a').toString()
// 'http://localhost:63342/node_properties/JS230/Lesson_1/node_properties/info.html'
```

- We can also access the value of a nodes `constructor` property, though the exact return value and syntax is browser dependent.

**Chrome**
```js
document.querySelector('a').constructor;
// ƒ HTMLAnchorElement() { [native code] }
```

**Firefox**
```js
document.querySelector('a').constructor;
// function()
document.querySelector('a').constructor.name; /* Note use of .name property! */
// "HTMLAnchorElement"
```

- `instanceof` returns a boolean if a node is of a certain type

```js
let p = document.querySelector('p');
p instanceof HTMLParagraphElement; // true
p instanceof HTMLAnchorElement;    // false
p instanceof Element;              // true
p instanceof HTMLElement;          // true
p instanceof Node;                 // true

```


## DOM Traversal

The DOM is a hierarchical tree of nodes. Element nodes further up the tree are said to be parents or ancestors and nodes further down the tree are said to be children or descendants. Nodes which share a common immediate parent and are at the same level on the tree are said to be siblings. These connections can be accessed via a variety of mostly read-only properties.

Beginning with the root `document` node, we can traverse through the DOM tree via these properties, either with properties that include all nodes, or those that only include element nodes.

### Useful Element Tree Traversal Properties

##### `parentElement`: [Node: parentElement property - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Node/parentElement)

 A read-only property which references the parent Element node of a node or `null` if it has no parent or parent is not an element node.

##### `children`: [Element: children property - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/children)

A read-only property that references a live array-like `HTMLCollection` containing the elements immediate `Element` children.

##### `firstElementChild`: [Element: firstElementChild property - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/firstElementChild) 

A read-only property whose value is the first `Element` node which is a child of that `Element` node or `null` if it has no child elements.

##### `lastElementChild`: [Element: lastElementChild property - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/lastElementChild) 

A read-only property whose value is the last `Element` node which is a child of that `Element` node or `null` if it has no child elements.

##### `nextElementSibling`:  [Element: nextElementSibling property - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/nextElementSibling)

A read-only property whose value is the immediate next `Element` node in the node's parent's children collection or `null` if it has no siblings.

##### `previousElementSibling`: [Element: previousElementSibling property - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/previousElementSibling)
 
A read-only property whose value is the immediately prior `Element` node in the node's parent's children collection or `null` if it has no siblings.

#### Useful Node Tree Traversal Properties

##### `parentNode`: [Node: parentNode property - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Node/parentNode)

 A read-only property that references the parent node of a node, which will be an `Element`, `Document`, or `DocumentFragement` node. This value is `null` for `Document` and `DocumentFragment` nodes as they do not have parent nodes.

##### `childNodes`: [Node: childNodes property - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Node/childNodes)

 A read-only property that references a live array-like `NodeList` containing all immediate node children of an element.

##### `firstChild` : [Node: firstChild property - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Node/firstChild)

A read-only property whose value is the first node which is a child of that node or `null` if it has no child nodes.

##### `lastChild` : [Node: lastChild property - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Node/lastChild)

A read-only property whose value is the last node which is a child of that node or `null` if it has no child nodes.

##### `nextSibling` : [Node: nextSibling property - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Node/nextSibling)

A read-only property whose value is the immediate next node in the node's parent's `childNodes` collection or `null` if it has no siblings.

##### `previousSibling` : [Node: previousSibling property - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Node/previousSibling)

A read-only property whose value is the immediately prior node in the node's parent's `childNodes` collection or `null` if it has no siblings.

##### `contains(node)` : [Node: contains() method - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Node/contains)

A METHOD NOT A PROPERTY. 

when called on a node and passed another node as an argument, returns a boolean value if the argument node is a descendant of the calling node.

## Walking the DOM

The act of visiting every descendant node of a parent node and executing some operation is called "Walking the Tree". This is typically done via a recursive function which may also take a callback function as an argument.

**Walking the DOM single purpose function:**
```js
function walk(node) {
  console.log(node.nodeName);                                       // do something with node
  for (let index = 0; index < node.childNodes.length; index += 1) { // for each child node
    walk(node.childNodes[index]);                                   // recursively call walk()
  }
}

walk(document.body);                                                
```

**Re-usable DOM walking function that takes a callback:**
```js
// walk() calls the function "callback" once for each node
function walk(node, callback) {
  callback(node);                                                   // do something with node
  for (let index = 0; index < node.childNodes.length; index += 1) { // for each child node
    walk(node.childNodes[index], callback);                         // recursively call walk()
  }
}

walk(document.body, node => {                                // log nodeName of every node
  console.log(node.nodeName);
});
```

**Another alternative walking function (for only Element nodes):**
```js
function traverse(element, callBack) {
  callBack(element);                        // call function on current element
  for (let child of element.children) {     // iterate over all the children Element objects
    traverse(child, callBack);              // recurse on all the subsequent children
  }
}
```

## Live Collections

A live collection is data structure containing DOM nodes which is updated whenever changes are made to the DOM. When working with the DOM, we encounter two primary live collections: `NodeList` and `HTMLCollection`. Both are array-like objects with defined methods and properties, including `length`.

Notable practical differences between the two is that `HTMLCollection` objects are always live while `NodeList` objects can in some cases (ie when using `querySelectorAll()`) be static rather than live and that `NodeList` implements a `forEach` method while `HTMLCollection` does not.

## Selecting DOM Elements

### CSS Query Selection

While there are multiple ways to query the document in search of element nodes, the most prevalent and powerful modern syntax is via the use of CSS selectors. Using CSS selectors we can find elements by ID, class, attribute, type, and more. There are two main methods provided by the `Document` interface which are used for this: `querySelector()` and `querySelectorAll()`.
#### `querySelector()` : [Document: querySelector() method - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector)

The `querySelector()` method takes one or more CSS selectors as a string argument and returns the first element which matches, or null if a match is not found.

#### `querySelectorAll()` : [Document: querySelectorAll() method - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll)

The `querySelectorAll()` method takes a CSS selector as a string argument and returns all elements that match as a static `NodeList` array-like iterable collection object, or an empty (zero-length) `NodeList` if no matches are found.

```html
<div id="divOne"></div>
<div id="divTwo"></div>
```

```js
document.querySelector('#divTwo, #divOne');
// = <div id="divOne"></div>    // returns the first matching element;
                             // div with an id of `divOne` matched first
document.querySelectorAll('#divTwo, #divOne');
// = NodeList(2) [div#divOne, div#divTwo]
```
### Additional DOM Methods

We can also use the DOM `getElementsby*` methods which return live array-like collections (whether `HTMLCollection` or `NodeList` is browser dependent) of matching elements or in the case of `getElementbyID()` a single element.

#### `getElementById()` :  [Document: getElementById() method - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById)
 
 `getElementById()` takes a string representation of an element `ID` attribute value as an argument (without the `#`) and returns the matching element.
 
#### `getElementByName()` :  [Document: getElementsByName() method - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementsByName)

`getElementsByName()` takes a string representation of an element `name` attribute and returns a live collection of all elements descendants of the calling element that match. 

#### `getElementByTagName()` :  [Document: getElementsByTagName() method - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementsByTagName)

`getElementsByTagName()` takes a string representation of an element tag name and returns a live collection of all element descendants of the calling element that match. 

#### `getElementByClassName()` : [Document: getElementsByClassName() method - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementsByClassName)

`getElementsByClassName()` takes a string representation of an element `class` attribute (without the `.`) and returns a live collection of all element descendants of the calling element that match. 

### DOM Shortcut Properties

There are also a some shortcut properties defined by the Document interface that allow access to certain nodes and return them as `HTMLCollection` live array-like objects: These include `forms`, `links`, `images` and so on.

## Getting and Setting HTML Element Attributes

HTML elements all have a tag name. They also may optionally have sets of name-value pairs called attributes, and optional text content. These attributes can be accessed or altered via `Element` class getter and setter methods, or by accessing them as properties on the element object directly (which is generally easier and more recommended).

### Element Class Setter/Getter Methods

All element attributes can be accessed and modified with `getAttribute()` and `setAttribute()` methods.

##### `getAttribute(attributeName)` : [Element: getAttribute() method - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/getAttribute)

The `getAttribute()` method returns the string value of the attribute name passed as an argument to the method in string form. 

##### `setAttribute(attributeName, value)` : [Element: setAttribute() method - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttribute)

The `setAttribute()` method sets the value of the attribute that matches the string passed in as the first `name` argument to the string passed in as the second `value` argument and returns undefined.

#### `hasAttribute(attributeName)`: [Element: hasAttribute() method - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/hasAttribute)

The `hasAttritube()` method returns true if an element has the given attribute name passed in as a string argument or false if it does not.

#### `removeAttribute(attributeName)`: [Element: removeAttribute() method - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/removeAttribute)

The `removeAttribute()` method deletes an attribute matching a passed in string argument from the element.

### Element Attribute Properties

In addition to Element subtype-specific attribute properties, The Element class defines broader special HTML attribute properties for most types of HTML elements such as `id`, `name`, and `title`. Because the word `class` is a reserved word in JS, the class attribute is accessed by the `className` property. Most HTML attribute values are string values, however, boolean attributes are either booleans or numbers.

#### `class` Attribute / `className` Property / `classList` property

Although we can use the `className` property to retrieve and alter the class attribute of an HTML element object, its use can be tricky and error-prone, especially if an element has more than one class. It is therefore suggested to instead use the `classList` property which references a live `DOMTokenList` object that is an iterable array-like collection of all of an elements classes. The `DOMTokenList` interface defines a number of useful instance methods for accessing and manipulating the contents of a `classList` collection.

##### `add(class Name)`: [DOMTokenList: add() method - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList/add)

Adds a string argument class name to the given element.

##### `remove(class Name)`: [DOMTokenList: remove() method - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList/remove)
 
Removes a string argument class name from the given element. Returns undefined

##### `replace(oldClass, newClass)`: [DOMTokenList: replace() method - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList/replace)

Replaces a first string argument class name with a second string argument class name for the given element. Returns true if successful

##### `toggle(class Name)`: [DOMTokenList: toggle() method - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList/toggle)

Adds a string argument class name to a given element if it doesn't already exist, or removes it from the element if existing. Returns true if the class name was added or false if removed.

##### `contains(class Name)`: [DOMTokenList: contains() method - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList/contains)

 Returns a boolean indicating if the element has the string argument class name as a class attribute.

### Style

[HTMLElement: style property - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style)

Element nodes also have a `style` property which represents the `style` attribute. This property references a `CSSStyleDeclaration` object which can be used to access or modify CSS properties. CSS properties can be removed by setting them to `null`. If a CSS property has a hyphenated name it must be accessed with a camelCased version as JS will interpret the hyphen as a `-` operator. Although it can be useful to access the style property, most web applications use class selectors in separate stylesheet to modify element style, accessing those class styles by adding and removing classes from elements in the DOM.


## Creating, Cloning, Inserting, Deleting DOM Nodes

The `Document` interface exposes a method `createElement()` and `createTextNode()` for the creation of new node objects. The `Element` and `Text` interfaces expose methods for deleting, cloning, and inserting nodes to the DOM tree.

### Creating Nodes
##### `createElement(tagName)` : [Document: createElement() method - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement)

The `createElement()` method creates a new HTML element object of the type specified by a passed in tagName argument and returns the new element.

##### `cloneNode(boolean)` : [Node: cloneNode() method - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Node/cloneNode)

The `cloneNode()` method creates a clone of its calling node and if passed `true` as an argument copies both the node and its descendants (typically what we want) or `false` copies only the calling node.

### Inserting Nodes

Nodes that are created have to be inserted into the DOM for use. There are a number of methods available for this. **It should be noted that a node can only be at one point in the DOM so inserting a node that is already in the document to another location will move that node to the new location rather than copying it.**

#### Newer Easier Insertion Methods

The Element interface exposes several useful methods for the insertion of nodes into the DOM.

##### `prepend(nodeArg)` :  [Element: prepend() method - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/prepend)

The `prepend()` method takes any number of either `Node` object or string arguments and ***inserts them before the first child of the calling element object***. String arguments are inserted as `Text` nodes.  Returns `undefined`.

##### `append(nodeArg)` :  [Element: append() method - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/append)

The `append()` method takes any number of either `Node` object or string arguments and ***inserts them after the last child of the calling element object***. String arguments are inserted as `Text` nodes. Returns `undefined`.

##### `before(nodeArg)` : [Element: before() method - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/before)

The `before()` method takes any number of either `Node` object or string arguments and ***inserts them into the calling element object's parent's children list before the calling element object.*** String arguments are inserted as `Text` nodes.  Returns `undefined`.
##### `after(nodeArg)` : [Element: after() method - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/after)
The `after()` method takes any number of either `Node` object or string arguments and ***inserts them into the calling element object's parent's children list after the calling element object.*** String arguments are inserted as `Text` nodes.  Returns `undefined`.

#### Older Legacy Insertion Methods

The `Node` interface exposes some older methods for insertion. The Element interface does as well.

##### `appendChild(nodeArg)` :  [Node: appendChild() method - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild)

The `appendChild()` method takes a single `Node` object argument and ***inserts it after the last child of the calling element object's `childNodes` collection***. Returns the newly appended child node.

Should not be called on `document` as this will raise an error. If necessary to call on `document` call on `document.body` instead.

##### `insertBefore(nodeArg, targetNodeArg)` :  [Node: insertBefore() method - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Node/insertBefore)

The `insertBefore()` method takes a single `Node` object argument and a target `Node` object argument and ***inserts the first Node object before the target node of the calling element object's `childNodes` collection***. Returns the newly appended child node.

##### `insertAdjacentElement(position, elementNode)` :  [Element: insertAdjacentElement() method - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentElement)

The `insertAdjacentElement()` method takes a `position` string argument and a single element `Node` object argument and ***inserts the element node at the position specified by the position argument***. Returns the newly inserted element or null if element was not inserted.

##### `insertAdjacentText(position, text)` :  [Element: insertAdjacentText() method - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentText)

The `insertAdjacentText()` method takes a `position` string argument and another string argument and creates a new text node from the second argument and ***inserts the text node at the position specified by the position argument***. Returns undefined.

##### `position` string argument values

The `insertAdjacent*()` methods use a `position` argument which is one of four string values:

| Position        | Description                           |
|-----------------|---------------------------------------|
| `"beforebegin"` | Before the element                    |
| `"afterbegin"`  | Before the first child of the element |
| `"beforeend"`   | After the last child of the element   |
| `"afterend"`    | After the element                     |

### Nodes Removal and Replacement

Both the Node and Element interfaces expose methods for the removal and replacement of DOM nodes.

##### `replaceWith(node)` : [Element: replaceWith() method - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/replaceWith)

The `replaceWith()` method takes any number of either `Node` object or string arguments and ***replaces the calling element object with them***. String arguments are inserted as `Text` nodes. Returns `undefined`.

##### `replaceChild(newNode, nodeToBeReplaced)` :  [Node: replaceChild() method - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Node/replaceChild)

The `replaceChild()` method takes a single `Node` object argument and a target `Node` object argument and ***replaces the second node Object with the first in the calling element object's `childNodes` collection***. Returns the node that was replaced.

#### `remove()` : [Element: remove() method - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/remove)

The `remove()` method takes no arguments and **removes the calling element from the DOM**, returning `undefined`.

#### `removeChild(nodeToRemove)` : [Node: removeChild() method - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Node/removeChild)

The `removeChild()` method takes a single node object argument and **removes that node from the calling element's `childNodes` collection**. Returns the removed node.



# Async

## Asynchronous JavaScript

JavaScript is a single-threaded programming language. This means that it performs one operation at a time via a single LIFO (Last-in-first-out: thing can only be removed or added to the top of the stack) call stack which stores execution contexts created during execution. If an operation is particularly time-consuming, for example a network request or certain types of processing, this can cause thread blocking. When the call stack is blocked, no other operations can be executed, which in the context of say a website, will cause the site to become unresponsive.

Thus, there is an obvious need for asynchronous execution of some operations, so that other less lengthy tasks can run concurrently in parallel to the asynchronous operations running in the background and avoid thread blocking and the issues it can cause.

Although there are several approaches and syntactic abstractions utilized, at its root asynchronous JavaScript is implemented via external APIs (provided, for example, by a browser runtime environment or Node.js runtime environment) and by way of the use of callbacks, or functions passed to other functions are arguments. The functions that receive the callback arguments can be invoked synchronously by the main JS thread, while integrating the external APIs to invoke the callback argument asynchronously according to various conditions or triggers.

## Event Loop

While the call stack is a part of the JS engine, browser runtime environments implement additional various web APIs (and Node.js various C/C++ APIs), a message or task queue, and a micro-task queue which allow for concurrency and facilitate asynchronous JS.

The browser Web APIs include `setTimeout` and `setInterval` which allow callback functions passed to synchronous JS functions to be executed by the Web APIs asynchronously. When a function is pushed to the call stack, it is executed by the JS engine and when execution ends it is removed from the stack. If that function contains an asynchronous callback execution, that is pushed to the Web API environment where its execution is delayed until a certain condition is met, typically an elapsed timer or an event is fired. The callback is then pushed to the task queue, a FIFO (First in, First Out) structure. Items wait in the task queue until the Event Loop finds that the call stack is empty. When the call stack is empty, the Event Loop pushes the callback to the call stack where it is executed then removed from the call stack. 

ES6 introduced the `Promise` syntax and a micro-task queue for handling promises. The micro-task queue is similar to the task queue but only manages promises and is given higher priority over the regular task queue.

It should be noted that synchronous code is always executed first, as it is immediately added to the call stack and even asynchronous code that is fulfilled right away or has a zero time timer will still have to wait for the call stack to empty before being pushed there from the task or micro task queues to execute.

## Callbacks, setTimeout, setInterval

Browser environments and other runtime environments like Node.js make available two timer based functions which can be used with callbacks to execute code asynchronously. 

##### `setTimeout(callback, delay)` :  [setTimeout() global function - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/setTimeout)

`setTimeout()` takes two arguments, a callback to be executed later, and a delay in milliseconds. When `setTimeout` is executed, it runs synchronously, and is removed from the call stack after execution. However, a timer is set to the delay argument in Web APIs  Browser environment. After the timer has expired, the callback is pushed to the task queue, then to the JS main thread call stack when the event loop finds that the call stack is empty. It is then executed normally and removed from the stack. `setTimeout` does not cause a delay in execution for other synchronous operations that follow it, only for the execution of the callback function passed to it at execution. Additionally, because the callback must wait for the Event Loop to push it to the call stack from the task queue, it is not guaranteed to execute exactly at after the specified delay time, so this should be considered more of a minimum time to execution rather than an exact measure.

```javascript
function delayLog() {
  for (let idx = 1; idx <= 10; idx += 1) {
    setTimeout(function() {
      console.log(idx);
    }, 1000);
  }
} 

delayLog();
```

##### `setInterval(callback, delay)` :  [setInterval() global function - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/setInterval)

`setInterval()` works in a similar manner to `setTimeout()` except that the callback is executed repeatedly at the interval specified by the `delay` argument. `setInterval` returns an `intervalID` numeric value which is passed to `clearInterval()` to end the timer.

```js
let countID;

function startCounting() {
  let num = 1;
  countID = setInterval(() => {
    console.log(num);
    num += 1;
  }, 1000);
  return
}

function stopCounting(seconds) {
  setTimeout(() => clearInterval(countID), seconds * 1000);
}

startCounting();
stopCounting(11);
```

## Promises

Promises were introduced in ES6 as a way to simplify asynchronous programming and avoid some of the pitfalls of using regular callbacks with asynchronous JavaScript.

### Callback Drawbacks

There are two primary issues with an over-reliance on callbacks for asynchronous JS. The first is what is often nicknamed "callback hell" or the "pyramid of doom". When passing callbacks to callbacks, we can quickly end up with deeply nested multi-level callback structures which are difficult to read, understand, debug, and maintain. Second, error handling is difficult and without promises there is no simple or standard way to manage all levels of errors in a deeply nested callback structure. Prior to promises, these issue could be somewhat handled by modularizing our programs into smaller, more digestible parts and by passing named functions as callbacks rather than anonymous inline functions. However, promises (and async/await) were created to provide a syntactically simplified alternative to the issues of callbacks in asynchronous programming.

### Promise States

A `Promise` is an object which represents a future async operation. The operation may fail or succeed upon completion and will have a value. We can then attach callbacks and methods to this promise which will be executed with the eventually resulting value. The initial state of a promise is the Pending state in which the promise has not yet settled, meaning it has neither successfully or unsuccessfully completed. At this point the promise is essentially waiting for some async task to complete. Once the promise settles, it has two possible states. Fulfilled, wherein the async operation successfully completes and the promise is resolved with the promised value that represents the data of the successful operation which can then be further processed with attached callbacks. The second settled state is Rejected, in which the async operation failed, which leaves the promise containing a value which describes the error. This can be processed further with attached callback as well.

### Promise Creation

[Promise() constructor - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/Promise)

As promises are objects they are created using a constructor `new Promise()` like most other objects. This constructor takes a special executor function argument which itself takes two function arguments, `resolve()` and `reject()`. The executor function is invoked synchronously at promise creation, but instead of immediately returning a value, it returns a promise to supply a value in the future following an attempt at some async operation. When a promise is fulfilled, the value passed to `resolve()` will become the value represented by the promise when settled. When the promise is rejected, the value passed to `reject()` becomes that value. Promises are only settled once, meaning they can either reject or fulfill with a certain value, one result or one error.

```js
let myFirstPromise = new Promise((resolve, reject) => {
  // Do something asynchronous then call resolve or reject based on a condition

  if (someCondition) {
    // This value is passed to the .then()
    resolve("Success!")
  } else {
    // This error will be passed to the .catch()
    reject('Failure!')
  }
});
```
### Promise Usage

The promise API exposes several handler methods which can be attached to promises to execute when the promise is settled with its eventual value. Promises are most frequently used for asynchronous calls to Web APIs.

##### `then()` :  [Promise.prototype.then() - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then)

The `then()` promise instance method is called when a promise resolves. It takes a callback argument which receives the promised value. It returns a new promise object so additional promise methods can be chained to `then()`.

##### `catch()` :  [Promise.prototype.catch() - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch)

The `catch()` promise instance method is called when a promise rejects. It takes a callback argument which receives the promised error. It returns a new promise object so additional promise methods can be chained to `catch()`.

##### `finally()` :  [Promise.prototype.finally() - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/finally)

The `finally()` promise instance method is called when a promise is settled, regardless of rejection or fulfillment. It takes a callback argument. It returns a new promise object.

```js
myFirstPromise
  .then(successMessage => {
    console.log("Yay! " + successMessage);
  })
  .catch(errorMessage => {
    console.error("Uh oh! " + errorMessage);
  })
  .finally(() => {
    console.log("This runs no matter what.");
  });
```

### Promise Error Handling

Another benefit of Promises over pure callbacks is its robust and simplified error handling mechanisms. When any error occurs in a promise, it travels through the attached promise chain until a `catch()` method handler is found. If there is no `catch` method attached, the error will be be handled. Although `then()` can technically take a second optional error handling argument, it is not recommended both for idiomatic reasons and because if an error occurs while `then()` is executing, it will not be caught. `catch()` also allows us to return a recovery promise as a fallback operation in the event of an error.

### Promise API Methods

The `Promise` Interface exposes some static methods for managing multiple promises and their states and values. They are particularly useful when running multiple parallel asynchronous tasks.
##### `Promise.all()` :  [Promise.all() - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)

`Promise.all()` is a static method which takes an iterable object, such as an array, of promises as an argument and returns a single new promise. This returned promise fulfills when all of the argument promises have fulfilled, with a value of an array of all the fulfilled promise values or rejects when any of the argument promises rejects, with the rejection value of that rejected promise.

```js
let promise1 = Promise.resolve(3);
let promise2 = 42;
let promise3 = new Promise(resolve => setTimeout(resolve, 100, 'foo'));

Promise.all([promise1, promise2, promise3]).then(values => console.log(values));
// [ 3, 42, 'foo' ]
```

##### `Promise.race()` :  [Promise.all() - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)

 `Promise.race()`  is a static method which takes an iterable object, such as an array, of promises as an argument and returns a single new promise. This returned promise is settled when the first argument promise settles, and is either fulfilled or rejected according to how that first promise was settled and its value is that of the settled promise.

```js
let promise1 = new Promise((resolve) => setTimeout(resolve, 500, 'one'));
let promise2 = new Promise((resolve) => setTimeout(resolve, 100, 'two'));

Promise.race([promise1, promise2]).then(console.log); // logs two and returns promise2
```

##### `Promise.allSettled()` :  [Promise.allSettled() - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled)

 `Promise.allSettled()`  is a static method which takes an iterable object, such as an array, of promises as an argument and returns a single new promise. This returned promise is settled is fulfilled when all of the promises have settled (whether rejected or fulfilled) and its value is an array of objects containing three properties that describe outcome of each argument promise (`status`, `value`, `reason`).

```js
let promise1 = Promise.resolve(3);
let promise2 = new Promise((resolve, reject) => setTimeout(reject, 100, 'foo'));

Promise.allSettled([promise1, promise2]).then(results => {
  results.forEach(result => console.log(result.status));
}); 

// fulfilled
// rejected
```
##### `Promise.any()` :  [Promise.any() - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/any)

 `Promise.any()`  is a static method which takes an iterable object, such as an array, of promises as an argument and returns a single new promise. This returned promise is fulfilled when any of the argument promises fulfill and with that value, or if none of the argument promises fulfill, it rejects with an `AggregateError` which holds an array of rejection reason values.

```js
let promise1 = Promise.reject(0);
let promise2 = new Promise((resolve) => setTimeout(resolve, 100, 'quick'));
let promise3 = new Promise((resolve) => setTimeout(resolve, 500, 'slow'));

Promise.any([promise1, promise2, promise3]).then(value => console.log(value));

// Logs `quick` because promise2 is the first promise to fulfill. 
// promise1 rejects before that but it does not fulfil.
```

## Async/Await

ES2017 added two new keywords to JavaScript, `async` and `await` which seek to further simplify promise-based asynchronous programming in JavaScript. These keywords work as wrappers for promises, allowing async code to look and be written similar to sync code.

##### `async` function : [async function - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)

The `async` keyword can be prepended to a function declaration to create an async function which is an `AsyncFunction` object. When the async function is invoked it returns a new `Promise` object that fulfills with the value returned by the function or rejects with any error that was not explicitly handled inside the async function. Even if the the function contains an explicit return statement, this value will still be wrapped in a promise. Because async functions return a promise, their return value can be used with promise methods.

```js
async function fetchData() {
  return "data from server";
}

fetchData().then((data) => console.log(data));
// outputs: data from server

console.log(fetchData) // [AsyncFunction: fetchData]
```
##### `await` operator : [await - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await)

The `await` operator takes an expression that is usually a `Promise` and returns the resulting value once it settles. It can only be used inside async functions (or the top level of a module). With `await` we pause execution in the enclosing async function until the promise passed to `await` has settled. When/If the promise has fulfilled, the value of `await` is value of the fulfilled promise or a rejection reason if the promise is rejected.

```js
async function fetchProperty(url) {
  let response = await fetch(url);
  let content = await response.json();
  return content.someProperty;
}
```
##### Error Handling with Async/Await

We can use `try/catch/finally` blocks in an async function as a replacement to promises `then()`, `catch()` `finally()` chains. The `catch` block will catch any exceptions raised in both the await statement and main function.

```js
async function fetchData() {
  try {
    let data = await someAsynchronousOperation();
    console.log(data);
  } catch (error) {
    console.error("Oops, an error occurred:", error);
  } finally {
	console.log("wow finally!");
  }
}
```

##### Combining async/await and Promise Methods

Because async functions return a promise, they can be used with various useful Promise static methods.

```js
async function fetchMultipleData() {
  try {
    let [firstData, secondData] = await Promise.all([
      fetchFirst(),
      fetchSecond(),
    ]);
    console.log(firstData, secondData);
  } catch (error) {
    console.error("An error occurred while fetching data:", error);
  }
}

// Here `Promise.all` triggers multiple promises in parallel while await pauses
// until all of them resolve
```

# Events

## Events

At a high level, Client-side JS is largely event-driven. An event in this context is an occurrence in the system being programmed which then triggers that system to fire a signal that the event took place. This in turn typically is used to execute some code in reaction to the event occurrence. These events might be system events which are automatically fired by the browser or some network activity, or they might be caused by user interaction. User interfaces in all contexts are typically very event driven. 

In a browser context, we can register event handlers or listeners which can respond to specified types of fired events. Event listeners are created by defining a callback function and registering it as an event listener via invoking the `addEventListener()` method on a DOM element object, and passing the callback as an argument to that method. When the specified event occurs for that DOM element, this event listener will be executed. The event object is also an argument to the listener and provides a number of useful methods and properties for accessing information about the event and performing operations with the event.
## Event Types

There are many types of events which can fire in the browser, far too many to list. Interactive web apps need to respond to user interaction so this is mostly what we can concern ourself with. These events may be tied to the actions of an input device like a mouse of keyboard (`click`, `keydown`) or may be higher-level UI event such as `submit` events connected to HTML form submission. They can also be network or browser events such as `DOMContentLoaded` or `load`. Regardless of the event type, registering event listeners to execute code when the event fires is broadly similar.

| Event Type | Example Events                                              |
|------------|-------------------------------------------------------------|
| Keyboard   | `keydown`, `keyup`                                          |
| Mouse      | `mouseenter`, `mouseleave`, `mousedown`, `mouseup`, `click` |
| Touch      | `touchstart`, `touchend`, `touchmove`                       |
| Window     | `scroll`, `resize`                                          |
| Form       | `submit`                                                    |

## Page Life-Cycle

In order for a webpage to load and display properly in a browser there are a number of things that must occur in specific order. We can call this the Page Life-Cycle. First, the browser sends an HTTP request to the server and receives the starting HTML document from which it will construct the DOM in the body of the server's response. The browser then parses the HTML, and any JS code included in the HTML or in a separate document will be evaluated. The browser then builds the DOM and when this completes fires the `DOMContentLoaded` even on the `document`. Now the DOM can be accessed by JS code for manipulation and event handlers can be attached to DOM elements. Next the page can be displayed in the browser window while additional assets such as images and videos load. Finally, the `load` even fires on window, when those assets have completed loading.

## Event Listeners

[EventTarget: addEventListener() method - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)

The `EventTarget` interface from which `Window`, `Document`, `Element`, and more inherit, defines a method for registering event listeners to an object, `addEventListener(). addEventListener()` takes two mandatory arguments, a string representation of an event type, and a callback function which it registers as an event listener to be executed by the runtime environment whenever its event type is fired on the object to which it is registered or (in many cases) its ancestors. It also takes a third optional argument which can be used for various options, or passed a boolean `useCapture` argument. When `true`, the handler will listen for events on during the capturing phase of event propagation, rather than the default bubbling phase.

Because event listeners are executed as methods of the object on which they are defined the `this` of the listener refers to the registered object when the callback is a regular function. If it callback is defined with arrow syntax this will not be the case.

Event listeners can be removed via the `removeEventListener()` method.

```js
document.addEventListener("DOMContentLoaded", () => {
  let button = document.getElementById("alert");
  button.addEventListener("click", (event) => {
    let message = document.getElementById("message").value;
    alert(message);
  });
});
```

## The `Event` Object

The event listener callback which is invoked when that event fires takes a single `Event` object argument. The `Event` object defines a number of useful properties and methods for handling events.

### General Event Object Properties

All events have the following properties:

##### `type` : [Event: type property - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Event/type)

The event `type` property has a value of the string name of the event (`click`, etc). 

##### `currentTarget` : [Event: currentTarget property - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Event/currentTarget)

The `currentTarget` references the object to which the current listener is attached.  It always refers to the element with the event listener registered to it, regardless of where the event fired. For example, sometimes events fire on a descendant, then bubble up to the ancestor to which the event is attached. In such a case, the `currentTarget` is the ancestor with the event attached and the `target` is the descendant where the event fired.

##### `target` :  [Event: target property - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Event/target)

The `target` references the object on which the event actually occurred. It is possible for `target` and `eventTarget` to reference the same object, but this is often not the case.

### Event Subtype Specific Properties

Event subtypes, such as mouse events and keyboard events have some specific properties which are not defined on all event objects.

##### `button` :  [MouseEvent: button property - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button)

The `MouseEvent.button` property indicates which button was pressed on a mouse when triggering the `MouseEvent`
##### `key` : [KeyboardEvent: key property - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key)

The `KeyboardEvent.key` property holds the value of a keypress

### Event Methods

The Event interface defines several useful instance methods for handling events, the two most important being `event.stopPropagation()` and `event.preventDefault()`. It is best practice, when using either of these methods, to invoke them as soon as possible from the event handler, so that they are run before any errors might occur and other developers reading the code are aware of their use.

##### `event.stopPropagation()` : [Event: stopPropagation() method - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Event/stopPropagation)

The `stopPropagation` method cancels the propagation of the current event. This prevents the current event from propagating any further through the capturing and/or bubbling phases from the point at which the method was invoked.

##### `event.preventDefault()` : [Event: preventDefault() method - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault)
Many events have a browser default action which will be executed without writing any code. When we are defining our own web applications, these default actions are not often what we want to occur, especially when some of them might cause a page reload. To keep this from happening we can call `preventDefault()` on our event object from within the event listener. This tells the browser to ignore any default behaviors it might normally perform for the event object (which may not necessarily be the element to which the listener was attached). This method has not effect on propagation of the event, but the default action for an event is not executed by the browser until the event has fully propagated. This means that if `preventDefault` is called at some point in the propagation path, the default behavior will be skipped.


## Event Dispatch and Propagation - Capturing and Bubbling

When an event occurs, it is dispatched by the browser from top level of the global `window` object all the way down through the DOM to the event `target` element, where the event fired, then back up from that element to the top level. This event propagation process is made of three phases and typically referred to as "Capturing and Bubbling". Although events listen on the bubbling phase by default, every event travels this same propagation path (unless `event.stopPropagation` is invoked at some point in the path)

The first phase, from `window` down to the `target` element, is known as the capturing phase. The event is dispatched to `window` then `document` then down through each ancestor of the `target` element, until the `target` element is reached. If an event listener has its option `useCapture` argument as `true`, it will listen for events to fire on this first phase. In such cases, any ancestor of the `target` element that has a registered listener for the event would first fire on that ancestor of the `target` prior to the actual `target`.

The second phase is the target phase and where the event fires on the `target` object.

The third phase is the bubbling phase. Here, the event propagates from the `target` element object back up to the `window` object in the reverse order of the capturing phase. By default most listeners listen on the bubbling phase, which means that any listeners registered on an ancestor of the `target` element will fire, in order of ancestry on the way back up.

## Event Delegation

Event Delegation allows for better code clarity and increased performance when dealing with event listening, particularly in larger web documents. Rather than having to attach listeners to any element needed, a listener can be attached to an ancestor element which then delegates this behavior to all of its descendants. This is possible because of the capturing and bubbling phases of event propagation. Not only does this provide cleaner code and avoid excessively memory heavy listening, but allows us to be able to use parent element listeners on dynamically added children elements, which require them but which may not be present in the original HTML or when the DOM first loads, but are added programmatically later.
# XMLHttpRequest (XHR)

## AJAX

All web apps, both modern interactive apps which utilize AJAX (Async JavaScript and XML) and pre-AJAX apps are built upon and utilize the HTTP request-response cycle. In the HTTP request-response cycle prior to AJAX, an event of some kind occurs on the page, which causes the browser to send an HTTP request to a server, the server then sends an entire HTML page back in its response, which the browser must then parse and render, reloading the entire page every time some interaction occurs. As modern websites are expected to have complex user interfaces and abilities, retrieving and reloading the entire page for ever update to some aspect of it, is slow, inefficient, and creates a bad user experience.

AJAX overcomes this problem by allowing for browsers to make HTTP requests that do not require a full page reload. Instead only the necessary updated parts of the page are reloaded. Additionally, AJAX allows for the use of all HTTP defined methods, which were previously limited to those implemented by HTML, which were only `GET` and `POST`. AJAX also allows greater control of request headers and data serialization and formats than HTML forms alone can perform.

Utilizing AJAX requires developers to write JS code to both initiate these async requests and to properly handle the response from the server. Instead of the browser initiating the HTTP request-response cycle, JS event handlers are written to listen for certain events, which when fired cause other JS code to initiate an HTTP request using an XHR request. When the server sends back its response, some JS code parses the response and inserts the necessary changes into the DOM.

In fact AJAX has given rise to what 'single page applications' which are entire complex web apps that run from a single HTML page with any changes made via fetched serialized data and client-side JS manipulation of the DOM.

## The XHR Object

The XMLHttpRequest (XHR) Object is a browser API which allows for async (and sync) HTTP request-response cycle handling via JS. It is used to make HTTP requests and most often works with response data in HTML or JSON format. The name derives from its original use of fetching XML documents.

In its most basic request form, the XHR Api is used to make an HTTP request by first instantiating an `XMLHttpRequest` object with the `XMLHttpRequest()` constructor, then invoking the XHR instance method `open()` which is used to initialize a new request by passing two arguments as string values: an HTTP request method (`GET`, `POST`, etc) and a URL for the resource. Then sending the request with the XHR instance method `send()`. If the request is one that requires sending some data to the server, like a POST or PUT request, we can pass appropriately serialized data to `send()` to include that data in our HTTP request body. We also may wish to set some HTTP request headers before sending out request, which can be done via the XHR instance method `setRequestHeader()` and passed two strings, one for the header name, and one for the header value.

```js
let request = new XMLHttpRequest();

request.open('METHOD', '/path');
request.setRequestHeader('Header', 'value');

request.send(data)
```

By default (and according to best practice) XHR requests are sent asynchronously. This means that additional code execution can continue without the request blocking the thread and other code needing to wait for the request and response to be fully sent, received and processed. We can attached event listeners to XHR objects which will fire when the request completes and allow access to the servers response. Typically this is done by registering an event listener for the `load` event on the XHR object that sent a request.

```js
let request = new XMLHttpRequest();
request.open('GET', '/path');

request.addEventListener('load', event => {
  let request = event.target;                 // XMLHttpRequest Object
  
  request.responseText;                       // body of response
  request.status;                             // status code
  request.statusText;                         // status text from response
  request.getResponseHeader('Content-Type');  // response header
});

request.send();
```

## XHR Interface

The XHR API exposes a number of methods and properties for XHR objects which can be used when sending requests and processing responses.
### Common XMLHttpRequest Methods:

| Method                            | Description                                        | Return Value                                      | MDN Doc Link                                                                                                                                      |
|-----------------------------------|----------------------------------------------------|---------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------|
| `open(method, url)`               | Open a connection to `url` using `method`.         | undefined                                         | [XMLHttpRequest: open() method - Web APIs \| MDN](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/open)                           |
| `send(data)`                      | Send the request, optionally sending along `data`. | undefined                                         | [XMLHttpRequest: send() method - Web APIs \| MDN](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/send)                           |
| `setRequestHeader(header, value)` | Set HTTP `header` to `value`.                      | undefined                                         | [XMLHttpRequest: setRequestHeader() method - Web APIs \| MDN](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/setRequestHeader)   |
| `abort()`                         | Cancel an active request.                          | undefined                                         | [XMLHttpRequest: abort() method - Web APIs \| MDN](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/abort)                         |
| `getResponseHeader(header)`       | Return the response's value for `header`.          | string representing header's text value or `null` | [XMLHttpRequest: getResponseHeader() method - Web APIs \| MDN](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/getResponseHeader) |
### Common XMLHttpRequest Properties:

| Property       | Writable | Default Value | Description                                                      | MDN Doc Link                                                                                                                            |
|----------------|----------|---------------|------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------|
| `timeout`      | Yes      | `0`           | Maximum time a request can take to complete (in milliseconds)    | [XMLHttpRequest: timeout property - Web APIs \| MDN](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/timeout)           |
| `readyState`   | No       |               | What state the request is in                                     | [XMLHttpRequest: readyState property - Web APIs \| MDN](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/readyState)     |
| `responseText` | No       | `null`        | Raw text of the response's body.                                 | [XMLHttpRequest: responseText property - Web APIs \| MDN](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/responseText) |
| `response`     | No       | `null`        | Parsed content of response, _not meaningful in all situations_   | [XMLHttpRequest: response property - Web APIs \| MDN](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/response)         |
| `responseType` | Yes      |               | A string value specifying the expected data type of the response | [XMLHttpRequest: responseType property - Web APIs \| MDN](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/responseType) |

### XHR Object Events

XHR Objects first initialize a request, then send that request, then wait for the response, then receive the response (unless there is an issue!). The two primary events of this cycle are the `loadstart` event, when the request is sent and the `loadend` event when the response has been received and loaded. Between these two events, an additional event fires, dependent on the failure or success of the request. 

If the request was successful and the response received and loaded, the `load` event fires. From the browsers perspective, any response is 'successful' even if it has a non-200 status code or represents and error. The application code must examine the response to determine if the request was truly successful for the applications use.

If the request was not successful from the browsers perspective, one of three other events can fire. `error` fires when the request caused an error, `abort` fires if the request is interrupted or aborted prematurely, and `timeout` fires if the response took longer than a timeout period expired, aborting the request.



## Data Serialization

In order for clients and servers to exchange data in a useable and information preserving manner, the data must be in some standardized form that both systems can understand. Data serialization is the process of translating data into a format suited for network transfer and interchange. There are currently three main serialization formats in use: Query string URL encoding, Multipart forms format, and most popular today, JSON (JavaScript Object Notation).

### Query String / URL Encoding

 Perhaps the most basic web application data serialization format. Query strings are `name=value` pairs delimited by a `&`. Query strings are appended to the path in `GET` requests following a `?` or sent in the body of `POST` requests. Any non-alphanumeric characters present in a query string must be encoded. JS has an `encodeURIComponent()` function which performs this encoding for us.
 
```shell
# without encodeURIComponent
title=Do Androids Dream of Electric Sheep?&year=1968

# with encodeURIComponent
title=Do%20Androids%20Dream%20of%20Electric%20Sheep%3F&year=1968
```

```http
GET /path?title=Do%20Androids%20Dream%20of%20Electric%20Sheep%3F&year=1968 HTTP/1.1
Host: example.test
Accept: */*
```

When using URL encoding with POST requests requires setting the `Content-Type` header of the request to `application/x-www-form-urlencoded`

```http
POST /path HTTP/1.1
Host: example.test
Content-Length: 54
Content-Type: application/x-www-form-urlencoded; charset=utf-8
Accept: */*

title=Do%20Androids%20Dream%20of%20Electric%20Sheep%3F&year=1968
```

### Multipart Forms

For `POST` request that include file uploading or FormData objects, we can the multipart form format which is not technically an encoding format but rather a boundary delimited request body styling. The boundary delimiter is defined in the `Content-Type` request header:

```http
Content-Type: multipart/form-data; boundary=----WebKitFormBoundarywDbHM6i57QWyAWro
```

Then each section of the request is comprised of the boundary delimiter, a `Content-Disposition` header and the name of the parameter, then a blank line followed by the value of the parameter. The delimiter also marks the end of the multipart request content.

```http
POST /path HTTP/1.1
Host: example.test
Content-Length: 267
Content-Type: multipart/form-data; boundary=----WebKitFormBoundarywDbHM6i57QWyAWro
Accept: */*

------WebKitFormBoundarywDbHM6i57QWyAWro
Content-Disposition: form-data; name="title"

Do Androids Dream of Electric Sheep?
------WebKitFormBoundarywDbHM6i57QWyAWro
Content-Disposition: form-data; name="year"

1968
------WebKitFormBoundarywDbHM6i57QWyAWro-- # extra -- marks the end of the multipart content
```

### JSON

JSON or JavaScript Object Notation is currently the most popular data serialization format for web APIs. It's syntax is similar to JavaScript and allows for the exchange of not just strings but also objects, arrays, booleans, numbers, and more. Both GET and POST requests can request and send JSON data respectively. When sending POST requests, we need to set the `Content-Type` header to `application/json`. It's also considered best practice to append a `charset` value such as `charset=utf-8` to the `Content-Type` header value: `Content-Type: application/json; charset=utf-8`

```http
POST /path HTTP/1.1
Host: example.test
Content-Length: 62
Content-Type: application/json; charset=utf-8
Accept: */*

{"title":"Do Androids Dream of Electric Sheep?","year":"1968"}
```

## XHR Techniques

### Loading HTML via XHR

When we need to update a web page element, by inserting new HTML requested from a server into the DOM, without reloading the entire page, we can load that HTML via XHR in concert with event listeners to avoid default browser behavior and implement our own desired event outcomes. We can do this in a manner similar to the below:

First we need to instantiate an `XMLHttpRequest` object with the `XMLHttpRequest()` constructor. Next we need to initialize the request by invoking the XHR instance method `open()` which is used to initialize a new request by passing two arguments as string values: an HTTP request method (In this case `GET` as we are retrieving a resource) and a URL for the resource. 

Before we send the request, we can register an event listener on the XHR request object which will fire when `load` event occurs, meaning that the response from the server has been received.

Here we first locate the element which we want to update on the DOM, then re-assign its `innerHTML` property value to the HTML received in the response to our request. This must be inside the `load` event listener callback because our request is asynchronous and if we re-assign the `innerHTML` property before the response is ready, our code will not work.

Then we send the request with the XHR instance method `send()`.

```js
document.addEventListener("DOMContentLoaded", () => {
  let request = new XMLHttpRequest();
  request.open("GET", "https://ls-230-web-store-demo.herokuapp.com/products");

  request.addEventListener("load", event => {
    let store = document.getElementById("store");
    store.innerHTML = request.response;
  });

  request.send();
});
```

We can expand this to fetch and render some remote HTML for our site when the user clicks a link without reloading the whole page by registering a `click` event listener on the element we are loading the remote HTML too. This allows us to use `preventDefault()` to tell the browser not merely follow links of anchor elements when clicked, but to instead make another XHR `GET` request for the proper HTML from the remove server and insert it into our page.

```js
document.addEventListener("DOMContentLoaded", () => {
  let store = document.getElementById("store");
  let request = new XMLHttpRequest();
  request.open("GET", "https://ls-230-web-store-demo.herokuapp.com/products");

  request.addEventListener("load", event => store.innerHTML = request.response);
  request.send();

  store.addEventListener("click", event => {
    let target = event.target;
    if (target.tagName !== 'A') {
      return;
    }

    event.preventDefault();

    let request = new XMLHttpRequest();
    request.open('GET', 'https://ls-230-web-store-demo.herokuapp.com' + target.getAttribute('href'));

    request.addEventListener("load", event => store.innerHTML = request.response);
    request.send();
  });
});
```

### Submitting a Form via XHR

When submitting a form via XHR, we first need to serialize our form data, send that data in an XHR request, and then handle the response from the server. Although there are several ways in which we could submit a form using JS, utilizing the the FormData API is probably the simplest and most straightforward way to access and serialize (using multipart format) the name-value pairs of a forms data. FormData also sets the `Content-Type` header automatically. One thing to keep in mind with FormData is that it only uses form input fields that have a `name` attribute.

```js
let form = document.getElementById('form');

form.addEventListener('submit', event => {
  // prevent the browser from submitting the form
  event.preventDefault();

  let data = new FormData(form);

  let request = new XMLHttpRequest();
  request.open(form.method, `https://ls-230-web-store-demo.herokuapp.com/${form.getAttribute('action')}`);

  request.addEventListener('load', () => {
    if (request.status === 201) {
      console.log(`This book was added to the catalog: ${request.responseText}`);
    }
  });

  request.send(data);
});
```

Here we first search the DOM for our `form` element object and store a reference to that object in the variable `form`. We then register an event listener to the `form` element which listens for a `submit` event to fire on that form. 

When a `submit` event fires, the event listener callback is executed. First `preventDefault()` is called to prevent the browser from submitting the form in its default manner. Next we instantiate a new `FormData` object with the `FormData() `constructor and pass our HTML `form` element as an argument. This populates the new `FormData` object with name-value pairs of data from the form's properties which contain the submitted data as values. It also automatically serializes the data into multipart format.

We then create a new XHR request object and initialize it to the HTTP method of the `form` (`POST`) and the URL to which we wish to send the form data. 

Before we send the data, we register an event listener for the `load` event to the XHR request, which will log a message telling us our request was successful if/when the response is received and its status is `201`. Finally, we send the request with `send()`, passing our FormData object to `send()` as an argument which includes the serialize form data in our request body.

One last note, it may be necessary to have some form of authorization when attempt to submit data altering requests to a server. In such cases, we may need to set the 'Authorization' request header to a certain value before sending, ie:

```js
request.setRequestHeader('Authorization', `token AUTH_TOKEN`);
```

The raw request looks similar to the following:

```http
POST /books HTTP/1.1
Host: lsjs230-book-catalog.herokuapp.com
Content-Length: 234
Content-Type: multipart/form-data; boundary=----WebKitFormBoundaryf0PCniJK0bw0lb4e
Accept: */*

------WebKitFormBoundaryf0PCniJK0bw0lb4e
Content-Disposition: form-data; name="title"

Effective JavaScript
------WebKitFormBoundaryf0PCniJK0bw0lb4e
Content-Disposition: form-data; name="author"

David Herman
------WebKitFormBoundaryf0PCniJK0bw0lb4e--
```

### Loading JSON via XHR

In the server-side rendering (SSR) paradigm, web pages are built in full on the server and then sent whole to the web browser. However, many modern web applications utilize client-side rendering (CSR) where the server only sends a minimal HTML file and some JS to the browser and the JS is executed by the browser, which makes requests back to the server and builds the web page dynamically. 

When utilizing CSR, JSON is handy format for transferring data between server and client and its use is fairly straightforward. First we need to create and initialize an XHR request. When initializing, we need to be sure to set the `responseType` property of the request to `'json'` as string. This tells the browser, which natively supports JSON, what type of data we hope to receive in the response to our request, and therefore how to parse the response data.

Next we can access the parsed JSON data through the XHR object's response property. This should be accessed inside a `load` event listener registered to the request as we must obviously wait for the response before accessing its data. If there was some error and/or the data couldn't be parsed, the value of the `response` property will be `null`

```js
let request = new XMLHttpRequest();
request.open('GET', 'https://api.github.com/repos/rails/rails');
request.responseType = 'json';

request.addEventListener('load', event => {
  // request.response will be the result of parsing the JSON response body
  // or null if the body couldn't be parsed or another error
  // occurred.
	let data = request.response;
});

request.send();
```

### XHR Request Error Handling

One way of error handling our XHR requests is to attach an event listener to the request object for an `error` event. This is some code we want to invoke when the request creates some sort of error. For example:

```js
request.addEventListener('error', event => {
  console.log('The request could not be completed!');
});
```
### Sending JSON via XHR

JSON is often the preferred format for the serialization of data. When sending a `POST` XHR Request, it is simple to serialize our data as JSON for transferring to the server. First we use the `stringify()` static method of the `JSON` namespace object. This converts JS data passed as an argument to a JSON string.

Next we instantiate an `XMLHttpRequest` object with the `XMLHttpRequest()` constructor then initialize the request by invoking the XHR instance method `open()` which is used to initialize a new request by passing two arguments as string values: an HTTP request method (In this case `POST` as we are retrieving a resource) and a URL for the resource. It is also considered good practice (and sometimes required by web APIs) to set the `Content-Type` request header to `application/json; charset=utf-8` so that the server can know what type of data is being sent.

Finally we send the request with `send()` passing our JSON stringified data as an argument to include it in the body of our HTTP request.

```js
let data = { title: 'Eloquent JavaScript', author: 'Marijn Haverbeke' }; // JSON name-value pairs format
let json = JSON.stringify(data); // json converted to string

let request = new XMLHttpRequest();
request.open('POST', 'https://lsjs230-book-catalog.herokuapp.com/books');
request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
request.send(json);
```

The raw text of the XHR request we created will look something like this:

```http
POST /books HTTP/1.1
Content-Type: application/json; charset=utf-8
Host: lsjs230-book-catalog.herokuapp.com
Connection: close
Content-Length: 62

{"title": "Eloquent JavaScript", "author": "Marijn Haverbeke"}
```

## Cross-Domain Requests with CORS

### Same-origin Policy

An origin is the scheme, hostname, or port of a web pages URL and a cross-origin request occurs when a web page attempts to attain a resource from a different origin via any kind of network request. Cross-origin requests include cross-domain requests which are requests from a domain/hostname to a different domain/hostname. Such requests have security issues such as Cross Site Scripting and Cross Site Request Forgery.

To combat these malicious exploits, browsers implement a same-origin policy which restricts requests between different origins and will cause most such requests to raise an error.
### CORS (Cross Origin Resource Sharing)

Although the same-origin policy is an important safeguard against XSS and CSRF and the like, interaction with web APIs and other necessary network requests are also restricted by this policy. To alleviate this, the W3C specifies Cross-origin Resource Sharing (CORS) which allows for some cross-origin resource requests via custom HTTP request and response headers which allow the client browser and the server to determine if such requests should succeed.

The CORS spec requires that web browser HTTP requests include an `Origin` header which contains the origin of the page making the request. Browsers automatically add this header with the proper value when making HTTP requests via XHR or `fetch()`.

The server takes this value and checks if it is an origin which is allowed to access a response. If so, the `Access-Control-Allow-Origin` response header will be set with the same origin value as the request. Alternatively, if servers do not restrict access to a resource to any origin, they will set the `Access-Control-Allow-Origin` value to `*`.

When the response returns from the server, the browser checks if  the `Access-Control-Allow-Origin`header value matches the request origin value or is `*`. If so, the response will be accessible to the application, otherwise an error will be raised.
# jQuery

jQuery is a widespread JS library which was able to provide simplified cross browser compatibility for DOM manipulation, AJAX, and event handling via a variety of methods and properties. As a library, it is not a different programming language but a useful abstraction layer over vanilla JS. Although its use is fading, it still has its uses and still appears in many legacy codebases.

## jQuery Function

[jQuery() | jQuery API Documentation](https://api.jquery.com/jQuery/)

`jQuery()` works as a function which takes two types of arguments, a DOM element/string representing a CSS selector or a function. If the first argument is passed, then the jQuery function will return a jQuery object that contains a collection of one or more matched elements and has access to useful methods for DOM manipulation and more. 

```js
$('#content'); // returns jQuery Collection Object
```

If the argument is a function, it will be executed as a callback when the DOM is loaded (similar to a vanilla JS `'DOMContentLoaded'` event listener callback.) It's use is also similar to vanilla JS where it wraps other jQuery operations that require a loaded DOM. There are several deprecated ways to create a DOM ready callback, but simply passing the callback directly to the `jQuery` function is the recommended syntax.

```js
$(function() {
	// Document is ready
});

// Although less common, if we need to execute code after all images and assets have 
// loaded, we can do so in one of two ways:

$(window).load(function() {
  // DOM loaded and ready, referenced image on img tags loaded and ready
});
```

The jQuery function can be called both via its name `jQuery()` or more commonly, via its alias `$()`. Convention also recommends that we prefix variables names that reference jQuery objects with the same `$`

```js
// Passing a `div` with an `id` of `content` to jQuery:

let $content = jQuery('#content');
let $sameContent = $('#content');

// both will return an object representing a collection of elements
```

### `jquery` property

[.jquery | jQuery API Documentation](https://api.jquery.com/jquery-2/)

If a variable is referencing a jQuery object, it will return a string of the jQuery version number as it value for this property.

## jQuery Object Methods

The jQuery object defines methods and properties that we can use to access and modify DOM elements in its collection. Most  jQuery methods function as both setter and getter methods. Getter methods usually become setter methods by passing a second argument for which to set the value of the property name passed as the first argument. Most jQuery setter and getter methods return a jQuery object so chaining is also possible.

```js
$content.css('font-size');             // 16px (getter)
$content.css('font-size', '18px');     // sets to 18px (setter)
$content.css('font-size');             // 18px (getter)

$content.css('font-size', '12px').css('color', 'red');
```

### Object Argument

Some methods also take an object of key-value pairs as an argument to set properties in bulk:

```js
$element.css({
  'font-size': '12px',
  color: 'red',
})
```

### Property Name Syntax

CSS property names that use dashes must be written in quotes or camelCase:

```
font-size -> 'font-size' or fontSize
```

In addition to standard CSS selectors, jQuery defines some special jQuery only selectors.

### Other Convenient Methods

##### `$.isArray(objectArg)` - [jQuery.isArray() | jQuery API Documentation](https://api.jquery.com/jQuery.isArray/#jQuery-isArray-obj)

Determines if an object passed as an argument is an array. Works like `Array.isArray(arrayArg)`

##### `$.isFunction(arg)` - [jQuery.isFunction() | jQuery API Documentation](https://api.jquery.com/jQuery.isFunction/#jQuery-isFunction-value)

Determines if an argument passed is a callable function. Works like `typeof x === "function"`

#####  `$.merge` - [jQuery.merge() | jQuery API Documentation](https://api.jquery.com/jQuery.merge/#jQuery-merge-first-second)

Is a mutating method that takes two array-like objects as arguments and returns the first array with the elements of the second array appended to it with order preserved.
##### `$.map` - [jQuery.map() | jQuery API Documentation](https://api.jquery.com/jQuery.map/#jQuery-map-array-callback)

Takes an array or an object and a callback and transforms the array or object according via the logic in the callback and returns a new array.
##### `$.ajax` - [jQuery.ajax() | jQuery API Documentation](https://api.jquery.com/jQuery.ajax/#jQuery-ajax-url-settings)

Used for making AJAX requests in a manner similar to the browser Fetch API. Takes a url string argument and an optional settings key-value pair configuration object. Returns a [jqXHR](https://api.jquery.com/jQuery.ajax/#jqXHR) object (a superset of the browser XHR object)
## jQuery DOM Traversal

jQuery provides useful DOM traversal methods. All of the following methods are called on jQuery objects that hold collections of DOM elements and most take an optional selector string argument which filters elements for matches. 

### Traversing Up from Object (from an element to its ancestors)

| Name                  | Description                                                                                                                                                                                                                                                                                                                                                       | Return Value  | Doc Link                                                                                   |
|-----------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|--------------------------------------------------------------------------------------------|
| `parent([selector])`  | Traverses to the immediate parent of each of these elements in the DOM tree and constructs a new jQuery object from the matching elements. **Only travels a single level up the DOM tree.**                                                                                                                                                                       | jQuery Object | [.parent() \| jQuery API Documentation](https://api.jquery.com/parent/#parent-selector)    |
| `parents([selector])` | Searches through the ancestors of these elements in the DOM tree and construct a new jQuery object from the matching elements ordered **from immediate parent on up**                                                                                                                                                                                             | jQuery Object | [.parents() \| jQuery API Documentation](https://api.jquery.com/parents/)                  |
| `closest([selector])` | Searches through these elements and their ancestors in the DOM tree and constructs a new jQuery object from the matching elements; **Begins with the current element; Travels up the DOM tree until it finds a match for the supplied selector;** The returned jQuery object contains zero or one element for each element in the original set, in document order | jQuery Object | [.closest() \| jQuery API Documentation](https://api.jquery.com/closest/#closest-selector) |
### Traversing Down from Object (from an element to its descendants)

| Name                                                               | Description                                                                                                                                                       | Return Value  | Doc Link                                                                                      |
|--------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|-----------------------------------------------------------------------------------------------|
| `find(selector)`<br><br>*selector argument is required for `find`. | Searches through the descendants of these elements in the DOM tree and construct a new jQuery object from the matching elements; **travels multiple levels down** | jQuery Object | [.find() \| jQuery API Documentation](https://api.jquery.com/find/#find-selector)             |
| `children([selector])`                                             | Get the _direct_ children of each element in the set of matched elements; **only travels a single level down**                                                    | jQuery Object | [.children() \| jQuery API Documentation](https://api.jquery.com/children/#children-selector) |

### Traversing Laterally from Object (from element to siblings)

| Name                   | Description                                         | Return Value  | Doc Link                                                                                      |
|------------------------|-----------------------------------------------------|---------------|-----------------------------------------------------------------------------------------------|
| `siblings([selector])` | Get the siblings of an element                      | jQuery Object | [.siblings() \| jQuery API Documentation](https://api.jquery.com/siblings/#siblings-selector) |
| `next([selector])`     | Get the immediately following sibling of an element | jQuery Object | [.next() \| jQuery API Documentation](https://api.jquery.com/next/#next-selector)             |
| `nextAll([selector])`  | Get all following siblings of an element            | jQuery Object | [.nextAll() \| jQuery API Documentation](https://api.jquery.com/nextAll/#nextAll-selector)    |
| `prev([selector])`     | Get the immediately preceding sibling of an element | jQuery Object | [.prev() \| jQuery API Documentation](https://api.jquery.com/prev/#prev-selector)             |
| `prevAll([selector])`  | Get all preceding siblings of an element            | jQuery Object | [.prevAll() \| jQuery API Documentation](https://api.jquery.com/prevAll/#prevAll-selector)    |
## jQuery Event Handling

[.on() | jQuery API Documentation](https://api.jquery.com/on/#on-events-selector-data-handler)

The `.on()` method can be called on a jQuery object representation of a DOM element. It works in a similar manner to the vanilla JS `addEventListener()`. `on()` takes two required arguments: an `events` type string argument (can be multiple, if so should be space separated) and a `handler` callback function argument to be invoked when the event handler fires. It also takes two optional arguments: a `selector` string which filters descendants of the element(s) that will trigger the event and a `data` argument which is some data that will be passed to the `handler` callback as property `event.data` when the event fires.

```js
$(function () {
	$("a").on("click", function () {});
});
```

### Event Delegation in jQuery

If the calling jQuery object of `on()` is a collection of elements, we bind the `handler` callback function to every element which is not very memory efficient. Instead we can attach the event listener to a parent element and use the optional `selector` argument to match a certain type of decendant while setting only a single listener.

```html
<ul>
  <li>
    <p>Bananas</p>
    <a href="#">Remove</a>
  </li>
  <!-- 29 more list items, each with a remove anchor -->
</ul>
```

```js
// This callback is bound to each anchor, making 30 event handlers in memory

$("a").on("click", function (e) {
  e.preventDefault();
  $(this).closest("li").remove();
});

// This callback is bound to a single element, yet it is able to process
// click events on any of the remove anchors within it.

$("ul").on("click", "a", function (e) {
  e.preventDefault();
  $(e.target).closest("li").remove();
});
```
## jQuery AJAX Requests

jQuery provides an alternative to the browser native XHR and Fetch APIs with its `$.ajax()` method for performing async HTTP requests. It is essentially a layer of abstraction or a wrapper over XHR. Works in a similar manner to the browser's Fetch API. Takes a url string argument and an optional `[settings]` key-value pair configuration object for request params. Returns a [jqXHR](https://api.jquery.com/jQuery.ajax/#jqXHR) object (a superset of the browser XHR object) on which response handling methods (`done()`, `fail()`, `always()`, etc...) can be chained. These response handling methods typically take a callback function argument which gets executed according to the outcome of the request.

[jQuery.ajax() | jQuery API Documentation](https://api.jquery.com/jQuery.ajax/#jQuery-ajax-url-settings)
[deferred.done() | jQuery API Documentation](https://api.jquery.com/deferred.done/#deferred-done-doneCallbacks-doneCallbacks)

##### Example 1:

```js
$.ajax({
  url: '/my-blog-post',
  type: "GET",
  dataType : "json",
}).done(function(json) {
  // do something with the returned data
});

// Here we see that the config object passed to the ajax method sets the url, request type,
// and dataType with its properties

// done() method is a method of jQuery's jqXHR object which invokes a callback
// when a request succeeds
```

##### Example 2:

```js
$.ajax( {
  url: 'https://host.com/path',
  type: 'POST', // the method
  dataType: 'json',
  headers: { name: 'value' },
  data: { a: "bc", d: "e,f" },
}).done(returnedData => { // this function will be invoked upon success
  // do something with response data
})
```

# Fetch API

Browsers now provide the new promise syntax-based Fetch API for making AJAX requests in a simpler manner than the older callback syntax-based XHR. The Fetch API defines a global `fetch()` function which takes a `resource` path argument (in either string or `Request` object form) and an optional `options` argument which is an object of useful custom option settings for the request such as `method`, `headers`, `body`, and more. `fetch()` then sends an async HTTP request and returns a promise that is fulfilled when the response is received from the server. The promises fulfilled value is a `Reponse` object. The promise will be considered fulfilled unless network errors occurred, meaning that HTTP errors, 4xx/5xx status code errors and more will not cause the promise to reject, and such issues need to be handled in the code through the `Response` object. `fetch()` also does not send cookies with a request without setting the `credentials` parameter to `include` or `same-origin`.

```js
fetch(
    '/my-blog-post',
    { method: 'GET' }
  ).then((response) => {
    // do something with the response
  });
```

### The Fetch `Response` Object

[Response - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Response)

The global `fetch()` function returns a promise that resolves to a `Response` object. The `Response` interface exposes several properties and methods to access the servers response.

- `body`: Instance property whose value is a `ReadableStream` object of the response body content
- `text()`: Instance method that returns a Promise whose resolve value is a string representation of the response body
- `response.ok`: Instance property whose value is a boolean indicating whether the response was successful (status in the range 200 – 299) or not.
- `response.status`: Instance property whose value is the status code of the response. (This will be 200 for a success).
- `response.statusText`: Instance property whose value is the status message corresponding to the status code.
- `response.json()`: Instance method that returns a promise which resolves with the result of parsing the body text as JSON. The Promise resolves to a JavaScript object. This object could be anything that can be represented by JSON — an object, an array, a string, a number:

```js
fetch(url)
  .then(response => response.json())
  .then(data => {
    for (let property in data) {
      // does something with the parsed json
      console.log(data[property])
    }
  }) 
```

# Web APIs

## Web APIs

An API or Application Programming Interface is an interface for two or more computer systems or system components to communicate and interact with each other, facilitating some kind of functionality for one system by another. Web APIs, being APIs, function in a similar manner, but specifically for the web, designed for and with the web and following internet protocols, operation via HTTP. Web API terminology defines the system which provides the web API for external use as the API Provider and the system that accesses and uses the API to perform operations as the API Consumer. While this terminology has some overlap with the Client/Server terminology of the HTTP request-response cycle, with the server typically being analogous to the provide and the client the consumer, the Provider/Consumer language is considered best practice.

While there are many things which an API can be used for, at thier most basic they are ways in which systems share data. They also allow for automation and the re-use of pre-existing services and systems.

## REST & CRUD

### REST

REST or Representational State Transfer is a set of API structuring guideline conventions. Resources being transferred via APIs are representational, as they are not the actual resources themselves. These transfers also must take into account the stateless nature of HTTP, wherein everything a server needs to process a request must be included in every each request. An API is considered RESTful if CRUD user actions can be performed via CRUD operations on one or many resources. Because these are conventions, not all APIs adhere to them, or adhere to varying degrees. But because these conventions are universal and derived from observations of how the web generally works, follow REST conventions allows API Providers and Consumers a simple and predictable manner of accessing and working with resources.

### CRUD

CRUD or Create, Read, Update, Destroy, describes the four actions that a user might be able to take on one or many resources. For an API to be considered RESTful, it should match its operations to these actions and its resources and because RESTful APIs focus on providing CRUD actions for their resources, this is a useful limit to complexity for all systems involved in the process.


## HTTP Response Headers

**List of some common HTTP response headers for web APIs**

[List of HTTP header fields - Wikipedia](https://en.wikipedia.org/wiki/List_of_HTTP_header_fields#Response_fields)

### Access-Control-Allow-Origin

- lists what domains can access the resource using [CORS (Cross-origin resource sharing)](https://www.wikiwand.com/en/Cross-origin_resource_sharing)

```shell
Access-Control-Allow-Origin: * # Allows all sites
```

### Allow

- used with `405 Method Not Allowed` response to requests with invalid methods
- value is a list of allowed methods

```shell
~ » http --print=h POST www.google.com

HTTP/1.1 405 Method Not Allowed
Allow: GET, HEAD                   # POST is not allowed, only GET and HEAD
Content-Length: 1589
Content-Type: text/html; charset=UTF-8
Date: Tue, 27 Feb 2024 21:41:19 GMT
Server: gws
X-Frame-Options: SAMEORIGIN
X-XSS-Protection: 0
```

### Content-Length

- byte Length of the response body

```shell
Content-Length: 1984
```

### Content-Type

- describes media type/format of response body
- often includes a charset attribute

```shell
~ » http --print=h POST www.google.com

HTTP/1.1 405 Method Not Allowed
Allow: GET, HEAD
Content-Length: 1589
Content-Type: text/html; charset=UTF-8. # media type is html, charset is UTF-8
Date: Tue, 27 Feb 2024 21:41:19 GMT
Server: gws
X-Frame-Options: SAMEORIGIN
X-XSS-Protection: 0
```

### ETag

- identifies a specific version of a resource
- changes to a resource will result in a new ETag value
- ETag values returned in headers can be sent in future requests to the same URL in the `If-None-Match` header
	- if the resource has not changed, the provider will respond with `304 Not Modified`
	- if the resource changed, the response will include the entire resource in its updated form and a new ETag
- used to avoid fetching and processing data that has not been updated since last access

```shell
ETag: "6df23dc03f9b54cc"
```

### Last-Modified

- last time the requested resource was modified
	- date and time received in the header can be sent with future requests to the same URL in the `If-Modified-Since` header
		- 	- if the resource has not changed, the provider will respond with `304 Not Modified`
	- if the resource changed, the response will include the entire resource in its updated form along with a new value for `Last-Modified`
- used to avoid fetching and processing data that has not been updated since last access

### WWW-Authenticate

- indicates type of authentication required to access resource

```shell
WWW-Authenticate: Basic
```

### X-* Headers

- Headers that are named starting with an `X-` is convention for non-standard headers
- often used for API or application specific headers

```shell
➜  api_book_content git:(master) ✗ http https://api.github.com/user
HTTP/1.1 401 Unauthorized
...
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 57
X-RateLimit-Reset: 1413592144
...
```

## Media Types

A media type is the format of an HTTP response's body. This information is found in the `Content-Type` header of an HTTP response. HTML is a dominant media type but there are many others such as plain text, CSS, JS, and more. The `Content-Type` header often also includes a `charset` for some media types which tells the browser the character set of the response.
