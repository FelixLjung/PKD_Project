// Imports

import { 
    type MatrixGraph } from './lib/graphs';

import {
     turn, count_castles,
     recruit_warrior,
     check_if_cpu } from './Functions/general_functions';

import {
    game_setup,
    get_castle_array } from './Functions/setup_functions'

import {
     refresh_board,
     splash,
     splash_end } from './Functions/print_functions';

import { 
    empty_line,
    press_to_continue,
    print_line,
    print_to_game,
    get_testing_bool } from './Functions/utility_functions';

import { 
    type Player } from './types';


// Variables

const prompt = require('prompt-sync')({ sigint: true }); // Krävs för att hantera inputs

let game_running = false;

game_running = true;

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


// Functions

/**
 * Changes an array of players through the game_setup function. Used in the beginning of the game
 * @param {Array<Player>} player_array - An array of players that is getting updated
 * @returns {Array<Player>} - Te updated array of players
 */
export function a_player_list(player_array : Array<Player>) : Array<Player> {
    player_array = game_setup();
    function helper() {

        /*
        node1 += player_array[0][0][0];
        node2 += player_array[1][0][0];
        node3 += player_array[3][0][0];
        */

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
 * @param {Player} player - The player that has been killed
 */
export function kill_player(player : Player ) {
    print_to_game(player[0] + " has fallen");

    for (let i = 0; i < player_list.length; i++){
        if (player_list[i][0] == player[0]){
            player_list[i][0] = "UNDEFINED";
        }
    }
    empty_line();
}


/**
 * Checks if a player has any castles or if they are out of the game
 * @param {Player} player - The player being looked at
 * @returns {Boolean} - True if the player has castle/castles, otherwise false
 */
function player_is_alive(player : Player) : Boolean {
    if (count_castles(player[1]) <= 1){
        return true;
    } else {
        return false;
    }
}


/**
 * The function running the game.
 */
function game(){
    player_list = a_player_list(player_list);

    splash();
    press_to_continue();
    
    while(game_running){
        console.log();
        console.log();
        refresh_board();
        for(let i = 0; i < player_list.length; i++){ // Gives one turn to each player
            
            if (count_castles(player_list[i][1]) == 0){ // Checks if player has 0 castles, SKIP
                continue;
            }
            

            if (check_if_cpu(player_list[i])){  // if it's CPU's turn, do nothing
                
            } else {                            // If it's a player's turn
                if(player_list[i][0] == "David"){
                    console.log(`\u001b[31m`, player_list[i][0],`\u001b[37m`, "turn" , count_castles(player_list[i][1]) );
                } else if(player_list[i][0] == "Felix"){
                    console.log(`\u001b[32m`, player_list[i][0],`\u001b[37m`, "turn" , count_castles(player_list[i][1]) );
                } else if(player_list[i][0] == "Alfred"){
                    console.log(`\u001b[33m`, player_list[i][0],`\u001b[37m`, "turn" , count_castles(player_list[i][1]) );
                }
                
                turn(player_list[i]);
                print_to_game(" Your turn is finished.");
                press_to_continue();
                empty_line();
                empty_line();
 
            }
            
            if (count_castles(player_list[i][1]) == 5) {
                splash_end(player_list[i])

                game_running = false;
                break;
            }
                print_line();
            }
            if (game_running == true) {
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


/**
 * If we are testing, the game wont run
 */
function game_if_not_test() {
    if (!get_testing_bool()) {
        game();
    } else {
    }
}

game_if_not_test();