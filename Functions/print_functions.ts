import{
    type Player, type Castle
} from '../types';

import { get_castle_array, get_nodes } from './setup_functions';
import { cursive_line, empty_line, print_line, print_to_game, debug_log } from './utility_functions';


// Print functions 

// start nodes
let node1 = "1";
let node2 = "2";
let node5 = "5";

//unclaimed nodes
let node3 = "3x";
let node4 = "4x";

//let nodes = [node1, node2, node3, node4, node5];

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


let map = map1;

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

export function splash_end(winner: Player){
    console.log(
`
                    _
                   |⥣| 
    _______    _   |⥯|
   /_-_W_-_|  |+|  |⥯|       __________________________________________________
           | _<=>_ |⥯|       \u001b[31m${winner[0]} The Counqueror\u001b[37m Rules The Entire Kingdom!
           0/  V   o=o                           \u001b[33mGAME OVER\u001b[37m
            V| ^ |V 0
           | |_^_|
           | || ||
         __|_d|_|b____

    `)                         
  
}

export function refresh_board() {
    nodes = get_nodes();
    function get_castle_owners(){
        let castles = get_castle_array(); // FIXME: denna är tom
        console.log(castles);
        debug_log("castles: " + castles);

        for (let i = 0; i < nodes.length; i++ ){

            nodes[i] = castles[i].position + castles[i].owner[0];
        }

        
    }


    /*
    node1 = ((castles[0].position) as number) + castles[0].owner[0];
    node1 = ((castles[0].position) as number) + castles[0].owner[0];
    node1 = ((castles[0].position) as number) + castles[0].owner[0];
    node1 = ((castles[0].position) as number) + castles[0].owner[0];
    node1 = ((castles[0].position) as number) + castles[0].owner[0];
    */

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
    

    /*
    map = [
        [" ", " ", " ", " ", " "," "," ", " ", node3, " ", " "," "," ", " ", " ", " ", " "," "],
        [" ", " ", " ", " ", " "," "," ", " ", "|", " ", " "," "," ", " ", " ", " ", " "," "],
        [" ", " ", " ", " ", " "," "," ", " ", "|", " ", " "," "," ", " ", " ", " ", " "," "],
        [" ", " ", " ", " ", " "," "," ", " ", node4, " ", " "," "," ", " ", " ", " ", " "," "],
        [" ", " ", " ", " ", " "," "," ", " ", "|", " ", " "," "," ", " ", " ", " ", " "," "],
        [" ", " ", " ", " ", " "," "," ", " ", "|", " ", " "," "," ", " ", " ", " ", " "," "],
        [" ", " ", " ", " ", " "," "," ", " ", node4, " ", " "," "," ", " ", " ", " ", " "," "],
        [" ", " ", " ", " ", " "," "," ", "/", " ", " ", " "," "," ", " ", " ", " ", " "," "],
        [" ", " ", " ", " ", " "," ","/", " ", " ", " ", " "," "," ", " ", " ", " ", " "," "],
        [" ", " ", " ", " ", " "," "," ", " ", " ", " ", " "," "," ", " ", " ", " ", " "," "],
        [" ", " ", " ", " ", " "," "," ", " ", " ", " ", " "," "," ", " ", " ", " ", " "," "],
        [" ", " ", " ", " ", " "," "," ", " ", " ", " ", " "," "," ", " ", " ", " ", " "," "],
        [" ", " ", " ", " ", " "," "," ", " ", " ", " ", " "," "," ", " ", " ", " ", " "," "],
        [" ", " ", " ", " ", " "," "," ", " ", " ", " ", " "," "," ", " ", " ", " ", " "," "],
        [" ", " ", " ", " ", " "," "," ", " ", " ", " ", " "," "," ", " ", " ", " ", " "," "],
        [" ", " ", " ", node4, "-","-",node4, "-", node4,"-",node4, "-", , "-", node4, " ", " "," "],
        [" ", " ", "/", " ", " ","         "," ", " ", " ", " ", " "," "," ", " ", "          ", "\\", " "," "],
        [" ", "/", " ", "         ", " "," "," ", " ", " ", " ", " "," "," ", " ", "           ", " ", "\\"," "],
        [node1, "  ", "  ", "  ", "  ","  ","  ", "  ", "  ", "  ", " "," "," ", " ", "         ", " ", " ",node2],
    
    
       
    ];
 */


}

/**
 * Prints the board to the console
 * @param Array 2d array of the map
 * @return Does not return
 */
export function print_board() {
    refresh_board();
    print_line();
    for (let i = 0; i < map.length; i++) {
        console.log('\x1b[36m%s\x1b[0m', helper(map[i])); // black magic, Cyan Color
    }

    function helper(line: Array<string>) {
        let str = "";

        for (let j = 0; j < line.length; j++) {     // Color the Players differently on the MAP
            if(is_string_arr(line[j])){
                if(line[j][1] == "D"){
                    str += "\u001b[31m" + line[j] + "\u001b[36m";
                } else if(line[j][1] == "F"){
                    str += "\u001b[32m" + line[j] + "\u001b[36m";
                } else if(line[j][1] == "A"){
                    str += "\u001b[33m" + line[j] + "\u001b[36m";
                } else if(line[j][1] == "C"){
                    str += "\u001b[37m" + line[j] + "\u001b[36m";
                } else if(line[j][1] == "E"){
                    str += "\u001b[35m" + line[j] + "\u001b[36m";
                } else if(line[j][1] == "J"){
                    str += "\u001b[34m" + line[j] + "\u001b[36m";
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

    let castles = player[1];
    let print = "";

    //console.log(castles);

    for(let i = 0; i < castles.length; i = i + 1 ){
        if (castles[i] != undefined) {
            print += castles[i]?.position;
            print += " "
        }
        
    }
    console.log(print);
    console.log('\x1b[36m%s\x1b[0m',"You rule over the following castles: ", print, '\x1b[37m\x1b');
    print_board();
}

/**
 * Prints the army currently in a castle
 * @param castle - the castle which army we want to see
 */
export function print_army(castle : Castle) {
    empty_line();
    print_to_game('This is the army in this castle, my liege');
    cursive_line();
    for (let i = 0; i < castle.hp.length; i++) {
        if (castle.hp[i] != undefined && castle.hp[i]!.alive == true) {
        console.log('Soldier name:', castle.hp[i]!.name,
                    '| Attack strength:', castle.hp[i]!.attack,
                    '| Health:', castle.hp[i]!.health);
        }
    }
    cursive_line();
    empty_line();
}