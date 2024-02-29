"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clear_terminal = exports.format_array = exports.sleep = exports.print_line = exports.cursive_line = exports.empty_line = exports.print_to_game = exports.debug_log = void 0;
function debug_log(text) {
    console.log(text);
}
exports.debug_log = debug_log;
function print_to_game(text) {
    console.log(text);
}
exports.print_to_game = print_to_game;
function empty_line() {
    console.log();
}
exports.empty_line = empty_line;
function cursive_line() {
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
}
exports.cursive_line = cursive_line;
function print_line() {
    console.log("--------------------------------------------");
}
exports.print_line = print_line;
function sleep(ms) {
    return new Promise(function (resolve) { return setTimeout(resolve, ms); });
}
exports.sleep = sleep;
function format_array(a) {
    var str = "";
    for (var i = 0; i < a.length; i++) {
        if (!(i == a.length - 1)) { // the last element should not be followed by a comma.
            str += a[i] + ", ";
        }
        else {
            str += a[i]; // no comma at the end
        }
    }
    return str;
}
exports.format_array = format_array;
function clear_terminal() {
    console.log("\n    \n    \n    \n    \n    \n    \n    \n    \n    \n    \n\n\n    ");
}
exports.clear_terminal = clear_terminal;
