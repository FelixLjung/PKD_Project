import { List, Pair , list} from "./lib/list";
//Types

type Army<warrior> = Array<warrior>

type Player <H, T>= [H, T, List<H, T>] | null

type warrior = {
    attack : number
    health : number
    name: string
    
};

type Castle = {
    hp: number,
    name: string
    owner: string
}
 


// Functions
/**
 * Chooses a random number between [min] and [max].
 * @param min is a number. Represents the lowest number on the die
 * @param max is a {number}. Represents the hightes number on the die
 * @returns a random number / integer.
 */
function getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min);
}

/**
 * 
 * @param Vem 
 * @param Vad 
 * @param Army<Warrior> 
 * @returns Boolean - If the castle is taken the
 */
function attack(Vem: string, Vad: string, Army: Army<warrior>){

}



function move(Vem: string, Vart:, army: Army<warrior>)'