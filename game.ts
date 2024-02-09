import { type MatrixGraph } from './lib/graphs';

import {getRandomInt, attack, move, castle_owner, print_board, turn, setup, spawn} from './functions'



let map = [["","","", "0","","",""],
["","","", "l","","",""],
["","","", "l","","",""],
["0","-","-", "0","-","-","0"],
["","'s'","", "l","","'/'",""],
["","","'s'", "l","'/'","",""],
["","","", "0","","",""]];

let game_running = true

print_board(map);





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

console.log(player_list);
// The game loop
while(game_running){
    continue
}
