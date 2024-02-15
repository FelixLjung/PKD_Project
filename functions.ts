import { type List, type Pair, list, tail, is_null } from "./lib/list";
import { type Queue, head, dequeue, enqueue, empty, is_empty } from "./lib/queue_array";
import { type MatrixGraph } from './lib/graphs';
import { create } from "domain";

export function death_text(dead: Warrior, killer: Warrior) {
    const strings: Array<string> = ["has been slain by", 
                                "got skewered by",
                                "was defeated by", 
                                "got stabbed by",
                                "got schooled by",
                                "got gob smacked by",
                                "got his manhood fried by"];

    let curr_event = strings[getRandomInt(0, 3)];
    console.log();
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
    console.log();
    console.log(dead.name, curr_event, killer.name);
    console.log();
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
    console.log();

}


let w_names: Queue<string> = [0,
         2,
         ["Eva Darulova",    // Current: 18 warrrior-names OK
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


const prompt = require('prompt-sync')({ sigint: true }); // Denna påstår ibland att det är error men det funkar ändå

//Types
type Army = Array<Warrior | undefined>;
type attack_army = Queue<Warrior>;
export type Player = [string, Array<Castle | undefined >];
type Board = Array<Array<string>>;
type Warrior = {
    attack: number
    health: number
    name: string

};

type Castle = {
    hp: Army,
    owner: string
    position: number
}

// Variables

let I = true;
let O = false;

const mormors_kudde: MatrixGraph = {
    size: 5,
    adj:
        [
            [O, I, I, I, O], //0. from A 
            [I, O, I, O, I], //1. from B
            [I, I, O, I, I], //2. from C
            [I, O, I, O, I], //3. from D
            [O, I, I, I, O], //4. from E
        ]

}

let castles: Array<Castle> = [];


// board

// start nodes
let node1 = "1";
let node2 = "2";
let node5 = "5";

//unclaimed nodes
let node3 = "3x";
let node4 = "4x";

let nodes = [node1,node2,node3,node4,node5];

let map = [
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
export function getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min);
}

export function refresh_board() {
    
    function get_castle_owners(){
        for (let i = 0; i < nodes.length; i++ ){
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

/**
 * Improves every warrior in an armys stats 
 * @param army The army that gets trained
 */

export function train_warrior(army: Army) {
    for (let w = 0; w < army.length; w = w + 1) {
        let cur_war = army[w];
        if(cur_war == undefined){
            continue;
        }
        
        else{
            cur_war!.attack = cur_war!.attack + 5;
            cur_war!.health = cur_war!.health + 5;
        }
    }
}

/**
 * 
 * @param army 
 * @returns A queue of warriors (used to attack / defend)
 */
export function enqueue_army(army: Army): Queue<Warrior> {
    const queue_army = empty<Warrior>()
    for (let a = 0; a <= army.length; a = a + 1) {
        enqueue(army[a], queue_army);
    }
    return queue_army;
}


/**
 * Take a player and an Attack Army, and if the 
 * @param player is a pair(name:string, List<castle>)
 * @param army 
 * 
 * @returns Boolean, if you won the castle or not
 * 
 */

export function attack(Attacking_army: Army, castle_army: Castle): Boolean {
    let defense_army = castle_army.hp;
    const Attackers = enqueue_army(Attacking_army);
    const Defenders = enqueue_army(defense_army);
    
    while (is_army_empty(Attackers) == false && is_army_empty(Defenders) == false) {
        let curr_attacker: Warrior = head(Attackers);
        let curr_defender: Warrior = head(Defenders);
        
        let def_win = fight(curr_attacker, curr_defender, Attacking_army, castle_army);

        if (def_win === true) { 
            dequeue(Attackers);
        }
        else if (def_win === false) {
            dequeue(Defenders);
        }
    }

    if (is_army_empty(Defenders)) {
        return true;
    } else {
        return false;
    }
}

/**
 * 
 * @param attacker is a {Warrior}
 * @param defender is a {Warrior}
 * @returns 
 */
export function fight(attacker: Warrior, defender: Warrior, army: Army, castle_army: Castle): boolean {
    if(attacker === undefined){
        return true;
    }
    else if(defender === undefined){
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

/**
 * A helper function that removes dead warriors from the players "Army" (Array)
 * @param dead is a {Warrior}
 * @param army is a {Army}
 * @returns Void
 */
function remove_dead_warrior(dead: Warrior, army: Army){
    for(let i = 0; i < army.length; i++){
        if(army[i]?.name == dead.name){
            army[i] = undefined;
        }
        else{}
    }
}

/**
 * Prints the board to the console
 * @param Array 2d array of the map
 * @return Does not return
 */

export function print_board() {
    refresh_board();
    console.log("-------------------------------------------");
    for (let i = 0; i < map.length; i++) {
        console.log('\x1b[36m%s\x1b[0m', helper(map[i])); // black magic, Cyan Color
    }

    function helper(line: Array<string>) {
        let str = "";

        for (let j = 0; j < line.length; j++) {
            str += line[j];
        }
        return str;
    }
    console.log("-------------------------------------------");
}

/**
 * Gets an array of all the castles the player currently control.
 * @param player the player in question.
 * @returns Array<castle | undefined> of the castles
 */
export function get_castle(player: Player) {

    let castles = player[1];
    let print = "";


    for(let i = 0; i < castles.length; i = i + 1 ){
        print += castles[i]?.position;
        print += " "

    }
    console.log(print);
    console.log('\x1b[36m%s\x1b[0m',"You rule over the following castles: ", print, '\x1b[37m\x1b');
}

/**
 * The player defermins the order in which they want to make their moves from their castles.
 * @param player the player in question.
 * @returns Array<string> of the castles
 */
export function get_castles(player : Player) : Queue<Castle> {
    let castle_queue : Queue<Castle> = empty();
    const player_castles : Array<Castle | undefined> = tail(player);

    function includes(Castles : Array<Castle | undefined>, index : number ) : Boolean {
        for (let i = 0; i < Castles.length; i = i + 1) {
            if (Castles[i]!.position == index) {
                return true;
            }
        }
        return false;
    }

    function in_q(castle_queue : Queue<Castle>, castle : Castle | undefined) : Boolean {
        for (let i = 0; i < castle_queue[2].length; i = i + 1) {
            if (castle_queue[2][i] == castle) {
                return true;
            } else {

            }
        }
        return false;
    }

    function get_position(castles : Array<Castle | undefined>, index : number) : Castle | undefined {
        for(let i = 0; i < castles.length; i = i + 1) {
            if (castles[i] !== undefined) {
                if (castles[i]!.position == index) {
                    return castles[i];
                }
            }
        }
        return undefined;
    }

    if (player_castles.length > 1) {
        while (castle_queue[1] != tail(player).length) {
            get_castle(player);
            const cstl : number = prompt("Which castle would you like to operate from? ") as number
            if (in_q(castle_queue, get_position(player_castles, cstl))) {
                console.log("You can't choose the same castle twice!")
            } else if (includes(player_castles, cstl)) {
                enqueue(get_position(player_castles, cstl), castle_queue);
            } else {
                console.log("You don't own this Castle");
            }
        }
    } else if (player_castles.length == 1) {
        enqueue(player_castles[0], castle_queue);
    }
    return(castle_queue);
}

/**
 * Finds all possible paths from a castle
 * @param castle - the castle the player wants to move from
 * @param map - the map currently in playgit
 * @returns paths - and array of all castles a player can move to
 */

export function finds_paths(castle : Castle, map : MatrixGraph) : Array<number> {
    let position = castle.position - 1;
    let paths : Array<number> = [];
    let spot : number = 0;
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
    const player_from: string = move_from.owner;
    console.log(move_from);
    console.log(move_to);

    const player_to: string = move_to.owner;
    const army = move_from.hp;

    if (player_from !== player_to) {
        console.log(move_from.owner,"has declared war against", move_to.owner);
        attack(army, move_to);
    }
}

/**
 * Changes the owner of a castle
 * @param castle - the castle that is changing owner
 * @param new_player - the new owner of the castle
 * @param old_player - the player who previously owned the castle
 * @param army - the army that now is in the castle
 */
export function castle_owner(castle : Castle, new_player : Player, old_player : Player, army : Army) {
    castle.owner = new_player[0];
    castle.hp = army;

    for (let i = 0; i < tail(new_player)!.length; i = i + 1) {
        if(tail(new_player)[i] == undefined) {
            tail(new_player)[i] = castle;
            break;
        } else if (i == tail(new_player).length - 1 && tail(new_player)[i] != undefined) {
            tail(new_player)[tail(new_player).length] = castle;
        } else {
        }
    }

    for (let i = 0; i < tail(old_player)!.length; i = i + 1) {
        if(tail(old_player)[i] == castle) {
            tail(old_player)[i] = undefined;
        } else {
        }
    }
}

/**
 * checks if an army is empty
 * @param army - the army that might be empty
 * @returns Boolean - whether the army is empty or not
 */
export function is_army_empty(army : Queue<Warrior>) : Boolean {
    if (head(army) == undefined) {
        return true;
    } else {
        return false;
    }
}

export function turn(player : Player){

    let castle_queue = get_castles(player);

    for(let i = 0; i < castle_queue[1]; i++){
        
        castle_turn(player, head(castle_queue));
        dequeue(castle_queue);
    }
    
}

/**
 * A players turn in game. Should be able to call multiple actions
 * Move and Attack.
 * Should Call other functions.
 * @param player is a pair(string, List)
 */
export function castle_turn(player: Player, castle : Castle) {
    
    console.log("What is your command, king ", player[0], "..?");
    const choice = prompt("1 : Move Army  \n  2: Train Army "); // Här borde vi ha något som dubbelkollar att inputen är valid

    // Någonstans ska vi föra in get_castles funktionen (väljer vilket slott man vill börja med)
    if (choice === "1") {
        //console.clear();
        
        let paths = finds_paths(castle!, mormors_kudde); // Första castle
        console.log("You can move to the following castles: ", paths);
        let choice: number = prompt("Choose your destination: ") as number;

        let castle_to: Castle = castles[choice-1];
        //console.log(castle_to);
        move(castle!, castle_to);

    } else if (choice === "2") {
        console.log("You are training: ", player[1][0]!.hp);
        train_warrior(castle.hp);
        console.log(castle.hp);
        return {}
    }

    /**
     * Creates a castle in setup phase
     * @param army 
     * @param owner 
     * @param position 
     * @returns A castle
     */

}


export function create_castle(army: Army, owner: string, position: number): Castle {
    let castle = { hp: army, owner: owner, position: position };

    return castle;
}

/**
 * Creates a an array of warriors
 *
 * @returns 
 */
export function create_army(): Army {
    let army: Army = [create_warrior()];

    return army;
}


/**
 * Creates a warrior (dictionary) with name, attack damage and health
 * @returns a Warrior
 */
export function create_warrior(): Warrior {
    let name = get_name();

    const warrior = { attack: 5, health: 100, name: name };
    return warrior;
}


/**
 * Warrior gets a name from queue
 * @returns string
 */
function get_name(): string {
    let name = head(w_names);
    dequeue(w_names);
    return name;
}

/**
 * Pick your King, and creates your army
 * @returns A complete setup of the game
 */
export function setup(): Array<Player> {
    const name_player1 = prompt("Enter player 1 name: ");
    const name_player2 = prompt("Enter player 2 name: ");
    const name_player3 = prompt("Enter player 3 name: ");

    //const player1 : Player = [name_player1! , [(create_castle(create_army(), name_player1, 1))]];
    const player1: Player = [name_player1!, [(create_castle(create_army(), name_player1, 1)), (create_castle(create_army(), name_player1, 3))]];
    const player2: Player = [name_player2!, [(create_castle(create_army(), name_player2, 2))]];
    const player3: Player = [name_player3!, [(create_castle(create_army(), name_player3, 5))]];

    const AI1 : Player = ["AI1",[create_castle(create_army(), "AI1", 4)]]


    nodes[0] += name_player1[0];
    nodes[1] += name_player2[0];
    nodes[4] += name_player3[0];

    castles[0] = player1[1][0]!;
    castles[1] = player2[1][0]!;
    castles[4] = player3[1][0]!;
    castles[2] = player1[1][1]!;
    castles[3] = AI1[1][0]!;




    //castles[3] = create_castle(create_army(), "AI", 3);
    
    //const AI2 : Player = ["AI2",[create_castle(create_army(), "AI2", 3)]]
    

    return [player1, player2, player3];
}




/**
 * Places soldiers in the starting castles
 * @param board - The new game board
 * @param position - The index of the castle
 * 
 */
export function spawn(Board: MatrixGraph) {
    // denna kanske inte behövs

}




