import { type Warrior, type Army, type Castle, type Player } from "../types";
import { type Pair, tail, pair } from "../lib/list";
import { type Queue, head, dequeue, enqueue, empty } from "../lib/queue_array";
import { army_size, get_random_int, get_order_castles, remove_dead_warriors, count_castles} from "./general_functions";
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
    if(army.length == 0){
        return queue_army;
    }
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
export function death_text(dead: string, killer: string) {
    let d_name: string = dead;
    let k_name: string = killer;
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
    console.log(curr_event); // No Abstracted function for printing with color yet
    empty_line();
}

/**
 * Changes the owner of a castle
 * @param castle - the castle that is changing owner
 * @param new_player - the new owner of the castle
 * @param old_player - the player who previously owned the castle
 * @param army - the army that now is in the castle
 */

//console.log(old_player[0]);

    // ändra castles owner 
    // ändra castles army
    // lägg till castle i nya spelarens array av castles
    // ta bort castle från gamla spelarens array av castles

export function castle_owner(castle : Castle, new_player : Player, old_player : Player, army : Army) {

    castle.owner = new_player[0]; // Changes the owner name of the castle
    castle.hp = army; // adds the incoming army to the castle

    let last_pos = new_player[1].length;    // might be able to be a const
    new_player[1][last_pos] = castle;  // adds the castle to the New Players castle array

    

    // for (let i = 0; i < tail(old_player)!.length; i = i + 1) { // old, should not use .length, use count_Castles() instead
    for (let i = 0; i < count_castles(tail(old_player)); i = i + 1) { // Loops over the player old players castle 
        if(tail(old_player)[i] == castle) {                                
            tail(old_player)[i] = undefined; // removes the castle from the previous owners castle array
                
            if (count_castles(old_player[1]) == 0 && old_player[0] != "UNDEFINED") { // Checks if player has no castles
                kill_player(old_player); // kills the player
            } else {}
            
        } else {}
    }
}

/**
 * checks if an army is empty
 * @param army - the army that might be empty
 * @returns Boolean - whether the army is empty or not
 */
export function is_army_empty(army : Queue<Warrior>) : Boolean {
    if (head(army) == undefined || army[2].length < 1) {
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
        army = remove_dead_warriors(army);                      // Attacker army fix
        castle_army.hp = remove_dead_warriors(castle_army.hp);  //Def. army fix
        
        if(attacker === undefined || !attacker.alive){
            return true;
        }
        else if(defender === undefined || !defender.alive){
            return false;
        }
        
        console.log(defender.name, 'is defending castle', castle_army.position ,'against', attacker.name, '!');
        empty_line();
        while (true) {
            attacker.health -= defender.attack * get_random_int(0, 2);
            if (attacker.health <= 0) {
                death_text( "Attacker " + `\u001b[31m` + attacker.name +`\u001b[37m`, "Defender " + `\u001b[32m` + defender.name +`\u001b[37m`);
                unalive_warrior(attacker, army);
                console.log()
                console.log(`\u001b[32m` + defender.name +`\u001b[37m`, ' defended the castle, surviving with ',`\u001b[33m` + defender.health +`\u001b[37m`, ' health!')
                console.log();
                console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
                prompt();
                return true;
            }
            defender.health -= attacker.attack * get_random_int(0, 2);
            if (defender.health <= 0) {
                death_text("Defender " + `\u001b[32m` + defender.name +`\u001b[37m`, "Attacker " + `\u001b[31m` + attacker.name +`\u001b[37m`,);
                unalive_warrior(defender, castle_army.hp);
                console.log(`\u001b[31m` + attacker.name + `\u001b[37m`, 'won the battle with ',`\u001b[33m` + attacker.health +`\u001b[37m`, 'health left!')
                console.log();
                console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
                prompt();
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
    console.log("defending army...", castle.hp);
    //Helper: returns true if 
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
            return pair(false, queue_to_array(attackers)); // returns false if the attackers won together with the remaining attacking army.
        } else {
            return pair(true, queue_to_array(defenders)); // returns true if the defenders win together with the remaining defending army.
        }
        
    }

    const winner : Pair<Boolean, Army> = helper(army, castle);
    if (!winner[0]) {   //defender wins
        console.log("You have won the battle my liege! Congratulations, the castle is yours!");
        //castle_owner(castle, attacking_player, defending_player, winner[1]);

        prompt();
        //console.log(tail(winner));
        return (remove_dead_warriors(tail(winner))); 

    } else if (winner[0]) { //attacker wins
        print_to_game("Our army is dead! The battle is lost!");
        print_to_game('But ' + army[0].name + ' managed to inform us of the enemy army before falling:');
        castle.hp = remove_dead_warriors(castle.hp); // får error 27/2, testar lägga till detta
        for (let i = 0; i < castle.hp.length; i++) {
            print_to_game('Soldier name: ' + castle.hp[i].name +
            ' | Attack strength: ' + castle.hp[i].attack +
            ' | Health: ' + castle.hp[i].health);
            }
        castle.hp = winner[1];

        //prompt();
        //console.clear();
        return [];
    }

    return [];

    function delay(ms: number) {
        // denna kommer nog inte användas alls 
        return new Promise( resolve => setTimeout(resolve, ms) );
    }

    function queue_to_array(q : Queue<Warrior> ) : Array<Warrior> {
        return q[2];
    }

} 