

let map = [
["","","", "0","","",""],
["","","", "l","","",""],
["","","", "l","","",""],
["0","-","-", "0","-","-","0"],
["","'s'","", "l","","'/'",""],
["","","'s'", "l","'/'","",""],
["","","", "0","","",""]
];


// TJenare alfred
//Tjo Baby

import { type MatrixGraph } from '../lib/graphs';


const I = true;
const O = false;
const mormors_kudde: MatrixGraph = {
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