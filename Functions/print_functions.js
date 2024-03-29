"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.print_army = exports.print_castle = exports.print_board = exports.refresh_board = exports.splash_end = exports.splash = void 0;
var setup_functions_1 = require("./setup_functions");
var utility_functions_1 = require("./utility_functions");
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
function splash() {
    console.log("\n                                                       By\n                                                  David Julin\n                                                  Felix Ljung\n                                                Alfred Enoksson \n    ____    __    ___                                                                            ____    __    ___   \n   [____]__[__]__[___]                                                                          [____]__[__]__[___] \n    [_I_]__\u9763__[_I_]                                                                             [_I_]__\u9763__[_I_]\n    [_I_]_\u21F1\u21F2__[_I_] \u2588\u2588\u2588    \u2588\u2588  \u2588\u2588\u2588\u2588\u2588\u2588  \u2588\u2588\u2588\u2588\u2588\u2588  \u2588\u2588\u2588\u2588\u2588\u2588\u2588     \u2588\u2588   \u2588\u2588 \u2588\u2588 \u2588\u2588\u2588    \u2588\u2588  \u2588\u2588\u2588\u2588\u2588\u2588  \u2588\u2588\u2588\u2588\u2588\u2588\u2588 [__I_]_\u21F1\u21F2__[_I_]   \n    [_I_]_\u21F1\u21F2__[_I_] \u2588\u2588\u2588\u2588   \u2588\u2588 \u2588\u2588    \u2588\u2588 \u2588\u2588   \u2588\u2588 \u2588\u2588          \u2588\u2588  \u2588\u2588  \u2588\u2588 \u2588\u2588\u2588\u2588   \u2588\u2588 \u2588\u2588       \u2588\u2588      [__I_]_\u21F1\u21F2__[_I_]\n    [_I_]_\u21F1\u21F2__[_I_] \u2588\u2588 \u2588\u2588  \u2588\u2588 \u2588\u2588    \u2588\u2588 \u2588\u2588   \u2588\u2588 \u2588\u2588\u2588\u2588\u2588       \u2588\u2588\u2588\u2588\u2588   \u2588\u2588 \u2588\u2588 \u2588\u2588  \u2588\u2588 \u2588\u2588   \u2588\u2588\u2588 \u2588\u2588\u2588\u2588\u2588\u2588\u2588 [__I_]_\u21F1\u21F2__[_I_]\n    [_I_]_\u21F1\u21F2__[_I_] \u2588\u2588  \u2588\u2588 \u2588\u2588 \u2588\u2588    \u2588\u2588 \u2588\u2588   \u2588\u2588 \u2588\u2588          \u2588\u2588  \u2588\u2588  \u2588\u2588 \u2588\u2588  \u2588\u2588 \u2588\u2588 \u2588\u2588    \u2588\u2588      \u2588\u2588 [__I_]_\u21F1\u21F2__[_I_]  \n    [_I_]_\u21F1\u21F2__[_I_] \u2588\u2588   \u2588\u2588\u2588\u2588  \u2588\u2588\u2588\u2588\u2588\u2588  \u2588\u2588\u2588\u2588\u2588\u2588  \u2588\u2588\u2588\u2588\u2588\u2588\u2588     \u2588\u2588   \u2588\u2588 \u2588\u2588 \u2588\u2588   \u2588\u2588\u2588\u2588  \u2588\u2588\u2588\u2588\u2588\u2588  \u2588\u2588\u2588\u2588\u2588\u2588\u2588 [__I_]_\u21F1\u21F2__[_I_]  \n    [_I_]_|\uD81A\uDD05|__[_I_]   ________________________________________________________________________  [_I_]_|\uD81A\uDD05|__[_I_]                                                                     \n\n    \n    ");
}
exports.splash = splash;
function splash_end(winner) {
    console.log("\n                    _\n                   |\u2963| \n    _______    _   |\u296F|\n   /_-_W_-_|  |+|  |\u296F|       __________________________________________________\n           | _<=>_ |\u296F|       \u001B[31m".concat(winner[0], " The Counqueror\u001B[37m Rules The Entire Kingdom!\n           0/  V   o=o                           \u001B[33mGAME OVER\u001B[37m\n            V| ^ |V 0\n           | |_^_|\n           | || ||\n         __|_d|_|b____\n\n    "));
}
exports.splash_end = splash_end;
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
    (0, utility_functions_1.print_line)();
    for (var i = 0; i < map.length; i++) {
        console.log('\x1b[36m%s\x1b[0m', helper(map[i])); // black magic, Cyan Color
    }
    function helper(line) {
        var str = "";
        for (var j = 0; j < line.length; j++) { // Color the Players differently on the MAP
            if (is_string_arr(line[j])) {
                if (line[j][1] == "D") {
                    str += "\u001b[31m" + line[j] + "\u001b[36m";
                }
                else if (line[j][1] == "F") {
                    str += "\u001b[32m" + line[j] + "\u001b[36m";
                }
                else if (line[j][1] == "A") {
                    str += "\u001b[33m" + line[j] + "\u001b[36m";
                }
                else if (line[j][1] == "C") {
                    str += "\u001b[37m" + line[j] + "\u001b[36m";
                }
            }
            else {
                str += line[j];
            }
        }
        return str;
    }
    (0, utility_functions_1.print_line)();
}
exports.print_board = print_board;
/**
 * When printing the map, checks if we find an array, (if length of string is > 1)
 * @param map
 * @returns
 */
function is_string_arr(map) {
    if (map.length == 2) {
        return true;
    }
    return false;
}
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
    print_board();
}
exports.print_castle = print_castle;
function print_army(castle) {
    (0, utility_functions_1.empty_line)();
    (0, utility_functions_1.print_to_game)('This is the army in this castle, my liege');
    (0, utility_functions_1.cursive_line)();
    for (var i = 0; i < castle.hp.length; i++) {
        if (castle.hp[i] != undefined && castle.hp[i].alive == true) {
            console.log('Soldier name:', castle.hp[i].name, '| Attack strength:', castle.hp[i].attack, '| Health:', castle.hp[i].health);
        }
    }
    (0, utility_functions_1.cursive_line)();
    (0, utility_functions_1.empty_line)();
}
exports.print_army = print_army;
