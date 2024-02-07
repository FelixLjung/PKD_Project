
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

console.log("Tjenare Tjofräs pirrekirre darra stralle");
const prompt1 = require('prompt-sync')({sigint: true}); // Denna påstår att det är error men det funkar ändå
var name1 = prompt1("Vem du är? ");



console.log("no way...", name1, "du är typ " + getRandomInt(1,10) + " år gammal");