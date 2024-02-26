import {type Army, type Castle, type Warrior, type Player} from '../types';
import { MatrixGraph } from '../lib/graphs';
import {getRandomInt, get_name} from './general_functions'
import { read } from 'fs';
import {type List, head, tail, list, append } from '../lib/list';


// Variables

const prompt = require('prompt-sync')({ sigint: true }); // Krävs för att hantera inputs

let I = true;
let O = false;

export const mormors_kudde: MatrixGraph = {
    size: 5,
    adj:
        [
            [O, I, I, I, O], //0. from A 
            [I, O, I, O, I], //1. from B
            [I, I, O, I, I], //2. from C
            [I, O, I, O, I], //3. from D
            [O, I, I, I, O], //4. from E
        ]

}

let castles: Array<Castle> = [];


// board

// start nodes
let node1 = "1";
let node2 = "2";
let node5 = "5";

//unclaimed nodes
let node3 = "3x";
let node4 = "4x";

let nodes = [node1,node2,node3,node4,node5];

let map = [
    [" ", " ", " ", " ", nodes[0], " ", " ", " ", " "],
    [" ", " ", "/", " ", "|", " ", "\\", " "],
    [" ", "/", " ", " ", "|", " ", " ", "\\"],
    [nodes[1], "-", "-", nodes[2], "-", "-", nodes[3]],
    [" ", "\\", " ", " ", "|", " ", " ", "/", " "],
    [" ", " ", "\\", " ", "|", " ", "/", "", " "],
    [" ", " ", " ", " ", nodes[4], " ", " ", " ", " "]
];



// Functions

/**
     * Creates a castle in setup phase
     * @param army 
     * @param owner 
     * @param position 
     * @returns A castle
     */
export function create_castle(army: Army, owner: string, position: number): Castle {
    let castle = { hp: army, owner: owner, position: position };

    return castle;
}


/**
 * Creates a warrior (dictionary) with name, attack damage and health
 * @returns a Warrior
 */
export function create_warrior(attack: number, health: number): Warrior {
    let name = get_name();
    const warrior = { attack: attack, health: health, name: name, alive : true };

    return warrior;
}

/**
 * Creates a an array of warriors
 *
 * @returns 
 */
export function create_army(): Army {
    let army: Army = [create_warrior(getRandomInt(1,5), getRandomInt(50, 100))];

    return army;
}

export function get_castle_array(): Array<Castle> {
    return castles;
}


function amount_of_players(): number{
    const num_players = prompt("How many are playing?: ");
    return num_players as number;
}

function read_player_names(num: number){
    const player_lst = list();
    if(1 <= num && num <= 3){
        for(let n = 1; n < num; n++){
            const name_player = prompt("Name: ");
            
        }
    }
}


/**
 * Pick your King, and creates your army
 * @returns A complete setup of the game
 */


export function game_setup(): Array<Player> {
    let name_player1 = "David"
    let name_player2 = "Felix"
    let name_player3 = "Alfred"
    
    //const player1 : Player = [name_player1 , [(create_castle(create_army(), name_player1, 1))]];
    const player1: Player = [name_player1, [(create_castle(create_army(), name_player1, 1)), (create_castle(create_army(), name_player1, 3))]];
    const player2: Player = [name_player2, [(create_castle(create_army(), name_player2, 2))]];
    const player3: Player = [name_player3, [(create_castle(create_army(), name_player3, 5))]];

    create_player();

    create_ai(); // 

    const AI1 : Player = ["CPU1",[create_castle(create_army(), "CPU1", 4)]]
    
    //const AI2 : Player = ["CPU2",[create_castle(create_army(), "Cpu2", 3)]]


    create_nodes();

    nodes[0] += name_player1[0];
    nodes[1] += name_player2[0];
    nodes[4] += name_player3[0];

    create_castles();

    castles[0] = player1[1][0]!;
    castles[1] = player2[1][0]!;
    castles[4] = player3[1][0]!;

    castles[2] = player1[1][1]!; // byt dessa ifall player1 har två castles
    //castles[2] = AI2[1][0]!;

    castles[3] = AI1[1][0]!;




    //castles[3] = create_castle(create_army(), "AI", 3);

    

    return [player1, player2, player3,AI1];
}


export function create_ai(){

}

export function create_nodes(player_list : Array<Player>){
        for (let i = 0; i < player_list.length; i++) { // loop over the amount of players
            const cst_num = player_list[i][1]
            nodes[] += // adds the first letter to the nodes
        }
}

export function create_castles() {

}


