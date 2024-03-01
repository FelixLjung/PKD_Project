import {
    type Army, type Castle, type Warrior, type Player
} from '../types';

import { 
    MatrixGraph 
} from '../lib/graphs';

import {
    get_random_int, get_first_warrior_name
} from './general_functions'

import {
     read 
} from 'fs';

import {
    list
} from '../lib/list';

import { 
    get_testing_bool 
} from './utility_functions';
import { platform } from 'os';


// Variables
const prompt = require('prompt-sync')({ sigint: true }); // Krävs för att hantera inputs

let I = true;
let O = false;

export const mormors_kudde: MatrixGraph = { // The matrixgraph representing the paths between our castles (nodes)
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

let castles: Array<Castle> = []; // init empty castles array

// board

// start nodes
let node1 = "1";
let node2 = "2";
let node5 = "5";

//unclaimed nodes 
let node3 = "3x";
let node4 = "4x";

let nodes = [node1,node2,node3,node4,node5];

// Functions

/**
     * Creates a castle in setup phase
     * @param army the army that will be station in the castle (hp)
     * @param owner the name of the owner 
     * @param position the position on the board 1-5 
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
    let name = get_first_warrior_name(); // Gets a name 
    const warrior = {  // Creates the warrior
        attack: attack,
        health: health,
        name: name,
        alive : true 
    };

    return warrior;
}

/**
 * Creates a an array of warriors
 *
 * @returns An Army with three warriors 
 */
export function create_army(): Army {
    let army: Army = [create_warrior(get_random_int(3,5), 70), // the starting warriors
                      create_warrior(get_random_int(3,5), 70),
                      create_warrior(get_random_int(3,5), 70)];

    return army;
}
/**
 * exported function to retrieve the castles created in this ts script 
 * @returns an array of all the castlees
 */
export function get_castle_array(): Array<Castle> {
    return castles;
}



/**
 * Reads the name of all the particiants 
 * @param num amount of players
 */
function read_player_names(num: number){
    const player_lst = list();
    if(1 <= num && num <= 3){
        for(let n = 1; n < num; n++){
            const name_player = prompt("Name: ");
            
        }
    }
}

/**
 * Creates a player, a pair whose head is a string and tail is an array of Castles.
 * @param name is a string
 * @param num_players is a number
 */
export function create_player(name: string, node: number): Player{
    const player: Player = [name, [(create_castle(create_army(), name, node))]]; // Siffran är NODE, får ej vara hårdkodad!
    return player;
}

export function pick_player_name(name: string): string{
    return name; // FIXME: 
}

const p1: string = "David";
const p2: string = "Felix";
const p3: string = "Alfred";
const ai_name_1: string = "CPU1";
const ai_name_2: string = "CPU2";

/**
 * initialiases the game,
 * creates players and AI
 * 
 * @returns A complete setup of the game
 */


export function game_setup(): Array<Player> {

    const name_player1: string = pick_player_name(p1);
    const name_player2: string = pick_player_name(p2);
    const name_player3: string = pick_player_name(p3); // FIXME: 

    const cpu_name : string = pick_player_name(ai_name_1); 
    const cpu_name2 : string = pick_player_name(ai_name_2);
    
    // Create Players
    const player1: Player = create_player(name_player1, 1);
    const player2: Player = create_player(name_player2, 2);
    const player3: Player = create_player(name_player3, 5);

    // Create AI
    const AI1 : Player = create_player(cpu_name, 4);
    const AI2 : Player = create_player(cpu_name2, 3);
  
    create_nodes(name_player1,name_player2, name_player3); // Creates nodes with the first letter of every name

    create_castles(player1,player2,player3, AI1, AI2, false); // Creates one castle for every participant. 

    return [player1, player2, player3,AI1,AI2];
}


function create_nodes(name_player1 : string ,name_player2 : string , name_player3 : string){
    nodes[0] += name_player1[0];
    nodes[1] += name_player2[0];
    nodes[4] += name_player3[0];
}

/**
 * Creates castles for all the participants.
 * @param player1 the first playar
 * @param player2  the second player
 * @param player3  the third player
 * @param AI1 AI
 * @param AI2 AI
 * @param start_with_two_castles set this to if first player should start with 2 castles 
 */
export function create_castles(player1 : Player, player2 : Player, player3 : Player, AI1 : Player, AI2 : Player, start_with_two_castles : Boolean) {
    // Player Castles
    castles[0] = player1[1][0]!;
    castles[1] = player2[1][0]!;
    castles[4] = player3[1][0]!;

    // AI Castles
    castles[3] = AI1[1][0]!;
    // If we want the first player to start with two castles, used for testing
    if (start_with_two_castles){
        castles[2] = player1[1][1]!; // byt dessa ifall player1 har två castles
    } else {
        castles[2] = AI2[1][0]!;
    }

}


