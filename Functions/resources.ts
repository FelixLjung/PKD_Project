// Resources

import {type Queue } from "../lib/queue_array";
import { get_random_int } from "./general_functions";
import { empty_line, cursive_line } from "./utility_functions";

export let w_names: Queue<string> = [0,
    2,
    ["Eva Darulova",    // Current: 65 warrrior-names
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
                                `${k_name} turned ${d_name} into a fine paste... Yummy!`,
                                `${d_name} oxygen was depleted`];

    let curr_event = strings[get_random_int(0, 28)];
    empty_line();
    cursive_line();
    empty_line();
    console.log(curr_event); // No Abstracted function for printing with color yet
    empty_line();
}