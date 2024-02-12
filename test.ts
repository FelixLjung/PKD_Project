import { print_board } from "./functions";

let node1 = "3F";
let node2= "7A";
let line1 = [node1,"-----",node2];
let line2 = ["|","      ","|"];
let line3 = ["|","      ","|"];
let line4 = [node1,"-----",node2];

let board = [line1, line2,line3,line4]


let outputColor = "color:green; font-size:20px;"

let board1 = [
    ["      ", node1],
    ["   /  ","|","  \\     "],
    ["  /  "," |","   \\"],
    [node1,"---",node2,"---",node1],
    [" \\   "," |","   / "],
    ["  \\   ","|","  / "],
    ["     ",node2,"     "]
];



function print_to_board(board) {
    for (let i = 0; i < board.length; i++){
        console.log(helper(board[i]));

    }

    function helper(line) {
        let str = "%c";
        for(let j = 0; j < line.length; j++){
            str += line[j];
        }
        return str, outputColor;
    }
}



print_to_board(board1);


//console.log(str);