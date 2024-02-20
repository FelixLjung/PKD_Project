"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_player_list = void 0;
var general_functions_1 = require("./Functions/general_functions");
var setup_functions_1 = require("./Functions/setup_functions");
var print_functions_1 = require("./Functions/print_functions");
// start nodes
var node1 = "1";
var node2 = "2";
var node5 = "5";
//unclaimed nodes
var node3 = "3x";
var node4 = "4x";
var game_running = false;
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
var I = true;
var O = false;
var mormors_kudde = {
    size: 5,
    adj: [
        [O, I, I, I, O], //0. from A 
        [I, O, I, O, I], //1. from B
        [I, I, O, I, I], //2. from C
        [I, O, I, O, I], //3. from D
        [O, I, I, I, O], //4. from E
    ]
};
var player_list = (0, setup_functions_1.game_setup)();
node1 += player_list[0][0][0];
node2 += player_list[1][0][0];
node5 += player_list[2][0][0];
var map = [
    [" ", " ", " ", " ", node1, " ", " ", " ", " "],
    [" ", " ", "/", " ", "|", " ", "\\", " "],
    [" ", "/", " ", " ", "|", " ", " ", "\\"],
    [node2, "-", "-", node3, "-", "-", node4],
    [" ", "\\", " ", " ", "|", " ", " ", "/", " "],
    [" ", " ", "\\", " ", "|", " ", "/", "", " "],
    [" ", " ", " ", " ", node5, " ", " ", " ", " "]
];
//const player1 = player_list[0];
//print_board(map);
//console.log(player_list);
game_running = true;
function get_player_list() {
    return player_list;
}
exports.get_player_list = get_player_list;
/*
console.log(create_warrior());
console.log(create_warrior());
console.log(create_warrior());
console.log(create_warrior());
console.log(create_warrior());
console.log(create_warrior());
console.log(create_warrior());
console.log(create_warrior());
console.log(create_warrior());
*/
// The game loop
while (game_running) {
    //print_board();
    (0, print_functions_1.refresh_board)();
    for (var i = 0; i < player_list.length; i++) { // ger en turn åt varje spelare
        //console.log(player_list[i][1][0].hp);
        (0, print_functions_1.print_board)();
        (0, general_functions_1.turn)(player_list[i]);
        //console.clear();
        console.log("------------------------------------------");
    }
}
