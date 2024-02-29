"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove_dead_warriors = exports.merge_army = exports.split_army = exports.alive_in_army = exports.count_castles = exports.get_first_warrior_name = exports.remove_player = exports.army_size = exports.remake_warrior = exports.heal_warrior = exports.recruit_warrior = exports.castle_turn = exports.check_if_cpu = exports.turn = exports.move = exports.finds_paths = exports.get_order_castles = exports.train_warrior = exports.get_random_int = exports.w_names = void 0;
var queue_array_1 = require("../lib/queue_array");
var list_1 = require("../lib/list");
var game_1 = require("../game");
var attack_functions_1 = require("./attack_functions");
var print_functions_1 = require("./print_functions");
var setup_functions_1 = require("./setup_functions");
var utility_functions_1 = require("./utility_functions");
var utility_functions_2 = require("./utility_functions");
var prompt = require('prompt-sync')({ sigint: true }); // Krävs för att hantera inputs
exports.w_names = [0,
    2,
    ["Eva Darulova", // Current: 65 warrrior-names
        "Jingwei Hu",
        "Johannes Borgström",
        "Zhanwei Yu",
        "Thom Surströmming",
        "Carl Erik Plopp",
        "Runar Gravstein",
        "Ernst Greve",
        "Hjalmar Storfot",
        "Bosse Brunklimp",
        "Lillemor Jumm",
        "Gustav Backlund",
        "Hans Hansson",
        "Frans Storm",
        "Berit Storm",
        "Tor Hoppetoss",
        "Fred von Pickelroy",
        "Björn Olmedo",
        "Xin Shen",
        "Jimmy Viking",
        "Fredrik Blåtand",
        "Göran Borkavik",
        "Sigvard Bjelkengren",
        "Hans Hansson",
        "Peter Niclass",
        "Tubbe Tonker",
        "Frans Tonker",
        "Per Jutterström",
        "Miro Ali Akbar",
        "Fader Gustav",
        "Dogge Doggelito",
        "Bartek Bunko",
        "Wille den snygge",
        "Kristian Luuk",
        "Börje Flemming",
        "Johanna Grönsaksson",
        "Henning Bollmark",
        "Krudel Haestre",
        "Movitz Grus",
        "Ronken af Bonken",
        "Dani af Ljusdal",
        "Göran Brunklimp",
        "Junior Brunklimp",
        "Ash Ketch",
        "Musk El",
        "Lars-Åke Nordén",
        "Helga Hammerhead",
        "Matilda Mildew",
        "Oswald the Oblivious",
        "Cedric the Clumsy",
        "Gilbert Garlicbreath",
        "Lil' D Plunderpants",
        "Ser Loin Raw",
        "Lord Farquad",
        "Shrek De la Burro",
        "Tobias Wrigstad",
        "David Attenborough",
        "Teddybjörnen Fredriksson",
        "Freddy Kalas",
        "Tomten",
        "Bert Fylking",
        "Arne Weise",
        "Lisa af Bänkpressen",
        "Göran Pson",
        "Tjark Weber"]];
// General Functions
/**
 * Chooses a random number between [min] and [max].
 * @param min is a number. Represents the lowest number on the die
 * @param max is a {number}. Represents the hightes number on the die
 * @returns a random number / integer.
 */
