import { type List, type Pair, list } from "./lib/list";
import { type Queue, head, dequeue, enqueue } from "./lib/queue_array";
import { type MatrixGraph } from './lib/graphs';



let w_names: Queue<string> = [0, 2, ["Eva Darulova",    // Current: 18 warrrior-names
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

//Types
const prompt = require('prompt-sync')({ sigint: true }); // Denna påstår ibland att det är error men det funkar ändå

type Army = Array<Warrior>;
type attack_army = Queue<Warrior>;
type Player = [string, Array<Castle>];
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

export function train_warrior(army:Army): void {
    for(let w = 0; w < army.length; w = w + 0){
        let cur_war = army[w];
        cur_war.attack = cur_war.attack + 5
        cur_war.health = cur_war.health + 5
    }
}


/**
 * Take a player and an Attack Army, and if the 
 * @param player is a pair(name:string, List<castle>)
 * @param army 
 * 
 * @returns Boolean, if you won the castle or not
 * 
 */

export function attack(player: Player, A_Army: Queue<Warrior>): Boolean {

    return false; // temp return
}

/**
 * Prints the board to the console
 * @param Array 2d array of the map
 * @return Does not return
 */
export function print_board(board: Board) {
    for (let i = 0; i < board.length; i++) {
        console.log('\x1b[36m%s\x1b[0m', helper(board[i])); // black magic 
    }

    function helper(line : Array<string>) {
        let str = "";

        for (let j = 0; j < line.length; j++) {
            str += line[j];
        }
        return str;
    }
}

/**
 * Gets an array of all the castles the player currently control.
 * @param player the player in question.
 * @returns Array<string> of the castles 
 * 
 */

export function get_castles(player: Player) {
    let castle_list: Array<string> = [];
    for (let i = 0; i < player[1].length; i++) {
        castle_list[i] = player[1][i].position + player[0][0];
    }
    return castle_list;
}

/**
 * Finds all possible paths from a castle
 * @param castle 
 */

export function finds_paths(castle : Castle, map : MatrixGraph) : Array<number> { 
    let position = castle.position;
    let paths: Array<number> = [];
    let spot: number = 0;
    for (let i = 0; i < map.adj[position].length; i = i + 1) {
        if (map.adj[position][i] === true) {
            paths[spot] = i;
            spot = spot + 1;
        }
    }
    return paths;
}

/**
 * Moves an army from one castle to another, attacking if it is an enemy castle
 * @param Move_from - The castle the army is being moved from
 * @param Move_to - The castle the army is being moved to
 * @param Soldiers - The army being moved from one castle to another
 * @returns void
 */
export function move(move_from: Castle, move_to: Castle, Soldiers: attack_army): void {
    const player_from = move_from.owner;
    const player_to = move_to.owner
    if (player_from !== player_to){
        console.log("War...");
    }

    
}

/**
 * Changes the owner of a castle
 * @param Board - The game board where you can find the owner of the castle
 * @returns The updated board with the correct castle owners
 */
export function castle_owner(Board: MatrixGraph): MatrixGraph {
    return {
        adj: [[false]]
        , size: 3
    };
}

/**
 * A players turn in game. Should be able to call multiple actions
 * Move and Attack.
 * Should Call other functions.
 * @param player is a pair(string, List)
 */
export function turn(player: Player) {
    console.log("You rule over the following castles: ", get_castles(player));
    console.log("What is your command, king ", player[0], "..?");
    const choice = prompt("1 : Move Army  \n  2: Train Army "); // Här borde vi ha något som dubbelkollar att inputen är valid

    if (choice === "1"){
        let paths = finds_paths(player[1][0]); // Första castle
        console.log("You are moving");
        
    } else if (choice === "2") {
        
        console.log("You are training");
    }
}

export function create_castle(army: Army, owner: string, position: number): Castle {
    let castle = { hp: army, owner: owner, position: position };

    return castle;
}

/**
 * Creates a an array of warriors       Funkar?
 *
 * @returns 
 */
export function create_army(): Army {
    let army: Army = [create_warrior()];

    return army;
}


/**
 * Creates a warrior (dictionary) with name, attack damage and health   Funkar?
 * @returns a Warrior
 */
export function create_warrior(): Warrior {
    let name = get_name();
    const warrior = { attack: 5, health: 10, name: name };
    return warrior;
}


/**
 * Warrior gets a name from queue       Funkar?
 * @returns string
 */
function get_name(): string {
    let name = head(w_names);
    dequeue(w_names);
    return name;
}

/**
 * Player Creation
 * @returns 
 */
export function setup(): Array<Player> {
    const name_player1 = prompt("Enter player 1 name: ");
    const name_player2 = prompt("Enter player 2 name: ");
    const name_player3 = prompt("Enter player 3 name: ");
    const player1: Player = [name_player1!, [(create_castle(create_army(), name_player1, 1))]];
    const player2: Player = [name_player2!, [(create_castle(create_army(), name_player2, 2))]];
    const player3: Player = [name_player3!, [(create_castle(create_army(), name_player3, 5))]];

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
