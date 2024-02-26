"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.attack = exports.fight = exports.retreat = exports.is_army_empty = exports.castle_owner = exports.death_text = exports.remake_warrior = exports.enqueue_army = void 0;
var list_1 = require("../lib/list");
var queue_array_1 = require("../lib/queue_array");
var general_functions_1 = require("./general_functions");
var game_1 = require("../game");
var general_functions_2 = require("./general_functions");
var prompt = require('prompt-sync')({ sigint: true }); // Krävs för att hantera inputs
//Attack functions
/**
 * Changes an army from an array to a queue
 * @param army
 * @returns A queue of warriors (used to attack / defend)
 */
function enqueue_army(army) {
    var queue_army = (0, queue_array_1.empty)();
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
    var _a;
    // denna är mega fudge in the membraine
    for (var i = 0; i < army.length; i++) {
        if (((_a = army[i]) === null || _a === void 0 ? void 0 : _a.name) == dead.name) {
            army[i].alive = false; // denna är fugged
            remake_warrior(dead, army);
        }
        else { }
    }
}
/**
 * When a warrior dies, it's child gets sent to the possible Warrior names.
 * @param army
 */
function remake_warrior(dead, army) {
    if (dead.alive == false) {
        var new_name = dead.name + "I";
        (0, queue_array_1.enqueue)(new_name, general_functions_2.w_names);
    }
}
exports.remake_warrior = remake_warrior;
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
    var curr_event = strings[(0, general_functions_1.getRandomInt)(0, 7)];
    console.log();
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
    console.log();
    console.log(dead.name, curr_event, killer.name);
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
    //console.log(old_player[0]);
    // ändra castles owner 
    // ändra castles army
    // lägg till castle i nya spelarens array av castles
    // ta bort castle från gamla spelarens array av castles
    castle.owner = new_player[0];
    castle.hp = army;
    var last_pos = new_player[1].length;
    new_player[1][last_pos] = castle;
    /*
    for (let i = 0; i < tail(new_player)!.length; i = i + 1) {
        if(tail(new_player)[i] == undefined) {
            tail(new_player)[i] = castle;
            break;
        } else if (i == tail(new_player).length && tail(new_player)[i] != undefined) {
            tail(new_player)[i] = castle;
        } else {
        }
    }
    */
    for (var i = 0; i < (0, list_1.tail)(old_player).length; i = i + 1) {
        if ((0, list_1.tail)(old_player)[i] == castle) {
            (0, list_1.tail)(old_player)[i] = undefined;
            //console.log(get_order_castles(old_player)[2]);
            if ((0, general_functions_1.get_order_castles)(old_player)[2] == undefined) {
                (0, game_1.kill_player)(old_player);
                console.log(old_player[0], " has fallen");
                old_player[0] = "UNDEFINED";
            }
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
    console.log(defender.name, 'is defending castle', castle_army.position, 'against', attacker.name, '!');
    while (true) {
        //await delay(1000);
        //await new Promise(f => setTimeout(f, 1000));
        attacker.health -= defender.attack * (0, general_functions_1.getRandomInt)(0, 4);
        if (attacker.health <= 0) {
            death_text(attacker, defender);
            unalive_warrior(attacker, army);
            console.log(defender.name, 'defended the castle, surviving with', defender.health, 'health!');
            console.log();
            console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
            return true;
        }
        defender.health -= attacker.attack * (0, general_functions_1.getRandomInt)(0, 4);
        if (defender.health <= 0) {
            death_text(defender, attacker);
            unalive_warrior(defender, castle_army.hp);
            console.log(attacker.name, 'won the battle with', attacker.health, 'health left!');
            console.log();
            console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
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
            return (0, list_1.pair)(true, attackers[2]);
        }
        else {
            return (0, list_1.pair)(false, defenders[2]);
        }
    }
    var winner = helper(army, castle);
    if (winner[0]) {
        //console.log("TEst vi kom förbi");
        console.log("You have won the battle my liege! Congratulations, the castle is yours!");
        //console.log(defending_player[0]);
        castle_owner(castle, attacking_player, defending_player, army); // Denna funkar inte med botar
        //console.log("V vann");
        prompt();
    }
    else if (!winner[0]) {
        console.log("Our army is dead! The battle is lost!");
        castle.hp = winner[1];
        prompt();
    }
    function delay(ms) {
        return new Promise(function (resolve) { return setTimeout(resolve, ms); });
    }
}
exports.attack = attack;
