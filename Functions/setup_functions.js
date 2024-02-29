"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create_castles = exports.game_setup = exports.pick_player_name = exports.create_player = exports.starting_node = exports.get_castle_array = exports.create_army = exports.create_warrior = exports.create_castle = exports.mormors_kudde = void 0;
var general_functions_1 = require("./general_functions");
var list_1 = require("../lib/list");
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
function create_warrior(attack, health) {
    var name = (0, general_functions_1.get_first_warrior_name)();
    var warrior = { attack: attack, health: health, name: name, alive: true };
    return warrior;
}
exports.create_warrior = create_warrior;
/**
 * Creates a an array of warriors
 *
 * @returns
 */
function create_army() {
    var army = [create_warrior((0, general_functions_1.get_random_int)(3, 5), 70),
        create_warrior((0, general_functions_1.get_random_int)(3, 5), 70),
        create_warrior((0, general_functions_1.get_random_int)(3, 5), 70)];
    return army;
}
exports.create_army = create_army;
function get_castle_array() {
    return castles;
}
exports.get_castle_array = get_castle_array;
function amount_of_players() {
    var num_players = prompt("How many are playing?: ");
    return num_players;
}
function read_player_names(num) {
    var player_lst = (0, list_1.list)();
    if (1 <= num && num <= 3) {
        for (var n = 1; n < num; n++) {
            var name_player = prompt("Name: ");
        }
    }
}
function starting_node() {
}
exports.starting_node = starting_node;
/**
 * Creates a player, who is a pair whose head is a string and tail is an array of Castles.
 * @param name is a string
 * @param num_players is a number
 */
function create_player(name, node) {
    var player = [name, [(create_castle(create_army(), name, node))]]; // Siffran är NODE, får ej vara hårdkodad!
    return player;
}
exports.create_player = create_player;
function pick_player_name(name) {
    return name;
}
exports.pick_player_name = pick_player_name;
var p1 = "David";
var p2 = "Felix";
var p3 = "Alfred";
var ai_name_1 = "CPU1";
var ai_name_2 = "CPU2";
/**
 * Pick your King, and creates your army
 * @returns A complete setup of the game
 */
function game_setup() {
    var name_player1 = pick_player_name(p1);
    var name_player2 = pick_player_name(p2);
    var name_player3 = pick_player_name(p3);
    var cpu_name = pick_player_name(ai_name_1);
    var cpu_name2 = pick_player_name(ai_name_2);
    //const player1 : Player = [name_player1 , [(create_castle(create_army(), name_player1, 1))]];
    var player1 = create_player(name_player1, 1);
    var player2 = create_player(name_player2, 2);
    var player3 = create_player(name_player3, 5);
    //create_ai();
    //const AI1 : Player = ["CPU1",[create_castle(create_army(), "CPU1", 4)]]
    var AI1 = create_player(cpu_name, 4);
    var AI2 = create_player(cpu_name2, 3);
    //const AI2 : Player = ["CPU2",[create_castle(create_army(), "Cpu2", 3)]]
    //create_nodes();
    nodes[0] += name_player1[0];
    nodes[1] += name_player2[0];
    nodes[4] += name_player3[0];
    //create_castles();
    castles[0] = player1[1][0];
    castles[1] = player2[1][0];
    castles[4] = player3[1][0];
    //castles[2] = player1[1][1]!; // byt dessa ifall player1 har två castles
    castles[2] = AI2[1][0];
    castles[3] = AI1[1][0];
    //castles[3] = create_castle(create_army(), "AI", 3);
    return [player1, player2, player3, AI1, AI2];
}
exports.game_setup = game_setup;
function create_ai() {
}
/*
export function create_nodes(player_list : Array<Player>){
        for (let i = 0; i < player_list.length; i++) { // loop over the amount of players
            
            if (typeof(player_list[i][1][0]) == "undefined"){
                continue;
            } else {
                const cst_num = player_list[i][1][0]!.position; // gets the position of the castle
                nodes[cst_num-1] += player_list[i][0][0]; // adds the first letter to the nodes
            }

            
            
        }
}
*/
function create_castles() {
}
exports.create_castles = create_castles;
