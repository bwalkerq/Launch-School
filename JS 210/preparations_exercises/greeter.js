function getName(prompt) {
    let rlSync = require('readline-sync')
    return rlSync.question(prompt)
}

let firstName = getName("What is your first name?\n")
let surName = getName("What is your surname?\n")

console.log(`hello there, ${firstName} ${surName}!`)
