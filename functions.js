"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.spawn = exports.setup = exports.create_warrior = exports.create_army = exports.create_castle = exports.turn = exports.castle_owner = exports.move = exports.finds_paths = exports.get_castles = exports.print_board = exports.attack = exports.getRandomInt = void 0;
var list_1 = require("./lib/list");
var queue_array_1 = require("./lib/queue_array");
var w_names = [0, 2, ["Eva Darulova", // Current: 18 warrrior-names
        "Jingwei",
        "Johannes Borgström",
        "Carl Erik IV",
        "Runar Stenbock",
        "Sigvard Bjelkengren",
        "Ernst Greve",
        "Hjalmar Storfot",
        "Lillemor Hoppetoss",
        "Gustav Backlund",
        "Hans Hansson III",
        "Frans Storm",
        "Berit Storm",
        "Tor Hoppetoss II",
        "Fred von Pickelroy",
        "Björn Olmedo",
        "Jimmy Viking",
        "Thom Surströmming",
        "Dadel kungen"]];
//Types
var prompt = require('prompt-sync')({ sigint: true }); // Denna påstår ibland att det är error men det funkar ändå
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
    for (var i = 0; i < board.length; i++) {
        console.log('\x1b[36m%s\x1b[0m', helper(board[i])); // black magic 
    }
    function helper(line) {
        var str = "";
        for (var j = 0; j < line.length; j++) {
            str += line[j];
        }
        return str;
    }
}
exports.print_board = print_board;
function get_castles(player) {
    return player[1];
}
exports.get_castles = get_castles;
function finds_paths(castle) {
    var position = castle.position;
}
exports.finds_paths = finds_paths;
/**
 * Moves an army from one castle to another, attacking if it is an enemy castle
 * @param Move_from - The castle the army is being moved from
 * @param Move_to - The castle the army is being moved to
 * @param Soldiers - The army being moved from one castle to another
 * @returns void
 */
function move(Move_from, Move_to, Soldiers) {
    if () {
    }
    console.log("Where would you like to move?");
    var choice = prompt("");
}
exports.move = move;
/**
 * Changes the owner of a castle
 * @param Board - The game board where you can find the owner of the castle
 * @returns The updated board with the correct castle owners
 */
function castle_owner(Board) {
    return {
        adj: [[false]],
        size: 3
    };
}
exports.castle_owner = castle_owner;
/**
 * A players turn in game. Should be able to call multiple actions
 * Move and Attack.
 * Should Call other functions.
 * @param player is a pair(string, List)
 */
function turn(player) {
    console.log("You rule over the following castles: ", player[1]);
    console.log("What is your command, king ", player[0], "..?");
    var choice = prompt("1 : Move Army  \n  2: Train Army ");
    if (choice === "1") {
        console.log("You are moving");
        //finds_paths();
    }
    else if (choice === "2") {
        console.log("You are training");
    }
}
exports.turn = turn;
function create_castle(army, owner, position) {
    var castle = { hp: army, owner: owner, position: position };
    return castle;
}
exports.create_castle = create_castle;
/**
 * Creates a an array of warriors       Funkar?
 *
 * @returns
 */
function create_army() {
    var army = [create_warrior()];
    return army;
}
exports.create_army = create_army;
/**
 * Creates a warrior (dictionary) with name, attack damage and health   Funkar?
 * @returns a Warrior
 */
function create_warrior() {
    var name = get_name();
    var warrior = { attack: 5, health: 10, name: name };
    return warrior;
}
exports.create_warrior = create_warrior;
/**
 * Warrior gets a name from queue       Funkar?
 * @returns string
 */
function get_name() {
    var name = (0, queue_array_1.head)(w_names);
    (0, queue_array_1.dequeue)(w_names);
    return name;
}
/**
 * Player Creation
 * @returns
 */
function setup() {
    var name_player1 = prompt("Enter player 1 name: ");
    var name_player2 = prompt("Enter player 2 name: ");
    var name_player3 = prompt("Enter player 3 name: ");
    var player1 = [name_player1, (0, list_1.list)(create_castle(create_army(), name_player1, 0))];
    var player2 = [name_player2, (0, list_1.list)(create_castle(create_army(), name_player2, 1))];
    var player3 = [name_player3, (0, list_1.list)(create_castle(create_army(), name_player3, 2))];
    return [player1, player2, player3];
}
exports.setup = setup;
/**
 * Places soldiers in the starting castles
 * @param board - The new game board
 * @param position - The index of the castle
 *
 */
function spawn(Board) {
    // denna kanske inte behövs
}
exports.spawn = spawn;
