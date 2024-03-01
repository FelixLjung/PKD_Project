// Imports
import { Castle, Player, Warrior } from "../types";

//Variables
const prompt = require('prompt-sync')({ sigint: true }); // Krävs för att hantera inputs

const testing : Boolean = true;


//Functions

/**
 * Debug log function
 * @param text 
 */
export function debug_log<T>(text : String | Array<T> | Number | Warrior | Castle | Player | undefined) {
    console.log(text);
}

/**
 * Print function
 * @param text 
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
 * Prints a cursive line
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
 * 
 * @param ms 
 * @returns 
 */
export function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


/**
 * 
 * @param a 
 * @returns 
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
 * 
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