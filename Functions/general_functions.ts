//Imports

import {
    type Queue, 
    dequeue, 
    head as q_head, 
    enqueue, 
    empty } from '../lib/queue_array'

import {
     type MatrixGraph } from '../lib/graphs';

import {
    type Warrior,
    type Army,
    type Player, 
    type Castle } from '../types'

import {
    get_player_list } from '../game';

import {
    attack,
    castle_owner } from './attack_functions'

import { 
    w_names } from './resources';

import {
    print_board,
    print_castle,
    print_army } from './print_functions'

import {
    create_warrior,
    get_castle_array,
    mormors_kudde } from './setup_functions'

import { 
    cursive_line,
    format_array, 
    press_to_continue, 
    get_random_int } from './utility_functions';


import {  
    empty_line, 
    print_to_game } from './utility_functions';

import { get_testing_bool } from './utility_functions';


// Variables

const prompt = require('prompt-sync')({ sigint: true }); // To handle inputs via the terminal 

const total_amount_of_castles  : number = 5; // The sum of all the castles, this controls the wincondition 

const testing : Boolean = get_testing_bool(); // Disables prompts for testing with jest

// General Functions


/**
 * Improves every warrior in an armys stats 
 * @param {Army} army - The army that gets trained
 * @modifies {Army} the warriors in army
 * @returns {Army} - The modified Army.
 */
export function train_warrior(army: Army): Army {
    const temp_arr: Army = [];
    let j = 0; // count variable
    for (let w = 0; w < army.length; w = w + 1) { // loops over every warrior in the army, all the dead warriors have already been removed
        let cur_war = army[w];
        if (cur_war == undefined || cur_war.alive == false) {
            continue;
        } else {
            cur_war.attack = cur_war.attack + get_random_int(1, 6); // increases attack points
            cur_war.health = cur_war.health + get_random_int(2, 12); // increases health points
            temp_arr[j] = cur_war;
            j++
        }
    }
    return temp_arr;
}


/**
 * counts the total amount of castles in an castle array, that are not undefined
 * @param {Array<Castle | undefined>} castle_arr - is an array of castles
 * @returns {number} - the amount of castles a player owns.
 */
export function count_castles(castle_arr: Array<Castle | undefined>): number {
    let count = 0;
    for (let i = 0; i < castle_arr.length; i++) { // loops over the lenght of the array
        if (castle_arr[i] != undefined) {
            count++
        }
    }
    return count;
}




/**
 * Removes lost castles from a player 
 * @param {Array<Castle>} castles - the players castle array
 * @param {Player} player - is a pair, whose head is a string and the tail is a list of castles
 * @returns {Array<Castle>} - a new castle array 
 */
function remove_dead_castles(castles : Array<Castle | undefined>, player: Player ) : Array<Castle | undefined> {
    const new_castles : Array<Castle| undefined> = []; 
    let j = 0; // inner count variable
    let name = player[0] // The name of the player
    
    for (let i = 0; i < castles.length; i++ ){ // loops over the castles
        
        if (castles[i] != undefined && name == castles[i]!.owner){  // Checks if the castle is undefined or has another owner
            new_castles[j] = castles[i]; // adds the castles to the new array
            j++;
        } 
    }
    
    return remove_duplicate_castles(player, new_castles!);
} 


/**
 * Retrieves a castle from an index, returns false if the castle doesn not exist or is undefined
 * @param {Array<Castle>} castles - is an array of castles
 * @param {number} index - is a number
 * @returns {Array<Castle>} a
*/
export function get_position(castles: Array<Castle | undefined>, index: number): Castle | undefined {
    for (let i = 0; i < castles.length; i = i + 1) {
        if (castles[i] != undefined) {
            if (castles[i]!.position == index) {
                return castles[i];
            }
        }
    }

    return undefined;
}


/**
 *  Checks if a castle's position matches the recieved right index and if the current player owns the castle
 * @param {Array<Castle>} castles - is an array of castles
 * @param {number} index - is a number
 * @param {Player} player - is a pair, whose head is a string and the tail is a list of castles
 * @returns {Boolean} true if a castle's position matches the index parameter and owner of the castle
 * matches the current player.
 */
