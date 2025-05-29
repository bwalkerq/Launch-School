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

// type Animal = Elephant | Tiger | Peacock;

/* Write a function describeAnimal that takes an Animal as an argument and returns a string describing that animal's
characteristic feature. For example, if the animal is an elephant, the function should return "An elephant weighs
[weight] kg.". Include an exhaustiveness check in your function to handle potential future additions to the Animal type.
*/

// function describeAnimal(animal: Animal): string {
//     switch (animal.kind) {
//         case "elephant":
//             return `an elephant weighs ${animal.weight} kg`
//         case "peacock":
//             return `a peacock has feathers that are ${animal.featherLength} cm`
//         case "tiger":
//             return `a tiger can run at a speed of ${animal.speed} m/s`
//         default:
//             const _exhaustiveCheck: never = animal;
//             // throw new Error(`the animal ${animal} isn't accounted for in describeAnimal`)
//             return `Unknown animal: ${JSON.stringify(_exhaustiveCheck)}`;
//
//     }
// }


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


// A18

function isString(input:unknown): input is string {
    return (typeof input === 'string')
}

function processData(data: unknown): string {
    if (isString(data)) {
        return `Hello, ${data}`;
    } else if (typeof data === 'number') {
        return `Age: ${data}`
    } else {
        return 'invalid data'
    }
}

// Usage
// console.log(processData("Alice")); // Should print: "Hello, Alice"
// console.log(processData(25)); // Should print: "Age: 25"
// console.log(processData(true)); // Should throw an error: "Invalid data"


// Lesson 5 A4
interface Animal {
    name: string,
    makeSound(): string,
}

interface Dog extends Animal {
    fetch(): string
}

const myDog = {
    name: "Rex",
    makeSound(): string {return `sound`},
    fetch():string {return `${this.name} fetches a stick.`;}
};

// console.log(myDog.fetch());


// A6
// type Product = {
//     name: string;
//     price: number;
// };
//
// type Shipping = {
//     weight: number;
//     shippingCost: number;
// };

// type ShippableProduct = Product & Shipping;

// interface Product {
//     name: string;
//     price: number;
// }
//
// interface Shipping {
//     weight: number;
//     shippingCost: number;
// }

// interface ShippableProduct extends Product, Shipping {}
// const item: ShippableProduct = {
//     name: "Table",
//     price: 100,
//     weight: 20,
//     shippingCost: 30,
// };


// A12
type CustomArray = {
    [index: number]: string | number;
};

const customArray: CustomArray = ["apple", 42, "banana"];
/* The CustomArray type uses an index signature, which can describe both objects and arrays. Write a function
processCustomArray that takes a CustomArray as an argument and return an array containing only the string elements
 (in uppercase) if the passed argument is truly an array. If the argument is not recognized as an array, return an empty array.
*/

function processCustomArray(arr: CustomArray) {
    if (Array.isArray(arr)) {
        let stringArray: string[] = [];
        for (const arrElement of arr) {
            if (typeof arrElement === 'string') {
                stringArray.push(arrElement.toUpperCase())
            }
        }
        return stringArray;
    } else {
        return [];
    }
}

// console.log(processCustomArray(customArray));


// A14
interface customObj {
    [key: string]: unknown,
}

// function getProperty(obj: customObj, key: string) {
    // if (typeof obj[key] === 'string') {
    //     return obj[key];
    // } else if (typeof obj[key] === 'number') {
    //     return obj[key];
    // } else {
    //
    // }
// }

const obj = {
    name: "John",
    age: 30,
};

// const x2 = getProperty(obj, "name");
// const y2 = getProperty(obj, "age");

// function getAnimalProp(animal: Animal, key: string): unknown {
//     return animal[key]; // Element implicitly has an 'any' type because expression of type 'string' can't be used to index type 'Animal'.
//     // No index signature with a parameter of type 'string' was found on type 'Animal'
// }
//
// interface Student {
//     name: string;
//     age: number;
// }
//
// let key: keyof Student = "grade";

