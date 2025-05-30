// let array = ['a','b']
// function toUpperCaseArray(arr: string[]): string[] {
//     return arr.map(s => s.toUpperCase())
// }
//
// console.log(toUpperCaseArray(array))
//
// function log(s:string):void {
//     console.log(s);
// }
//
// type Direction = "left" | "right" | "up" | "down";
//
// let move: Direction = "left";
//

type Contact = {
    firstName: string,
    lastName: string,
    age: number,
    isOline: boolean,
}

let employee: {id: number, name: string, department: string} = {
    id: 3,
    name: 'Rosa',
    department: 'Math',
}

interface CarMobile {
    make: string,
    model: string,
    year: number,
}

let myCarMobile: CarMobile = {
    make: 'sub',
    model: 'outback',
    year: 2022
}


type Device = {
    manufacturer: string,
    model: (string),
    year: (number)
}

let computer: Device = {
    manufacturer: 't',
    model: 's',
    year: 2025

}
let smartphone = {
    manufacturer: 't',
    model: 's',
    year: 2025,
    age: 2
}

let showMe: Device = smartphone;


interface Account {
    username: (string),
    email: (string),
    readonly accountCreationDate: string,
}

// Create a variable randomValue that is of type unknown. Perform a type assertion to treat it as a string, and then call the .toUpperCase() method on it.
// let randomValue: unknown;
// randomValue = 'hello world';
// console.log((randomValue as string).toUpperCase())


class PeoplePerson {
    name: string;
    age: number;
    // I forgot to declare the properties. I typed the arguments in the constructor, but not the properties themselves

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }

    describe() {
        console.log(`${this.name} is ${this.age} years old`)
    }

}
const person = new PeoplePerson("Alice", 30);
console.log(person.describe());
// Expected Output:
// Alice is 30 years old.

//  whoa!
// One more thing, the public keyword in the constructor parameters automatically creates properties with the same names
// and types. We could have written the class like this:

// class Person {
//     constructor(public name: string, public age: number) {}
//
//     describe(): string {
//         return `${this.name} is ${this.age} years old.`;
//     }
// }












































