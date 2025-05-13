// Assignment 14
function subtract(initial: number, values: number[]): string {
    let remaining = initial;
    for (const value of values) {
        remaining -= value;
    }
    return "The result is: " + remaining;
}

function displayInfo(
    name: string,
    age?: number,
    country: string = "USA"
): string {
    return `${name}, ${age ? age : "unknown age"}, from ${country}`;
}

// console.log(displayInfo("Alice", 30));
// Alice, 30, from USA
// console.log(displayInfo("Bob", undefined, "Canada"));
// Bob, unknown age, from Canada
/* this doesn't throw an error for passing `undefined` explicitly to the optional parameter, since passing no
* argument assigns `undefined` to that parameter anyway. I.e. the type of the parameter here is `number | undefined` */
// console.log(displayInfo("Charlie", 25, "UK"));
// Charlie, 25, from UK


// A16
const numbersInStringFormat = ["10", "20", "30", "40"];
function convertToNumbers(arr: string[]): number[] {
    // return arr.map(el => {
    //     return Number(el);
    // })
//     better version
    return arr.map(Number);
}

// console.log(convertToNumbers(numbersInStringFormat)); // [10, 20, 30, 40]

// A20 - refactor this to use literal types:
function calculateDraft(operation: string, a: number, b: number) {
    switch (operation) {
        case "add":
            return a + b;
        case "subtract":
            return a - b;
        case "multiply":
            return a * b;
        case "divide":
            return a / b;
        default:
            throw new Error("Invalid operation");
    }
}
type Operation = 'add' | 'subtract' | 'multiply' | 'divide';
function calculate(operation: Operation, a: number, b: number) {
    switch (operation) {
        case "add":
            return a + b;
        case "subtract":
            return a - b;
        case "multiply":
            return a * b;
        case "divide":
            return a / b;
        default:
            throw new Error("Invalid operation");
    }
}


// A22
// function concatenate(a, b) {
//     return a + b;
// }
//
// const result = concatenate("Hello", "World");
// const numericResult = concatenate(1, 2);
//
// console.log(result);
// console.log(numericResult);

// This is fine as is, though we may want to refactor into two explicitly-typed functions to avoid ambiguity.


// L2 A6
const book: Book = {
    title: "The Great Gatsby",
    author: {
        firstName: "F. Scott",
        lastName: "Fitzgerald",
    },
    publicationDate: 1925,
    genres: ["Tragedy", "Realism"],
};
// Please create a TypeScript interface that can accurately describe the shape of this book object.
interface Book {
    title: string;
    author: Author;
    publicationDate: number;
    genres: string[];
}

interface Author {
    firstName: string;
    lastName: string;
}

// L2 A10
interface UserInfo {
    name: string;
    email?: string;
    age?: number;
}
/*Implement a function displayUserInfo that takes a UserInfo object and returns a formatted string containing the user's
 information. For optional properties, display a default value (use "N/A" for email and "unknown" for age)
  if they are not provided.*/

function displayUserInfo(userInfo: UserInfo): string {
    return `${userInfo.name} is ${userInfo.age || 'unknown'} can be reached at ${userInfo.email || 'N/A'}`
}

// Their solution more verbose, potentially clearer:
/*
* function displayUserInfo(userInfo: UserInfo): string {
  const email = userInfo.email ? userInfo.email : "N/A";
  const age = userInfo.age ? userInfo.age : "unknown";

  return `Name: ${userInfo.name}, Email: ${email}, Age: ${age}`;
}
* */

// console.log(displayUserInfo({name: 'benjamin', age: 30}))

interface Point {
    readonly x: number;
    readonly y: number;
}

function movePoint(point: Point, dx: number, dy: number): Point {
    return {
        x: point.x + dx,
        y: point.y + dy,
    };
}

// console.log(
//     movePoint({x: 3, y: 4}, 2, 2)
// )