export function includes(Castles: Array<Castle | undefined>, index: number, player: Player): Boolean {
    for (let i = 0; i < Castles.length; i = i + 1) {
        if (Castles[i]!.position == index && Castles[i]!.owner == player[0]) {
            return true;
        }
    }
    return false;
}


/**
 * Checks if a castle exists in a queue or not
 * @param {Queue<Castle>} castle_queue - is a queue of castles
 * @param {Castle} castle - is a castle
 * @returns {Boolean} returns true if the castle is found in the queue
 */
export function in_q(castle_queue: Queue<Castle>, castle: Castle | undefined): Boolean {
    for (let i = 0; i < castle_queue[2].length; i = i + 1) {
        if (castle_queue[2][i] == castle) {
            return true;
        } else {

        }
    }
    return false;
}

/**
 * Checks if a player has duplicated castles in their array of castles.
 * @param {Player} player - is the player that we're checking
 * @modifies 
 */
function remove_duplicate_castles(player: Player, castles: Array<Castle | undefined>): Array<Castle | undefined> {
    const castle_arr: Array<Castle | undefined> = castles;
    const new_castle_arr: Array<Castle | undefined> = []; // Returns the new array of castles to player
    const pos_arr: Array<number> = [];
    let j: number = 0;
    for(let i = 0; i < castle_arr.length; i++){ //Loops over all castles and saves their position
        let castle_pos = castle_arr[i]?.position;   // Curr castle position
                          
        if(pos_arr.includes(castle_arr[i]!.position) ){ 
            continue;   // If pos already exists in array. (Removes Duplicates!)
        } else{
            new_castle_arr[j] = castle_arr[i]; // Adds the unique castles.
            pos_arr[i] = castle_pos!; // Saves it in pos_arr.
            j++
        }
    }
    return new_castle_arr; 
}

/**
 * The player determines the order in which they want to make their moves from their castles.
 * @param {Player} player - is a pair, whose head is a string and the tail is a list of castles
 * @returns {Queue<Castle>}  the chosen order of the castles
 */
export function get_order_castles(player: Player): Queue<Castle> {
    let castle_queue: Queue<Castle> = empty(); // Inits a empty Queue of Castles
    const player_castles: Array<Castle | undefined> = remove_dead_castles(player[1], player);  // Removes dead castles 
    if (count_castles(player_castles) > 1) {
        if (testing == true) {      //Checking if we are testing currently or not
            enqueue(player_castles[0], castle_queue); // we skip prompts if we are running testcases
            enqueue(player_castles[1], castle_queue);
        } else {
            while (castle_queue[1] != count_castles(player_castles)) { // Loops as long as the queue is not full of all the castles, also works as input check
            
                print_castle(player); 
               
                const cstl: number = prompt("Which castle would you like to operate from? ") as number 
                
                if (in_q(castle_queue, get_position(player_castles, cstl))) {
                    print_to_game("You can't choose the same castle twice!");
                } else if (includes(player_castles, cstl, player)) {
                    enqueue(get_position(player_castles, cstl), castle_queue);
                } else {
                    print_to_game("You don't own this Castle");
                }
            
            }


}} else if (player_castles.length == 1 && player[0] == player_castles[0]!.owner) { // If the player only has one castle it will skip the selection process
        enqueue(player_castles[0], castle_queue);
    }
   
    return castle_queue;
}


/**
 * Finds all possible paths from a castle
 * @param {Castle} castle - the castle the player wants to move from
 * @param {MatrixGraph} map - the map currently in playgit
 * @returns {Array<number>} -  an array of all castles a player can move to.
 */
export function finds_paths(castle: Castle, map: MatrixGraph): Array<number> {
    let position = castle.position - 1; // The castles position start from 1
    let paths: Array<number> = []; // Init poossible paths array
    let spot: number = 0;
    for (let i = 0; i < map.adj[position].length; i = i + 1) { // Loops over matrixgraph
        if (map.adj[position][i] === true) {
            paths[spot] = i + 1; 
            spot = spot + 1; 
        }
    }

    return paths;
}


