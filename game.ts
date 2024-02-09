

let map = [["","","", "0","","",""],
["","","", "l","","",""],
["","","", "l","","",""],
["0","-","-", "0","-","-","0"],
["","'s'","", "l","","'/'",""],
["","","'s'", "l","'/'","",""],
["","","", "0","","",""]];



//for(let i = 0; i < )

/**
 * Prints the board to the console
 * @param [<Array>] 2d array of the map
 * 
 */

function print_board(board) {
    for (let i = 0; i < board.length; i ++){
        console.log(board[i].toString());
    }
}

print_board(map);


import { type MatrixGraph } from './lib/graphs';


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
