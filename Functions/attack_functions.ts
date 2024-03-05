// Imports

import {
    type Warrior,
    type Army,
    type Castle,
    type Player,
    type AttackArmy } from "../types";

import {
    type Pair,
     tail,
     pair } from "../lib/list";

import {
    type Queue,
    head as q_head,
    dequeue,
    enqueue,
    empty } from "../lib/queue_array";

import {
    remove_dead_warriors,
     count_castles } from "./general_functions";

import { kill_player } from "../game";

import { w_names } from "./resources";

import {
    cursive_line,
    debug_log,
    empty_line,
    press_to_continue,
    print_to_game,
    get_random_int } from "./utility_functions";

import { death_text } from "./resources";

const prompt = require('prompt-sync')({ sigint: true }); // Needed to handle inputs


//Attack functions

/**
 * Changes an army from an array to a queue
 * @param {Army} army - the army that is changed into a queue
 * @returns {AttackArmy} - A queue of warriors (used to attack / defend)
 */
export function enqueue_army(army: Army): AttackArmy {
    const queue_army = empty<Warrior>();
    if(army.length == 0){
        return queue_army;
    }
    for (let a = 0; a < army.length; a = a + 1) {
        enqueue(army[a], queue_army);
    }

    return queue_army;
}


/**
 * A helper function that kills warriors from the army array, changing their alive status to false.
 * @param {Warrior} dead - The warrior that has been killed
 * @param {Army} army - The army the warrior is in
 * @modifies {Warrior} - Changes the warriors alive boolean to false
 */
export function unalive_warrior(dead: Warrior, army: Army){
    
    for(let i = 0; i < army.length; i++){
        if(army[i].name == dead.name){
            army[i].alive = false; // changes the warriors status boolean to false
            remake_warrior(dead, army);
        } else{}
    }
}


/**
 * When a warrior dies, it's child gets sent to the possible Warrior names.
 * @param {Warrior} dead - The dead warrior
 * @param {Army} army - The army that the dead warrior was/is in
 * @modifies {Queue<string>} - Adds the dead warriors name to the queue of names
 */
export function remake_warrior(dead: Warrior, army: Army) {
        if(dead.alive == false){
            let new_name = dead.name + "I";
            enqueue(new_name, w_names); 
        }
    }


/**
 * Changes the owner of a castle
 * @param {Castle} castle -The castle that is changing owner
 * @param {Player} new_player - The new owner of the castle
 * @param {Player} old_player - The player who previously owned the castle
 * @param {Army} army - The army that now is in the castle
 * @modifies {Player} - Changes both old and new players castle array
 * @modifies {Castle} - Changes the owner of the castle, as well as its' army
 */
export function castle_owner(castle : Castle, new_player : Player, old_player : Player, army : Army) {
    debug_log("gamla castle owner:   " + castle.owner);
    castle.owner = new_player[0]; // Changes the owner name of the castle
    castle.hp = army; // adds the incoming army to the castle

    let last_pos = new_player[1].length;    // might be able to be a const
    new_player[1][last_pos] = castle;  // adds the castle to the New Players castle array

    for (let i = 0; i < count_castles(tail(old_player)); i = i + 1) { // Loops over the player old players castle 
        if(tail(old_player)[i] == castle) {                                
            tail(old_player)[i] = undefined; // removes the castle from the previous owners castle array
                
            if (count_castles(old_player[1]) == 0 && old_player[0] != "UNDEFINED") { // Checks if player has no castles
                kill_player(old_player); // kills the player
            } else {}
            
        } else {}
    }
    debug_log("castle.owner:  " + castle.owner);
}


/**
 * Checks if an army is empty
 * @param {AttackArmy} army - The army that might be empty
 * @returns {Boolean} - Whether the army is empty or not
 */
export function is_army_empty(army : AttackArmy) : Boolean {
    if (q_head(army) == undefined || army[2].length < 1) {
        return true;
    } else {
        return false;
    }
}


/**
 * Returns true if the defender wins the battle and false if the attacker wins
 * @param {Warrior} attacker - The attacking warrior
 * @param {Warrior} defender - The defending warrior
 * @param {Army} army - The attacking army
 * @param {Castle} castle_army - The defending castle
 * @returns {Boolean} - If the defending warrior won or not
 */