/**
 * Retrieves a player from the list of players
 * @param {string} player_name 
 * @returns {Player} player is a pair, whose head is a string and the tail is a list of castles
 */
function get_player(player_name : String ) : Player | undefined {
    const player_array: Array<Player> = get_player_list();

    for(let i = 0; player_array.length; i++){
        if (player_name == player_array[i][0] ) {
            return player_array[i];
        }
    }

    return undefined
}


/**
 * Moves an army from one castle to another, checks if the castle you're moving to is the same owner as 
 * the owner you're moving from. If the owner is not the same it will result in an attack.
 * @param {Castle} move_from - is a castle, the castle the 
 * @param {Castle} Move_to - The castle the army is being moved to.
 * @modifies {Army} the armies that move to and from each castle.
 * @returns {void} - returns nothing
 */
function move(move_from: Castle, move_to: Castle): void {
    const player_from: string = move_from.owner;
    const player_to: string = move_to.owner;
    let survivors : Army = [];  //When attacking, surviving warriors are saved here

    let attacking_player: Player | undefined = get_player(move_from.owner);  
    let defending_player: Player | undefined = get_player(move_to.owner);

    const split : Army[] = split_army(move_from);        // the army is split in two
    const moving_army : Army = split[0]; 
    const staying_army : Army = split[1];
    move_from.hp = staying_army;  // Changes the army in the current castle to the army which will not move
                               
    if (player_from != player_to) {         // if we find an opponent
        empty_line();
        cursive_line();
        print_to_game(`\u001b[31m${move_from.owner} \u001b[37m` +  " has declared war against " +  `\u001b[32m${move_to.owner}\u001b[37m`);
        press_to_continue();
        move_to.hp = remove_dead_warriors(move_to.hp) // Defending army clear the dead
        if (move_to.hp.length != 0) {       //if army is not empty an attack will be triggered
            survivors = attack(move_to, attacking_player!, defending_player!, moving_army);

            if (survivors.length != 0) { // If there were survivors, the attackers won,
                castle_owner(move_to, attacking_player!, defending_player!, survivors); // Change ownership of attacked castle
            }
        } else {                            // If def. castle is empty, we change owner
            print_to_game('The castle was empty my lord! Free for the taking!');
            castle_owner(move_to, attacking_player!, defending_player!, moving_army);      
        }

    } else if (player_from == player_to) {   // Moving to your own castle
        move_to.hp = merge_army(move_to.hp, moving_army); // Merge the armies
        move_from.hp = staying_army; // the staying army is added 
    }
}


/**
 * Processes the individual turn for a player
 * @param {Player} player player is a pair, whose head is a string and the tail is a list of castles
 */
export function turn(player: Player) {

    let castle_queue = get_order_castles(player); // Gets the queue of castle to be played from
    for (let i = 0; i < castle_queue[1]; i++) {
        if(check_win_condition(player)){ // if the win condition is met we will break
            break;
        }

        castle_turn(player, q_head(castle_queue)); // Procecces the individual turn for a castle
        dequeue(castle_queue); // dequeues the castle 
    }
}


/**
 *  checks if a player is non human
 * @param {Player} player player is a pair, whose head is a string and the tail is a list of castles
 * @returns {Boolean} true if the player has a name that starts with CPU
 */
export function check_if_cpu(player: Player | string): boolean {
    let name: string = "";
    if (typeof (player) == "string") { // if input was a string
        name = player[0] + player[1] + player[2]; // gets the first three letters
    } else { // if input was of type Player
        name = player[0][0] + player[0][1] + player[0][2]; // gets the first three letters
    }

    if (name == "CPU") {
        return true;
    } else {
        return false;
    }
}


/**
 * A players turn in game. Should be able to call multiple actions
 * Move and Attack.
 * @param {Player} player is a pair, whose head is a string and the tail is a list of castles
 */
