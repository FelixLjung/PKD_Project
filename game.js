"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.kill_player = exports.get_player_list = exports.a_player_list = void 0;
exports.kill_player = exports.get_player_list = exports.a_player_list = void 0;
var general_functions_1 = require("./Functions/general_functions");
var setup_functions_1 = require("./Functions/setup_functions");
var print_functions_1 = require("./Functions/print_functions");
//console.log("GAME.ts")
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
        console.log("in game.ts inside get_player_list");
        node1 += player_array[0][0][0];
        node2 += player_array[1][0][0];
        node5 += player_array[2][0][0];
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
    console.log("!");
    for (var i = 0; i < player_list.length; i++) {
        if (player_list[i][0] == player[0]) {
            player_list[i][0] = "UNDEFINED";
        }
    }
}
exports.kill_player = kill_player;
var player_list = [];
/**
 * Changes an array of players through the game_setup function. Used in the beginning of the game
 * @param player_array - an array of players that is getting updated
 * @returns - the updated array of players
 */
function a_player_list(player_array) {
    player_array = (0, setup_functions_1.game_setup)();
    function helper() {
        console.log("in game.ts inside get_player_list");
        node1 += player_array[0][0][0];
        node2 += player_array[1][0][0];
        node5 += player_array[2][0][0];
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
    console.log("!");
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
    a_player_list(player_list);
    //console.log("Wtf i game");
    while (game_running) {
        //print_board();
        (0, print_functions_1.refresh_board)();
        for (var i = 0; i < player_list.length; i++) { // ger en turn åt varje spelare
            //console.log(player_list[i][1][0].hp);
            (0, print_functions_1.print_board)();
            if ((0, general_functions_1.count_castles)(player_list[i][1]) == 0) {
                continue;
            }
            console.log(player_list[i][0], "turn");
            if ((0, general_functions_1.check_if_cpu)(player_list[i])) {
            }
            else {
                (0, general_functions_1.turn)(player_list[i]);
            }
            if ((0, general_functions_1.count_castles)(player_list[i][1]) == 5) {
                console.log('Congratulations', player_list[i], '! You now rule the entire kingdom!');
                game_running = false;
            }
            //console.clear();
            console.log("------------------------------------------");
        }
        if (game_running == true) {
            for (var i = 0; i < (0, setup_functions_1.get_castle_array)().length; i++) {
                if (!(0, general_functions_1.check_if_cpu)((0, setup_functions_1.get_castle_array)()[i].owner)) {
                    console.log("All castles recruits a new warrior!");
                    (0, general_functions_1.recruit_warrior)((0, setup_functions_1.get_castle_array)()[i]);
                }
            }
        }
/**
 * The function running the game.
 */
function game() {
    player_list = a_player_list(player_list);
    while (game_running) {
        //print_board();
        (0, print_functions_1.refresh_board)();
        for (var i = 0; i < player_list.length; i++) { // ger en turn åt varje spelare
            //console.log(player_list[i][1][0].hp);
            (0, print_functions_1.print_board)();
            if ((0, general_functions_1.count_castles)(player_list[i][1]) == 0) {
                continue;
            }
            console.log(player_list[i][0], "turn");
            if ((0, general_functions_1.check_if_cpu)(player_list[i])) {
            }
            else {
                (0, general_functions_1.turn)(player_list[i]);
            }
            if ((0, general_functions_1.count_castles)(player_list[i][1]) == 5) {
                console.log('Congratulations', player_list[i], '! You now rule the entire kingdom!');
                game_running = false;
            }
            //console.clear();
            console.log("------------------------------------------");
        }
        if (game_running == true) {
            for (var i = 0; i < (0, setup_functions_1.get_castle_array)().length; i++) {
                if (!(0, general_functions_1.check_if_cpu)((0, setup_functions_1.get_castle_array)()[i].owner)) {
                    console.log("All castles recruits a new warrior!");
                    (0, general_functions_1.recruit_warrior)((0, setup_functions_1.get_castle_array)()[i]);
                }
            }
        }
    }
}
//game();
game();
