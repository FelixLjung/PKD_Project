import { Queue } from "./lib/queue_array";

export type Army = Array<Warrior | undefined>;
export type attack_army = Queue<Warrior>;
export type Player = [string, Array<Castle | undefined>];
export type Board = Array<Array<string>>;
export type Warrior = {
    attack: number
    health: number
    name: string

};

export type Castle = {
    hp: Army,
    owner: string
    position: number
}
