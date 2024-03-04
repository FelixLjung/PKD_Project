import {
    type Army, 
    type Castle, 
    type Warrior, 
    type Player } from '../types';

import { MatrixGraph } from '../lib/graphs';

import { get_first_warrior_name } from './general_functions'

import { 
    empty_line,
    print_to_game,
    get_random_int } from './utility_functions';



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
let arr_players : Array<Player> = [];

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
    let army: Army = [create_warrior(get_random_int(3,5), get_random_int(80, 90)), // the starting warriors
                      create_warrior(get_random_int(2,6), get_random_int(75, 90)),
                      create_warrior(get_random_int(4,8), get_random_int(50, 90))];

    return army;
}

/**
 * exported function to retrieve the castles created in this ts script 
 * @returns an array of all the castlees
 */
export function get_castle_array(): Array<Castle> {
    return castles;
}


export function get_nodes(): Array<string> {
    return nodes;
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
 * Reads player input to get name
 * @returns a name.
 */
function choose_name(): string{
    empty_line();
    let name: string = prompt("Choose your name: ") as string;
    return name;
}

export function get_player_names() {
    let arr = [];
    for(let i = 0; i < arr_players.length; i++){
        arr[i] = arr_players[i][0][0];
    }

    return arr;
}

const arr_names: Array<string> = [];            // Array of player names

/**
 * initialiases the game,
 * creates players and AI
 * 
 * @returns A complete setup of the game
 * 
 */
export function game_setup(): Array<Player> {
    const num_players = choose_players();
        
    for(let n = 0; n < num_players; n++){   // loop over the number of human players
        let player_name = choose_name(); // gets their name 
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
        for(let n = 0; n < arr_pos.length; n++){  // All players get a position   
            if(n - names.length < 0){
                const player: Player = create_player(names[n], arr_pos[n]); // creates a player with corresponding name and position
                arr[n] = player;
            } else{
                const ai: Player = create_player("CPU" + arr_pos[n] as string, arr_pos[n]) // createsa an ai with correspongding position
                arr[n] = ai;
            }
        }
        return arr;
    }

    arr_players = create_players(arr_names); // fills the array of players with the players

    create_nodes(arr_players); // Creates nodes with the first letter of every name
    return arr_players;
}

/**
 * 
 * @param arr_players 
 */
function create_nodes(arr_players: Array<Player>){
    for (let i = 0 ; i < arr_players.length; i++) { // loops over the all participants
        let curr_player = arr_players[i]; // the current player
        let castle_pos = curr_player[1][0]!.position - 1; // gets the correct index of the players starting castle  

        nodes[castle_pos] += curr_player[0][0]; // Adds the first character of the current player's name to the node
        castles[castle_pos] = curr_player[1][0]!; // Adds the Castle the castle array

    }
}