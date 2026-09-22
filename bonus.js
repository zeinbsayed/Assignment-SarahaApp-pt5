const I = 1;
const V = 5;
const X = 10;
const L = 50;
const C = 100;
const D = 500;
const M = 1000;

const romanNumber = "MCMXCIV";

let total = 0;

for (let i = 0; i < romanNumber.length; i++) {
    let current;
    let next;

    if (romanNumber[i] === "I") current = I;
    if (romanNumber[i] === "V") current = V;
    if (romanNumber[i] === "X") current = X;
    if (romanNumber[i] === "L") current = L;
    if (romanNumber[i] === "C") current = C;
    if (romanNumber[i] === "D") current = D;
    if (romanNumber[i] === "M") current = M;

    if (romanNumber[i + 1] === "I") next = I;
    if (romanNumber[i + 1] === "V") next = V;
    if (romanNumber[i + 1] === "X") next = X;
    if (romanNumber[i + 1] === "L") next = L;
    if (romanNumber[i + 1] === "C") next = C;
    if (romanNumber[i + 1] === "D") next = D;
    if (romanNumber[i + 1] === "M") next = M;

    if (current < next) {
        total -= current;
    } else {
        total += current;
    }
}

console.log(total); 
/////////////code on LeetCode//////////////////////
var romanToInt = function(s) {
const I = 1;
const V = 5;
const X = 10;
const L = 50;
const C = 100;
const D = 500;
const M = 1000;



let total = 0;

for (let i = 0; i < s.length; i++) {
    let current;
    let next;

    if (s[i] === "I") current = I;
    if (s[i] === "V") current = V;
    if (s[i] === "X") current = X;
    if (s[i] === "L") current = L;
    if (s[i] === "C") current = C;
    if (s[i] === "D") current = D;
    if (s[i] === "M") current = M;

    if (s[i + 1] === "I") next = I;
    if (s[i + 1] === "V") next = V;
    if (s[i + 1] === "X") next = X;
    if (s[i + 1] === "L") next = L;
    if (s[i + 1] === "C") next = C;
    if (s[i + 1] === "D") next = D;
    if (s[i + 1] === "M") next = M;

    if (current < next) {
        total -= current;
    } else {
        total += current;
    }
}

return total 
};