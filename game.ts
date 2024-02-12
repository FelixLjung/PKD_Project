import { type MatrixGraph } from './lib/graphs';

import {getRandomInt, attack, move, castle_owner, print_board, turn, setup, spawn, create_warrior} from './functions'

import {type List, type Pair, list, head, tail, pair} from './lib/list';


let node1 = "A";
let node2 = "B";
let node3 = "C";
let node4 = "X"



let game_running = false;
/*
let map = [
    [" "," "," "," ", node1," "," "," "," "],
    [" "," ","/"," ", "|"," ","\\"," "],
    [" ","/"," "," ", "|"," "," ","\\"],
    [node2,"-","-", "-", node4,"-","-","-",node4],
    [" ","\\"," "," ", "|"," "," ","/"," "],
    [" "," ","\\"," ", "|"," ","/",""," "],
    [" "," "," "," ", node3," "," "," "," "]
];
*/





const I = true;
const O = false;
const mormors_kudde: MatrixGraph = {
    size: 5,
    adj:
        [
        [O, I, I, I, O], //0. from A 
        [I, O, I, O, I], //1. from B
        [I, I, O, I, I], //2. from C
        [I, O, I, O, I], //3. from D
        [O, I, I, I, O], //4. from E
        ] 

}

const player_list = setup();

node1 = player_list[0][0][0];
node2 = player_list[1][0][0];
node3 = player_list[2][0][0];



let map = [
    [" "," "," "," ", node1," "," "," "," "],
    [" "," ","/"," ", "|"," ","\\"," "],
    [" ","/"," "," ", "|"," "," ","\\"],
    [node2,"-","-", "-", node4,"-","-","-",node4],
    [" ","\\"," "," ", "|"," "," ","/"," "],
    [" "," ","\\"," ", "|"," ","/",""," "],
    [" "," "," "," ", node3," "," "," "," "]
];
//const player1 = player_list[0];
//print_board(map);
//console.log(player_list);

/* 
console.log(create_warrior());
console.log(create_warrior());
console.log(create_warrior());
console.log(create_warrior());
console.log(create_warrior());
console.log(create_warrior());
console.log(create_warrior());
console.log(create_warrior());
console.log(create_warrior());
*/
// The game loop
while(game_running){
    for(let i = 0; i < player_list.length; i++){ // ger en turn åt varje spelare
        
    } 


}
//console.log(mormors_kudde);