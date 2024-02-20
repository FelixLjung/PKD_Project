import { is_army_empty, enqueue_army } from '../Functions/attack_functions'
import { empty, enqueue } from '../lib/queue_array'
import { type Army, type Warrior } from '../types'

describe('enqueue_army', () => {

    const wrr1 : Warrior = {attack : 5, health : 10, name : 'Alfred'};
    const wrr2 : Warrior = {attack : 3, health : 15, name : 'David'};
    const wrr3 : Warrior = {attack : 8, health : 16, name : 'Felix'};
    const ex_army1 : Army = [wrr1];
    const ex_army2 : Army = [wrr1, wrr2, wrr3];
    const ex_army3 : Army = [];
    const empty_army = empty<Warrior>();

    it('Changes armies with soldiers in to queues', () => {
        expect(enqueue_army(ex_army1)).toEqual(enqueue(wrr1, empty_army));
        expect(enqueue_army(ex_army2)).toEqual([0, 3, [wrr1, wrr2, wrr3]]);
    });

    it('Changes empty army to an empty  queue', () => {
        expect(enqueue_army(ex_army3)).toEqual(empty<Warrior>());
    });

});

describe('is_army_empty', () => {

    const wrr1 : Warrior = {attack : 5, health : 10, name : 'Alfred'};
    const wrr2 : Warrior = {attack : 3, health : 15, name : 'David'};
    const wrr3 : Warrior = {attack : 8, health : 16, name : 'Felix'};
    const ex_army1 : Army = [wrr1];
    const ex_army2 : Army = [wrr1, wrr2, wrr3];
    const ex_army3 : Army = [];
    const empty_army = empty<Warrior>();

    it('Returns false for a non empty army', () => {
        expect(is_army_empty(enqueue_army(ex_army1))).toEqual(false);
        expect(is_army_empty(enqueue_army(ex_army2))).toEqual(false);
    });
    
    it('Returns true for an empty army', () => {
        expect(is_army_empty(empty_army)).toEqual(true);
    });

});

