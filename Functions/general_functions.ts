
import{
    type Queue, dequeue, head 
} from '../lib/queue_array'

import { type MatrixGraph } from '../lib/graphs';


import{
    type Warrior, type Army, type Player, type Castle
} from '../types'

// General Functions

/**
 * Chooses a random number between [min] and [max].
 * @param min is a number. Represents the lowest number on the die
 * @param max is a {number}. Represents the hightes number on the die
 * @returns a random number / integer.
 */
export function getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min);
}

/**
 * Improves every warrior in an armys stats 
 * @param army The army that gets trained
 */

export function train_warrior(army: Army) {
    for (let w = 0; w < army.length; w = w + 1) {
        let cur_war = army[w];
        if(cur_war == undefined){
            continue;
        }
        
        else{
            cur_war!.attack = cur_war!.attack + 5;
            cur_war!.health = cur_war!.health + 5;
        }
    }
}

/**
 * Gets an array of all the castles the player currently control.
 * @param player the player in question.
 * @returns Array<castle | undefined> of the castles
 */
export function get_castle(player: Player) {

    let castles = player[1];
    let print = "";


    for(let i = 0; i < castles.length; i = i + 1 ){
        print += castles[i]?.position;
        print += " "

    }
    console.log(print);
    console.log('\x1b[36m%s\x1b[0m',"You rule over the following castles: ", print, '\x1b[37m\x1b');
}

/**
 * Finds all possible paths from a castle
 * @param castle - the castle the player wants to move from
 * @param map - the map currently in playgit
 * @returns paths - and array of all castles a player can move to
 */

export function finds_paths(castle : Castle, map : MatrixGraph) : Array<number> {
    let position = castle.position - 1;
    let paths : Array<number> = [];
    let spot : number = 0;
    for (let i = 0; i < map.adj[position].length; i = i + 1) {
        if (map.adj[position][i] === true) {
            paths[spot] = i + 1;
            spot = spot + 1;
        }
    }
    return paths;
}

/**
 * Moves an army from one castle to another, attacking if it is an enemy castle
 * @param Move_from - The castle the army is being moved from
 * @param Move_to - The castle the army is being moved to
 * @param Soldiers - The army being moved from one castle to another // tror inte denna behövs
 * @returns void
 */
export function move(move_from: Castle, move_to: Castle): void {
    const player_from: string = move_from.owner;
    console.log(move_from);
    console.log(move_to);

    const player_to: string = move_to.owner;
    const army = move_from.hp;

    let attacking_player : Player | undefined = undefined;
    let defending_player : Player | undefined = undefined;
    const player_list : Array<Player> = get_player_list();
    for (let i = 0; i < player_list.length; i = i + 1) {
        if (player_list[i][0] == move_from.owner) {
            attacking_player = player_list[i];
        } else if (player_list[i][0] == move_to.owner) {
            defending_player = player_list[i];
        }
    }

    if (player_from !== player_to) {
        console.log(move_from.owner,"has declared war against", move_to.owner);
        attack(move_to, attacking_player!, defending_player!, army);
    }
}


export function turn(player : Player){

    let castle_queue = print_castles(player);

    for(let i = 0; i < castle_queue[1]; i++){
        
        castle_turn(player, head(castle_queue));
        dequeue(castle_queue);
    }
    
}

/**
 * A players turn in game. Should be able to call multiple actions
 * Move and Attack.
 * Should Call other functions.
 * @param player is a pair(string, List)
 */
export function castle_turn(player: Player, castle : Castle) {
    
    console.log("What is your command, king ", player[0], "..?");
    const choice = prompt("1 : Move Army  \n  2: Train Army "); // Här borde vi ha något som dubbelkollar att inputen är valid

    // Någonstans ska vi föra in print_castles funktionen (väljer vilket slott man vill börja med)
    if (choice === "1") {
        //console.clear();
        
        let paths = finds_paths(castle!, mormors_kudde); // Första castle
        console.log("You can move to the following castles: ", paths);
        let choice: number = prompt("Choose your destination: ") as number;

        let castle_to: Castle = castles[choice-1];
        //console.log(castle_to);
        move(castle!, castle_to);

    } else if (choice === "2") {
        console.log("You are training: ", player[1][0]!.hp);
        train_warrior(castle.hp);
        console.log(castle.hp);
        return {}
    }
}

/**
 * Places soldiers in the starting castles
 * @param board - The new game board
 * @param position - The index of the castle
 * 
 */
export function recruit_warrior(Board: MatrixGraph) {
    // denna kanske inte behövs

}

export function army_size(){

}

export function remove_player(){

}

/**
 * Warrior gets a name from queue
 * @returns string
 */
export function get_name(): string {
    let name = head(w_names);
    dequeue(w_names);
    return name;
}