// my solution
// function getProperty<T extends {key: keyof T}>(obj:T, key: keyof T):unknown {
//     return obj[key];
// }

// Their solution:
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}


// Lesson 6 A2
interface Shape {
    color: string;
}

interface Rectangle extends Shape{
    length: number;
    width: number;
}

interface Circle extends Shape{
    radius: number;
}

function displayShapeInfo(shape:Shape): string {
    return `this shape is ${shape.color}`
}


// A7
type NameOptions = {
    firstName?: string;
    lastName?: string;
    title?: string;
};

function formatName(options: NameOptions): string {
    const title = options.title ? `${options.title} ` : '';
    const first = options.firstName ?? "John";
    const last = options.lastName ?? 'Doe';

    return `${title}${first} ${last}`;
}

const formattedName = formatName({
    firstName: "Jane",
    lastName: "Smith",
    title: "Dr.",
});

// console.log(formattedName); // "Dr. Jane Smith"
// console.log(formatName({})); // John Doe


function formatNameAgain({
                             firstName = 'John',
                             lastName = 'Doe',
                             title
                         }: NameOptions): string {
    title = title ? `${title} ` : '';

    return `${title}${firstName} ${lastName}`;
}

const formattedNameAgain = formatName({
    firstName: "Jane",
    lastName: "Smith",
    title: "Dr.",
});

// console.log(formattedNameAgain); // "Dr. Jane Smith"
// console.log(formatNameAgain({})); // "John Doe"



// A10
function sqrt(x: number): number {
    if (x < 0) {
        throw new Error("Cannot calculate square root of a negative number");
    }
    return Math.sqrt(x);
}

function safeSqrt(x: number): number {
    try {
        return sqrt(x)
    } catch (e: unknown) {
        if (e instanceof Error) {
            return -1;
        } else {
            throw e;
        }
    }
}
//
// console.log(
//     [100, -7,].map(safeSqrt)
// )


// A12
// async function getData(url: string): Promise<void> {
//     const response = await fetch(url);
//     const data = await response.json();
//     console.log(data);
// }
/* Remember:
* fetch takes a string and returns a string (json object)
* json takes a string json object and returns a PROMISE that is JS object
* so note that this log would actually log a promise, not just the object.*/

// A14
async function getData(url: string): Promise<void | string> {
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(`The following error occurred: ${error.message}`)
        }
        console.log('we cannot handle that type of error');
    }
}


// A18
function addNumbers(a: number, b: number): number {
    return a + b;
}

type AddNumbersParams = Parameters<typeof addNumbers>;
type AddNumbersReturnType = ReturnType<typeof addNumbers>;

// type AddNumbersFunction = (args: AddNumbersParams) => AddNumbersReturnType;
/*This is incorrect because Parameters<T> returns a tuple type.
* in this case the return is [number, number]
* so the args need to be spread in order to correctly define the function type */

type AddNumbersFunction = (...args: AddNumbersParams) => AddNumbersReturnType;


// A20
interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
}

const products: Product[] = [
    {
        // Let's just simply assume product id is same as the index of the product in the products array
        id: 0,
        name: "Sample Product",
        price: 49.99,
        description: "A sample product for demonstration",
    },
];

type UpdateableProductFields = Partial<Omit<Product, "id">>;

function updateProduct(
    productId: number,
    updatedValues: UpdateableProductFields
): void {
    // if (products[productId]) {
    //     products[productId] = {...products[productId], ...updatedValues}
    const product = products.find((product) => product.id === productId);

    if (product) {
        products[productId] = {
            ...product,
            ...updatedValues
        };
    } else {
        console.log('product not found')
    }

    // Your implementation here:
    // Find product to update by productId
    // If found, apply partial update with using object spreading
    // Else log out "Product not found"
}

updateProduct(0, {
    name: "Updated Product Name",
    price: 99.99,
});

console.log(products)

/* I rewrote the solution to match theirs since .find is more robust way to target products in an array*/
























