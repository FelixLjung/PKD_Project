// Imports

import{
    type Player, 
    type Castle } from '../types';

import { 
    get_castle_array,
    get_nodes,
    get_player_names } from './setup_functions';

import { 
    cursive_line,
    empty_line,
    print_line,
    print_to_game } from './utility_functions';


// Variables

// Nodes
let node1 = "1";
let node2 = "2";
let node4 = "4";
let node3 = "3";
let node5 = "5";

let nodes = get_nodes();

let map1 = [
    [" ", " ", " ", " ", nodes[0], " ", " ", " ", " "],
    [" ", " ", "/", " ", "|", " ", "\\", " "],
    [" ", "/", " ", " ", "|", " ", " ", "\\"],
    [nodes[1], "-", "-", nodes[2], "-", "-", nodes[3]],
    [" ", "\\", " ", " ", "|", " ", " ", "/", " "],
    [" ", " ", "\\", " ", "|", " ", "/", "", " "],
    [" ", " ", " ", " ", nodes[4], " ", " ", " ", " "]
];


let map = map1; // if their are other maps

// Print functions 

/**
 * Prints intro splash screen
 */
export function splash(){
    console.log(`
                                                       By
                                                  David Julin
                                                  Felix Ljung
                                                Alfred Enoksson 
    ____    __    ___                                                                            ____    __    ___   
   [____]__[__]__[___]                                                                          [____]__[__]__[___] 
    [_I_]__靣__[_I_]                                                                             [_I_]__靣__[_I_]
    [_I_]_⇱⇲__[_I_] ███    ██  ██████  ██████  ███████     ██   ██ ██ ███    ██  ██████  ███████ [__I_]_⇱⇲__[_I_]   
    [_I_]_⇱⇲__[_I_] ████   ██ ██    ██ ██   ██ ██          ██  ██  ██ ████   ██ ██       ██      [__I_]_⇱⇲__[_I_]
    [_I_]_⇱⇲__[_I_] ██ ██  ██ ██    ██ ██   ██ █████       █████   ██ ██ ██  ██ ██   ███ ███████ [__I_]_⇱⇲__[_I_]
    [_I_]_⇱⇲__[_I_] ██  ██ ██ ██    ██ ██   ██ ██          ██  ██  ██ ██  ██ ██ ██    ██      ██ [__I_]_⇱⇲__[_I_]  
    [_I_]_⇱⇲__[_I_] ██   ████  ██████  ██████  ███████     ██   ██ ██ ██   ████  ██████  ███████ [__I_]_⇱⇲__[_I_]  
    [_I_]_|𖤅|__[_I_]   ________________________________________________________________________  [_I_]_|𖤅|__[_I_]                                                                     

    
    `)
}

/**
 * Prints a win splash screen with the winners name.
 * @param winner the player won
 */
export function splash_end(winner: Player){
    console.log(
`
                    _
                   |⥣| 
    _______    _   |⥯|
   /_-_W_-_|  |+|  |⥯|       __________________________________________________
           | _<=>_ |⥯|       \u001b[31m${winner[0]}\u001b[37m Has Conquered The Entire World!
           0/  V   o=o                           \u001b[33mGAME OVER\u001b[37m
            V| ^ |V 0
           | |_^_|
           | || ||
         __|_d|_|b____

    `)                         
  
}

export function refresh_board() {
    nodes = get_nodes();
    let fist_letters = get_player_names();
    /**
     * Helper function for changing the nodes to their corresponding owner
     * 
     */
    function get_castle_owners(){
        let castles = get_castle_array(); 
        for (let i = 0; i < nodes.length; i++ ){
            nodes[i] = castles[i].position + castles[i].owner[0]; // change
        }

        
    }

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
    

}



/**
 * Prints the board to the console
 * @param Array 2d array of the map
 * @return Does not return
 */
export function print_board() {
    refresh_board(); // refreshes the board before displaying
    print_line();

    let first_letters = get_player_names(); // gets the first letters 

    for (let i = 0; i < map.length; i++) {
        console.log('\x1b[36m%s\x1b[0m', helper(map[i])); // prints the map with ANSI colour
    }

    /**
     * helper function for processing one line of the board
     * @param line 
     * @returns 
     */
    function helper(line: Array<string>) {
        let str = "";

        for (let j = 0; j < line.length; j++) {     // Colour the Players differently on the MAP
            if(is_string_arr(line[j])){
                if(line[j][1] == "C"){ // The CPU colour. 
                    str += "\u001b[37m" + line[j] + "\u001b[36m"; 
                } else if(line[j][1] == first_letters[0] ){ //  Depending on the first letter of the player
                    str += "\u001b[32m" + line[j] + "\u001b[36m"; // we change the colour of the text   
                } else if(line[j][1] == first_letters[2]){
                    str += "\u001b[33m" + line[j] + "\u001b[36m";
                } else if(line[j][1] == first_letters[1]){
                    str += "\u001b[35m" + line[j] + "\u001b[36m";
                } else if(line[j][1] == first_letters[3]){
                    str += "\u001b[34m" + line[j] + "\u001b[36m";
                } else if(line[j][1] == first_letters[4]){
                    str += "\u001b[31m" + line[j] + "\u001b[36m";
                }
            }else{
                str += line[j];
            }
        }
        return str;
    }
    print_line();
}

/**
 * When printing the map, checks if we find an array, (if length of string is > 1)
 * @param map 
 * @returns 
 */
function is_string_arr(map: string): boolean{
    if(map.length == 2){
        return true;
    }
    return false;
}

/**
 * Gets an array of all the castles the player currently control.
 * @param player the player in question.
 * @returns Array<castle | undefined> of the castles
 */
export function print_castle(player: Player) {

    let castles = player[1]; // gets the casle array   
    let print = ""; // the print string

    for(let i = 0; i < castles.length; i = i + 1 ){ // loops over the players castles 
        if (castles[i] != undefined) {
            print += castles[i]?.position; // adds the castles to the print string
            print += " "
        }
        
    }
    
    console.log('\x1b[36m%s\x1b[0m',"You rule over the following castles: ", print, '\x1b[37m\x1b'); // Fancy print
    print_board();
}

/**
 * Prints the army currently in a castle
 * @param castle - the castle which army we want to see
 */
export function print_army(castle : Castle) {
    empty_line();
    print_to_game('This is the army in this castle, my Liege.');
    cursive_line();
    for (let i = 0; i < castle.hp.length; i++) { // loops over all the warriors in the castle
        if (castle.hp[i] != undefined && castle.hp[i]!.alive == true) {  // only print alive_warriors and non undefined
        console.log('| Soldier Name:', castle.hp[i]!.name, // fancy print 
                    '| \u001b[31m Attack: \u001b[m', castle.hp[i]!.attack,
                    '|\u001b[32m Health: \u001b[m', castle.hp[i]!.health, '|');
        }
    }
    cursive_line();
    empty_line();
}