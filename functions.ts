//Types








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


function attack