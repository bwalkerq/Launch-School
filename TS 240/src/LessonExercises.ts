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


// L2 A16
class Person {
    age?: number;
    name: string;

    constructor(name: string, age?: number) {
    // constructor(age?: number, name: string) {
// note that a required parameter can't follow an optional parameter
        this.name = name;
        this.age = age;
    }
}

interface Movable {
    speed: number;
    move(): void;
}

// Please create a Car class that implements the Movable interface. Ensure the move method outputs a message to the console.
// class Car implements Movable {
//     speed: number;
//
//     constructor(speed: number) {
//         this.speed = speed;
//     }
//
//     move() {
//         console.log(`I'm a car and I'm moving at ${this.speed}mph!`)
//     }
// }

// new Car(30).move();


// L3 A4

// Write a function called combine that takes two parameters and can either concatenate
// strings or add numbers based on the types of the input parameters.
type StringOrNumber = string | number;

function combine1(a: StringOrNumber, b: StringOrNumber): StringOrNumber {
    if (typeof a === "string" && typeof b === 'string') {
        return a.concat(b);
    } else if (typeof a === "number" && typeof b === 'number') {
        return a + b;
    } else {
        throw new Error('nope; gotta have two strings or two numbers')
    }
}

// L3A6
function combine(input1: string, input2: string): string;
function combine(input1: number, input2: number): number;
function combine(
    input1: string | number,
    input2: string | number
): string | number {
    if (typeof input1 === "string" && typeof input2 === "string") {
        return input1.concat(input2);
    } else if (typeof input1 === "number" && typeof input2 === "number") {
        return input1 + input2;
    } else {
        throw new Error(
            "Invalid input types: both inputs must be strings or both inputs must be numbers."
        );
    }
}

const concatenated: string = combine("Hello, ", "World!"); // Type 'string | number' is not assignable to type 'string'.
// Type 'number' is not assignable to type 'string'.

const added: number = combine(5, 10); // Type 'string | number' is not assignable to type 'string'.
// Type 'string' is not assignable to type 'number'.



/* Please write a TypeScript function called pair similar to the identity function above, it should accept two
parameters of the same type and returns an array of that type.
*/
function pair<Type>(arg1: Type, arg2: Type): Type[] {
    return [arg1, arg2];
}
const pairOfNumbers = pair(1, 2); // returns [1, 2]
const pairOfStrings = pair("hello", "world"); // returns ["hello", "world"]


// L4 A6
type Vehicle = { make: string; model: string; year: number };
type Motorcycle = Vehicle & { type: "motorcycle" };
type Car = Vehicle & { type: "car"; doors: number };

function isCar(vehicle: Vehicle | Car | Motorcycle): vehicle is Car {
    // return 'type' in vehicle && vehicle.type === 'car';
    // their solution more succinct
    return 'doors' in vehicle;
}

// Usage
function makeCar(): Vehicle | Motorcycle | Car {
    return {
        make: "Toyota",
        model: "Camry",
        year: 2021,
        type: "car",
        doors: 4,
    };
}

let myCar = makeCar();

// console.log(myCar.doors); // Error: Property 'doors' does not exist on type 'Vehicle | Motorcycle | Car'

// if (isCar(myCar)) {       // Check if `myCar` is of type `Car`
//     console.log(myCar.doors);
// }


//  For dogs, it should return "name is a age year(s) old dog."; for birds, it should return "name is a bird with a wingspan cm wingspan."
// type Animal = Dog | Bird;
// type Dog = {
//     kind: 'dog',
//     name: string,
//     age: number,
// }
//
// type Bird = {
//     kind: 'bird',
//     name: string,
//     wingspan: number,
// }
//
// function describeAnimal(animal: Animal): string {
//     switch (animal.kind) {
//         case "bird":
//             return `${animal.name} is a bird with a ${animal.wingspan} cm wingspan.`;
//         case 'dog':
//             return `${animal.name} is an ${animal.age} year(s) old dog`;
//         default:
//             throw new Error("Unknown animal species");
//     }
// }


// L4 A12
type Elephant = {
    kind: "elephant";
    weight: number;
};

type Tiger = {
    kind: "tiger";
    speed: number;
};

type Peacock = {
    kind: "peacock";
    featherLength: number;
};

type Animal = Elephant | Tiger | Peacock;

/* Write a function describeAnimal that takes an Animal as an argument and returns a string describing that animal's
characteristic feature. For example, if the animal is an elephant, the function should return "An elephant weighs
[weight] kg.". Include an exhaustiveness check in your function to handle potential future additions to the Animal type.
*/

function describeAnimal(animal: Animal): string {
    switch (animal.kind) {
        case "elephant":
            return `an elephant weighs ${animal.weight} kg`
        case "peacock":
            return `a peacock has feathers that are ${animal.featherLength} cm`
        case "tiger":
            return `a tiger can run at a speed of ${animal.speed} m/s`
        default:
            const _exhaustiveCheck: never = animal;
            // throw new Error(`the animal ${animal} isn't accounted for in describeAnimal`)
            return `Unknown animal: ${JSON.stringify(_exhaustiveCheck)}`;

    }
}


// A14 - uses of Any
function processInput(input: any) {
    console.log(input)
    if (Array.isArray(input)) {
        console.log(input.length)
    } else if (typeof input === 'string') {
        console.log(input.toUpperCase())
    } else {
        console.log(input.toFixed(2))
    }
}

// processInput("hello"); // Outputs: HELLO
// processInput(42); // Outputs: 42.00
// processInput([1, 2, 3]); // Outputs: 3


// A16 Type Unsoundness
// create a function isNumber to make the following examples work

function isNumber(arg:any): boolean {
    return typeof arg === 'number';
}

// example 1
// let x: any = "Launch School";
// const y: number = x;
// console.log(y);

// example 2
let x: any = "Launch School";
const y: number = x as number;

// write function safeGet that prevents the unsoundness of retrieving beyond the end of an array
// function safeGet(array: string[] | number[], index: number): string | number | undefined {
function safeGet<T>(array: T[], index: number){
    if (index > array.length || index < 0) {
        return undefined;
    } else {
        return array[index];
    }
}

// const names: string[] = ["John", "Jane"];
// const thirdName = safeGet(names, 2); // Should return undefined

// const numbers: number[] = [1, 2, 3];
// const number = safeGet(numbers, 1); // Should return 2
// console.log(thirdName, number)

























