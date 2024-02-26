
import {
    type Queue, dequeue, head, enqueue, empty
} from '../lib/queue_array'

import { type MatrixGraph } from '../lib/graphs';

import { type List, tail, is_null, head as l_head, list } from '../lib/list'

import {
    type Warrior, type Army, type Player, type Castle
} from '../types'

import {
    get_player_list
} from '../game';

import {
    attack, is_army_empty
} from './attack_functions'

import {
    print_board,
    print_castle,
    print_army
} from './print_functions'

import {
    create_warrior,
    get_castle_array,
    mormors_kudde
} from './setup_functions'

const prompt = require('prompt-sync')({ sigint: true }); // Krävs för att hantera inputs

export let w_names: Queue<string> = [0,
    2,
    ["Eva Darulova",    // Current: 37 warrrior-names
        "Jingwei Hu",
        "Johannes Borgström",
        "Carl Erik",
        "Runar Stenbock",
        "Sigvard Bjelkengren",
        "Ernst Greve",
        "Hjalmar Storfot",
        "Lillemor Hoppetoss",
        "Gustav Backlund",
        "Hans Hansson",
        "Frans Storm",
        "Berit Storm",
        "Tor Hoppetoss",
        "Fred von Pickelroy",
        "Björn Olmedo",
        "Jimmy Viking",
        "Thom Surströmming",
        "Fredrik Blåtand",
        "Göran Borkavik",
        "Bosse Brunklimp",
        "Hans Hansson",
        "Peter Niclass",
        "Tubbe Tonker",
        "Frans Tonker",
        "Per Jutterström",
        "Zhangwei",
        "Miro Ali Akbar",
        "Fader Gustav",
        "Bartek Bunko",
        "Wille den snygge",
        "Kristian Luuk",
        "Börje Flemming",
        "Johanna Grönsaksson",
        "Henning Bollmark",
        "Krudel Haestre",
        "Movitz Movitsson",
        "Ronken av Bonken",
        "Dani af Ljusdal"]];



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
        if (cur_war == undefined) {
            continue;
        }

        else {
            cur_war!.attack = cur_war!.attack + getRandomInt(5, 8);
            cur_war!.health = cur_war!.health + getRandomInt(5, 10)
        }
    }
}

/**
 * The player determines the order in which they want to make their moves from their castles.
 * @param player the player in question.
 * @returns Array<string> of the castles
 */
