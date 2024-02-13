import { type MatrixGraph } from './lib/graphs';

import {getRandomInt, attack, move, castle_owner, print_board, turn, setup, spawn, create_warrior} from './functions'

import {type List, type Pair, list, head, tail, pair} from './lib/list';

// start nodes
let node1 = "1";
let node2 = "2";
let node5 = "5";

//unclaimed nodes
let node3 = "3x"
let node4 = "4x";



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

node1 += player_list[0][0][0];
node2 += player_list[1][0][0];
node5 += player_list[2][0][0];



let map = [
    [" "," "," "," ", node1," "," "," "," "],
    [" "," ","/"," ", "|"," ","\\"," "],
    [" ","/"," "," ", "|"," "," ","\\"],
    [node2,"-", "-", node3,"-","-",node4],
    [" ","\\"," "," ", "|"," "," ","/"," "],
    [" "," ","\\"," ", "|"," ","/",""," "],
    [" "," "," "," ", node5," "," "," "," "]
];
//const player1 = player_list[0];
//print_board(map);
//console.log(player_list);

game_running = true;

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
    print_board(map);
    for(let i = 0; i < player_list.length; i++){ // ger en turn åt varje spelare
        console.log(player_list[i][1][0].hp);
        turn(player_list[i]);

    } 

    
    


}

