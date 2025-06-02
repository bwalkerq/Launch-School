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
// console.log(person.describe());
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

function wrapInArray(arg: string | number): Array<string | number> {
    return [arg];
}


function printId(arg: string | number): string {
    if (typeof arg === 'string') {
        return "your id is a string"
    } else {
        return "your id is a number"
    }
}


function firstElement<T>(arr: T[]):T | undefined {
    if (arr.length > 0) {
        return arr[0]
    } else {
        return undefined;
    }
}


interface KeyValuePair <K, V>{
    key: K,
    value: V,
}

let kv:KeyValuePair<string, number> = {
    key: 'hello',
    value: 4
}

type ValidType = 'string' | 'number' | 'boolean' | 'object' | 'function' | 'undefined' | 'symbol' | 'bigint'

function filterByType<T>(arr: unknown[], targetType: ValidType): T[] {
    return arr.filter(element => {
        return typeof element === targetType;
    })
}

// console.log(
// filterByType<string>(["hello", "world", 42, true], "string")
// )

// Small 4
function printLength(arg: string | string[]):void {
    if (Array.isArray(arg)) {
        console.log(`Array count: ${arg.length}`)
        return;
    }
    console.log(`string length: ${arg.length}`)
}

function isString(arg:unknown): arg is string {
    return typeof arg === 'string';
}

function isStringArray(arr: unknown[]): arr is string[] {
    return arr.every(el => {
        return isString(el);
    });
}

// console.log(
//     isStringArray([1, 2, 3]),
//     isStringArray(["test", "string"])
// )



function shorty(input: string | undefined): void {
    if (input && input !== '') {
        console.log('input is defined and not empty');
        return;
    }
}

interface Circle {
    kind: 'circle',
    radius: number
}

interface Square {
    kind: 'square',
    sideLength: number
}

type Shape = Circle | Square

function getArea(shape: Shape): number {
    switch (shape.kind) {
        case 'circle':
            return shape.radius ** 2 * Math.PI;
        case "square":
            return shape.sideLength ** 2;
        default:
            return assertNever(shape as never)
    }
}

function assertNever(arg: never): never {
    throw new Error('this is not a shape')
}

getArea({ kind: "circle", radius: 10 })
getArea({ kind: "square", sideLength: 10 })


function logUnknown(arg: unknown): void {
    if (typeof arg === "string") {
        console.log(arg)
    }
}

interface Person {
    name: string,
    age: number
}

interface Employee extends Person {
    employeeId: number
}

let sal: Employee = {
    name: 'sal',
    age: 10,
    employeeId: 1
}


interface Dog2 {
    bark(): void
}

interface Cat2 {
    meow(): void
}

type Pet2 = Dog2 & Cat2

let pet2: Pet2 = {
    bark: ()=> {
        console.log('bark')
    },
    meow() {
        console.log('meow')
    }
}

interface StringMap {
    [key: string]: string
}

let dictionary: StringMap = {
    this: 'that',
    those: 'these'
}

interface UserData {
    name: string;
    age: number;
    email: string;
}
type PropNames = keyof UserData

function logProp (user: UserData, key: PropNames): void {
    console.log(user[key])
}

const sample: UserData = {
    name: 'sample',
    email: 'sam@ple.com',
    age: 8
}

logProp(sample, 'email')


function getProperty<T>(arg: T, prop: keyof T) {
    return arg[prop];
}































