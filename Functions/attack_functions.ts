import { type Warrior, type Army, type Castle, type Player } from "../types";
import { type Pair, tail, pair } from "../lib/list";
import { type Queue, head, dequeue, enqueue, empty } from "../lib/queue_array";
import { getRandomInt, get_order_castles} from "./general_functions";
import { get_castle_array } from "./setup_functions";
import { kill_player } from "../game";

//Attack functions

/**
 * Changes an army from an array to a queue
 * @param army 
 * @returns A queue of warriors (used to attack / defend)
 */
export function enqueue_army(army: Army): Queue<Warrior> {
    const queue_army = empty<Warrior>()
    for (let a = 0; a < army.length; a = a + 1) {

        enqueue(army[a], queue_army);
    }
    return queue_army;
}

/**
 * A helper function that removes dead warriors from the players "Army" (Array)
 * @param dead is a {Warrior}
 * @param army is a {Army}
 * @returns Void
 */
function remove_dead_warrior(dead: Warrior, army: Army){
    // denna är mega fudge in the membraine
    for(let i = 0; i < army.length; i++){
        if(army[i]?.name == dead.name){
            army[i]!.alive = false; // denna är fugged
        }
        else{}
    }
}

/**
 * displays the death message when a soldier dies
 * @param dead - the warrior who has been killed
 * @param killer - the warrior who killed the other warrior
 */
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
            tail(new_player)[tail(new_player).length-1] = castle;
        } else {
        }
    }

    for (let i = 0; i < tail(old_player)!.length; i = i + 1) {
        if(tail(old_player)[i] == castle) {
            tail(old_player)[i] = undefined;
            console.log(get_order_castles(old_player)[2]);
                
            if (get_order_castles(old_player)[2] == undefined) {

                kill_player(old_player);
                console.log(old_player[0], " has fallen");
                old_player[0]="UNDEFINED";
            }
            
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

/**
 * retreats an army from the battlefield
 * @param army - the army that is retreating
 */
export function retreat(army : Queue<Warrior>, your_castle : Castle) {
}

/**
 * returns true if the defender wins the battle and false if the attacker wins
 * @param attacker - attacking warrior
 * @param defender - defending warrior
 * @param army - the attacking army
 * @param castle_army - the defending castle
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
 * Changes owner of the castle if neseccary after a battle has taken place
 * @param castle - the castle where the battle takes place
 * @param attacking_player - the player attacking the castle
 * @param defending_player - the player that defending the castle
 * @param army - the attacking army
 */
export function attack(castle : Castle, attacking_player : Player, defending_player : Player, army : Army) {
    function helper(Attacking_army: Army, castle_army: Castle): Pair<Boolean, Array<Warrior | undefined>> {
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
            return pair(true, Attackers[2]);
        } else {
            return pair(false, Defenders[2]);
        }
    }

    const winner : Pair<Boolean, Array<Warrior | undefined>> = helper(army, castle);
    if (winner[0]) {
        //console.log("TEst vi kom förbi");
        console.log("You have won the battle my liege! Congratulations, the castle is yours!");
        castle_owner(castle, attacking_player, defending_player, army);
        console.log("V vann");
    } else if (!winner[0]) {
        console.log("Our army is dead! The battle is lost!");
        castle.hp = winner[1];
    }
}