"use strict";
/* jshint
esversion: 6,
devel: true,
node: true,
-W097
*/

const fs = require("node:fs");

//no error handling fails import loudly
const readFile = (filename) => fs.readFileSync(filename, "utf8");
const writeFile = (filename, content) => fs.writeFileSync(filename, content);

module.exports = { readFile, writeFile };