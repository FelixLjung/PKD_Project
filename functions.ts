import { type List, type Pair , list} from "./lib/list";
import { type Queue } from "./lib/queue_array";
import { type MatrixGraph } from './lib/graphs';




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

/**
 * Moves an army from one castle to another, attacking if it is an enemy castle
 * @param Move_from - The castle the army is being moved from
 * @param Move_to - The castle the army is being moved to
 * @param Soldiers - The army being moved from one castle to another
 * @returns void
 */
export function move(Move_from: Castle, Move_to: Castle, Soldiers: attack_army) : Void {

}

/**
 * Changes the owner of a castle
 * @param Board - The game board where you can find the owner of the castle
 * @returns The updated board with the correct castle owners
 */
export function castle_owner(Board: MatrixGraph) : MatrixGraph {

}

/**
 * A players turn in game. Should be able to call multiple actions
 * Move and Attack.
 * Should Call other functions.
 * @param player is a pair(string, List)
 */
export function turn(player: Player) {

}

export function setup() {
    const name_player1 = prompt("Enter player 1 name: ");
    const player1 : Player =  [name_player1!, list()];

    return list(player1);
}

/**
 * Places soldiers in the starting castles
 * @param Board - The new game board
 */
export function spawn(Board: MatrixGraph) {

    
}