export function castle_turn(player: Player, castle: Castle) {
    let bool = true; 
    castle.hp = remove_dead_warriors(castle.hp); 

    const healed_warriors: Array<string> = [];
    let j = 0;
    for(let i = 0; i < castle.hp.length; i++){  //Beginning of turn if warr has below 40 hp, heals them up to 40hp
        let curr_warr = castle.hp[i];
        if(curr_warr.health > 0 && curr_warr.health < 40){
            heal_warrior(curr_warr);
            healed_warriors[j] = curr_warr.name;
            j++
        }
    }
    if(healed_warriors.length > 0){
        console.log(`Your wounded warriors regained some of their health!`);
    }

    //print_board();
    while (bool) {
        if(player[0] != undefined){
            console.log(`\u001b[3m ${player[0]}'s Turn \u001b[m`);
        }
        print_board();
        console.log('\u001b[3m', "Currently Residing in Castle ", castle.position, '\u001b[m'); // Displays the current castle in cursive text
        print_army(castle); // Displays the army currently station in the active castle
        console.log(`What is your command, king ${player[0]} ..?`); 
        empty_line();
        
        console.log(`\u001b[33m`,`1:`, `\u001b[37m`, `Move Army`);   // Input option 1, move army red
        console.log(`\u001b[33m`,`2:`, `\u001b[37m`, `Train Army`);  // Input option 2, train army green
        const choice : string = prompt("  :  ").trim(); // Reads the player input 

            if (choice === "1") {   // MOVE
                let paths = finds_paths(castle, mormors_kudde); // Finds all the neighbouring castles
                while(bool){ // Wrapping the input in a While loop to handle invalid inputs 
                    print_to_game("You can move to the following castles: " + "\u001b[33m"+ format_array(paths) + "\u001b[0m"); // Displays the neighbouring castles
                    let choice = prompt("Choose your destination: ") as number; // Invariant must be number

                    if(is_choice_in_paths(paths, choice)){ //  checks if the input is a valid path
                        let castle_to: Castle = get_castle_array()[choice - 1];
                        move(castle!, castle_to);
                        bool = false;             
                        
                    } else{                  //Fail safe
                        
                        print_to_game("\u001b[31mInvalid\u001b[m move. Try again!");
                    }
                }

            } else if (choice === "2") {    // TRAIN
                console.log('Your new and improved army:')
                castle.hp = remove_dead_warriors(castle.hp);
                castle.hp = train_warrior(castle.hp);
                cursive_line();
                for (let i = 0; i < castle.hp.length; i++) { // loops over all the warriors in the castle
                    if (castle.hp[i] != undefined && castle.hp[i]!.alive == true) {  // only print alive_warriors and non undefined
                    console.log('| Soldier Name:', castle.hp[i]!.name, // fancy print 
                                '| \u001b[31m Attack: \u001b[m', castle.hp[i]!.attack,
                                '|\u001b[32m Health: \u001b[m', castle.hp[i]!.health, '|');
                    }
                }
                
                //print_to_game(trained_army);

                cursive_line();
                empty_line();
        
                bool = false;
                
            } else {
                print_to_game(" \u001b[31m Invalid\u001b[m number. Try again!");
                press_to_continue();
                empty_line();
                empty_line();
                empty_line();
                
            }
    }
}


/**
 * Checks if choice exists in the paths array.
 * @param {Array<number>} paths an array of numbers (nodes)
 * @returns {Boolean} a boolean (true if choice is in paths)
 */
export function is_choice_in_paths(paths: Array<number>, choice: number): boolean{
    for(let i = 0; i < paths.length; i++){
        if(choice == paths[i]){
            return true
        } else{
            continue;
        }
    }
    return false;   // if choice is not a possible path
    }


/**
 * After every player has ended their turn, all castle recruits a new warrior.
 * @param {Castle} castle - the castle which is recruiting the new warrior
 * @param {number} index - is a number
 */
export function recruit_warrior(castle: Castle, index: number) {
    let num = get_random_int(0, 2);
    //let len = castle.hp.length; //current players castle
    
    
    if (num == 0) {
        castle.hp[index] = create_warrior(5, 94);
    }
    else if (num == 1) {
        castle.hp[index] = create_warrior(7, 75);
    }
    else if (num == 2) {
        castle.hp[index] = create_warrior(10, 60);
    }
    
}


