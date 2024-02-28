import { type Warrior, type Army, type Castle, type Player } from "../types";
import { type Pair, tail, pair } from "../lib/list";
import { type Queue, head, dequeue, enqueue, empty } from "../lib/queue_array";
import { army_size, get_random_int, get_order_castles, remove_dead_warriors} from "./general_functions";
import { create_army, get_castle_array } from "./setup_functions";
import { kill_player } from "../game";
import { w_names } from "./general_functions";
import { cursive_line, empty_line, print_to_game } from "./utility_functions";

const prompt = require('prompt-sync')({ sigint: true }); // Krävs för att hantera inputs

//Attack functions

/**
 * Changes an army from an array to a queue
 * @param army 
 * @returns A queue of warriors (used to attack / defend)
 */
export function enqueue_army(army: Army): Queue<Warrior> {
    const queue_army = empty<Warrior>();

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
function unalive_warrior(dead: Warrior, army: Army){
    
    for(let i = 0; i < army.length; i++){
        if(army[i].name == dead.name){
            army[i].alive = false; // changes the warriors status boolean to false
            remake_warrior(dead, army);
        } else{}
    }
}

/**
 * When a warrior dies, it's child gets sent to the possible Warrior names.
 * @param army 
 */
export function remake_warrior(dead: Warrior, army: Army) {
        if(dead.alive == false){
            let new_name = dead.name + "I";
            enqueue(new_name, w_names); 
        }
    }


/**
 * displays the death message when a soldier dies
 * @param dead - the warrior who has been killed
 * @param killer - the warrior who killed the other warrior
 */
export function death_text(dead: Warrior, killer: Warrior) {
    let d_name: string = dead.name;
    let k_name: string = killer.name;
    const strings: Array<string> = [`${d_name} has been slain by ${k_name}`,        //26 different texts
                                `${d_name} got skewered by ${k_name}`,
                                `${d_name} was defeated by ${k_name}`, 
                                `${k_name} poked a hole in ${d_name}'s throat`,
                                `${d_name} was schooled by ${k_name}`,
                                `${d_name} got gob smacked by ${k_name}`,
                                `${k_name} stole ${d_name}'s lunch!`,
                                `${d_name} took their last breath!`,
                                `${k_name} bashed in ${d_name}'s skull`,
                                `${d_name} got trampled on the battlefield.`,
                                `${d_name} died of conversing with ${k_name}`,
                                `${k_name} turned ${d_name} to rubble.`,
                                `${d_name} recieved a spanking by ${k_name}`,
                                `${d_name} lost in rock paper scissor and ${d_name} died from embarrassment`,
                                `${d_name} got thousand neddled by ${k_name}`,
                                `${d_name} lifespan was dramatically shorted by ${k_name}`,
                                `${d_name} got unalived`,
                                `${d_name} spoke on their dying breath... " Darnit... "`,
                                `${d_name} got Alt F4'd`,
                                `${k_name} deleted ${d_name}'s kneecaps`,
                                `${d_name} died of an allergic reaction!`,
                                `${d_name} laughed so hard, he vanished!`,
                                `${k_name} slapped ${d_name}'s face into oblivion`,
                                `${d_name} got stuck in an infinite loop!`,
                                `${k_name} broke ${d_name}'s back!`,
                                `${d_name} got sent to bed by ${k_name}`,
                                `${d_name} broke ${k_name}'s pinky promised, which resulted in instant death!`,
                                `${k_name} turned ${d_name} into a fine paste... Yummy!`];

    let curr_event = strings[get_random_int(0, 27)];
    empty_line();
    cursive_line();
    empty_line();
    console.log('\u001b[31m', curr_event, `\u001b[37m`); // No Abstracted function for printing with color
    empty_line();
}

/**
 * Changes the owner of a castle
 * @param castle - the castle that is changing owner
 * @param new_player - the new owner of the castle
 * @param old_player - the player who previously owned the castle
 * @param army - the army that now is in the castle
 */
export function castle_owner(castle : Castle, new_player : Player, old_player : Player, army : Army) {

    //console.log(old_player[0]);

    // ändra castles owner 
    // ändra castles army
    // lägg till castle i nya spelarens array av castles
    // ta bort castle från gamla spelarens array av castles

    castle.owner = new_player[0];
    castle.hp = army;

    let last_pos = new_player[1].length;
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


    for (let i = 0; i < tail(old_player)!.length; i = i + 1) {
        if(tail(old_player)[i] == castle) {
            tail(old_player)[i] = undefined;
            //console.log(get_order_castles(old_player)[2]);
                
            if (get_order_castles(old_player)[2] == undefined) {

                kill_player(old_player);
                console.log(old_player[0], " has fallen");
                console.log();
                old_player[0] = "UNDEFINED";
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
        
        console.log(defender.name, 'is defending castle', castle_army.position ,'against', attacker.name, '!');
        console.log();
        while (true) {
            //await delay(1000);
            //await new Promise(f => setTimeout(f, 1000));
            attacker.health -= defender.attack * get_random_int(0, 3);
            if (attacker.health <= 0) {
                death_text(attacker, defender);
                unalive_warrior(attacker, army);
                console.log()
                console.log(`\u001b[32m`, defender.name,`\u001b[37m`, 'defended the castle, surviving with',`\u001b[35m`, defender.health,`\u001b[37m`, 'health!')
                console.log();
                console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
                return true;
            }
            defender.health -= attacker.attack * get_random_int(0, 3);
            if (defender.health <= 0) {
                death_text(defender, attacker);
                unalive_warrior(defender, castle_army.hp);
                console.log(`\u001b[32m`,attacker.name,`\u001b[37m`, 'won the battle with',`\u001b[35m`, attacker.health,`\u001b[37m`, 'health left!')
                console.log();
                console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
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
export function attack(castle : Castle, attacking_player : Player, defending_player : Player, army : Army) : Army {
    function helper(Attacking_army: Army, castle_army: Castle): Pair<Boolean, Army> {
        let defense_army = castle_army.hp;
        const attackers = enqueue_army(Attacking_army);
        const defenders = enqueue_army(defense_army);
        
        while (is_army_empty(attackers) == false && is_army_empty(defenders) == false) {
            let curr_attacker: Warrior = head(attackers);
            let curr_defender: Warrior = head(defenders);
            
            let def_win = fight(curr_attacker, curr_defender, Attacking_army, castle_army);
    
            if (def_win === true) { 
                dequeue(attackers);
            }
            else if (def_win === false) {
                dequeue(defenders);
            }

        }

        if (is_army_empty(defenders)) {
            //console.log(attackers);
            return pair(true, queue_to_array(attackers)); // returns true if the attackers won together with the remaining attacking army.
        } else {
            return pair(false, queue_to_array(defenders)); // returns false if the defenders win together with the remaining defending army.
        }
        
    }

    const winner : Pair<Boolean, Army> = helper(army, castle);
    if (winner[0]) {
        console.log("You have won the battle my liege! Congratulations, the castle is yours!");
        castle_owner(castle, attacking_player, defending_player, winner[1]);

        prompt();
        //console.log(tail(winner));
        return (remove_dead_warriors(tail(winner))); 
    } else if (!winner[0]) {
        print_to_game("Our army is dead! The battle is lost!");
        print_to_game('But' + army[0].name + 'managed to inform us of the enemy army before falling:');
        remove_dead_warriors(castle.hp); // får error 27/2, testar lägga till detta
        for (let i = 0; i < castle.hp.length; i++) {
            print_to_game('Soldier name: ' + castle.hp[i].name +
            ' | Attack strength: ' + castle.hp[i].attack +
            ' | Health: ' + castle.hp[i].health);
            }
        castle.hp = winner[1];

        prompt();
        console.clear();
    }

    return create_army();

    function delay(ms: number) {
        // denna kommer nog inte användas alls 
        return new Promise( resolve => setTimeout(resolve, ms) );
    }

    function queue_to_array(q : Queue<Warrior> ) : Array<Warrior> {
        return q[2];
    }

} 