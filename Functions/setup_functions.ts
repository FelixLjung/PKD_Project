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
    empty_line,
    get_testing_bool, print_to_game 
} from './utility_functions';
import { platform } from 'os';
import { stringify } from 'querystring';


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
const p4: string = "Johannes";
const p5: string = "Eva";
const ai_name_1: string = "CPU1";
const ai_name_2: string = "CPU2";

/**
 * Pick amount of players
 * @returns a number
 */
function choose_players(): number{
    let loop = true;
    while(loop){       // Checks if amount of players is a valid number
        const num = prompt("Choose number of players: ") as number;
        if(num > 0 && num <= 5){
            return num;
        } else{
            print_to_game("Invalid input, please try again");
            empty_line();
        }
    }
    return 0;

}
/**
 * Creates the players names.
 * @returns a name.
 */
function choose_name(): string{
    empty_line();
    let name: string = prompt("Choose your name: ") as string;
    return name;
}

/**
 * initialiases the game,
 * creates players and AI
 * 
 * @returns A complete setup of the game
 */
export function game_setup(): Array<Player> {
    const num_players = choose_players();
    const arr_names: Array<string> = [];     // Array of player names
        
    for(let n = 0; n < num_players; n++){   // Lets player pick their names.
        let player_name = choose_name();
        arr_names[n] = player_name;
    }

    /**
     * Creates all players
     * @param names 
     * @returns an array of players
     */
    function create_players(names: Array<string>): Array<Player>{
        const arr_pos: Array<number> = [1, 5, 2, 4, 3]; // Array of positions  
        const arr: Array<Player> = [];
        for(let n = 0; arr_pos.length < 5; n++){  // All players get a position
            if(n - names.length < 0){
                const player: Player = create_player(names[n], arr_pos[n]);
                arr[n] = player;
            } else{
                const ai: Player = create_player("CPU" + arr_pos[n] as string, arr_pos[n])
                arr[n] = ai;
            }
        }
        return arr;
    }

    let arr_players = create_players(arr_names); 

    


    /*
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
    const AI1 : Player = create_player(ai_name_1, 4);
    const AI2 : Player = create_player(ai_name_2, 3);
    */

    create_nodes(arr_players); // Creates nodes with the first letter of every name

    create_castles(arr_players, false); // Creates one castle for every participant. 

    return [player1, player2, player3, AI1, AI2];
}

/**
 * 
 * @param arr_players 
 */
function create_nodes(arr_players: Array<Player>){
    /*
    nodes[0] += names[0][0];
    nodes[1] += names[1][0];
    nodes[4] += names[2][0];
    */

    for (let i = 0 ; i < arr_players.length; i++) { // loops over the all participants
        let curr_player = arr_players[i]; // the current player
        let castle_pos = curr_player[1][0]!.position - 1; // gets the correct index of the players starting castle  

        nodes[castle_pos] += curr_player[0][0]; // Adds the first character of the current player's name to the node
        castles[castle_pos] = curr_player[1][0]!; // Adds the Castle the castle array 
    }


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
export function create_castles(player_list : Array<Player>, start_with_two_castles : Boolean) {
    // Player Castles
    /*


    castles[0] = player1[1][0]!; 
    castles[1] = player2[1][0]!;
    castles[4] = player3[1][0]!;

    // AI Castles
    castles[3] = AI1[1][0]!;
    castles[2] = AI2[1][0]!;
    */

    /*
    // If we want the first player to start with two castles, used for testing
    if (start_with_two_castles){
        castles[2] = player1[1][1]!; // byt dessa ifall player1 har två castles
    } else {
        castles[2] = AI2[1][0]!;
    }
    */
}


