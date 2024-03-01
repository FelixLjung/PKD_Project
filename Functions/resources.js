"use strict";
// Resources
Object.defineProperty(exports, "__esModule", { value: true });
exports.death_text = exports.w_names = void 0;
var general_functions_1 = require("./general_functions");
var utility_functions_1 = require("./utility_functions");
exports.w_names = [0,
    2,
    ["Eva Darulova", // Current: 65 warrrior-names
        "Jingwei Hu",
        "Johannes Borgström",
        "Zhanwei Yu",
        "Thom Surströmming",
        "Carl Erik Plopp",
        "Runar Gravstein",
        "Ernst Greve",
        "Hjalmar Storfot",
        "Bosse Brunklimp",
        "Lillemor Jumm",
        "Gustav Backlund",
        "Hans Hansson",
        "Frans Storm",
        "Berit Storm",
        "Tor Hoppetoss",
        "Fred von Pickelroy",
        "Björn Olmedo",
        "Xin Shen",
        "Jimmy Viking",
        "Fredrik Blåtand",
        "Göran Borkavik",
        "Sigvard Bjelkengren",
        "Hans Hansson",
        "Peter Niclass",
        "Tubbe Tonker",
        "Frans Tonker",
        "Per Jutterström",
        "Miro Ali Akbar",
        "Fader Gustav",
        "Dogge Doggelito",
        "Bartek Bunko",
        "Wille den snygge",
        "Kristian Luuk",
        "Börje Flemming",
        "Johanna Grönsaksson",
        "Henning Bollmark",
        "Krudel Haestre",
        "Movitz Grus",
        "Ronken af Bonken",
        "Dani af Ljusdal",
        "Göran Brunklimp",
        "Junior Brunklimp",
        "Ash Ketch",
        "Musk El",
        "Lars-Åke Nordén",
        "Helga Hammerhead",
        "Matilda Mildew",
        "Oswald the Oblivious",
        "Cedric the Clumsy",
        "Gilbert Garlicbreath",
        "Lil' D Plunderpants",
        "Ser Loin Raw",
        "Lord Farquad",
        "Shrek De la Burro",
        "Tobias Wrigstad",
        "David Attenborough",
        "Teddybjörnen Fredriksson",
        "Freddy Kalas",
        "Tomten",
        "Bert Fylking",
        "Arne Weise",
        "Lisa af Bänkpressen",
        "Göran Pson",
        "Tjark Weber"]];
/**
* displays the death message when a soldier dies
* @param dead - the warrior who has been killed
* @param killer - the warrior who killed the other warrior
*/
function death_text(dead, killer) {
    var d_name = dead;
    var k_name = killer;
    var strings = ["".concat(d_name, " has been slain by ").concat(k_name), //26 different texts
        "".concat(d_name, " got skewered by ").concat(k_name), "".concat(d_name, " was defeated by ").concat(k_name), "".concat(k_name, " poked a hole in ").concat(d_name, "'s throat"), "".concat(d_name, " was schooled by ").concat(k_name), "".concat(d_name, " got gob smacked by ").concat(k_name), "".concat(k_name, " stole ").concat(d_name, "'s lunch!"), "".concat(d_name, " took their last breath!"), "".concat(k_name, " bashed in ").concat(d_name, "'s skull"), "".concat(d_name, " got trampled on the battlefield."), "".concat(d_name, " died of conversing with ").concat(k_name), "".concat(k_name, " turned ").concat(d_name, " to rubble."), "".concat(d_name, " recieved a spanking by ").concat(k_name), "".concat(d_name, " lost in rock paper scissor and ").concat(d_name, " died from embarrassment"), "".concat(d_name, " got thousand neddled by ").concat(k_name), "".concat(d_name, " lifespan was dramatically shorted by ").concat(k_name), "".concat(d_name, " got unalived"), "".concat(d_name, " spoke on their dying breath... \" Darnit... \""), "".concat(d_name, " got Alt F4'd"), "".concat(k_name, " deleted ").concat(d_name, "'s kneecaps"), "".concat(d_name, " died of an allergic reaction!"), "".concat(d_name, " laughed so hard, he vanished!"), "".concat(k_name, " slapped ").concat(d_name, "'s face into oblivion"), "".concat(d_name, " got stuck in an infinite loop!"), "".concat(k_name, " broke ").concat(d_name, "'s back!"), "".concat(d_name, " got sent to bed by ").concat(k_name), "".concat(d_name, " broke ").concat(k_name, "'s pinky promised, which resulted in instant death!"), "".concat(k_name, " turned ").concat(d_name, " into a fine paste... Yummy!"), "".concat(d_name, " oxygen was depleted")];
    var curr_event = strings[(0, general_functions_1.get_random_int)(0, 28)];
    (0, utility_functions_1.empty_line)();
    (0, utility_functions_1.cursive_line)();
    (0, utility_functions_1.empty_line)();
    console.log(curr_event); // No Abstracted function for printing with color yet
    (0, utility_functions_1.empty_line)();
}
exports.death_text = death_text;