/**
 * After a battle, when their next turn starts, all surviving warriors in army gets healed to 50 hp
 * @param {Warrior} warrior - is a warrior
 * @modifies {Warrior} all warriors with equal or lower health than 40.
 */ 
export function heal_warrior(warrior: Warrior): string{
    warrior.health = 50;
    return warrior.name;
}


/**
 * When a warrior dies, it's child gets sent to the possible Warrior names.
 * @param {Army} army - is an Array of warriors
 * @modifies {Queue<string>} the queue of available warrior names.
 */
export function remake_warrior(army: Army) {
    for(let x = 0; x < army.length; x++){
        if(army[x] == undefined || army[x].alive == false){
            continue;
        } else{
            let new_name = army[x]?.name + "I";
            enqueue(new_name, w_names); 
        }
    }
}


/**
 * Warrior gets a name from queue
 * @returns {string} string
 */
export function get_first_warrior_name(): string {
    let name = q_head(w_names);
    dequeue(w_names);
    return name;
}


/**
 * Takes the army of castle and SHOULD split the army in 2 when we want to move from one place
 * to then next.
 * @param {Castle} castle - The castle which the army is in
 * @returns {Array<Army>} - The split army, which is in two sections
 */
export function split_army(castle: Castle): Array<Army> {
    let bool = true                         //For the while loop
    const pair_army: Array<Army> = []       // Returning
    let alive_army = remove_dead_warriors(castle.hp);
    const army: Army = castle.hp;
    
    while (bool) {              //This loop is for dividing the army into two.

        empty_line();
        print_to_game("Your army has " + alive_army.length + " warriors...");
        let choice : string = '';
        if (get_testing_bool()) {
            choice = '2';
        } else {
            choice = prompt("How many warriors would you like to move?: ");
        }
        empty_line();
        empty_line();

        if (parseInt(choice) > 0 && parseInt(choice) <= alive_army.length) {       //Choose the amount of warriors
            let num: number = parseInt(choice); 
            let move_a = army.slice(0, num);
            let stay_a = army.slice(num, army.length);
            pair_army[0] = move_a;
            pair_army[1] = stay_a;
            bool = false;
        } else {
            print_to_game("\u001b[31mInvalid\u001b[m: number, try again.");
        }
    }
    return pair_army; //The amount of warriors we want to move
}


/**
 * Takes in two armies When moving, merge the two armies into one.
 * @param {Army} a1 is the army that is MOVING TO
 * @param {Army} a2 is an Army that is in the Army when merging
 * @returns {Army} a merged Army
 */
export function merge_army(a1: Army, a2: Army): Army{
    if(a2 == undefined){ // if the other army doesnt exist 
        return a1   // a1 is the army you moving in with, should never be empty or undefined
    }
    
    const new_army: Army = a1; // copies the first army
    for(let w = 0; w < a2.length; w++){ // loops over all the elemts in the other army
        new_army[new_army.length] = a2[w]; // adds them to the new army
    }
    return new_army;
}


/**
 * Removes all dead warriors in a castle
 * @param {Army} army 
 * @returns {Army} the updated array of warriors in the castle
 */
export function remove_dead_warriors(army: Army): Army {
    const alive_in_army: Army = [];                   //temporary array of warriors (all alive warriors)
    let j = 0;
    if(army.length == 0){
        return army = alive_in_army;
    }
    for (let i = 0; i < army.length; i++) {      // Loop over the army t
        if (army[i].alive && army[i] != undefined) { // only add alive warriors 
            alive_in_army[j] = army[i];
            j++;
        } else {
            continue;
        }
        
    }
    return alive_in_army;
}


/**
 * Checks if a player is controlling all the castles on the board
 * @param {Player} player the current player 
 * @returns {Boolean} true if the player controlls all the castles, otherwise false
 */
function check_win_condition(player : Player) : Boolean {
    const player_castles_count : number = count_castles(player[1]); 
    if (player_castles_count == total_amount_of_castles){
        return true;
    } else {
        return false;
    }
}