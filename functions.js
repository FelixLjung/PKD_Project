"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.spawn = exports.setup = exports.turn = exports.castle_owner = exports.move = exports.print_board = exports.attack = exports.getRandomInt = void 0;
var list_1 = require("./lib/list");
//Types
var prompt1 = require('prompt-sync')({ sigint: true }); // Denna påstår att det är error men det funkar ändå
// Functions
/**
 * Chooses a random number between [min] and [max].
 * @param min is a number. Represents the lowest number on the die
 * @param max is a {number}. Represents the hightes number on the die
 * @returns a random number / integer.
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
exports.getRandomInt = getRandomInt;
/**
 * Take a player and an Attack Army, and if the
 * @param player is a pair(name:string, List<castle>)
 * @param army
 *
 * @returns Boolean, if you won the castle or not
 *
 */
function attack(player, A_Army) {
}
exports.attack = attack;
/**
 * Prints the board to the console
 * @param Array 2d array of the map
 * @return Does not return
 */
function print_board(board) {
    for (var i = 0; i < board.length; i++) { // funkar dåligt
        console.log(board[i].toString());
    }
}
exports.print_board = print_board;
function move() {
}
exports.move = move;
function castle_owner() {
}
exports.castle_owner = castle_owner;
function turn() {
}
exports.turn = turn;
/**
 * reads all the player names and creates players
 * @params no arguments
 * @returns does not return
 */
function setup() {
    var name_player1 = prompt("Enter player 1 name: ");
    var player1 = [name_player1, (0, list_1.list)()];
    return (0, list_1.list)(player1);
}
exports.setup = setup;
function spawn() {
}
exports.spawn = spawn;
