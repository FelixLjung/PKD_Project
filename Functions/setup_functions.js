"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_castle_array = exports.create_army = exports.create_warrior = exports.create_castle = exports.mormors_kudde = void 0;
var general_functions_1 = require("./general_functions");
// Variables
var prompt = require('prompt-sync')({ sigint: true }); // Krävs för att hantera inputs
var I = true;
var O = false;
exports.mormors_kudde = {
    size: 5,
    adj: [
        [O, I, I, I, O], //0. from A 
        [I, O, I, O, I], //1. from B
        [I, I, O, I, I], //2. from C
        [I, O, I, O, I], //3. from D
        [O, I, I, I, O], //4. from E
    ]
};
var castles = [];
// board
// start nodes
var node1 = "1";
var node2 = "2";
var node5 = "5";
//unclaimed nodes
var node3 = "3x";
var node4 = "4x";
var nodes = [node1, node2, node3, node4, node5];
var map = [
    [" ", " ", " ", " ", nodes[0], " ", " ", " ", " "],
    [" ", " ", "/", " ", "|", " ", "\\", " "],
    [" ", "/", " ", " ", "|", " ", " ", "\\"],
    [nodes[1], "-", "-", nodes[2], "-", "-", nodes[3]],
    [" ", "\\", " ", " ", "|", " ", " ", "/", " "],
    [" ", " ", "\\", " ", "|", " ", "/", "", " "],
    [" ", " ", " ", " ", nodes[4], " ", " ", " ", " "]
];
// Functions
/**
     * Creates a castle in setup phase
     * @param army
     * @param owner
     * @param position
     * @returns A castle
     */
function create_castle(army, owner, position) {
    var castle = { hp: army, owner: owner, position: position };
    return castle;
}
exports.create_castle = create_castle;
/**
 * Creates a warrior (dictionary) with name, attack damage and health
 * @returns a Warrior
 */
function create_warrior() {
    var name = (0, general_functions_1.get_name)();
    var warrior = { attack: 5, health: 100, name: name };
    return warrior;
}
exports.create_warrior = create_warrior;
/**
 * Creates a an array of warriors
 *
 * @returns
 */
function create_army() {
    var army = [create_warrior()];
    return army;
}
exports.create_army = create_army;
function get_castle_array() {
    return castles;
}
exports.get_castle_array = get_castle_array;
/**
 * Pick your King, and creates your army
 * @returns A complete setup of the game
 */
/*
export function setup(): Array<Player> {
    const name_player1 = prompt("Enter player 1 name: ");
    const name_player2 = prompt("Enter player 2 name: ");
    const name_player3 = prompt("Enter player 3 name: ");

    //const player1 : Player = [name_player1! , [(create_castle(create_army(), name_player1, 1))]];
    const player1: Player = [name_player1!, [(create_castle(create_army(), name_player1, 1)), (create_castle(create_army(), name_player1, 3))]];
    const player2: Player = [name_player2!, [(create_castle(create_army(), name_player2, 2))]];
    const player3: Player = [name_player3!, [(create_castle(create_army(), name_player3, 5))]];

    const AI1 : Player = ["CPU1",[create_castle(create_army(), "CPU1", 4)]]


    nodes[0] += name_player1[0];
    nodes[1] += name_player2[0];
    nodes[4] += name_player3[0];

    castles[0] = player1[1][0]!;
    castles[1] = player2[1][0]!;
    castles[4] = player3[1][0]!;
    castles[2] = player1[1][1]!;
    castles[3] = AI1[1][0]!;




    //castles[3] = create_castle(create_army(), "AI", 3);
    
    //const AI2 : Player = ["AI2",[create_castle(create_army(), "AI2", 3)]]
    

    return [player1, player2, player3];
}
*/
