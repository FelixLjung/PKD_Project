
import{
    type Queue, dequeue, head, enqueue, empty
} from '../lib/queue_array'

import { type MatrixGraph } from '../lib/graphs';

import {type List, tail, is_null, head as l_head, list } from '../lib/list'

import{
    type Warrior, type Army, type Player, type Castle
} from '../types'

import {
    get_player_list
} from '../game';

import {
    attack
} from './attack_functions'

import {
    print_board,
    print_castle
} from './print_functions'

import {
    get_castle_array,
    mormors_kudde
} from './setup_functions'

const prompt = require('prompt-sync')({ sigint: true }); // Krävs för att hantera inputs

let w_names: Queue<string> = [0,
    2,
    ["Eva Darulova",    // Current: 18 warrrior-names OK
   "Jingwei Hu",
   "Johannes Borgström",
   "Carl Erik IV",
   "Runar Stenbock",
   "Sigvard Bjelkengren",
   "Ernst Greve",
   "Hjalmar Storfot",
   "Lillemor Hoppetoss",
   "Gustav Backlund",
   "Hans Hansson III",
   "Frans Storm",
   "Berit Storm",
   "Tor Hoppetoss II",
   "Fred von Pickelroy",
   "Björn Olmedo",
   "Jimmy Viking",
   "Thom Surströmming",
   "Dadel kungen"]];



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
 * The player determines the order in which they want to make their moves from their castles.
 * @param player the player in question.
 * @returns Array<string> of the castles
 */
export function get_order_castles(player : Player) : Queue<Castle> {
    let castle_queue : Queue<Castle> = empty();
    const player_castles : Array<Castle | undefined> = tail(player);

    function includes(Castles : Array<Castle | undefined>, index : number, player : Player ) : Boolean {
        for (let i = 0; i < Castles.length; i = i + 1) {
            if (Castles[i]!.position == index && Castles[i]!.owner == player[0]) {
                return true;
            }
        }
        return false;
    }

    function in_q(castle_queue : Queue<Castle>, castle : Castle | undefined) : Boolean {
        for (let i = 0; i < castle_queue[2].length; i = i + 1) {
            if (castle_queue[2][i] == castle) {
                return true;
            } else {

            }
        }
        return false;
    }

    function get_position(castles : Array<Castle | undefined>, index : number) : Castle | undefined {
        for(let i = 0; i < castles.length; i = i + 1) {
            if (castles[i] !== undefined) {
                if (castles[i]!.position == index) {
                    return castles[i];
                }
            }
        }
        return undefined;
    }

    /*
    function count_castles(castle_list: List<Castle|undefined>, count : number) : number | undefined {
        return is_null(tail(castle_list!)) ? count 
                                         : count_castles(castle_list, count + 1);
                                        
    }
    */


    //if (player_castles.length > 1)
    //if (count_castles(list<Castle|undefined>(player_castles),0)! > 0)

    //console.log(list(player_castles));

    if (count_castles(player_castles) > 0  )
    {
        while (castle_queue[1] != tail(player).length) {

            print_castle(player);
            //console.log(player_castles);
            const cstl : number = prompt(" Which castle would you like to operate from? ") as number
            if (in_q(castle_queue, get_position(player_castles, cstl))) {
                console.log("You can't choose the same castle twice!")
            } else if (includes(player_castles, cstl, player)) {
                enqueue(get_position(player_castles, cstl), castle_queue);
            } else {
                console.log("You don't own this Castle");
            }
        }
    } else if (player_castles.length == 1) {
        enqueue(player_castles[0], castle_queue);
    }
    return(castle_queue);
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
    print_board();

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

    console.log("VI är i move");
    
    
}


export function turn(player : Player){

    let castle_queue = get_order_castles(player);

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
    let bool = true;
    while(bool){
        console.log("What is your command, king ", player[0], "..?");
        const choice = prompt("1 : Move Army  \n  2: Train Army "); // Här borde vi ha något som dubbelkollar att inputen är valid
        
        // Någonstans ska vi föra in print_castles funktionen (väljer vilket slott man vill börja med)
        if (choice === "1") {
            //console.clear();
            
            let paths = finds_paths(castle!, mormors_kudde); // Första castle
            console.log("You can move to the following castles: ", paths);
            let choice: number = prompt("Choose your destination: ") as number;
    
            let castle_to: Castle = get_castle_array()[choice-1]; // fixa get funktions
            //console.log(castle_to);
            bool = false;
            move(castle!, castle_to);
            
    
        } else if (choice === "2") {
            console.log("You are training: ", player[1][0]!.hp);
            train_warrior(castle.hp);
            console.log(castle.hp);
            bool = false;
            //return {}
        }
        else{
            console.log("Input is not valid, try again!");
        }
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

export function count_castles(castle_arr : Array<Castle | undefined>) {
    let count = 0;
    for (let i = 0 ; i < castle_arr.length; i ++){
        if (castle_arr[i] != undefined){
            count++
        }
    }
    return count;
}

