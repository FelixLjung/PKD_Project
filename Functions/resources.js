"use strict";
// Resources
Object.defineProperty(exports, "__esModule", { value: true });
exports.death_text = exports.w_names = void 0;
var general_functions_1 = require("./general_functions");
var utility_functions_1 = require("./utility_functions");
exports.w_names = [0,
    2,
    [
        "Eva Darulova", //David starter  1
        "Bosse Brunklimp", //               2
        "Jingwei Hu", //               3
        "Johannes Borgström", //Felix Starter  1
        "Lillemor Jumm", //               2
        "Zhanwei Yu", //               3
        "Thom Surströmming", //Alfred Starter 1
        "Xin Shen", //               2
        "Hans Hansson", //               3
        "Carl Plopp",
        "Runar Gravstein",
        "Ernst Greve",
        "Hjalmar Storfot",
        "Lillemor Jumm",
        "Gustav Backlund",
        "Lars-Åke Nordén",
        "Tobias Wrigstad",
        "Lord Farquad",
        "Frans Storm",
        "Göran Borkavik",
        "Tor Hoppetoss",
        "Berit Storm",
        "Fred von Pickelroy",
        "Björn Olmedo",
        "Jimmy Viking",
        "Fredrik Blåtand",
        "Tjark Weber",
        "Sigvard Bjelkengren",
        "Peter Niclass",
        "Tubbe Tonker",
        "Per Jutterström",
        "Miro Ali Akbar",
        "Frans Tonker",
        "Fader Gustav",
        "Dogge Doggelito",
        "Lisa af Bänkpressen",
        "Bartek Bunko",
        "Wille den snygge",
        "Kristian Luuk",
        "Börje Flemming",
        "Johanna Grönsaksson",
        "Henning Bollmark",
        "Krudel Haestre",
        "David Attenborough",
        "Movitz Grus",
        "Ronken af Bonken",
        "Dani af Ljusdal",
        "Göran Brunklimp",
        "Junior Brunklimp",
        "Ash Ketch",
        "Musk El",
        "Helga Hömwurk",
        "Matilda Mildew",
        "Oswald the Oblivious",
        "Cedric the Clumsy",
        "Gilbert Garlicbreath",
        "Lil' D Plunderpants",
        "Ser Loin Raw",
        "Shrek De la Burro",
        "Teddybjörnen Fredriksson",
        "Freddy Kalas",
        "Tomten",
        "Bert Fylking",
        "Arne Weise",
        "Göran Pson"
    ]];
/**
* displays the death message when a soldier dies
* @param dead - the warrior who has been killed
* @param killer - the warrior who killed the other warrior
*/
function death_text(dead, killer) {
    var d_name = dead;
    var k_name = killer;
    var strings = [
        "".concat(d_name, " has been slain by ").concat(k_name), //26 different texts
        "".concat(k_name, " skewered ").concat(d_name, " like a kebab!"),
        "".concat(d_name, " was defeated by ").concat(k_name),
        "".concat(k_name, " poked a 2x2 inch hole in ").concat(d_name),
        "".concat(d_name, " was schooled by ").concat(k_name),
        "".concat(k_name, " stole ").concat(d_name, "'s lunch!"),
        "".concat(d_name, " took their last breath!"),
        "".concat(d_name, " was caught stealing from Skrubben"),
        "".concat(d_name, " got sent to the family farm"),
        "".concat(k_name, " bashed in ").concat(d_name, "'s skull"),
        "".concat(d_name, " became a noodle!"),
        "".concat(d_name, " fell on their own sword..."),
        "".concat(d_name, " fell ill after conversing with ").concat(k_name),
        "".concat(k_name, " turned ").concat(d_name, " to mush!."),
        "".concat(d_name, " recieved a spanking by ").concat(k_name),
        "".concat(d_name, " died from embarrassment"),
        "".concat(d_name, " got thousand needled by ").concat(k_name),
        "".concat(d_name, " lifespan was dramatically shorted by ").concat(k_name),
        "".concat(d_name, " got unalived"),
        "".concat(d_name, " got Alt F4'd"),
        "".concat(k_name, " deleted ").concat(d_name, "'s kneecaps"),
        "".concat(d_name, " died of an allergic reaction!"),
        "".concat(d_name, " laughed so hard, he vanished!"),
        "".concat(k_name, " slapped ").concat(d_name, " into oblivion"),
        "".concat(d_name, " got stuck in an infinite loop!"),
        "".concat(d_name, " got sent to bed by ").concat(k_name),
        "".concat(d_name, " broke ").concat(k_name, "'s pinky promised and got sent to principals office!"),
        "".concat(k_name, " turned ").concat(d_name, " into a fine paste... Yummy!"),
        "".concat(d_name, " oxygen was depleted"),
        "".concat(d_name, " became an ingredient in tonights dinner!"),
        "".concat(d_name, " failed HW10... it was WAY TO HARD!")
    ];
    var curr_event = strings[(0, general_functions_1.get_random_int)(0, 30)];
    (0, utility_functions_1.empty_line)();
    (0, utility_functions_1.cursive_line)();
    (0, utility_functions_1.empty_line)();
    console.log(curr_event); // No Abstracted function for printing with color yet
    (0, utility_functions_1.empty_line)();
}
exports.death_text = death_text;
