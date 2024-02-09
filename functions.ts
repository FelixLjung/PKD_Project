import { type List, Pair , list} from "./lib/list";
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
    const player1 : Player<string, List<warrior>> = 
}

export function spawn() {

}