function get_random_int(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
exports.get_random_int = get_random_int;
/**
 * Improves every warrior in an armys stats
 * @param army The army that gets trained
 * @returns the trained Army.
 */
function train_warrior(army) {
    var temp_arr = [];
    var j = 0;
    for (var w = 0; w < army.length; w = w + 1) {
        var cur_war = army[w];
        if (cur_war == undefined || cur_war.alive == false) {
            continue;
        }
        else {
            cur_war.attack = cur_war.attack + get_random_int(1, 4);
            cur_war.health = cur_war.health + get_random_int(5, 10);
            temp_arr[j] = cur_war;
            j++;
        }
    }
    return temp_arr;
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
    for (var i = 0; i < (0, list_1.tail)(player).length; i = i + 1) { // loops over the array of castles
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
        while (castle_queue[1] != count_castles((0, list_1.tail)(player))) { // 
            (0, print_functions_1.print_castle)(player);
            //console.log(player_castles);
            var cstl = prompt(" Which castle would you like to operate from? ");
            if (in_q(castle_queue, get_position(player_castles, cstl))) {
                (0, utility_functions_2.print_to_game)("You can't choose the same castle twice!");
            }
            else if (includes(player_castles, cstl, player)) {
                (0, queue_array_1.enqueue)(get_position(player_castles, cstl), castle_queue);
            }
            else {
                (0, utility_functions_2.print_to_game)("You don't own this Castle");
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
    var player_from = move_from.owner;
    var player_to = move_to.owner;
    var survivors = [];
    //console.log(move_from);
    //console.log(move_to);
    var army = move_from.hp;
    var attacking_player = undefined;
    var defending_player = undefined;
    var player_list = (0, game_1.get_player_list)();
    //Detta borde bli en egen funktion ABSTRAHERA
    for (var i = 0; i < player_list.length; i = i + 1) { // Loops over all players,
        if (player_list[i][0] == move_from.owner) { // Retrieves the type Player from the "owner"
            attacking_player = player_list[i];
        }
        else if (player_list[i][0] == move_to.owner) { // Retrieves the type Player from the "owner"
            defending_player = player_list[i];
        }
    }
    var split = split_army(move_from); //Här splittas Attacking army i två [0 = moving, 1 = staying]
    //console.log(move_from.position);
    //console.log(attacking_player![1]);
    var moving_army = split[0];
    console.log(" De som FLYTTAS", moving_army);
    var staying_army = split[1];
    console.log(" De som STANNAR", staying_army);
    move_from.hp = staying_army; // De som ska stanna stannar, 
    //denna gjordes förut bara när man rörde sig till sitt egna castle,
    // inte när man attackerade, staying army ska ju alltid staya 
    if (player_from != player_to) { // if we find an opponent
        (0, utility_functions_2.print_to_game)(move_from.owner + " has declared war against " + move_to.owner);
        move_to.hp = remove_dead_warriors(move_to.hp); // Defending army clear the dead
        if (move_to.hp.length != 0) { //if army is not empty (we attack)
            survivors = (0, attack_functions_1.attack)(move_to, attacking_player, defending_player, moving_army);
            if (survivors.length != 0) {
                (0, attack_functions_1.castle_owner)(move_to, attacking_player, defending_player, survivors);
            }
        }
        else { // If def. castle is empty, we change owner
            console.log('The castle was empty my lord! Free for the taking!');
            (0, attack_functions_1.castle_owner)(move_to, attacking_player, defending_player, moving_army);
        }
    }
    else if (player_from == player_to) { // Move to your own castle
        for (var i = 0; i < move_from.hp.length; i++) { //
            //move_to.hp[move_to.hp.length + i] = move_from.hp[i];
            move_from.hp = staying_army; // Remaining warriors who didnt move, returns to the castle army 
            console.log('move_from', move_from.hp);
            console.log('move_to', move_to.hp); // GÖR DESSA SNYGGA!
        }
    }
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
        name = player[0] + player[1] + player[2]; // gets the first three letters
    }
    else {
        name = player[0][0] + player[0][1] + player[0][2]; // gets the first three letters
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
    castle.hp = remove_dead_warriors(castle.hp);
    //console.log(castle.hp);
    var healed_warriors = [];
    var j = 0;
    for (var i = 0; i < castle.hp.length; i++) { //Beginning of turn if warr has below 40 hp, heals them up to 40hp
        var curr_warr = castle.hp[i];
        if (curr_warr.health > 0 && curr_warr.health < 40) {
            heal_warrior(curr_warr);
            healed_warriors[j] = curr_warr.name;
            j++;
        }
    }
    if (healed_warriors.length > 0) {
        console.log("Your wounded warriors regained some of their health!");
    }
    (0, print_functions_1.print_board)();
    while (bool) {
        console.log('\u001b[3m', "Currently Residing in Castle ", castle.position, '\u001b[m'); // Displays the current castle in cursive text
        (0, print_functions_1.print_army)(castle); // Displays the army currently station in the active castle
        console.log("What is your command, king ".concat(player[0], " ..?"));
        (0, utility_functions_2.empty_line)();
        console.log("\u001B[33m", "1:", "\u001B[37m", "Move Army"); // Input option 1, move army red
        console.log("\u001B[33m", "2:", "\u001B[37m", "Train Army"); // Input option 2, train army green
        var choice = prompt("  :  "); // Reads the player input 
        if (choice === "1") { // MOVE
            var paths = finds_paths(castle, setup_functions_1.mormors_kudde); // Finds all the neighbouring castles
            while (bool) { // Wrapping the input in a While loop to handle invalid inputs 
                (0, utility_functions_2.print_to_game)("You can move to the following castles: " + "\u001b[33m" + (0, utility_functions_1.format_array)(paths) + "\u001b[0m"); // Displays the neighbouring castles
                var choice_1 = prompt("Choose your destination: "); // Invariant must be number
                if (is_choice_in_paths(paths, choice_1)) { //  checks if the input is a valid path
                    for (var i = 0; i < paths.length; i++) {
                        bool = false;
                        // tror det ska vara såhär istället
                        /*
                        let castle_to: Castle = get_castle_array()[choice - 1];
                        move(castle!, castle_to);
                        */
                        // tror inte vi behöver denna väl?
                        if (choice_1 == paths[i]) { // if we make a correct choice.
                            var castle_to = (0, setup_functions_1.get_castle_array)()[choice_1 - 1];
                            //console.log(castle_to);
                            bool = false;
                            move(castle, castle_to);
                            //console.log(castle.hp);
                        }
                        else {
                            continue;
                        }
                    }
                }
                else { //Fail safe
                    (0, utility_functions_2.print_to_game)("Invalid move, try again!");
                    prompt("press Enter:");
                    //clear_terminal();
                }
            }
        }
        else if (choice === "2") { // TRAIN
            console.log('Your new and improved army:');
            //for (let i = 0; i < player[1][0]!.hp.length; i++) {
            //    console.log(player[1][0]!.hp[i]!.name);
            //}
            castle.hp = remove_dead_warriors(castle.hp);
            var trained_army = train_warrior(castle.hp);
            (0, utility_functions_2.print_line)();
            (0, utility_functions_2.print_to_game)(trained_army);
            (0, utility_functions_2.print_line)();
            bool = false;
        }
        else {
            (0, utility_functions_2.print_to_game)("Input is not valid, try again!");
            prompt("press Enter: ");
        }
    }
}
exports.castle_turn = castle_turn;
/**
 * Checks if choice exists in the paths array.
 * @param paths an array of numbers (nodes)
 * @returns a boolean (true if choice is in paths)
 */
function is_choice_in_paths(paths, choice) {
    for (var i = 0; i < paths.length; i++) {
        if (choice == paths[i]) {
            return true;
        }
        else {
            continue;
        }
    }
    return false; // if choice is not a possible path
}
/**
 * Recruits a new warrior to a castle
 * @param castle - the castle which is recruiting the new warrior
 */
function recruit_warrior(castle, index) {
    var num = get_random_int(0, 2);
    var len = castle.hp.length; //current players castle
    //console.log("length of castle.hp.length", len);
    //castle.hp[index] = create_warrior(5, 100);
    if (num == 0) {
        castle.hp[index] = (0, setup_functions_1.create_warrior)(5, 100);
    }
    else if (num == 1) {
        castle.hp[index] = (0, setup_functions_1.create_warrior)(7, 75);
    }
    else if (num == 2) {
        castle.hp[index] = (0, setup_functions_1.create_warrior)(10, 50);
    }
}
exports.recruit_warrior = recruit_warrior;
/**
 * After a battle, when their next turn starts, all surviving warriors in army gets healed to 50 hp
 * @param warrior
 */
function heal_warrior(warrior) {
    var war_hp = warrior.health;
    war_hp = 40;
    return warrior.name;
}
exports.heal_warrior = heal_warrior;
/**
 * When a warrior dies, it's child gets sent to the possible Warrior names.
 * @param army
 */
function remake_warrior(army) {
    var _a;
    for (var x = 0; x < army.length; x++) {
        if (army[x] == undefined || army[x].alive == false) {
            continue;
        }
        else {
            var new_name = ((_a = army[x]) === null || _a === void 0 ? void 0 : _a.name) + "I";
            (0, queue_array_1.enqueue)(new_name, exports.w_names);
        }
    }
}
exports.remake_warrior = remake_warrior;
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
function get_first_warrior_name() {
    var name = (0, queue_array_1.head)(exports.w_names);
    (0, queue_array_1.dequeue)(exports.w_names);
    return name;
}
exports.get_first_warrior_name = get_first_warrior_name;
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
 * Takes in an army with dead warriors. // Den tar ju inte levande warriors också???
 * @param castle
 * @returns An army with only the alive ones, becomes the new castle.hp // Nej den blir inte den nya castle.hp
 */
function alive_in_army(castle) {
    var alive_in_army = []; //temporary array of warriors (all alive warriors)
    var army = castle.hp;
    for (var curr_warr = 0; curr_warr < army.length; curr_warr++) { // Tar ut alla levande warr. // HURDÅ
        alive_in_army[alive_in_army.length] = army[curr_warr];
        (0, utility_functions_1.debug_log)(army[curr_warr]);
    }
    (0, utility_functions_1.debug_log)(alive_in_army);
    return alive_in_army;
}
exports.alive_in_army = alive_in_army;
/**
 * Takes the army of castle and SHOULD split the army in 2 when we want to move from one place
 * to then next.            (CALLAS EJ ÄN)
 * @param castle
 * @returns
 */
function split_army(castle) {
    var bool = true; //For the while loop
    var pair_army = []; // Returning
    var alive_army = alive_in_army(castle);
    var army = castle.hp;
    while (bool) { //This loop is for dividing the army into two.
        //Invariant choice got to be number!
        (0, utility_functions_2.print_to_game)("Your army has " + alive_army.length + " warriors...");
        var choice = prompt("How many warriors would you like to move?: ");
        if (parseInt(choice) > 0 && parseInt(choice) <= alive_army.length) { //Choose the amount of warriors
            var num = parseInt(choice);
            var move_a = army.slice(0, num);
            var stay_a = army.slice(num, army.length);
            pair_army[0] = move_a;
            pair_army[1] = stay_a;
            //console.log(pair_army[0]);
            //console.log(pair_army[1]);
            //            for (let a = 0; 0 < num; a++) {
            //                if (alive_army[a]?.alive && alive_army[a] != undefined) {
            //                    move_army[move_army.length] = alive_army[a];
            //                }
            //                
            //            }
            bool = false;
        }
        else {
            (0, utility_functions_2.print_to_game)("Not valid number, try again.");
        }
    }
    return pair_army; //The amount of warriors we want to move
}
exports.split_army = split_army;
/**
 *
 * @param a1 is an Army
 * @param a2 is an Army
 */
function merge_army(a1, a2) {
    if (a2 == undefined) {
        return a1;
    }
    var new_army = a1;
    var combined = a1.length + a2.length;
    for (var w = 0; w < a2.length; w++) {
        new_army[a1.length + w] = a2[w];
    }
    return new_army;
}
exports.merge_army = merge_army;
/**
 * Removes all dead warriors in a castle    (FUNKAR EJ ÄN, ändrar ej i castle(Army), CALLAS EJ)
 * @param army
 */
function remove_dead_warriors(army) {
    var _a;
    var alive_in_army = []; //temporary array of warriors (all alive warriors)
    var j = 0;
    if (army.length == 0) {
        return army = alive_in_army;
    }
    for (var i = 0; i < army.length; i++) { // Loop that takes out all alive warriors in Army
        if ((_a = army[i]) === null || _a === void 0 ? void 0 : _a.alive) {
            alive_in_army[j] = army[i];
        }
        else {
            continue;
        }
        j++;
    }
    return alive_in_army;
}
exports.remove_dead_warriors = remove_dead_warriors;
