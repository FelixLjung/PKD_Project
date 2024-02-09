"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var functions_1 = require("./functions");
var map = [["", "", "", "0", "", "", ""],
    ["", "", "", "l", "", "", ""],
    ["", "", "", "l", "", "", ""],
    ["0", "-", "-", "0", "-", "-", "0"],
    ["", "'s'", "", "l", "", "'/'", ""],
    ["", "", "'s'", "l", "'/'", "", ""],
    ["", "", "", "0", "", "", ""]];
var game_running = true;
(0, functions_1.print_board)(map);
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
var player_list = (0, functions_1.setup)();
console.log(player_list);
// The game loop
while (game_running) {
    continue;
}
