

let map = [
["","","", "0","","",""],
["","","", "l","","",""],
["","","", "l","","",""],
["0","-","-", "0","-","-","0"],
["","'s'","", "l","","'/'",""],
["","","'s'", "l","'/'","",""],
["","","", "0","","",""]
];


// TJenare alfred
//Tjo Baby

function print_board(board) {
    for (let i = 0; i < board.length; i++){
        console.log(board[i]);
    }
}

print_board(map);
    


import { type MatrixGraph } from './lib/graphs';

//const mormorskudde: MatrixGraph