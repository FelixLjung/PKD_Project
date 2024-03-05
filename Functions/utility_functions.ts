// Imports

import {
    Castle,
    Player,
    Warrior } from "../types";


//Variables

const prompt = require('prompt-sync')({ sigint: true }); // Needed to handle inputs

const testing : Boolean = false; // set this to true if testing with jest, disables all empty promopts 

const debugging = false; // set this to false to quickly remove all debug console logs


//Functions

/**
 * Used to export the testing variable. When the testing variable is true we enter testing state,
 * Which disabels some prompts in tested functions.
 * @returns {Boolean} - Descides if we go into testing mode or not
 */
export function get_testing_bool() : Boolean {
    return testing;
}


/**
 * Prints a non gameplay related message to the console
 * @param {String | Array<T> | Number | Warrior | Castle | Player | undefined} text - What is being logged
 */
export function debug_log<T>(text : String | Array<T> | Number | Warrior | Castle | Player | undefined) {
    if (debugging){
        console.log(text);
    }
}


/**
 * Prints a gameplay related message or graphic 
 * @param {String | Array<T> | Number | Warrior | Castle | Player | undefine} text - What is being printed
 */
export function print_to_game<T>(text : String | Array<T> | Number | Warrior | Castle | Player | undefined) {
    console.log(text);
}


/**
 * Prints an empty line
 */
export function empty_line(){
    console.log();
}


/**
 * Prints a cursive line, in order to divide messages
 */
export function cursive_line() {
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
}


/**
 * prints a regular line
 */
export function print_line() {
    console.log("--------------------------------------------------------------");
}


/**
 * Changes an array into a string in order to change its appearance.
 * @param {Array<T>} a - An array that is supposed to be changed into a string
 * @returns {string} - The array turned into a string
 */
export function format_array<T>(a : Array<T>) : String {
    let str = "";

    for (let i = 0 ; i < a.length; i++){
        if (!(i == a.length - 1)){ // the last element should not be followed by a comma.
            str += a[i] + ", "  
        } else {
            str += a[i]; // no comma at the end
        }
        
    }

    return str;
}


/**
 * Stops the next step in the game until a player clicks enter
 */
export function press_to_continue(){
    if (!testing){
        prompt("\u001b[3m press ENTER to continue... \u001b[m ");
        empty_line();
        empty_line();
        empty_line();
        empty_line();
    }
}


/**
 * Prints empty lines, to clear the previous player's action.
 */
export function clear_terminal(){
    console.log(`
    
    
    
    
    
    
    
    














    `);
}


/**
 * Returns a random number between [min] and [max]
 * @param {number} min - Represents the lowest number on the die
 * @param {number} max - Represents the hightes number on the die
 * @returns {number} - A random number
 */
export function get_random_int(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min); 
}