export function get_order_castles(player: Player): Queue<Castle> {
    let castle_queue: Queue<Castle> = empty();
    const player_castles: Array<Castle | undefined> = [];

    for (let i = 0; i < tail(player).length; i = i + 1) {
        if (tail(player)[i] != undefined) {
            player_castles[player_castles.length] = tail(player)[i];
        }
    }

    function includes(Castles: Array<Castle | undefined>, index: number, player: Player): Boolean {
        for (let i = 0; i < Castles.length; i = i + 1) {
            if (Castles[i]!.position == index && Castles[i]!.owner == player[0]) {
                return true;
            }
        }
        return false;
    }

    function in_q(castle_queue: Queue<Castle>, castle: Castle | undefined): Boolean {
        for (let i = 0; i < castle_queue[2].length; i = i + 1) {
            if (castle_queue[2][i] == castle) {
                return true;
            } else {

            }
        }
        return false;
    }

    function get_position(castles: Array<Castle | undefined>, index: number): Castle | undefined {
        for (let i = 0; i < castles.length; i = i + 1) {
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

    if (count_castles(player_castles) > 1) {
        while (castle_queue[1] != tail(player).length) {

            print_castle(player);
            //console.log(player_castles);
            const cstl: number = prompt(" Which castle would you like to operate from? ") as number
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
    return (castle_queue);
}

/**
 * Finds all possible paths from a castle
 * @param castle - the castle the player wants to move from
 * @param map - the map currently in playgit
 * @returns paths - and array of all castles a player can move to
 */

export function finds_paths(castle: Castle, map: MatrixGraph): Array<number> {
    let position = castle.position - 1;
    let paths: Array<number> = [];
    let spot: number = 0;
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
    //console.log(move_from);
    //console.log(move_to);

    const player_to: string = move_to.owner;
    const army: Army = move_from.hp


    let attacking_player: Player | undefined = undefined;
    let defending_player: Player | undefined = undefined;
    const player_list: Array<Player> = get_player_list();
    for (let i = 0; i < player_list.length; i = i + 1) { // botarna finns inte med i player_list
        if (player_list[i][0] == move_from.owner) { // detta borde abstraktas tll en ny funktion då
            attacking_player = player_list[i];
        } else if (player_list[i][0] == move_to.owner) {
            defending_player = player_list[i];
        }
    }
    const split = split_army(move_from);        //Här splittas Attacking army i två [0 = moving, 1 = staying]
    console.log(move_from.position);
    console.log(attacking_player![1]);
    //attacking_player![1][move_from.position - 1]!.hp = split[0];
    //attacking_player![1][move_from.position - 1]!.hp = split[0];
    const moving_army = split[0];
    const staying_army = split[1];
  


    function get_player_from_castle(castle: Castle) {

    }
    

    if (player_from != player_to) {
        console.log(move_from.owner, "has declared war against", move_to.owner);
        const survivors = attack(move_to, attacking_player!, defending_player!, moving_army);
    } else if (player_from == player_to) {
        for (let i = 0; i < move_from.hp.length; i++) {
            move_to.hp[move_to.hp.length + i] = move_from.hp[i];
            move_from.hp = []; // här töms den ju?
            console.log('move_from', move_from.hp);
            console.log('move_to', move_to.hp);
        }
    }

    //console.log("VI är i move");
    move_from.hp = merge_army(split[1], survivors);

}


export function turn(player: Player) {

    let castle_queue = get_order_castles(player);

    for (let i = 0; i < castle_queue[1]; i++) {

        castle_turn(player, head(castle_queue));
        dequeue(castle_queue);
    }

}
/**
 *  checks if a player is a AI
 * @param player either a player or a player name
 * @returns true if the player has a name that starts with CPU
 */

export function check_if_cpu(player: Player | string): boolean {
    let name: string = "";
    if (typeof (player) == "string") {
        name = player[0] + player[1] + player[2]; // gets the first three letters
    } else {
        name = player[0][0] + player[0][1] + player[0][2]; // gets the first three letters
    }

    //str.match(/.{1,3}/g)
    if (name == "CPU") {
        return true;
    } else {
        return false;
    }


}


/**
 * A players turn in game. Should be able to call multiple actions
 * Move and Attack.
 * Should Call other functions.
 * @param player is a pair(string, List)
 */
export function castle_turn(player: Player, castle: Castle) {
    let bool = true;
    while (bool) {
        print_board();
        //let text1 = "currently in"
        console.log('\u001b[3m', "Currently Residing in Castle ", castle.position, '\u001b[m');
        print_army(castle);
        console.log("What is your command, king ", player[0], "..?");
        console.log("1 : Move Army");
        console.log("2: Train Army");
        const choice = prompt(); // Här borde vi ha något som dubbelkollar att inputen är valid

        // Någonstans ska vi föra in print_castles funktionen (väljer vilket slott man vill börja med)
        if (choice === "1") {
            //console.clear();

            let paths = finds_paths(castle!, mormors_kudde); // Första castle
            console.log("You can move to the following castles: ", paths);
            let choice: number = prompt("Choose your destination: ") as number;

            let castle_to: Castle = get_castle_array()[choice - 1]; // fixa get funktions
            //console.log(castle_to);
            bool = false;
            move(castle!, castle_to);


        } else if (choice === "2") {
            console.log('You are training:')
            for (let i = 0; i < player[1][0]!.hp.length; i++) {
                console.log(player[1][0]!.hp[i]!.name);
            }
            train_warrior(castle.hp);
            console.log(castle.hp);
            bool = false;
            //return {}
        }
        else {
            console.log("Input is not valid, try again!");
        }
    }

}

/**
 * Recruits a new warrior to a castle
 * @param castle - the castle which is recruiting the new warrior
 */
export function recruit_warrior(castle: Castle) {
    let num = getRandomInt(1, 3);
    if (num == 1) {
        castle.hp[castle.hp.length] = create_warrior(5, 100);
    }
    else if (num == 2) {
        castle.hp[castle.hp.length] = create_warrior(7, 75);
    }
    else if (num == 3) {
        castle.hp[castle.hp.length] = create_warrior(10, 55);
    }
}

/**
 * When a warrior dies, it's child gets sent to the possible Warrior names.
 * @param army 
 */
//export function remake_warrior(army: Army) {
//    for(let x = 0; x < army.length; x++){
//        if(army[x] == undefined){
//            continue;
//        }
//        else if(army[x]?.alive == false){
/*
if(){
    
}
    let new_name = army[x]?.name + "I";
enqueue(new_name, w_names); 
*/
//        }
//        else{
//            continue;
//        }
//    }

//}

export function army_size() {

}

export function remove_player() {

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

export function count_castles(castle_arr: Array<Castle | undefined>) {
    let count = 0;
    for (let i = 0; i < castle_arr.length; i++) {
        //console.log(castle_arr[i]);
        if (castle_arr[i] != undefined) {
            count++
        }
    }
    return count;
}

/**
 * Takes in an army with dead warriors.
 * @param castle 
 * @returns An army with only the alive ones, becomes the new castle.hp
 */
export function alive_in_army(castle: Castle): Army{
    const alive_in_army: Army = [];           //temporary array of warriors (all alive warriors)
    let army = castle.hp;

    for(let curr_warr = 0; curr_warr < army.length; curr_warr++){       // Tar ut alla levande warr.
        alive_in_army[alive_in_army.length] = army[curr_warr];
    }
    return alive_in_army;
}


/**
 * Takes the army of castle and SHOULD split the army in 2 when we want to move from one place
 * to then next.            (CALLAS EJ ÄN)
 * @param castle 
 * @returns 
 */
export function split_army(castle: Castle): Array<Army> {
    let bool = true                         //For the while loop
    const pair_army: Array<Army> = []       // Returning
    let alive_army = alive_in_army(castle);
    const army: Army = castle.hp;
    
    
    while (bool) {              //This loop is for dividing the army into two.
        //Invariant choice got to be number!
        console.log("Your army has", alive_army.length, "warriors...");
        const choice: string = prompt("How many warriors would you like to move?: ");
 
        if (parseInt(choice) > 0 && parseInt(choice) <= alive_army.length) {       //Choose the amount of warriors
            let num: number = parseInt(choice); 
            let move_a = army.slice(0, num);
            let stay_a = army.slice(num, army.length);
            pair_army[0] = move_a;
            pair_army[1] = stay_a;
            console.log(pair_army[0]);
            console.log(pair_army[1]);
            
//            for (let a = 0; 0 < num; a++) {
//                if (alive_army[a]?.alive && alive_army[a] != undefined) {
//                    move_army[move_army.length] = alive_army[a];
//                }
//                
//            }
            bool = false;
        }
        else {
            console.log("Not valid number, try again.");
        }
    }
    return pair_army; //The amount of warriors we want to move
}

/**
 * 
 * @param a1 is an Army
 * @param a2 is an Army
 */
export function merge_army(a1:Army, a2: Army): Army{
    let new_army: Army = a1;
    const combined: number = a1.length + a2.length;
    for(let w = 0; w < a2.length; w++){
        new_army[a1.length + w] = a2[w]; 
    }
    return new_army;
}

/**
 * Removes all dead warriors in a castle    (FUNKAR EJ ÄN, ändrar ej i castle(Army), CALLAS EJ)
 * @param army 
 */
export function remove_dead(army: Army): Army {
    const alive_in_army: Army = [];                   //temporary array of warriors (all alive warriors)
    if(army.length == 0){
        return army = alive_in_army;
    }
    for (let i = 0; i < army.length; i++) {      // Loop that takes out all alive warriors in Army
        if (army[i]?.alive) {
            alive_in_army[alive_in_army.length] = army[i];
        }
        else {
            continue;
        }
    }
    return alive_in_army;



}

