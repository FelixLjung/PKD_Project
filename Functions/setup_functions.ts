import {type Army, type Castle, type Warrior, type Player} from '../types';
import { MatrixGraph } from '../lib/graphs';
import {get_name} from './general_functions'

// Variables

let I = true;
let O = false;

const mormors_kudde: MatrixGraph = {
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
export function create_warrior(): Warrior {
    let name = get_name();

    const warrior = { attack: 5, health: 100, name: name };
    return warrior;
}

/**
 * Creates a an array of warriors
 *
 * @returns 
 */
export function create_army(): Army {
    let army: Army = [create_warrior()];

    return army;
}


/**
 * Pick your King, and creates your army
 * @returns A complete setup of the game
 */
export function setup(): Array<Player> {
    const name_player1 = prompt("Enter player 1 name: ");
    const name_player2 = prompt("Enter player 2 name: ");
    const name_player3 = prompt("Enter player 3 name: ");

    //const player1 : Player = [name_player1! , [(create_castle(create_army(), name_player1, 1))]];
    const player1: Player = [name_player1!, [(create_castle(create_army(), name_player1, 1)), (create_castle(create_army(), name_player1, 3))]];
    const player2: Player = [name_player2!, [(create_castle(create_army(), name_player2, 2))]];
    const player3: Player = [name_player3!, [(create_castle(create_army(), name_player3, 5))]];

    const AI1 : Player = ["CPU1",[create_castle(create_army(), "CPU1", 4)]]


    nodes[0] += name_player1[0];
    nodes[1] += name_player2[0];
    nodes[4] += name_player3[0];

    castles[0] = player1[1][0]!;
    castles[1] = player2[1][0]!;
    castles[4] = player3[1][0]!;
    castles[2] = player1[1][1]!;
    castles[3] = AI1[1][0]!;




    //castles[3] = create_castle(create_army(), "AI", 3);
    
    //const AI2 : Player = ["AI2",[create_castle(create_army(), "AI2", 3)]]
    

    return [player1, player2, player3];
}

