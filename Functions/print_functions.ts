import{
    type Player, type Castle
} from '../types';

import { get_castle_array } from './setup_functions';


// Print functions 

// start nodes
let node1 = "1";
let node2 = "2";
let node5 = "5";

//unclaimed nodes
let node3 = "3x";
let node4 = "4x";

let nodes = [node1,node2,node3,node4,node5];

let map1 = [
    [" ", " ", " ", " ", nodes[0], " ", " ", " ", " "],
    [" ", " ", "/", " ", "|", " ", "\\", " "],
    [" ", "/", " ", " ", "|", " ", " ", "\\"],
    [nodes[1], "-", "-", nodes[2], "-", "-", nodes[3]],
    [" ", "\\", " ", " ", "|", " ", " ", "/", " "],
    [" ", " ", "\\", " ", "|", " ", "/", "", " "],
    [" ", " ", " ", " ", nodes[4], " ", " ", " ", " "]
];



let map_player_3 = [
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
    [" ", " ", "/", " ", " "," "," ", " ", " ", " ", " "," "," ", " ", " ", "\\", " "," "],
    [" ", "/", " ", " ", " "," "," ", " ", " ", " ", " "," "," ", " ", " ", " ", "\\"," "],
    [node1, " ", " ", " ", " "," "," ", " ", " ", " ", " "," "," ", " ", " ", " ", " ",node2],



];

let map = map1;


export function refresh_board() {
    
    function get_castle_owners(){
        let castles = get_castle_array();
        for (let i = 0; i < nodes.length; i++ ){
            //print(nodes[0])
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
    console.log("-------------------------------------------");
    for (let i = 0; i < map.length; i++) {
        console.log('\x1b[36m%s\x1b[0m', helper(map[i])); // black magic, Cyan Color
    }

    function helper(line: Array<string>) {
        let str = "";

        for (let j = 0; j < line.length; j++) {
            str += line[j];
        }
        return str;
    }
    console.log("-------------------------------------------");
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
}


export function print_army(castle : Castle) {
    console.log();
    console.log('This is the army currently in this castle, my liege');
    for (let i = 0; i < castle.hp.length; i++) {
        if (castle.hp[i] != undefined && castle.hp[i]!.alive == true) {
        console.log('Soldier name:', castle.hp[i]!.name,
                    '| Attack strength:', castle.hp[i]!.attack,
                    '| Health:', castle.hp[i]!.health);
        }
    }
    console.log();
}