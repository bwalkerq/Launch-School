let array = ['a','b']
function toUpperCaseArray(arr: string[]): string[] {
    return arr.map(s => s.toUpperCase())
}

console.log(toUpperCaseArray(array))

function log(s:string):void {
    console.log(s);
}

type Direction = "left" | "right" | "up" | "down";

let move: Direction = "left";

