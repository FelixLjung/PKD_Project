import { type List, type Pair, list } from "./lib/list";
import { type Queue, head, dequeue } from "./lib/queue_array";
import { type MatrixGraph } from './lib/graphs';



let w_names: Queue<string> = [0, 2, ["Eva Darulova",    // Current: 18 warrrior-names
                                 "Jingwei",
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
                                "Thom Surströmming"]];

//Types
const prompt = require('prompt-sync')({ sigint: true }); // Denna påstår att det är error men det funkar ändå

type Army = Array<Warrior>;

type attack_army = Queue<Warrior>;

type Player = [string, List<Castle>];

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
    for (let i = 0; i < board.length; i++) { // funkar dåligt
        console.log(board[i].toString());
    }
}

/**
 * Moves an army from one castle to another, attacking if it is an enemy castle
 * @param Move_from - The castle the army is being moved from
 * @param Move_to - The castle the army is being moved to
 * @param Soldiers - The army being moved from one castle to another
 * @returns void
 */
export function move(Move_from: Castle, Move_to: Castle, Soldiers: attack_army): void {

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

}

export function create_castle(army : Army, owner : string, position : number) : Castle {
    let castle = {hp : army, owner : owner, position : position};
    
    return castle;
}

/**
 * Creates a an array of warriors       Funkar?
 *
 * @returns 
 */
export function create_army(): Army {
    let army : Army = [create_warrior()];

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
    const player1: Player = [name_player1!,list(create_castle(create_army(),name_player1,0))];
    const player2: Player = [name_player2!, list(create_castle(create_army(),name_player2,1))];
    const player3: Player = [name_player3!, list(create_castle(create_army(),name_player3,2))];

    return [player1, player2, player3];
}

/**
 * Places soldiers in the starting castles
 * @param board - The new game board
 * @param position - The index of the castle
 * 
 */
export function spawn(board: MatrixGraph, Castle: Castle) {
    

}
