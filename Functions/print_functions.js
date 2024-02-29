"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.print_army = exports.print_castle = exports.print_board = exports.refresh_board = void 0;
var setup_functions_1 = require("./setup_functions");
// Print functions 
// start nodes
var node1 = "1";
var node2 = "2";
var node5 = "5";
//unclaimed nodes
var node3 = "3x";
var node4 = "4x";
var nodes = [node1, node2, node3, node4, node5];
var map1 = [
    [" ", " ", " ", " ", nodes[0], " ", " ", " ", " "],
    [" ", " ", "/", " ", "|", " ", "\\", " "],
    [" ", "/", " ", " ", "|", " ", " ", "\\"],
    [nodes[1], "-", "-", nodes[2], "-", "-", nodes[3]],
    [" ", "\\", " ", " ", "|", " ", " ", "/", " "],
    [" ", " ", "\\", " ", "|", " ", "/", "", " "],
    [" ", " ", " ", " ", nodes[4], " ", " ", " ", " "]
];
var map_player_3 = [
    [" ", " ", " ", " ", " ", " ", " ", " ", node3, " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", "|", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", "|", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", node4, " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", "|", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", "|", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", node4, " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", "/", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", "/", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", node4, "-", "-", node4, "-", node4, "-", node4, "-", , "-", node4, " ", " ", " "],
    [" ", " ", "/", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "\\", " ", " "],
    [" ", "/", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "\\", " "],
    [node1, " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", node2],
];
var map = map1;
function refresh_board() {
    function get_castle_owners() {
        var castles = (0, setup_functions_1.get_castle_array)();
        for (var i = 0; i < nodes.length; i++) {
            nodes[i] = castles[i].position + castles[i].owner[0];
        }
    }
    /*
    node1 = ((castles[0].position) as number) + castles[0].owner[0];
    node1 = ((castles[0].position) as number) + castles[0].owner[0];
    node1 = ((castles[0].position) as number) + castles[0].owner[0];
    node1 = ((castles[0].position) as number) + castles[0].owner[0];
    node1 = ((castles[0].position) as number) + castles[0].owner[0];
    */
    get_castle_owners();
    map = [
        [" ", " ", " ", " ", nodes[0], " ", " ", " ", " "],
        [" ", " ", "/", " ", "|", " ", "\\", " "],
        [" ", "/", " ", " ", "|", " ", " ", "\\"],
        [nodes[1], "-", "-", nodes[2], "-", "-", nodes[3]],
        [" ", "\\", " ", " ", "|", " ", " ", "/", " "],
        [" ", " ", "\\", " ", "|", " ", "/", "", " "],
        [" ", " ", " ", " ", nodes[4], " ", " ", " ", " "]
    ];
    /*
    map = [
        [" ", " ", " ", " ", " "," "," ", " ", node3, " ", " "," "," ", " ", " ", " ", " "," "],
        [" ", " ", " ", " ", " "," "," ", " ", "|", " ", " "," "," ", " ", " ", " ", " "," "],
        [" ", " ", " ", " ", " "," "," ", " ", "|", " ", " "," "," ", " ", " ", " ", " "," "],
        [" ", " ", " ", " ", " "," "," ", " ", node4, " ", " "," "," ", " ", " ", " ", " "," "],
        [" ", " ", " ", " ", " "," "," ", " ", "|", " ", " "," "," ", " ", " ", " ", " "," "],
        [" ", " ", " ", " ", " "," "," ", " ", "|", " ", " "," "," ", " ", " ", " ", " "," "],
        [" ", " ", " ", " ", " "," "," ", " ", node4, " ", " "," "," ", " ", " ", " ", " "," "],
        [" ", " ", " ", " ", " "," "," ", "/", " ", " ", " "," "," ", " ", " ", " ", " "," "],
        [" ", " ", " ", " ", " "," ","/", " ", " ", " ", " "," "," ", " ", " ", " ", " "," "],
        [" ", " ", " ", " ", " "," "," ", " ", " ", " ", " "," "," ", " ", " ", " ", " "," "],
        [" ", " ", " ", " ", " "," "," ", " ", " ", " ", " "," "," ", " ", " ", " ", " "," "],
        [" ", " ", " ", " ", " "," "," ", " ", " ", " ", " "," "," ", " ", " ", " ", " "," "],
        [" ", " ", " ", " ", " "," "," ", " ", " ", " ", " "," "," ", " ", " ", " ", " "," "],
        [" ", " ", " ", " ", " "," "," ", " ", " ", " ", " "," "," ", " ", " ", " ", " "," "],
        [" ", " ", " ", " ", " "," "," ", " ", " ", " ", " "," "," ", " ", " ", " ", " "," "],
        [" ", " ", " ", node4, "-","-",node4, "-", node4,"-",node4, "-", , "-", node4, " ", " "," "],
        [" ", " ", "/", " ", " ","         "," ", " ", " ", " ", " "," "," ", " ", "          ", "\\", " "," "],
        [" ", "/", " ", "         ", " "," "," ", " ", " ", " ", " "," "," ", " ", "           ", " ", "\\"," "],
        [node1, "  ", "  ", "  ", "  ","  ","  ", "  ", "  ", "  ", " "," "," ", " ", "         ", " ", " ",node2],
    
    
       
    ];
 */
}
exports.refresh_board = refresh_board;
/**
 * Prints the board to the console
 * @param Array 2d array of the map
 * @return Does not return
 */
function print_board() {
    refresh_board();
    console.log("-------------------------------------------");
    for (var i = 0; i < map.length; i++) {
        console.log('\x1b[36m%s\x1b[0m', helper(map[i])); // black magic, Cyan Color
    }
    function helper(line) {
        var str = "";
        for (var j = 0; j < line.length; j++) {
            str += line[j];
        }
        return str;
    }
    console.log("-------------------------------------------");
}
exports.print_board = print_board;
/**
 * Gets an array of all the castles the player currently control.
 * @param player the player in question.
 * @returns Array<castle | undefined> of the castles
 */
function print_castle(player) {
    var _a;
    var castles = player[1];
    var print = "";
    //console.log(castles);
    for (var i = 0; i < castles.length; i = i + 1) {
        if (castles[i] != undefined) {
            print += (_a = castles[i]) === null || _a === void 0 ? void 0 : _a.position;
            print += " ";
        }
    }
    console.log(print);
    console.log('\x1b[36m%s\x1b[0m', "You rule over the following castles: ", print, '\x1b[37m\x1b');
}
exports.print_castle = print_castle;
function print_army(castle) {
    console.log();
    console.log('This is the army in this castle, my liege');
    console.log();
    for (var i = 0; i < castle.hp.length; i++) {
        if (castle.hp[i] != undefined && castle.hp[i].alive == true) {
            console.log('Soldier name:', castle.hp[i].name, '| Attack strength:', castle.hp[i].attack, '| Health:', castle.hp[i].health);
        }
    }
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
    console.log();
}
exports.print_army = print_army;
