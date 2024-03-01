"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.attack = exports.fight = exports.retreat = exports.is_army_empty = exports.castle_owner = exports.remake_warrior = exports.unalive_warrior = exports.enqueue_army = void 0;
var list_1 = require("../lib/list");
var queue_array_1 = require("../lib/queue_array");
var general_functions_1 = require("./general_functions");
var game_1 = require("../game");
var resources_1 = require("./resources");
var utility_functions_1 = require("./utility_functions");
var resources_2 = require("./resources");
var prompt = require('prompt-sync')({ sigint: true }); // Krävs för att hantera inputs
//Attack functions
/**
 * Changes an army from an array to a queue
 * @param army
 * @returns A queue of warriors (used to attack / defend)
 */
function enqueue_army(army) {
    var queue_army = (0, queue_array_1.empty)();
    if (army.length == 0) {
        return queue_army;
    }
    for (var a = 0; a < army.length; a = a + 1) {
        (0, queue_array_1.enqueue)(army[a], queue_army);
    }
    return queue_army;
}
exports.enqueue_army = enqueue_army;
/**
 * A helper function that removes dead warriors from the players "Army" (Array)
 * @param dead is a {Warrior}
 * @param army is a {Army}
 * @returns Void
 */
function unalive_warrior(dead, army) {
    for (var i = 0; i < army.length; i++) {
        if (army[i].name == dead.name) {
            army[i].alive = false; // changes the warriors status boolean to false
            remake_warrior(dead, army);
        }
        else { }
    }
}
exports.unalive_warrior = unalive_warrior;
/**
 * When a warrior dies, it's child gets sent to the possible Warrior names.
 * @param army
 */
function remake_warrior(dead, army) {
    if (dead.alive == false) {
        var new_name = dead.name + "I";
        (0, queue_array_1.enqueue)(new_name, resources_1.w_names);
    }
}
exports.remake_warrior = remake_warrior;
/**
 * Changes the owner of a castle
 * @param castle - the castle that is changing owner
 * @param new_player - the new owner of the castle
 * @param old_player - the player who previously owned the castle
 * @param army - the army that now is in the castle
 */
//console.log(old_player[0]);
// ändra castles owner 
// ändra castles army
// lägg till castle i nya spelarens array av castles
// ta bort castle från gamla spelarens array av castles
function castle_owner(castle, new_player, old_player, army) {
    castle.owner = new_player[0]; // Changes the owner name of the castle
    castle.hp = army; // adds the incoming army to the castle
    var last_pos = new_player[1].length; // might be able to be a const
    new_player[1][last_pos] = castle; // adds the castle to the New Players castle array
    // for (let i = 0; i < tail(old_player)!.length; i = i + 1) { // old, should not use .length, use count_Castles() instead
    for (var i = 0; i < (0, general_functions_1.count_castles)((0, list_1.tail)(old_player)); i = i + 1) { // Loops over the player old players castle 
        if ((0, list_1.tail)(old_player)[i] == castle) {
            (0, list_1.tail)(old_player)[i] = undefined; // removes the castle from the previous owners castle array
            if ((0, general_functions_1.count_castles)(old_player[1]) == 0 && old_player[0] != "UNDEFINED") { // Checks if player has no castles
                (0, game_1.kill_player)(old_player); // kills the player
            }
            else { }
        }
        else { }
    }
}
exports.castle_owner = castle_owner;
/**
 * checks if an army is empty
 * @param army - the army that might be empty
 * @returns Boolean - whether the army is empty or not
 */
function is_army_empty(army) {
    if ((0, queue_array_1.head)(army) == undefined || army[2].length < 1) {
        return true;
    }
    else {
        return false;
    }
}
exports.is_army_empty = is_army_empty;
/**
 * retreats an army from the battlefield
 * @param army - the army that is retreating
 */
function retreat(army, your_castle) {
}
exports.retreat = retreat;
/**
 * returns true if the defender wins the battle and false if the attacker wins
 * @param attacker - attacking warrior
 * @param defender - defending warrior
 * @param army - the attacking army
 * @param castle_army - the defending castle
 * @returns
 */
