"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clear_terminal = exports.press_to_continue = exports.format_array = exports.sleep = exports.print_line = exports.cursive_line = exports.empty_line = exports.print_to_game = exports.debug_log = void 0;
//Variables
var prompt = require('prompt-sync')({ sigint: true }); // Krävs för att hantera inputs
var testing = false;
//Functions
/**
 * Debug log function
 * @param text
 */
function debug_log(text) {
    console.log(text);
}
exports.debug_log = debug_log;
/**
 * Print function
 * @param text
 */
function print_to_game(text) {
    console.log(text);
}
exports.print_to_game = print_to_game;
/**
 * prints an empty line
 */
function empty_line() {
    console.log();
}
exports.empty_line = empty_line;
/**
 * Prints a cursive line
 */
function cursive_line() {
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
}
exports.cursive_line = cursive_line;
/**
 * prints a regular line
 */
function print_line() {
    console.log("--------------------------------------------------------------");
}
exports.print_line = print_line;
/**
 *
 * @param ms
 * @returns
 */
function sleep(ms) {
    return new Promise(function (resolve) { return setTimeout(resolve, ms); });
}
exports.sleep = sleep;
/**
 *
 * @param a
 * @returns
 */
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
/**
 *
 */
function press_to_continue() {
    if (!testing) {
        prompt("\u001b[3m press ENTER to continue... \u001b[m ");
    }
}
exports.press_to_continue = press_to_continue;
/**
 * prints empty lines, to clear the previous player's action.
 */
function clear_terminal() {
    console.log("\n    \n    \n    \n    \n    \n    \n    \n    \n\n\n\n\n\n\n\n\n    ");
}
exports.clear_terminal = clear_terminal;
