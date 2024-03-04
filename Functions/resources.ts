// Resources

import {type Queue } from "../lib/queue_array";
import { empty_line, cursive_line, get_random_int } from "./utility_functions";

export let w_names: Queue<string> = [0,
    2,
    [   // Current: 66 warrrior-names
        "Eva Darulova",         //David starter  1
        "Bosse Brunklimp",      //               2
        "Jingwei Hu",           //               3

        "Johannes Borgström",   //Felix Starter  1
        "Lillemor Jumm",        //               2
        "Zhanwei Yu",           //               3

        "Thom Surströmming",    //Alfred Starter 1
        "Xin Shen",             //               2
        "Hans Hansson",         //               3
        "Carl Plopp",
        "Ruoqi Zhang",
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
        "Lille-De von Olmedo",
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
        "Wilmer von Handtel",
        "Bartek Bunko",
        "Wille den Snygge",
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
        "Ash Ketch",
        "Musk El",
        "Junior Brunklimp",
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
        "Göran Pson"]];



        /**
 * displays the death message when a soldier dies
 * @param dead - the warrior who has been killed
 * @param killer - the warrior who killed the other warrior
 */
export function death_text(dead: string, killer: string) {
    let d_name: string = dead;
    let k_name: string = killer;
    const strings: Array<string> = [
                                `${d_name} has been slain by ${k_name}`,        //26 different texts
                                `${k_name} skewered ${d_name} like a kebab!`,
                                `${d_name} was defeated by ${k_name}`, 
                                `${k_name} poked a 2x2 inch hole in ${d_name}`,
                                `${d_name} was schooled by ${k_name}`,
                                `${k_name} stole ${d_name}'s lunch!`,
                                `${d_name} took their last breath!`,
                                `${d_name} was caught stealing from Skrubben`,
                                `${d_name} got sent to the family farm`,
                                `${k_name} bashed in ${d_name}'s skull`,
                                `${d_name} became a noodle!`,
                                `${d_name} fell on their own sword...`,
                                `${d_name} fell ill after conversing with ${k_name}`,
                                `${k_name} turned ${d_name} to mush!.`,
                                `${d_name} recieved a spanking by ${k_name}`,
                                `${d_name} died from embarrassment`,
                                `${d_name} got thousand needled by ${k_name}`,
                                `${d_name} lifespan was dramatically shorted by ${k_name}`,
                                `${d_name} got unalived`,
                                `${d_name} got Alt F4'd`,
                                `${k_name} deleted ${d_name}'s kneecaps`,
                                `${d_name} died of an allergic reaction!`,
                                `${d_name} laughed so hard, he vanished!`,
                                `${k_name} slapped ${d_name} into oblivion`,
                                `${d_name} got stuck in an infinite loop!`,
                                `${d_name} got sent to bed by ${k_name}`,
                                `${d_name} broke ${k_name}'s pinky promised and got sent to principals office!`,
                                `${k_name} turned ${d_name} into a fine paste... Yummy!`,
                                `${d_name} oxygen was depleted`,
                                `${d_name} became an ingredient in tonights dinner!`,
                                `${d_name} failed HW10... it was WAY TOO HARD!`];

    let curr_event = strings[get_random_int(0, 30)];
    empty_line();
    cursive_line();
    empty_line();
    console.log(curr_event); // No Abstracted function for printing with color yet
    empty_line();
}