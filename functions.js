"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.spawn = exports.setup = exports.turn = exports.castle_owner = exports.move = exports.print_board = exports.attack = exports.getRandomInt = void 0;
var list_1 = require("./lib/list");
//Types
var prompt = require('prompt-sync')({ sigint: true }); // Denna påstår att det är error men det funkar ändå
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
    return false; // temp return
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
/**
 * Moves an army from one castle to another, attacking if it is an enemy castle
 * @param Move_from - The castle the army is being moved from
 * @param Move_to - The castle the army is being moved to
 * @param Soldiers - The army being moved from one castle to another
 * @returns void
 */
function move(Move_from, Move_to, Soldiers) {
}
exports.move = move;
/**
 * Changes the owner of a castle
 * @param Board - The game board where you can find the owner of the castle
 * @returns The updated board with the correct castle owners
 */
function castle_owner(Board) {
<<<<<<< HEAD
    return {
        adj: [[false]],
        size: 3
    };
=======
>>>>>>> c4b5c2b3c3fe6ce387fe9912c43fbffb9c6b10b5
}
exports.castle_owner = castle_owner;
/**
 * A players turn in game. Should be able to call multiple actions
 * Move and Attack.
 * Should Call other functions.
 * @param player is a pair(string, List)
 */
function turn(player) {
}
exports.turn = turn;
function setup() {
    var name_player1 = prompt("Enter player 1 name: ");
    var name_player2 = prompt("Enter player 2 name: ");
    var name_player3 = prompt("Enter player 3 name: ");
    var player1 = [name_player1, (0, list_1.list)()];
    var player2 = [name_player2, (0, list_1.list)()];
    var player3 = [name_player3, (0, list_1.list)()];
    return (0, list_1.list)(player1, player2, player3);
}
exports.setup = setup;
/**
 * Places soldiers in the starting castles
 * @param Board - The new game board
 */
function spawn(Board) {
}
exports.spawn = spawn;
