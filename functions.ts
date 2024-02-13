import { type List, type Pair, list, tail } from "./lib/list";
import { type Queue, head, dequeue, enqueue, empty } from "./lib/queue_array";
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

let castles : Array<Castle> = [];


// board

// start nodes
let node1 = "1";
let node2 = "2";
let node5 = "5";

//unclaimed nodes
let node3 = "3x"
let node4 = "4x";

let map = [
    [" "," "," "," ", node1," "," "," "," "],
    [" "," ","/"," ", "|"," ","\\"," "],
    [" ","/"," "," ", "|"," "," ","\\"],
    [node2,"-", "-", node3,"-","-",node4],
    [" ","\\"," "," ", "|"," "," ","/"," "],
    [" "," ","\\"," ", "|"," ","/",""," "],
    [" "," "," "," ", node5," "," "," "," "]
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

export function refresh_board(){
    map = map = [
        [" "," "," "," ", node1," "," "," "," "],
        [" "," ","/"," ", "|"," ","\\"," "],
        [" ","/"," "," ", "|"," "," ","\\"],
        [node2,"-", "-", node3,"-","-",node4],
        [" ","\\"," "," ", "|"," "," ","/"," "],
        [" "," ","\\"," ", "|"," ","/",""," "],
        [" "," "," "," ", node5," "," "," "," "]
    ];
}

export function train_warrior(army:Army): void {
    for(let w = 0; w < army.length; w = w + 1){
        let cur_war = army[w];
        cur_war.attack = cur_war.attack + 5;
        cur_war.health = cur_war.health + 5;
    }
}

/**
 * 
 * @param army 
 * @returns A queue of warriors (used to attack / defend)
 */
export function enqueue_army(army: Army): Queue<Warrior> {
    const queue_army = empty<Warrior>()
    for(let a = 0; a <= army.length; a = a + 1){
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

export function attack(Attacking_army: Army, castle: Castle): Boolean {
    let bool = false;
    let defense_army = castle.hp;
    const Attackers = enqueue_army(Attacking_army);
    const Defenders = enqueue_army(defense_army);
    while(bool === false){
        let curr_attacker: Warrior = head(Attackers)
        let curr_defender: Warrior = head(Defenders)
        if(Attackers[2].length === 0){          // If Attackers army is depleted:
            return bool = true; // temp return
        }else if(Defenders[2].length === 0){    // If defenders army is depleted:
           return bool = true; // temp return
        }
    }

    return bool;
}

/**
 * Prints the board to the console
 * @param Array 2d array of the map
 * @return Does not return
 */

export function print_board() {
    for (let i = 0; i < map.length; i++) {
        console.log('\x1b[36m%s\x1b[0m', helper(map[i])); // black magic 
    }

    function helper(line: Array<string>) {
        let str = "";

        for (let j = 0; j < line.length; j++) {
            str += line[j];
        }
        return str;
    }
}


function get_castle(index : number) : Castle {

    return castles[index];    

    
}
/**
 * Gets an array of all the castles the player currently control.
 * @param player the player in question.
 * @returns Array<string> of the castles 
 * 
 */
export function get_castles(player: Player) : List<string> {
    let castle_queue : Queue<Castle> = empty();
    if (tail(player).length > 1) {
    const cstl = prompt("Which castle would you like to start with? ");
        for (let i = 0; i < tail(player).length; i = i + 1) {
            if (i === cstl) {

            }
        }
    }
    let castle_list: Queue<Castle> = 
}


/**
 * Finds all possible paths from a castle
 * @param castle 
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
    const player_from : string = move_from.owner;
    console.log(move_from);
    console.log(move_to);

    const player_to : string = move_to.owner;
    const army = move_from.hp;
    
    if (player_from !== player_to) {
        console.log("war...");
        attack(army,move_to);
    }
    

}

/**
 * Changes the owner of a castle
 * @param Board - The game board where you can find the owner of the castle
 * @param castle - the castle that is changing owner
 * @param player - the new owner of the castle
 * @returns The updated board with the correct castle owners
 */
export function castle_owner(Board: MatrixGraph, castle : Castle, player : Player): MatrixGraph {
    tail(player)[tail(player).length] = castle;
    
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
        //console.clear();
        
        let paths = finds_paths(player[1][0], mormors_kudde); // Första castle
        console.log("You can move to the following castles: ", paths);
        let choice : number = prompt("Choose your destination: ") as number;

        let castle_to : Castle = castles[choice];

        move(player[1][0], castle_to);
        
    } else if (choice === "2") {
        console.log("You are training: ", player[1][0].hp);
        train_warrior(player[1][0].hp)
        console.log(player[1][0].hp)
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

    node1 += player1[0][0];
    node2 += player2[0][0];
    node5 += player3[0][0];

    castles[0] = player1[1][0];
    castles[1] = player2[1][0];
    castles[2] = player3[1][0];
    castles[3] = create_castle(create_army(),"AI", 3);
    castles[4] = create_castle(create_army(),"AI", 4);


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
