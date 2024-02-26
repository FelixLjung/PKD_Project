import { MatrixGraph } from "../lib/graphs";
import { finds_paths, getRandomInt, check_if_cpu, remove_dead } from "../Functions/general_functions";

import { create_army, create_castle } from "../Functions/setup_functions";

import { type Army, type Castle, type Warrior, type Player } from "../types";


describe('getRandomInt', () => {

    let x : number = getRandomInt(1, 5);

    it('the number is between 1 and 5: ', () => {
        expect(1 <= x && x <= 5).toEqual(true);

    });

});

describe('finds_paths', () => {
    
    const I = true;
    const O = false;
    const mormors_kudde: MatrixGraph = {
    size: 5,
    adj:[
        [O, I, I, I, O],  //0. from A 
        [I, O, I, O, I],  //1. from B
        [I, I, O, I, I],  //2. from C
        [I, O, I, O, I],  //3. from D
        [O, I, I, I, O],  //4. from E
    ]}
    const wrr1 : Warrior = {attack : 5, health : 5, name : 'Alfred', alive : true};
    const test_castle1 : Castle = {hp : [wrr1], owner : 'David', position : 3};
    const test_castle2 : Castle = {hp : [wrr1], owner : 'Felix', position : 2};

    it('Castle 3 can move to castle 1, 2, 4 and 5', () => {
        expect(finds_paths(test_castle1, mormors_kudde)).toEqual([1, 2, 4, 5]);

    });

    it('Castle 2 can move to castle 1, 3 and 5', () => {
        expect(finds_paths(test_castle2, mormors_kudde)).toEqual([1, 3, 5]);

    });
    
});

describe('check_if_cpu', () => {

    const wrr1 : Warrior = {attack : 5, health : 5, name : 'David', alive : true};
    const test_castle1 : Castle = {hp : [wrr1], owner : 'Alfred', position : 3};
    const test_player1 : Player = ['Alfred', [test_castle1, undefined]];
    const test_cpu1 : Player = ['CPU1', [undefined]];

    it('A player is not a cpu', () => {
        expect(check_if_cpu(test_player1)).toBe(false);
    });

    it('A player name returns false', () => {
        expect(check_if_cpu('Alfred')).toBe(false);
    });

    it('A cpu returns true', () => {
        expect(check_if_cpu(test_cpu1)).toBe(true);
    });

    it('A cpu name returns true', () => {
        expect(check_if_cpu('CPU1')).toBe(true);
    });

});

describe('remove_dead', () => {

    const wrr1 : Warrior = {attack : 5, health : 10, name : 'Alfred', alive : true};
    const wrr2 : Warrior = {attack : 3, health : 15, name : 'David', alive : true};
    const wrr3 : Warrior = {attack : 8, health : 16, name : 'Felix', alive : false};
    const ex_army1 : Army = [wrr1];
    const ex_army2 : Army = [wrr1, wrr2, wrr3];

    it('Returns the same army', () => {
        expect(remove_dead(ex_army1)).toEqual(ex_army1);
    });

    it('Removes the dead warrior', () => {
        expect(remove_dead(ex_army2)).toEqual([wrr1, wrr2]);
    });

});