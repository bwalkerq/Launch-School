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





















