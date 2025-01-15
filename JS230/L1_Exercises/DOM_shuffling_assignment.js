let header = document.getElementsByTagName('header')[1];
// header.id = 'top_header'
document.body.insertAdjacentElement("afterbegin", header);

let h1 = document.getElementsByTagName("h1")[0];
header.insertAdjacentElement("afterbegin", h1);

let [figure1, figure2] = document.getElementsByTagName('figure');
let [mop, chin] = document.getElementsByTagName("img");

figure1.replaceChild(chin, mop);
figure2.insertBefore(mop, figure2.figcaption)

let article = document.querySelector("article");
article.appendChild(figure1);
article.appendChild(figure2);

// Mine is roughly equivalent to the given solution in complexity, process, and
// naming choices. I noticed that they used `parent.insertBefore(node, target)
// much more than I did. E.g. they did `article.insertBefore(figure1, null)
// rather than my `appendChild`.