function fight(attacker, defender, army, castle_army) {
    army = (0, general_functions_1.remove_dead_warriors)(army); // Attacker army fix
    castle_army.hp = (0, general_functions_1.remove_dead_warriors)(castle_army.hp); //Def. army fix
    if (attacker === undefined || !attacker.alive) {
        return true;
    }
    else if (defender === undefined || !defender.alive) {
        return false;
    }
    console.log(defender.name, 'is defending castle', castle_army.position, 'against', attacker.name, '!');
    (0, utility_functions_1.empty_line)();
    while (true) {
        attacker.health -= defender.attack * (0, general_functions_1.get_random_int)(0, 2);
        if (attacker.health <= 0) {
            (0, resources_2.death_text)("Attacker " + "\u001B[31m" + attacker.name + "\u001B[37m", "Defender " + "\u001B[32m" + defender.name + "\u001B[37m");
            unalive_warrior(attacker, army);
            console.log();
            console.log("\u001B[32m" + defender.name + "\u001B[37m", ' defended the castle, surviving with ', "\u001B[33m" + defender.health + "\u001B[37m", ' health!');
            console.log();
            console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
            (0, utility_functions_1.press_to_continue)();
            return true;
        }
        defender.health -= attacker.attack * (0, general_functions_1.get_random_int)(0, 2);
        if (defender.health <= 0) {
            (0, resources_2.death_text)("Defender " + "\u001B[32m" + defender.name + "\u001B[37m", "Attacker " + "\u001B[31m" + attacker.name + "\u001B[37m");
            unalive_warrior(defender, castle_army.hp);
            console.log("\u001B[31m" + attacker.name + "\u001B[37m", 'won the battle with ', "\u001B[33m" + attacker.health + "\u001B[37m", 'health left!');
            console.log();
            console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
            (0, utility_functions_1.press_to_continue)();
            return false;
        }
    }
}
exports.fight = fight;
/**
 * Changes owner of the castle if neseccary after a battle has taken place
 * @param castle - the castle where the battle takes place
 * @param attacking_player - the player attacking the castle
 * @param defending_player - the player that defending the castle
 * @param army - the attacking army
 */
function attack(castle, attacking_player, defending_player, army) {
    console.log("defending army...", castle.hp);
    //Helper: returns true if 
    function helper(Attacking_army, castle_army) {
        var defense_army = castle_army.hp;
        var attackers = enqueue_army(Attacking_army);
        var defenders = enqueue_army(defense_army);
        while (is_army_empty(attackers) == false && is_army_empty(defenders) == false) {
            var curr_attacker = (0, queue_array_1.head)(attackers);
            var curr_defender = (0, queue_array_1.head)(defenders);
            var def_win = fight(curr_attacker, curr_defender, Attacking_army, castle_army);
            if (def_win === true) {
                (0, queue_array_1.dequeue)(attackers);
            }
            else if (def_win === false) {
                (0, queue_array_1.dequeue)(defenders);
            }
        }
        if (is_army_empty(defenders)) {
            //console.log(attackers);
            return (0, list_1.pair)(false, queue_to_array(attackers)); // returns false if the attackers won together with the remaining attacking army.
        }
        else {
            return (0, list_1.pair)(true, queue_to_array(defenders)); // returns true if the defenders win together with the remaining defending army.
        }
    }
    var winner = helper(army, castle);
    if (!winner[0]) { //defender wins
        console.log("You have won the battle my liege! Congratulations, the castle is yours!");
        //castle_owner(castle, attacking_player, defending_player, winner[1]);
        (0, utility_functions_1.press_to_continue)();
        //console.log(tail(winner));
        return ((0, general_functions_1.remove_dead_warriors)((0, list_1.tail)(winner)));
    }
    else if (winner[0]) { //attacker wins
        (0, utility_functions_1.print_to_game)("Our army is dead! The battle is lost!");
        (0, utility_functions_1.print_to_game)('But ' + army[0].name + ' managed to inform us of the enemy army before falling:');
        castle.hp = (0, general_functions_1.remove_dead_warriors)(castle.hp); // får error 27/2, testar lägga till detta
        for (var i = 0; i < castle.hp.length; i++) {
            (0, utility_functions_1.print_to_game)('Soldier name: ' + castle.hp[i].name +
                ' | Attack strength: ' + castle.hp[i].attack +
                ' | Health: ' + castle.hp[i].health);
        }
        castle.hp = winner[1];
        (0, utility_functions_1.press_to_continue)();
        return [];
    }
    return [];
    function delay(ms) {
        // denna kommer nog inte användas alls 
        return new Promise(function (resolve) { return setTimeout(resolve, ms); });
    }
    function queue_to_array(q) {
        return q[2];
    }
}
exports.attack = attack;
