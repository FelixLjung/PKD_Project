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
export function print_line() {
    console.log("--------------------------------------------");
}


export function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

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


export function clear_terminal(){
    console.log(`
    
    
    
    
    
    
    
    






    

    `);

}