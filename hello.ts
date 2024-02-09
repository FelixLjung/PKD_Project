import { ListGraph, MatrixGraph } from "../lib/graphs";
import { list } from "../lib/list";}


function getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min);
}

console.log("Tjenare Tjofräs pirrekirre darra stralle");
const prompt1 = require('prompt-sync')({sigint: true}); // Denna påstår att det är error men det funkar ändå
var name1 = prompt1("Vem du är? ");

console.log("no way...", name1, "du är typ " + getRandomInt(1,10) + " år gammal");

const I = true;
const O = false;
const graph1_mg: MatrixGraph = {
    size: 5,
    adj:

        [
        [O, I, I, I, O, O, O], //0. from A 
        [O, O, O, O, O, O, O], //1. from B
        [I, O, O, O, O, O, I], //2. from C
        [O, O, O, O, O, O, O], //3. from D
        [O, O, O, I, O, O, O], //4. from E
        ] 

}

// 7 rader
console.log("[O, O, O, O, O, O, O]");
console.log("[O, O, O, O, O, O, O]");
console.log("[O, -  -  O,  -  - O]");
console.log("[O, O, O, O, O, O, O]");
console.log("[O, O, O, I, O, O, O]");