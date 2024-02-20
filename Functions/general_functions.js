"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_name = exports.remove_player = exports.army_size = exports.recruit_warrior = exports.castle_turn = exports.turn = exports.move = exports.finds_paths = exports.get_castles = exports.train_warrior = exports.getRandomInt = void 0;
var queue_array_1 = require("../lib/queue_array");
var list_1 = require("../lib/list");
var game_1 = require("../game");
var attack_functions_1 = require("./attack_functions");
var print_functions_1 = require("./print_functions");
var setup_functions_1 = require("./setup_functions");
var prompt = require('prompt-sync')({ sigint: true }); // Krävs för att hantera inputs
var w_names = [0,
    2,
    ["Eva Darulova", // Current: 18 warrrior-names OK
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
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
exports.getRandomInt = getRandomInt;
/**
 * Improves every warrior in an armys stats
 * @param army The army that gets trained
 */
function train_warrior(army) {
    for (var w = 0; w < army.length; w = w + 1) {
        var cur_war = army[w];
        if (cur_war == undefined) {
            continue;
        }
        else {
            cur_war.attack = cur_war.attack + 5;
            cur_war.health = cur_war.health + 5;
        }
    }
}
exports.train_warrior = train_warrior;
/**
 * The player defermins the order in which they want to make their moves from their castles.
 * @param player the player in question.
 * @returns Array<string> of the castles
 */
function get_castles(player) {
    var castle_queue = (0, queue_array_1.empty)();
    var player_castles = (0, list_1.tail)(player);
    function includes(Castles, index) {
        for (var i = 0; i < Castles.length; i = i + 1) {
            if (Castles[i].position == index) {
                return true;
            }
        }
        return false;
    }
    function in_q(castle_queue, castle) {
        for (var i = 0; i < castle_queue[2].length; i = i + 1) {
            if (castle_queue[2][i] == castle) {
                return true;
            }
            else {
            }
        }
        return false;
    }
    function get_position(castles, index) {
        for (var i = 0; i < castles.length; i = i + 1) {
            if (castles[i] !== undefined) {
                if (castles[i].position == index) {
                    return castles[i];
                }
            }
        }
        return undefined;
    }
    if (player_castles.length > 1) {
        while (castle_queue[1] != (0, list_1.tail)(player).length) {
            (0, print_functions_1.print_castle)(player);
            var cstl = prompt(" Which castle would you like to operate from? ");
            if (in_q(castle_queue, get_position(player_castles, cstl))) {
                console.log("You can't choose the same castle twice!");
            }
            else if (includes(player_castles, cstl)) {
                (0, queue_array_1.enqueue)(get_position(player_castles, cstl), castle_queue);
            }
            else {
                console.log("You don't own this Castle");
            }
        }
    }
    else if (player_castles.length == 1) {
        (0, queue_array_1.enqueue)(player_castles[0], castle_queue);
    }
    return (castle_queue);
}
exports.get_castles = get_castles;
/**
 * Finds all possible paths from a castle
 * @param castle - the castle the player wants to move from
 * @param map - the map currently in playgit
 * @returns paths - and array of all castles a player can move to
 */
function finds_paths(castle, map) {
    var position = castle.position - 1;
    var paths = [];
    var spot = 0;
    for (var i = 0; i < map.adj[position].length; i = i + 1) {
        if (map.adj[position][i] === true) {
            paths[spot] = i + 1;
            spot = spot + 1;
        }
    }
    return paths;
}
exports.finds_paths = finds_paths;
/**
 * Moves an army from one castle to another, attacking if it is an enemy castle
 * @param Move_from - The castle the army is being moved from
 * @param Move_to - The castle the army is being moved to
 * @param Soldiers - The army being moved from one castle to another // tror inte denna behövs
 * @returns void
 */
function move(move_from, move_to) {
    var player_from = move_from.owner;
    console.log(move_from);
    console.log(move_to);
    var player_to = move_to.owner;
    var army = move_from.hp;
    var attacking_player = undefined;
    var defending_player = undefined;
    var player_list = (0, game_1.get_player_list)();
    for (var i = 0; i < player_list.length; i = i + 1) {
        if (player_list[i][0] == move_from.owner) {
            attacking_player = player_list[i];
        }
        else if (player_list[i][0] == move_to.owner) {
            defending_player = player_list[i];
        }
    }
    if (player_from !== player_to) {
        console.log(move_from.owner, "has declared war against", move_to.owner);
        (0, attack_functions_1.attack)(move_to, attacking_player, defending_player, army);
    }
}
exports.move = move;
function turn(player) {
    var castle_queue = get_castles(player);
    for (var i = 0; i < castle_queue[1]; i++) {
        castle_turn(player, (0, queue_array_1.head)(castle_queue));
        (0, queue_array_1.dequeue)(castle_queue);
    }
}
exports.turn = turn;
/**
 * A players turn in game. Should be able to call multiple actions
 * Move and Attack.
 * Should Call other functions.
 * @param player is a pair(string, List)
 */
function castle_turn(player, castle) {
    console.log("What is your command, king ", player[0], "..?");
    var choice = prompt("1 : Move Army  \n  2: Train Army "); // Här borde vi ha något som dubbelkollar att inputen är valid
    // Någonstans ska vi föra in print_castles funktionen (väljer vilket slott man vill börja med)
    if (choice === "1") {
        //console.clear();
        var paths = finds_paths(castle, setup_functions_1.mormors_kudde); // Första castle
        console.log("You can move to the following castles: ", paths);
        var choice_1 = prompt("Choose your destination: ");
        var castle_to = (0, setup_functions_1.get_castle_array)()[choice_1 - 1]; // fixa get funktions
        //console.log(castle_to);
        move(castle, castle_to);
    }
    else if (choice === "2") {
        console.log("You are training: ", player[1][0].hp);
        train_warrior(castle.hp);
        console.log(castle.hp);
        return {};
    }
}
exports.castle_turn = castle_turn;
/**
 * Places soldiers in the starting castles
 * @param board - The new game board
 * @param position - The index of the castle
 *
 */
function recruit_warrior(Board) {
    // denna kanske inte behövs
}
exports.recruit_warrior = recruit_warrior;
function army_size() {
}
exports.army_size = army_size;
function remove_player() {
}
exports.remove_player = remove_player;
/**
 * Warrior gets a name from queue
 * @returns string
 */
function get_name() {
    var name = (0, queue_array_1.head)(w_names);
    (0, queue_array_1.dequeue)(w_names);
    return name;
}
exports.get_name = get_name;
