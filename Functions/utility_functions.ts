import { Castle, Player, Warrior } from "../types";


export function debug_log<T>(text : String | Array<T> | Number | Warrior | Castle | Player | undefined) {
    console.log(text);
}

export function print_to_game<T>(text : String | Array<T> | Number | Warrior | Castle | Player | undefined) {
    console.log(text);
}

export function empty_line(){
    console.log();
}

export function cursive_line() {
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
}


export function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


export function clear_terminal(){
    console.log(`
    
    
    
    
    
    
    
    
    
    


    `);

}