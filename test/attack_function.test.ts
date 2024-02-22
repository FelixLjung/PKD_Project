import { is_army_empty, enqueue_army, fight } from '../Functions/attack_functions'
import { empty, enqueue } from '../lib/queue_array'
import { type Army, type Warrior, type Castle } from '../types'

describe('enqueue_army', () => {

    const wrr1 : Warrior = {attack : 5, health : 10, name : 'Alfred', alive : true};
    const wrr2 : Warrior = {attack : 3, health : 15, name : 'David', alive : true};
    const wrr3 : Warrior = {attack : 8, health : 16, name : 'Felix', alive : true};
    const wrr4 : Warrior = {attack : 2, health : 5, name : 'Eva', alive : false}
    const ex_army1 : Army = [wrr1];
    const ex_army2 : Army = [wrr1, wrr2, wrr3];
    const ex_army3 : Army = [wrr1, wrr2, wrr3, wrr4];
    const ex_army4 : Army = [];
    const empty_army = empty<Warrior>();

    it('Changes armies with soldiers in to queues', () => {
        expect(enqueue_army(ex_army1)).toEqual([0, 1, [wrr1]]);
        expect(enqueue_army(ex_army2)).toEqual([0, 3, [wrr1, wrr2, wrr3]]);
    });

    it('Changes empty army to an empty  queue', () => {
        expect(enqueue_army(ex_army4)).toEqual(empty<Warrior>());
    });

    it('Does not enqueue a dead warrior', () => {
        expect(enqueue_army(ex_army4)).toEqual([0, 3, [wrr1, wrr2, wrr3]])
    });

});

describe('is_army_empty', () => {

    const wrr1 : Warrior = {attack : 5, health : 10, name : 'Alfred', alive : true};
    const wrr2 : Warrior = {attack : 3, health : 15, name : 'David', alive : true};
    const wrr3 : Warrior = {attack : 8, health : 16, name : 'Felix', alive : true};
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

describe ('fight', () => {

    const wrr1 : Warrior = {attack : 0, health : 10, name : 'Alfred', alive : true};
    const wrr2 : Warrior = {attack : 3, health : 15, name : 'David', alive : true};
    const wrr3 : Warrior = {attack : 8, health : 16, name : 'Felix', alive : true};
    const wrr4 : Warrior = {attack : 2, health : 5, name : 'Eva', alive : false}
    const ex_army1 : Army = [wrr1];
    const ex_army2 : Army = [wrr2, wrr3];
    const ex_army3 : Army = [wrr1, wrr2, wrr3, wrr4];
    const ex_castle1 : Castle = {hp : ex_army2, owner : 'Affe', position : 2};
    const ex_castle2 : Castle = {hp : ex_army1, owner : 'Davve', position : 3};

    it ('The defender wins', () => {
        expect(fight(wrr1, wrr2, ex_army1, ex_castle1)).toEqual(true);
    });

    it ('The attacker wins', () => {
        expect(fight(wrr2, wrr1, ex_army1, ex_castle2)).toEqual(false);
    });

});