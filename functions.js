"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.spawn = exports.setup = exports.create_warrior = exports.create_army = exports.create_castle = exports.castle_turn = exports.turn = exports.is_army_empty = exports.castle_owner = exports.move = exports.finds_paths = exports.get_castles = exports.get_castle = exports.print_board = exports.fight = exports.attack = exports.enqueue_army = exports.train_warrior = exports.refresh_board = exports.getRandomInt = exports.death_text = void 0;
var list_1 = require("./lib/list");
var queue_array_1 = require("./lib/queue_array");
function death_text(dead, killer) {
    var strings = ["has been slain by",
        "got skewered by",
        "was defeated by",
        "got stabbed by",
        "got schooled by",
        "got gob smacked by",
        "got his manhood fried by"];
    var curr_event = strings[getRandomInt(0, 3)];
    console.log();
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
    console.log();
    console.log(dead.name, curr_event, killer.name);
    console.log();
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
    console.log();
}
exports.death_text = death_text;
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
var prompt = require('prompt-sync')({ sigint: true }); // Denna påstår ibland att det är error men det funkar ändå
// Variables
var I = true;
var O = false;
var mormors_kudde = {
    size: 5,
    adj: [
        [O, I, I, I, O], //0. from A 
        [I, O, I, O, I], //1. from B
        [I, I, O, I, I], //2. from C
        [I, O, I, O, I], //3. from D
        [O, I, I, I, O], //4. from E
    ]
};
var castles = [];
// board
// start nodes
var node1 = "1";
var node2 = "2";
var node5 = "5";
//unclaimed nodes
var node3 = "3x";
var node4 = "4x";
var nodes = [node1, node2, node3, node4, node5];
var map = [
    [" ", " ", " ", " ", nodes[0], " ", " ", " ", " "],
    [" ", " ", "/", " ", "|", " ", "\\", " "],
    [" ", "/", " ", " ", "|", " ", " ", "\\"],
    [nodes[1], "-", "-", nodes[2], "-", "-", nodes[3]],
    [" ", "\\", " ", " ", "|", " ", " ", "/", " "],
    [" ", " ", "\\", " ", "|", " ", "/", "", " "],
    [" ", " ", " ", " ", nodes[4], " ", " ", " ", " "]
];
// Functions
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
function refresh_board() {
    function get_castle_owners() {
        for (var i = 0; i < nodes.length; i++) {
            //print(nodes[0])
            nodes[i] = castles[i].position + castles[i].owner[0];
        }
    }
    /*
    node1 = ((castles[0].position) as number) + castles[0].owner[0];
    node1 = ((castles[0].position) as number) + castles[0].owner[0];
    node1 = ((castles[0].position) as number) + castles[0].owner[0];
    node1 = ((castles[0].position) as number) + castles[0].owner[0];
    node1 = ((castles[0].position) as number) + castles[0].owner[0];
    */
    get_castle_owners();
    map = [
        [" ", " ", " ", " ", nodes[0], " ", " ", " ", " "],
        [" ", " ", "/", " ", "|", " ", "\\", " "],
        [" ", "/", " ", " ", "|", " ", " ", "\\"],
        [nodes[1], "-", "-", nodes[2], "-", "-", nodes[3]],
        [" ", "\\", " ", " ", "|", " ", " ", "/", " "],
        [" ", " ", "\\", " ", "|", " ", "/", "", " "],
        [" ", " ", " ", " ", nodes[4], " ", " ", " ", " "]
    ];
}
exports.refresh_board = refresh_board;
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
 *
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
 * Take a player and an Attack Army, and if the
 * @param player is a pair(name:string, List<castle>)
 * @param army
 *
 * @returns Boolean, if you won the castle or not
 *
 */
function attack(Attacking_army, castle_army) {
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
        return true;
    }
    else {
        return false;
    }
}
exports.attack = attack;
/**
 *
 * @param attacker is a {Warrior}
 * @param defender is a {Warrior}
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
        attacker.health -= defender.attack * getRandomInt(0, 4);
        console.log(defender, "VS", attacker);
        if (attacker.health <= 0) {
            death_text(attacker, defender);
            remove_dead_warrior(attacker, army);
            return true;
        }
        defender.health -= attacker.attack * getRandomInt(0, 4);
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
 * Prints the board to the console
 * @param Array 2d array of the map
 * @return Does not return
 */
