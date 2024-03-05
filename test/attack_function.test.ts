// Imports

import {
    is_army_empty,
    enqueue_army,
    fight, 
    attack,
    queue_to_array } from '../Functions/attack_functions'

import { 
    empty,
    enqueue,
    } from '../lib/queue_array'

import {
    type Army,
    type Warrior,
    type Castle,
    type Player,
    type AttackArmy } from '../types'


// Tests

describe('enqueue_army', () => {

    const wrr1 : Warrior = {attack : 5, health : 10, name : 'Alfred', alive : true};
    const wrr2 : Warrior = {attack : 3, health : 15, name : 'David', alive : true};
    const wrr3 : Warrior = {attack : 8, health : 16, name : 'Felix', alive : true};
    const ex_army1 : Army = [wrr1];
    const ex_army2 : Army = [wrr1, wrr2, wrr3];
    const ex_army4 : Army = [];

    it('Changes armies with soldiers in to queues', () => {
        expect(enqueue_army(ex_army1)).toEqual([0, 1, [wrr1]]);
        expect(enqueue_army(ex_army2)).toEqual([0, 3, [wrr1, wrr2, wrr3]]);
    });

    it('Changes empty army to an empty  queue', () => {
        expect(enqueue_army(ex_army4)).toEqual(empty<Warrior>());
    });

});


describe('is_army_empty', () => {

    const wrr1 : Warrior = {attack : 5, health : 10, name : 'Alfred', alive : true};
    const wrr2 : Warrior = {attack : 3, health : 15, name : 'David', alive : true};
    const wrr3 : Warrior = {attack : 8, health : 16, name : 'Felix', alive : true};
    const ex_army1 : Army = [wrr1];
    const ex_army2 : Army = [wrr1, wrr2, wrr3];
    const empty_army = empty<Warrior>();

    it('Returns false for a non empty army', () => {
        expect(is_army_empty(enqueue_army(ex_army1))).toEqual(false);
        expect(is_army_empty(enqueue_army(ex_army2))).toEqual(false);
    });
    
    it('Returns true for an empty army', () => {
        expect(is_army_empty(empty_army)).toEqual(true);
    });

});


describe ('fight', () => {

    const wrr1 : Warrior = {attack : 0, health : 10, name : 'Alfred', alive : true};
    const wrr2 : Warrior = {attack : 3, health : 15, name : 'David', alive : true};
    const wrr3 : Warrior = {attack : 8, health : 16, name : 'Felix', alive : true};
    const ex_army1 : Army = [wrr1];
    const ex_army2 : Army = [wrr2, wrr3];
    const ex_castle1 : Castle = {hp : ex_army2, owner : 'Affe', position : 2};
    const ex_castle2 : Castle = {hp : ex_army1, owner : 'Davve', position : 3};

    it ('The defender wins', () => {
        expect(fight(wrr1, wrr2, ex_army1, ex_castle1)).toEqual(true);
    });

    it ('The attacker wins', () => {
        expect(fight(wrr2, wrr1, ex_army1, ex_castle2)).toEqual(false);
    });

});


describe('attack', () => {
    
    const wrr1 : Warrior = {attack : 0, health : 10, name : 'Alfred', alive : true};
    const wrr2 : Warrior = {attack : 3, health : 15, name : 'David', alive : true};
    const wrr3 : Warrior = {attack : 8, health : 16, name : 'Felix', alive : true};
    const wrr4 : Warrior = {attack : 5, health : 10, name : 'Kalle', alive : true};
    const ex_army1 : Army = [wrr1];
    const ex_army2 : Army = [wrr2, wrr3, wrr4];
    const ex_castle1 : Castle = {hp : ex_army1, owner : 'Alfred', position : 4};
    const ex_player1 : Player = ['Alfred', [ex_castle1]];
    const ex_player2 : Player = ['David', [ex_castle1]];

    it('Returns ex_army2', () => {
        expect(attack(ex_castle1, ex_player2, ex_player1, ex_army2)).toEqual(ex_army2);
    });

});


describe('queue_to_array', () => {
    
    const wrr1 : Warrior = {attack : 0, health : 10, name : 'Alfred', alive : true};
    const wrr2 : Warrior = {attack : 3, health : 15, name : 'David', alive : true};
    let mpt_q : AttackArmy = empty();
    enqueue(wrr1, mpt_q);
    enqueue(wrr2, mpt_q);

    it('Returns a queue from an array', () => {
        expect(queue_to_array(mpt_q)).toEqual([wrr1, wrr2]);
    });

});