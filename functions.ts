import { List, Pair , list} from "./lib/list";
import { type MatrixGraph } from './lib/graphs';
//Types

type Army<warrior> = Array<warrior>

type Player <H, T>= [string, List<Castle>]

type warrior = {
    attack : number
    health : number
    name: string
    
};

type Castle = {
    hp: number,
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
export function getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min);
}



export function attack() {
    
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

export function turn() {

}

/**
 * Sets up a players name and their starting army
 * @returns A player
 */
export function setup() : List<Player> {

}

/**
 * Places soldiers in the starting castles
 * @param Board - The new game board
 */
export function spawn(Board: MatrixGraph) {

}