"use strict";
// Imports
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_random_int = exports.clear_terminal = exports.press_to_continue = exports.format_array = exports.print_line = exports.cursive_line = exports.empty_line = exports.print_to_game = exports.debug_log = exports.get_testing_bool = void 0;
//Variables
var prompt = require('prompt-sync')({ sigint: true }); // Needed to handle inputs
var testing = false; // set this to true if testing with jest, disables all empty promopts 
var debugging = true; // set this to false to quickly remove all debug console logs
//Functions
/**
 * Used to export the testing variable. When the testing variable is true we enter testing state,
 * Which disabels some prompts in tested functions.
 * @returns {Boolean} - Descides if we go into testing mode or not
 */
function get_testing_bool() {
    return testing;
}
exports.get_testing_bool = get_testing_bool;
/**
 * Prints a non gameplay related message to the console
 * @param {String | Array<T> | Number | Warrior | Castle | Player | undefined} text - What is being logged
 */
function debug_log(text) {
    if (debugging) {
        console.log(text);
    }
}
exports.debug_log = debug_log;
/**
 * Prints a gameplay related message or graphic
 * @param {String | Array<T> | Number | Warrior | Castle | Player | undefine} text - What is being printed
 */
function print_to_game(text) {
    console.log(text);
}
exports.print_to_game = print_to_game;
/**
 * Prints an empty line
 */
function empty_line() {
    console.log();
}
exports.empty_line = empty_line;
/**
 * Prints a cursive line, in order to divide messages
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
 * Changes an array into a string in order to change its appearance.
 * @param {Array<T>} a - An array that is supposed to be changed into a string
 * @returns {string} - The array turned into a string
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
 * Stops the next step in the game until a player clicks enter
 */
function press_to_continue() {
    if (!testing) {
        prompt("\u001b[3m press ENTER to continue... \u001b[m ");
    }
}
exports.press_to_continue = press_to_continue;
/**
 * Prints empty lines, to clear the previous player's action.
 */
function clear_terminal() {
    console.log("\n    \n    \n    \n    \n    \n    \n    \n    \n\n\n\n\n\n\n\n\n\n\n\n\n\n    \n    ");
}
exports.clear_terminal = clear_terminal;
/**
 * Returns a random number between [min] and [max]
 * @param {number} min - Represents the lowest number on the die
 * @param {number} max - Represents the hightes number on the die
 * @returns {number} - A random number
 */
function get_random_int(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
exports.get_random_int = get_random_int;
