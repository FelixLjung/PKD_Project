import { List, Pair , list} from "./lib/list";



import { Queue } from "./lib/queue_array";

import { type List, Pair , list} from "./lib/list";
//Types
const prompt1 = require('prompt-sync')({sigint: true}); // Denna påstår att det är error men det funkar ändå

type Army<warrior> = Array<warrior>

type attack_army = Queue<warrior>

type Player = [string, List<Castle>]

type warrior = {
    attack : number
    health : number
    name: string
    
};

type Castle = {
    hp: Army<warrior>,
    name: string
    owner: string
}
 


// Functions
/**
 * Chooses a random number between [min] and [max].
 * @param min is a number. Represents the lowest number on the die
 * @param max is a {number}. Represents the hightes number on the die
 * @returns a random number / integer.
 */
export function getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min);
}


/**
 * Take a player and an Attack Army, and if the 
 * @param player is a pair(name:string, List<castle>)
 * @param army 
 * 
 * @returns Boolean, if you won the castle or not
 * 
 */

export function attack(player: Player, A_Army: Queue<warrior>): Boolean {
    
    
}

/**
 * Prints the board to the console
 * @param Array 2d array of the map
 * @return Does not return
 */
export function print_board(board){
    for (let i = 0; i < board.length; i ++){ // funkar dåligt
        console.log(board[i].toString());
    }
}

export function move (){

}

export function castle_owner() {

}

export function turn() {

}

/**
 * reads all the player names and creates players
 * @params no arguments
 * @returns does not return
 */

export function setup() {
    const name_player1 = prompt("Enter player 1 name: ");
    const player1 : Player =  [name_player1, list()];

    return list(player1);
    
}

export function spawn() {

}