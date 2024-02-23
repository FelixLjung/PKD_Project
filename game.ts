import { type MatrixGraph } from './lib/graphs';

//import {getRandomInt, attack, move, castle_owner, print_board, turn, setup, create_warrior, refresh_board, castle_turn} from './functions';

import {type List, type Pair, list, head, tail, pair} from './lib/list';

import { getRandomInt, turn, count_castles, recruit_warrior } from './Functions/general_functions';
import {game_setup, get_castle_array } from './Functions/setup_functions'
import { refresh_board, print_board } from './Functions/print_functions';

import { type Player } from './types';

console.log("GAME.ts")
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
    adj:[
        [O, I, I, I, O], //0. from A 
        [I, O, I, O, I], //1. from B
        [I, I, O, I, I], //2. from C
        [I, O, I, O, I], //3. from D
        [O, I, I, I, O], //4. from E
        ] 

}


let player_list = game_setup();
export function get_player_list() {
    console.log("in game.ts inside get_player_list");
    node1 += player_list[0][0][0];
    node2 += player_list[1][0][0];
    node5 += player_list[2][0][0];
    return player_list;
}

export function kill_player(player : Player ) {
    console.log("!");
    for (let i = 0; i < player_list.length; i++){
        if (player_list[i][0] == player[0]){
            player_list[i][0] = "UNDEFINED";
        }
    }

    
}
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

// The game loop
function game(){
    //console.log("Wtf i game");
    while(game_running){
    //print_board();
    refresh_board();
    for(let i = 0; i < player_list.length; i++){ // ger en turn åt varje spelare
        //console.log(player_list[i][1][0].hp);
        print_board();
        if (count_castles(player_list[i][1]) == 0 ){
            continue;
        }
        console.log(player_list[i][0]);

        if (player_list[i][0] == "CPU1"){
            
        } else {
            turn(player_list[i]);
        }
        
        if (count_castles(player_list[i][1]) == 5) {
            console.log('Congratulations', player_list[i], '! You now rule the entire kingdom!')
            game_running = false;
        }

            //console.clear();
            console.log("------------------------------------------");
        }   
        for (let i = 0; i < get_castle_array().length; i++){
            if (get_castle_array()[i].owner != 'CPU1') {
            recruit_warrior(get_castle_array()[i]);
            } 
        console.log("All castles recruits a new warrior!");
        

    } 

    

}}
game()