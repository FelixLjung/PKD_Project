import { ListGraph, MatrixGraph } from "../lib/graphs";
import { list } from "../lib/list";}


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

console.log("Tjenare Tjofräs pirrekirre darra stralle");
const prompt1 = require('prompt-sync')({sigint: true}); // Denna påstår att det är error men det funkar ändå
var name1 = prompt1("Vem du är? ");

console.log("no way...", name1, "du är typ " + getRandomInt(1,10) + " år gammal");


const I = true;
const O = false;
const graph1_mg: MatrixGraph = {
    size: 8,
    adj:

        [[O, I, O, I, O, O, O, O], //from A
        [O, O, I, O, O, I, O, O], //from B
        [O, O, O, O, O, O, O, O], //from C
        [O, O, I, I, I, O, O, O], //from D
        [O, O, O, O, O, I, O, O], //from E
        [O, O, O, O, I, O, O, I], //from F
        [O, O, O, O, O, O, O, O], //from G
        [O, O, O, O, O, O, I, O]] //from H

}

const ex_graph: ListGraph = {
    size: 6,
    adj:
        [list(1, 2),   // From 1  index 0
        list(3, 5),    // From 2  index 1
        list(3, 4),    // From 3  index 2
        list(4),       // From 4  index 3
        list(5),       // From 5  index 4
        list()         // From 6  index 5
        ]
}