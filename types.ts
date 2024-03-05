// Imports

import { type Queue } from './lib/queue_array';


// Types

/**
 * An array of warriors.
 */
export type Army = Array<Warrior>;


/**
 * 
 */
export type AttackArmy = Queue<Warrior>;


/**
 * A pair of a player name and an array of castles
 */
export type Player = [string, Array<Castle | undefined> ];


/**
 * An array of arrays of strings
 */
export type Board = Array<Array<string>>;

/**
 * A piece, which is a record
 */
export type Warrior = {
    attack: number
    health: number
    name: string
    alive : boolean
};


/**
 * A record that keeps track of who owns the Castle, it's army and it's position on the map.
 */
export type Castle = {
    hp: Army,
    owner: string
    position: number
}


/**
 * An array of castles
 */
export type Kingdom = Array<Castle>;