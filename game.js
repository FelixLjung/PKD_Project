"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.kill_player = exports.get_player_list = exports.a_player_list = void 0;
var general_functions_1 = require("./Functions/general_functions");
var setup_functions_1 = require("./Functions/setup_functions");
var print_functions_1 = require("./Functions/print_functions");
var utility_functions_1 = require("./Functions/utility_functions");
var prompt = require('prompt-sync')({ sigint: true }); // Krävs för att hantera inputs
//console.log("GAME.ts")
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
var player_list = [];
/**
 * Changes an array of players through the game_setup function. Used in the beginning of the game
 * @param player_array - an array of players that is getting updated
 * @returns - the updated array of players
 */
function a_player_list(player_array) {
    player_array = (0, setup_functions_1.game_setup)();
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
exports.a_player_list = a_player_list;
function get_player_list() {
    return player_list;
}
exports.get_player_list = get_player_list;
/**
 * Removes a player without any castles, meaning they have been killed
 * @param player - the player that has been killed
 */
function kill_player(player) {
    (0, utility_functions_1.print_to_game)(player[0] + " has fallen");
    for (var i = 0; i < player_list.length; i++) {
        if (player_list[i][0] == player[0]) {
            player_list[i][0] = "UNDEFINED";
        }
    }
}
exports.kill_player = kill_player;
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
/**
 * The function running the game.
 */
function game() {
    console.clear();
    player_list = a_player_list(player_list);
    while (game_running) {
        //print_board();
        //console.clear()
        console.log();
        console.log();
        (0, print_functions_1.refresh_board)();
        for (var i = 0; i < player_list.length; i++) { // ger en turn åt varje spelare
            //console.log(player_list[i][1][0].hp);
            //print_board();
            if ((0, general_functions_1.count_castles)(player_list[i][1]) == 0) { // Checks if player has 0 castles, SKIP
                continue;
            }
            console.log("\u001B[36m", player_list[i][0], "\u001B[37m", "turn");
            if ((0, general_functions_1.check_if_cpu)(player_list[i])) { // if it's CPU's turn, do nothing
            }
            else { // If it's a player's turn
                (0, general_functions_1.turn)(player_list[i]);
                prompt("Your turn is finished");
            }
            if ((0, general_functions_1.count_castles)(player_list[i][1]) == 5) {
                console.log('Congratulations', player_list[i], '! You now rule the entire kingdom!');
                game_running = false;
            }
            //console.clear();
            console.log("------------------------");
        }
        if (game_running == true) {
            for (var i = 0; i < (0, setup_functions_1.get_castle_array)().length; i++) {
                var curr_castle = (0, setup_functions_1.get_castle_array)()[i];
                var index = curr_castle.hp.length;
                if (!(0, general_functions_1.check_if_cpu)((0, setup_functions_1.get_castle_array)()[i].owner)) {
                    (0, general_functions_1.recruit_warrior)(curr_castle, index); //recruits one warrior to each castle.
                }
            }
            console.log("All castles recruits a new warrior!");
        }
    }
}
game();
