import { Queue } from "./lib/queue_array";

/**
 * A @Army is an array of warriors.
 */
export type Army = Array<Warrior>;

export type AttackArmy = Queue<Warrior>;

export type Player = [string, Array<Castle | undefined> ];

export type Board = Array<Array<string>>;

/**
 * A @Warrior is a piece, that is a record
 */
export type Warrior = {
    attack: number
    health: number
    name: string
    alive : boolean
};

/**
 * a @Castle is a record that keeps track of who owns the Castle, it's army and it's position on the map.
 */
export type Castle = {
    hp: Army,
    owner: string
    position: number
}
