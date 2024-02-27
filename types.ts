import { Queue } from "./lib/queue_array";


export type Army = Array<Warrior>;

export type AttackArmy = Queue<Warrior>;

export type Player = [string, Array<Castle | undefined> ];

export type Board = Array<Array<string>>;

export type Warrior = {
    attack: number
    health: number
    name: string
    alive : boolean
};

export type Castle = {
    hp: Army,
    owner: string
    position: number
}
