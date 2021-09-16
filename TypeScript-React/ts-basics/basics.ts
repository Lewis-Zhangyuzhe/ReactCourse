// Primitives
let age: number = 123;

let username: string;

username = "zyz";

let isHandsome: boolean;

// More Complex types
let hobbies: string[];

// hobbies = ["12", 12];
type Person = {
  name: string;
  age: number;
};

let person: Person;

// person = {
//   isEmployee: true,
// };

let people: Person[];

// type inferences

let course: string | number = "React- the complete guide";

course = 1234;

// Functions & types
function addition(a: number, b: number) {
  return a + b;
}

// void
function print(value: any) {
  console.log(value);
}

// Generics
