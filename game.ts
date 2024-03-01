import { 
    type MatrixGraph 
} from './lib/graphs';

import {
     turn, count_castles, recruit_warrior, check_if_cpu 
} from './Functions/general_functions';

import {
    game_setup, get_castle_array 
} from './Functions/setup_functions'

import {
     refresh_board 
} from './Functions/print_functions';

import { 
    press_to_continue, print_line, print_to_game 
} from './Functions/utility_functions';

import { 
    type Player 
} from './types';

const prompt = require('prompt-sync')({ sigint: true }); // Krävs för att hantera inputs

// start nodes
let node1 = "1";
let node2 = "2";
let node5 = "5";

// unclaimed nodes
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


let player_list : Array<Player> = [];

/**
 * Changes an array of players through the game_setup function. Used in the beginning of the game
 * @param player_array - an array of players that is getting updated
 * @returns - the updated array of players
 */
export function a_player_list(player_array : Array<Player>) : Array<Player> {
    player_array = game_setup();
    function helper() {

        node1 += player_array[0][0][0];
        node2 += player_array[1][0][0];
        node3 += player_array[3][0][0];
        //node4 += player_array[4][0][0];
        //node5 += player_array[2][0][0];
        return player_array;
    }
    return helper();
}

export function get_player_list() {
    return player_list;
}


/**
 * Removes a player without any castles, meaning they have been killed
 * @param player - the player that has been killed
 */
export function kill_player(player : Player ) {
    print_to_game(player[0] + " has fallen");

    for (let i = 0; i < player_list.length; i++){
        if (player_list[i][0] == player[0]){
            player_list[i][0] = "UNDEFINED";
        }
    }

}

function player_is_alive(player : Player) : Boolean {
    if (count_castles(player[1]) <= 1){
        return true;
    } else {
        return false;
    }
}


/*
let map = [
    [" "," "," "," ", node1," "," "," "," "],
    [" "," ","/"," ", "|"," ","\\"," "],
    [" ","/"," "," ", "|"," "," ","\\"],
    [node2,"-", "-", node3,"-","-",node4],
    [" ","\\"," "," ", "|"," "," ","/"," "],
    [" "," ","\\"," ", "|"," ","/",""," "],
    [" "," "," "," ", node5," "," "," "," "]
];
*/
//const player1 = player_list[0];
//print_board(map);
//console.log(player_list);

game_running = true;

/**
 * The function running the game.
 */
function game(){
    console.clear();
    player_list = a_player_list(player_list);
    
    while(game_running){
        //print_board();
        //console.clear()
        console.log();
        console.log();
        refresh_board();
        for(let i = 0; i < player_list.length; i++){ // ger en turn åt varje spelare
            //console.log(player_list[i][1][0].hp);
            //print_board();
            
            if (count_castles(player_list[i][1]) == 0){ // Checks if player has 0 castles, SKIP
                continue;
            }
            

            if (check_if_cpu(player_list[i])){  // if it's CPU's turn, do nothing
                
            } else {                            // If it's a player's turn
                console.log(`\u001b[36m`, player_list[i][0],`\u001b[37m`, "turn" , count_castles(player_list[i][1]) );
                turn(player_list[i]);
                print_to_game("Your turn is finished");
                press_to_continue();
 
            }
            
            if (count_castles(player_list[i][1]) == 5) {
                console.log('Congratulations', player_list[i], '! You now rule the entire kingdom!')
                game_running = false;
                break;
            }

                //console.clear();
                //console.log("------------------------");
                print_line();
            }
            if (game_running == true) {  // Allt detta borde abstractas
                for (let i = 0; i < get_castle_array().length; i++){
                    let curr_castle = get_castle_array()[i]
                    let index = curr_castle.hp.length
                    if (!check_if_cpu(get_castle_array()[i].owner)) {
                        recruit_warrior(curr_castle, index);     //recruits one warrior to each castle.
                        
                    } 
                }
                print_to_game("All castles recruits a new warrior!");
            }
}}

game();