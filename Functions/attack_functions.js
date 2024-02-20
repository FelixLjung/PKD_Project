"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.attack = exports.fight = exports.retreat = exports.is_army_empty = exports.castle_owner = exports.death_text = exports.enqueue_army = void 0;
var list_1 = require("../lib/list");
var queue_array_1 = require("../lib/queue_array");
var general_functions_1 = require("./general_functions");
//Attack functions
/**
 * Changes an army from an array to a queue
 * @param army
 * @returns A queue of warriors (used to attack / defend)
 */
function enqueue_army(army) {
    var queue_army = (0, queue_array_1.empty)();
    for (var a = 0; a <= army.length; a = a + 1) {
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
function remove_dead_warrior(dead, army) {
    var _a;
    for (var i = 0; i < army.length; i++) {
        if (((_a = army[i]) === null || _a === void 0 ? void 0 : _a.name) == dead.name) {
            army[i] = undefined;
        }
        else { }
    }
}
/**
 * displays the death message when a soldier dies
 * @param dead - the warrior who has been killed
 * @param killer - the warrior who killed the other warrior
 */
function death_text(dead, killer) {
    var strings = ["has been slain by",
        "got skewered by",
        "was defeated by",
        "got stabbed by",
        "got schooled by",
        "got gob smacked by",
        "got his manhood fried by"];
    var curr_event = strings[(0, general_functions_1.getRandomInt)(0, 3)];
    console.log();
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
    console.log();
    console.log(dead.name, curr_event, killer.name);
    console.log();
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
    console.log();
}
exports.death_text = death_text;
/**
 * Changes the owner of a castle
 * @param castle - the castle that is changing owner
 * @param new_player - the new owner of the castle
 * @param old_player - the player who previously owned the castle
 * @param army - the army that now is in the castle
 */
function castle_owner(castle, new_player, old_player, army) {
    castle.owner = new_player[0];
    castle.hp = army;
    for (var i = 0; i < (0, list_1.tail)(new_player).length; i = i + 1) {
        if ((0, list_1.tail)(new_player)[i] == undefined) {
            (0, list_1.tail)(new_player)[i] = castle;
            break;
        }
        else if (i == (0, list_1.tail)(new_player).length - 1 && (0, list_1.tail)(new_player)[i] != undefined) {
            (0, list_1.tail)(new_player)[(0, list_1.tail)(new_player).length] = castle;
        }
        else {
        }
    }
    for (var i = 0; i < (0, list_1.tail)(old_player).length; i = i + 1) {
        if ((0, list_1.tail)(old_player)[i] == castle) {
            (0, list_1.tail)(old_player)[i] = undefined;
        }
        else {
        }
    }
}
exports.castle_owner = castle_owner;
/**
 * checks if an army is empty
 * @param army - the army that might be empty
 * @returns Boolean - whether the army is empty or not
 */
function is_army_empty(army) {
    if ((0, queue_array_1.head)(army) == undefined) {
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
    if (attacker === undefined) {
        return true;
    }
    else if (defender === undefined) {
        return false;
    }
    while (true) {
        attacker.health -= defender.attack * (0, general_functions_1.getRandomInt)(0, 4);
        console.log(defender, "VS", attacker);
        if (attacker.health <= 0) {
            death_text(attacker, defender);
            remove_dead_warrior(attacker, army);
            return true;
        }
        defender.health -= attacker.attack * (0, general_functions_1.getRandomInt)(0, 4);
        console.log(attacker, "VS", defender);
        if (defender.health <= 0) {
            death_text(defender, attacker);
            remove_dead_warrior(defender, castle_army.hp);
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
    function helper(Attacking_army, castle_army) {
        var defense_army = castle_army.hp;
        var Attackers = enqueue_army(Attacking_army);
        var Defenders = enqueue_army(defense_army);
        while (is_army_empty(Attackers) == false && is_army_empty(Defenders) == false) {
            var curr_attacker = (0, queue_array_1.head)(Attackers);
            var curr_defender = (0, queue_array_1.head)(Defenders);
            var def_win = fight(curr_attacker, curr_defender, Attacking_army, castle_army);
            if (def_win === true) {
                (0, queue_array_1.dequeue)(Attackers);
            }
            else if (def_win === false) {
                (0, queue_array_1.dequeue)(Defenders);
            }
        }
        if (is_army_empty(Defenders)) {
            return (0, list_1.pair)(true, Attackers[2]);
        }
        else {
            return (0, list_1.pair)(false, Defenders[2]);
        }
    }
    var winner = helper(army, castle);
    if (winner[0]) {
        console.log("You have won the battle my liege! Congratulations, the castle is yours!");
        castle_owner(castle, attacking_player, defending_player, army);
    }
    else if (winner[0] == false) {
        console.log("Our army is dead! The battle is lost!");
        castle.hp = winner[1];
    }
}
exports.attack = attack;