function print_board() {
    refresh_board();
    console.log("-------------------------------------------");
    for (var i = 0; i < map.length; i++) {
        console.log('\x1b[36m%s\x1b[0m', helper(map[i])); // black magic, Cyan Color
    }
    function helper(line) {
        var str = "";
        for (var j = 0; j < line.length; j++) {
            str += line[j];
        }
        return str;
    }
    console.log("-------------------------------------------");
}
exports.print_board = print_board;
/**
 * Gets an array of all the castles the player currently control.
 * @param player the player in question.
 * @returns Array<castle | undefined> of the castles
 */
function get_castle(player) {
    var _a;
    var castles = player[1];
    var print = "";
    for (var i = 0; i < castles.length; i = i + 1) {
        print += (_a = castles[i]) === null || _a === void 0 ? void 0 : _a.position;
        print += " ";
    }
    console.log(print);
    console.log('\x1b[36m%s\x1b[0m', "You rule over the following castles: ", print, '\x1b[37m\x1b');
}
exports.get_castle = get_castle;
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
            get_castle(player);
            var cstl = prompt("Which castle would you like to operate from? ");
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
    if (player_from !== player_to) {
        console.log(move_from.owner, "has declared war against", move_to.owner);
        attack(army, move_to);
    }
}
exports.move = move;
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
    // Någonstans ska vi föra in get_castles funktionen (väljer vilket slott man vill börja med)
    if (choice === "1") {
        //console.clear();
        var paths = finds_paths(castle, mormors_kudde); // Första castle
        console.log("You can move to the following castles: ", paths);
        var choice_1 = prompt("Choose your destination: ");
        var castle_to = castles[choice_1 - 1];
        //console.log(castle_to);
        move(castle, castle_to);
    }
    else if (choice === "2") {
        console.log("You are training: ", player[1][0].hp);
        train_warrior(castle.hp);
        console.log(castle.hp);
        return {};
    }
    /**
     * Creates a castle in setup phase
     * @param army
     * @param owner
     * @param position
     * @returns A castle
     */
}
exports.castle_turn = castle_turn;
function create_castle(army, owner, position) {
    var castle = { hp: army, owner: owner, position: position };
    return castle;
}
exports.create_castle = create_castle;
/**
 * Creates a an array of warriors
 *
 * @returns
 */
function create_army() {
    var army = [create_warrior()];
    return army;
}
exports.create_army = create_army;
/**
 * Creates a warrior (dictionary) with name, attack damage and health
 * @returns a Warrior
 */
function create_warrior() {
    var name = get_name();
    var warrior = { attack: 5, health: 100, name: name };
    return warrior;
}
exports.create_warrior = create_warrior;
/**
 * Warrior gets a name from queue
 * @returns string
 */
function get_name() {
    var name = (0, queue_array_1.head)(w_names);
    (0, queue_array_1.dequeue)(w_names);
    return name;
}
/**
 * Pick your King, and creates your army
 * @returns A complete setup of the game
 */
function setup() {
    var name_player1 = prompt("Enter player 1 name: ");
    var name_player2 = prompt("Enter player 2 name: ");
    var name_player3 = prompt("Enter player 3 name: ");
    //const player1 : Player = [name_player1! , [(create_castle(create_army(), name_player1, 1))]];
    var player1 = [name_player1, [(create_castle(create_army(), name_player1, 1)), (create_castle(create_army(), name_player1, 3))]];
    var player2 = [name_player2, [(create_castle(create_army(), name_player2, 2))]];
    var player3 = [name_player3, [(create_castle(create_army(), name_player3, 5))]];
    var AI1 = ["AI1", [create_castle(create_army(), "AI1", 4)]];
    nodes[0] += name_player1[0];
    nodes[1] += name_player2[0];
    nodes[4] += name_player3[0];
    castles[0] = player1[1][0];
    castles[1] = player2[1][0];
    castles[4] = player3[1][0];
    castles[2] = player1[1][1];
    castles[3] = AI1[1][0];
    //castles[3] = create_castle(create_army(), "AI", 3);
    //const AI2 : Player = ["AI2",[create_castle(create_army(), "AI2", 3)]]
    return [player1, player2, player3];
}
exports.setup = setup;
/**
 * Places soldiers in the starting castles
 * @param board - The new game board
 * @param position - The index of the castle
 *
 */
function spawn(Board) {
    // denna kanske inte behövs
}
exports.spawn = spawn;