export function fight(attacker: Warrior, defender: Warrior, army: Army, castle_army: Castle): Boolean {
        army = remove_dead_warriors(army);                      // Attacker army fix
        castle_army.hp = remove_dead_warriors(castle_army.hp);  //Def. army fix
        
        if(attacker === undefined || !attacker.alive){
            return true;
        }
        else if(defender === undefined || !defender.alive){
            return false;
        }
        
        console.log(`\u001b[32m`, defender.name,`\u001b[m` ,`is defending castle`, castle_army.position ,'against', `\u001b[31m`,attacker.name, `\u001b[m!`);
        while (true) {
            attacker.health -= defender.attack * get_random_int(0, 2);
            if (attacker.health <= 0) {
                death_text( "Attacker " + `\u001b[31m` + attacker.name +`\u001b[37m`, "Defender " + `\u001b[32m` + defender.name +`\u001b[37m`);
                unalive_warrior(attacker, army);
                empty_line();
                console.log(`\u001b[32m` + defender.name +`\u001b[37m`, ' defended the castle, surviving with ',`\u001b[33m` + defender.health +`\u001b[37m`, ' health!')
                empty_line();
                cursive_line();
                press_to_continue();
                return true;
            }
            defender.health -= attacker.attack * get_random_int(0, 2);
            if (defender.health <= 0) {
                death_text("Defender " + `\u001b[32m` + defender.name +`\u001b[37m`, "Attacker " + `\u001b[31m` + attacker.name +`\u001b[37m`,);
                unalive_warrior(defender, castle_army.hp);
                console.log(`\u001b[31m` + attacker.name + `\u001b[37m`, 'won the battle with ',`\u001b[33m` + attacker.health +`\u001b[37m`, 'health left!')
                empty_line()
                cursive_line();
                press_to_continue();
                return false;
            }
        }

    }


/**
 * Performs a battle between two armies in a castle
 * @param {Castle} castle - The castle where the battle takes place
 * @param {Player} attacking_player - The player attacking the castle
 * @param {Player} defending_player - The player that defending the castle
 * @param {Army} army - The attacking army
 * @return {Army} - The surviving army after the battle
 */
export function attack(castle : Castle, attacking_player : Player, defending_player : Player, army : Army) : Army {
    empty_line();
    empty_line();
    empty_line();
    //Helper: returns true if 
    function helper(Attacking_army: Army, castle_army: Castle): Pair<Boolean, Army> { 
        let defense_army = castle_army.hp;
        const attackers = enqueue_army(Attacking_army);
        const defenders = enqueue_army(defense_army);
        
        while (is_army_empty(attackers) == false && is_army_empty(defenders) == false) {
            
            let curr_attacker: Warrior = q_head(attackers);
            let curr_defender: Warrior = q_head(defenders);
            
            let def_win = fight(curr_attacker, curr_defender, Attacking_army, castle_army);
    
            if (def_win === true) { 
                dequeue(attackers);
            }
            else if (def_win === false) {
                dequeue(defenders);
            }

        }

        if (is_army_empty(defenders)) {
            return pair(false, queue_to_array(attackers)); // returns false if the attackers won together with the remaining attacking army.
        } else {
            return pair(true, queue_to_array(defenders)); // returns true if the defenders win together with the remaining defending army.
        }
        
    }

    const winner : Pair<Boolean, Army> = helper(army, castle);
    if (!winner[0]) {   //defender wins
        console.log("You have won the battle my liege! Congratulations, the castle is yours!");

        press_to_continue();
        empty_line()
        return (remove_dead_warriors(tail(winner))); 

    } else if (winner[0]) { //attacker wins
        empty_line();
        print_to_game("Our army is dead! The battle is lost!");
        print_to_game('But ' + army[0].name + ' managed to inform us of the enemy army before falling:');
        empty_line();
        castle.hp = remove_dead_warriors(castle.hp);
        for (let i = 0; i < castle.hp.length; i++) {
            print_to_game('Soldier name: ' + castle.hp[i].name +
            ' | Attack strength: ' + castle.hp[i].attack +
            ' | Health: ' + castle.hp[i].health);
            }
        castle.hp = winner[1];

        press_to_continue();
        return [];
    }

    return [];
}


/**
 * Changes a queue of warriors into an array
 * @param {AttackArmy} q - A queue of warriors
 * @returns {Army} - The army, turned into an array
 */
function queue_to_array(q : AttackArmy ) : Army {
        return q[2];
}