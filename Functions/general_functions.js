"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove_dead = exports.split_army = exports.count_castles = exports.get_name = exports.remove_player = exports.army_size = exports.recruit_warrior = exports.castle_turn = exports.check_if_cpu = exports.turn = exports.move = exports.finds_paths = exports.get_order_castles = exports.train_warrior = exports.getRandomInt = exports.w_names = void 0;
var queue_array_1 = require("../lib/queue_array");
var list_1 = require("../lib/list");
var game_1 = require("../game");
var attack_functions_1 = require("./attack_functions");
var print_functions_1 = require("./print_functions");
var setup_functions_1 = require("./setup_functions");
var prompt = require('prompt-sync')({ sigint: true }); // Krävs för att hantera inputs
exports.w_names = [0,
    2,
    ["Eva Darulova", // Current: 37 warrrior-names
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
            cur_war.attack = cur_war.attack + getRandomInt(5, 8);
            cur_war.health = cur_war.health + getRandomInt(5, 10);
        }
    }
}
exports.train_warrior = train_warrior;
/**
 * The player determines the order in which they want to make their moves from their castles.
 * @param player the player in question.
 * @returns Array<string> of the castles
 */
function get_order_castles(player) {
    var castle_queue = (0, queue_array_1.empty)();
    var player_castles = [];
    for (var i = 0; i < (0, list_1.tail)(player).length; i = i + 1) {
        if ((0, list_1.tail)(player)[i] != undefined) {
            player_castles[player_castles.length] = (0, list_1.tail)(player)[i];
        }
    }
    function includes(Castles, index, player) {
        for (var i = 0; i < Castles.length; i = i + 1) {
            if (Castles[i].position == index && Castles[i].owner == player[0]) {
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
        while (castle_queue[1] != (0, list_1.tail)(player).length) {
            (0, print_functions_1.print_castle)(player);
            //console.log(player_castles);
            var cstl = prompt(" Which castle would you like to operate from? ");
            if (in_q(castle_queue, get_position(player_castles, cstl))) {
                console.log("You can't choose the same castle twice!");
            }
            else if (includes(player_castles, cstl, player)) {
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
exports.get_order_castles = get_order_castles;
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
    (0, print_functions_1.print_board)();
    var player_from = move_from.owner;
    //console.log(move_from);
    //console.log(move_to);
    var player_to = move_to.owner;
    var army = move_from.hp; // här kan det vara något fel
    var attacking_player = undefined;
    var defending_player = undefined;
    var player_list = (0, game_1.get_player_list)();
    for (var i = 0; i < player_list.length; i = i + 1) { // detta är fugded, botarna finns inte med i player_list
        if (player_list[i][0] == move_from.owner) { // detta borde abstraktas tll en ny fuktion då
            attacking_player = player_list[i];
        }
        else if (player_list[i][0] == move_to.owner) {
            defending_player = player_list[i];
        }
    }
    function get_player_from_castle(castle) {
    }
    if (player_from != player_to) {
        console.log(move_from.owner, "has declared war against", move_to.owner);
        (0, attack_functions_1.attack)(move_to, attacking_player, defending_player, army);
    }
    else if (player_from == player_to) {
        for (var i = 0; i < move_from.hp.length; i++) {
            move_to.hp[move_to.hp.length + i] = move_from.hp[i];
            move_from.hp = [];
            console.log('move_from', move_from.hp);
            console.log('move_to', move_to.hp);
        }
    }
    //console.log("VI är i move");
}
exports.move = move;
function turn(player) {
    var castle_queue = get_order_castles(player);
    for (var i = 0; i < castle_queue[1]; i++) {
        castle_turn(player, (0, queue_array_1.head)(castle_queue));
        (0, queue_array_1.dequeue)(castle_queue);
    }
}
exports.turn = turn;
/**
 *  checks if a player is a AI
 * @param player either a player or a player name
 * @returns true if the player has a name that starts with CPU
 */
function check_if_cpu(player) {
    var name = "";
    if (typeof (player) == "string") {
        name = player[0] + player[1] + player[2];
    }
    else {
        name = player[0][0] + player[0][1] + player[0][2];
    }
    //str.match(/.{1,3}/g)
    if (name == "CPU") {
        return true;
    }
    else {
        return false;
    }
}
exports.check_if_cpu = check_if_cpu;
/**
 * A players turn in game. Should be able to call multiple actions
 * Move and Attack.
 * Should Call other functions.
 * @param player is a pair(string, List)
 */
function castle_turn(player, castle) {
    var bool = true;
    while (bool) {
        (0, print_functions_1.print_board)();
        //let text1 = "currently in"
        console.log('\u001b[3m', "Currently Residing in Castle ", castle.position, '\u001b[m');
        (0, print_functions_1.print_army)(castle);
        console.log("What is your command, king ", player[0], "..?");
        console.log("1 : Move Army");
        console.log("2: Train Army");
        var choice = prompt(); // Här borde vi ha något som dubbelkollar att inputen är valid
        // Någonstans ska vi föra in print_castles funktionen (väljer vilket slott man vill börja med)
        if (choice === "1") {
            //console.clear();
            var paths = finds_paths(castle, setup_functions_1.mormors_kudde); // Första castle
            console.log("You can move to the following castles: ", paths);
            var choice_1 = prompt("Choose your destination: ");
            var castle_to = (0, setup_functions_1.get_castle_array)()[choice_1 - 1]; // fixa get funktions
            //console.log(castle_to);
            bool = false;
            move(castle, castle_to);
        }
        else if (choice === "2") {
            console.log('You are training:');
            for (var i = 0; i < player[1][0].hp.length; i++) {
                console.log(player[1][0].hp[i].name);
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
exports.castle_turn = castle_turn;
/**
 * Recruits a new warrior to a castle
 * @param castle - the castle which is recruiting the new warrior
 */
function recruit_warrior(castle) {
    var num = getRandomInt(1, 3);
    if (num == 1) {
        castle.hp[castle.hp.length] = (0, setup_functions_1.create_warrior)(5, 100);
    }
    else if (num == 2) {
        castle.hp[castle.hp.length] = (0, setup_functions_1.create_warrior)(7, 75);
    }
    else if (num == 3) {
        castle.hp[castle.hp.length] = (0, setup_functions_1.create_warrior)(10, 55);
    }
}
exports.recruit_warrior = recruit_warrior;
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
    var name = (0, queue_array_1.head)(exports.w_names);
    (0, queue_array_1.dequeue)(exports.w_names);
    return name;
}
exports.get_name = get_name;
function count_castles(castle_arr) {
    var count = 0;
    for (var i = 0; i < castle_arr.length; i++) {
        //console.log(castle_arr[i]);
        if (castle_arr[i] != undefined) {
            count++;
        }
    }
    return count;
}
exports.count_castles = count_castles;
/**
 * Takes the army of castle and SHOULD split the army in 2 when we want to move from one place
 * to then next.            (CALLAS EJ ÄN)
 * @param castle
 * @returns
 */
function split_army(castle) {
    var _a;
    var bool = true; //For the while loop
    var all_in_army = []; //temporary array of warriors (all alive warriors)
    var return_army = []; //The warriors that we're moving
    while (bool) {
        console.log("Your army has", all_in_army.length, "warriors...");
        var choice = prompt("How many warriors would you like to move?: ");
        if (choice > 0 && choice <= all_in_army.length) { //Choose the amount of warriors
            for (var a = 0; 0 <= choice; a++) {
                if (((_a = all_in_army[a]) === null || _a === void 0 ? void 0 : _a.alive) && all_in_army[a] != undefined) {
                    return_army[return_army.length] = all_in_army[a];
                }
            }
            bool = false;
        }
        else {
            console.log("Not valid number, try again.");
        }
    }
    return return_army; //The amount of warriors we want to move
}
exports.split_army = split_army;
/**
 * Removes all dead warriors in a castle    (FUNKAR EJ ÄN, ändrar ej i castle(Army), CALLAS EJ)
 * @param army
 */
function remove_dead(army) {
    var _a;
    var alive_in_army = []; //temporary array of warriors (all alive warriors)
    if (army.length == 0) {
        return army = alive_in_army;
    }
    for (var i = 0; i < army.length; i++) { // Loop that takes out all alive warriors in Army
        if ((_a = army[i]) === null || _a === void 0 ? void 0 : _a.alive) {
            alive_in_army[alive_in_army.length] = army[i];
        }
        else {
            continue;
        }
    }
    return alive_in_army;
}
exports.remove_dead = remove_dead;
