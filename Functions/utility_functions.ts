// Imports
import { 
    Castle,
    Player,
    Warrior } from "../types";

//Variables
const prompt = require('prompt-sync')({ sigint: true }); // Krävs för att hantera inputs

const testing : Boolean = false; // set this to true if testing with jest, disables all empty promopts 



const debugging = true; // set this to false to quickly remove all debug console logs

/**
 * Used to export the testing variable. When the testing variable is true we enter testing state,
 * which disabels some prompts in tested functions.
 * @returns Boolean - descides if we go into testing mode or not
 */
export function get_testing_bool() : Boolean {
    return testing;
}

//Functions

/**
 * prints a non gameplay related message to the console
 * @param text - what is being logged
 */
export function debug_log<T>(text : String | Array<T> | Number | Warrior | Castle | Player | undefined) {
    if (debugging){
        console.log(text);
    }
    
}

/**
 * Prints a gameplay related message or graphic 
 * @param text - what is being printed
 */
export function print_to_game<T>(text : String | Array<T> | Number | Warrior | Castle | Player | undefined) {
    console.log(text);
}

/**
 * prints an empty line
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
 * @param a - an array that is supposed to be changed into a string
 * @returns string - the array turned into a string
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
    }
}

/**
 * prints empty lines, to clear the previous player's action.
 */
export function clear_terminal(){
    console.log(`
    
    
    
    
    
    
    
    










    `);
}


/**
 * Returns a random number between [min] and [max].
 * @param min is a number. Represents the lowest number on the die
 * @param max is a {number}. Represents the hightes number on the die
 * @returns a random number / integer.
 */
export function get_random_int(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min); 
}